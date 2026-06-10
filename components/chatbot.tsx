"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";

// Dynamic import of the heavy chat UI - only loads when first opened
const ChatbotUI = dynamic(() => import("./chatbot-ui"), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-neutral-900 dark:bg-neutral-50 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-neutral-50 dark:border-neutral-900 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const hasShownTooltip = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if tooltip was already shown
    const tooltipShown = localStorage.getItem("chatbot-tooltip-shown");
    if (!tooltipShown) {
      hasShownTooltip.current = false;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 500px (hero section)
      const scrollY = window.scrollY;
      if (scrollY > 500) {
        setShowButton(true);

        // Show tooltip once after button appears (if not shown before)
        if (!hasShownTooltip.current) {
          scrollTimeoutRef.current = setTimeout(() => {
            setShowTooltip(true);
            hasShownTooltip.current = true;
            localStorage.setItem("chatbot-tooltip-shown", "true");

            // Hide tooltip after 4 seconds
            setTimeout(() => {
              setShowTooltip(false);
            }, 4000);
          }, 1000);
        }
      }
    };

    // Fallback: Show button after 3 seconds even if no scroll
    const timeTimeout = setTimeout(() => {
      setShowButton(true);

      // Show tooltip on time-based reveal if not shown before
      if (!hasShownTooltip.current) {
        setTimeout(() => {
          setShowTooltip(true);
          hasShownTooltip.current = true;
          localStorage.setItem("chatbot-tooltip-shown", "true");

          setTimeout(() => {
            setShowTooltip(false);
          }, 4000);
        }, 1000);
      }
    }, 3000);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeTimeout);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleOpenChat = () => {
    setIsOpen(true);
    // Hide tooltip when user interacts
    setShowTooltip(false);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Button - only visible after scroll or delay */}
      <AnimatePresence>
        {showButton && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-40"
          >
            {/* One-time tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: 50 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: 10, x: 50 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
                >
                  <div className="relative bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 px-4 py-2 rounded-lg text-sm font-custom2 shadow-lg">
                    Ask me about my work
                    {/* Tooltip arrow */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-neutral-900 dark:border-l-neutral-100 border-b-8 border-b-transparent" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={handleOpenChat}
              className="
                flex items-center justify-center
                w-14 h-14 rounded-full
                bg-neutral-900 dark:bg-neutral-50
                text-neutral-50 dark:text-neutral-900
                shadow-lg hover:shadow-xl
                transition-all duration-300
                hover:scale-110 active:scale-95
              "
              aria-label="Open chat"
            >
              <MessageSquare className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat UI - lazy loaded on first interaction */}
      <ChatbotUI isOpen={isOpen} onClose={handleCloseChat} />
    </>
  );
}
