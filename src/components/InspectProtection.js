"use client";

import { useEffect } from "react";

export default function InspectProtection() {
    useEffect(() => {
        // Disable right-click
        const handleContextMenu = (e) => {
            e.preventDefault();
        };

        // Disable keyboard shortcuts
        const handleKeyDown = (e) => {
            // F12
            if (e.keyCode === 123) {
                e.preventDefault();
                return false;
            }

            // Ctrl+Shift+I (Inspect)
            if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
                e.preventDefault();
                return false;
            }

            // Ctrl+Shift+J (Console)
            if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
                e.preventDefault();
                return false;
            }

            // Ctrl+Shift+C (Inspect Element)
            if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
                e.preventDefault();
                return false;
            }

            // Ctrl+U (View Source)
            if (e.ctrlKey && e.keyCode === 85) {
                e.preventDefault();
                return false;
            }

            // Ctrl+S (Save Page)
            if (e.ctrlKey && e.keyCode === 83) {
                e.preventDefault();
                return false;
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);

        // Debugger trick to pause if DevTools is opened
        const devToolsInterval = setInterval(() => {
            const startTime = performance.now();
            debugger;
            const endTime = performance.now();
            if (endTime - startTime > 100) {
                // DevTools likely open
            }
        }, 1000);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
            clearInterval(devToolsInterval);
        };
    }, []);

    return null;
}
