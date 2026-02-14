import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false);
    const [pendingPath, setPendingPath] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const triggerTransition = (targetPath) => {
        if (location.pathname === targetPath) return;
        setPendingPath(targetPath);
        setIsActive(true);
    };

    useEffect(() => {
        if (isActive && pendingPath) {
            // Wait for rocks to close before changing the route
            const timer = setTimeout(() => {
                navigate(pendingPath);
                setPendingPath(null);
                // We keep isActive true until the new page signals it's ready, 
                // or just wait a bit longer then auto-open.
                // For now, let's auto-open after a short delay to simulate "loading"
                setTimeout(() => {
                    setIsActive(false);
                }, 1000);
            }, 800);

            return () => clearTimeout(timer);
        }
    }, [isActive, pendingPath, navigate]);

    return (
        <TransitionContext.Provider value={{ isActive, triggerTransition }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const useTransition = () => useContext(TransitionContext);
