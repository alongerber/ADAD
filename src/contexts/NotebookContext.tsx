import React, { createContext, useContext, useState, useCallback } from 'react';

interface NotebookContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  messages: string[];
  setMessages: (messages: string[]) => void;
  addMessage: (message: string) => void;
  clearMessages: () => void;
  toggleNotebook: () => void;
}

const NotebookContext = createContext<NotebookContextType | undefined>(undefined);

export const NotebookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const addMessage = useCallback((message: string) => {
    setMessages((prev) => [...prev, message]);
    // Auto-open if important feedback arrives
    setIsOpen(true);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const toggleNotebook = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <NotebookContext.Provider 
      value={{ 
        isOpen, 
        setIsOpen, 
        messages, 
        setMessages, 
        addMessage, 
        clearMessages, 
        toggleNotebook 
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
};

export const useNotebook = () => {
  const context = useContext(NotebookContext);
  if (!context) {
    throw new Error('useNotebook must be used within a NotebookProvider');
  }
  return context;
};