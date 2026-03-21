export const fadeUp = {
  initial: { opacity: 0, transform: 'translateY(20px)' },
  animate: { opacity: 1, transform: 'translateY(0)' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export const pulse = {
  animation: 'pulse 2s infinite'
};
