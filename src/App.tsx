import React, { useState, useEffect } from 'react';
import { RoomType } from './types';
import { LabRoom } from './rooms/LabRoom';
import { VaultRoom } from './rooms/VaultRoom';
import { Lobby } from './components/lobby/Lobby';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProvider, useUser } from './contexts/UserContext';
import { NotebookProvider, useNotebook } from './contexts/NotebookContext';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { NotebookPanel } from './components/ui/NotebookPanel';
import { SplashScreen } from './components/ui/SplashScreen';
import { AchievementToast } from './components/ui/AchievementToast';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Analytics } from '@vercel/analytics/react';
import { initAudio } from './hooks/useSound';

const GameContainer: React.FC = () => {
  const { user, theme } = useUser();
  const { isOpen, messages } = useNotebook();
  const [currentRoom, setCurrentRoom] = useState<RoomType>(RoomType.LOBBY);
  const [showSplash, setShowSplash] = useState(true);

  // Initialize audio on first user interaction (required for mobile browsers)
  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudio();
      // Remove listeners after first interaction
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    document.addEventListener('click', handleFirstInteraction);

    return () => {
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  // Show splash screen first (only for new users)
  if (showSplash && !user) {
    return (
      <AnimatePresence>
        <SplashScreen onComplete={() => setShowSplash(false)} />
      </AnimatePresence>
    );
  }

  // If no user profile exists, show the Onboarding Wizard
  if (!user) {
    return <OnboardingWizard />;
  }

  // Lobby / Main Game
  return (
    <div className={`w-screen h-screen ${theme.bg} text-white relative overflow-hidden transition-colors duration-1000`}>

        {/* Achievement Toast - Shows when achievements are unlocked */}
        <AchievementToast />

        {/* GLOBAL NOTEBOOK OVERLAY */}
        <NotebookPanel show={isOpen} messages={messages} />

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
            {currentRoom === RoomType.LOBBY && (
                <motion.div
                    key="lobby"
                    className="w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                >
                    <Lobby onNavigate={setCurrentRoom} />
                </motion.div>
            )}

            {currentRoom === RoomType.LAB && (
                <motion.div
                    key="lab"
                    className="w-full h-full"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                >
                    <LabRoom onNavigate={setCurrentRoom} />
                </motion.div>
            )}

            {currentRoom === RoomType.VAULT && (
                <motion.div
                    key="vault"
                    className="w-full h-full"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                >
                    <VaultRoom onNavigate={setCurrentRoom} />
                </motion.div>
            )}

            {/* Future rooms */}
            {currentRoom === RoomType.COCKPIT && <div className="p-10">Cockpit Locked</div>}
        </AnimatePresence>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <UserProvider>
        <NotebookProvider>
          <GameContainer />
          <Analytics />
        </NotebookProvider>
      </UserProvider>
    </ErrorBoundary>
  );
};

export default App;
