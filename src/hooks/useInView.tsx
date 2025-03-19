// import { useState, useEffect, useRef } from "react";

// export const useInView = <T extends HTMLElement>(threshold: number = 0.2) => {
//     const ref = useRef<T | null>(null);
//     const [isVisible, setIsVisible] = useState(false);

//     useEffect(() => {
//         const element = ref.current;
//         if (!element) return;

//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     setIsVisible(true);
//                     observer.unobserve(entry.target);
//                 }
//             },
//             { threshold }
//         );

//         observer.observe(element);

//         return () => observer.disconnect();
//     }, [threshold]);

//     return { ref, isVisible };
// };

import { useEffect, useRef, useState } from "react";

// Переиспользуемый хук для отслеживания видимости элемента
const useInView = (threshold = 0.3) => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true); // Элемент стал видимым
                    }
                });
            },
            {
                threshold, // элемент должен быть видимым на 30% (или задаешь другое значение)
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return { ref, isInView };
};

export default useInView;
