import React, { useState, useEffect, Suspense, lazy } from 'react';
import { RoomType } from './types';
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

// Lazy load heavy components for better initial load time
const LabRoom = lazy(() => import('./rooms/LabRoom').then(m => ({ default: m.LabRoom })));
const VaultRoom = lazy(() => import('./rooms/VaultRoom').then(m => ({ default: m.VaultRoom })));
const CurriculumPlayer = lazy(() => import('./components/curriculum/CurriculumPlayer').then(m => ({ default: m.CurriculumPlayer })));

// Loading spinner for lazy-loaded components
const LoadingSpinner = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      <p className="text-white/60 text-sm" dir="rtl">טוען...</p>
    </div>
  </div>
);

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
                    <Suspense fallback={<LoadingSpinner />}>
                        <LabRoom onNavigate={setCurrentRoom} />
                    </Suspense>
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
                    <Suspense fallback={<LoadingSpinner />}>
                        <VaultRoom onNavigate={setCurrentRoom} />
                    </Suspense>
                </motion.div>
            )}

            {currentRoom === RoomType.CURRICULUM && (
                <motion.div
                    key="curriculum"
                    className="w-full h-full"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                >
                    <Suspense fallback={<LoadingSpinner />}>
                        <CurriculumPlayer onBack={() => setCurrentRoom(RoomType.LOBBY)} />
                    </Suspense>
                </motion.div>
            )}

            {currentRoom === RoomType.FRACTIONS && (
                <motion.div
                    key="fractions"
                    className="w-full h-full"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                >
                    <Suspense fallback={<LoadingSpinner />}>
                        <CurriculumPlayer onBack={() => setCurrentRoom(RoomType.LOBBY)} initialModule="fractions" />
                    </Suspense>
                </motion.div>
            )}

            {currentRoom === RoomType.NUMBERS && (
                <motion.div
                    key="numbers"
                    className="w-full h-full"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                >
                    <Suspense fallback={<LoadingSpinner />}>
                        <CurriculumPlayer onBack={() => setCurrentRoom(RoomType.LOBBY)} initialModule="numbers" />
                    </Suspense>
                </motion.div>
            )}

            {currentRoom === RoomType.GEOMETRY && (
                <motion.div
                    key="geometry"
                    className="w-full h-full"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                >
                    <Suspense fallback={<LoadingSpinner />}>
                        <CurriculumPlayer onBack={() => setCurrentRoom(RoomType.LOBBY)} initialModule="geometry" />
                    </Suspense>
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
