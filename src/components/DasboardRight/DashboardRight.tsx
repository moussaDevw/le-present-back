"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRootedContext } from "@/hooks/context/useContext";

interface DashboardRightProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardRight({ children, className }: DashboardRightProps) {
  const { isDrawerOpen, setIsDrawerOpen } = useRootedContext();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black bg-opacity-50"
            onClick={() => setIsDrawerOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`fixed right-0 top-0 z-[10000] h-full w-100 overflow-y-auto bg-white p-8 shadow-xl ${className}`}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
