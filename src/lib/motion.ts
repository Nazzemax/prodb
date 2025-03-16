export const viewportConfig = {
  once: true,
  amount: 0.1,
};

export const defaultTransition = {
  duration: 0.5,
  ease: "easeOut",
};

export const staggerTransition = (index: number, delayStep = 0.2) => ({
  duration: 0.5,
  delay: index * delayStep,
  ease: "easeOut",
});

// export const staggerContainer = (staggerChildren, delayChildren) => {
//     return {
//         hidden: {},
//         show: {
//             transition: {
//                 staggerChildren: staggerChildren,
//                 delayChildren: delayChildren || 0,
//             },
//         },
//     };
// };

export const textVariant = (delay = 0) => ({
  hidden: {
    y: -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.25,
      delay: delay,
    },
  },
});

export const fadeIn = (
  direction = "up",
  type = "spring",
  delay = 0,
  duration = 1
) => ({
  hidden: {
    x: direction === "left" ? -100 : direction === "right" ? 100 : 0, // сдвиг влево или вправо
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0, // сдвиг по вертикали
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    },
  },
});

export const deafultTextAnimation = {
  variants: textVariant(0.3),
  initial: "hidden",
  whileInView: "show",
  viewport: viewportConfig,
  transition: defaultTransition,
};
