import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
}

export const FadeUp = ({ children, delay = 0, className = "", duration = 0.7 }: FadeUpProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={`relative ${className}`}
  >
    {children}
  </motion.div>
);

export const FadeInLeft = ({ children, delay = 0, className = "", duration = 0.7 }: FadeUpProps) => (
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={`relative ${className}`}
  >
    {children}
  </motion.div>
);

export const FadeInRight = ({ children, delay = 0, className = "", duration = 0.7 }: FadeUpProps) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={`relative ${className}`}
  >
    {children}
  </motion.div>
);

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer = ({ children, className = "", staggerDelay = 0.1 }: StaggerContainerProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
    className={`relative ${className}`}
  >
    {children}
  </motion.div>
);

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem = ({ children, className = "" }: StaggerItemProps) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);