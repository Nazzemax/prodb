import { useEffect, useRef, useState } from "react";

// Переиспользуемый хук для отслеживания видимости элемента
const useInView = (threshold = 0.3) => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        // Сохраняем текущее значение ref.current в переменную
        const currentElement = ref.current;

        if (currentElement) {
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

            // Наблюдаем за сохранённым элементом
            observer.observe(currentElement);

            // Очистка: прекращаем наблюдение за тем же элементом
            return () => {
                if (currentElement) {
                    observer.unobserve(currentElement);
                }
            };
        }
    }, [threshold]);

    return { ref, isInView };
};

export default useInView;