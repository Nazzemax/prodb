"use client";

import React, { CSSProperties, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Advantages.module.scss";
import Image from "next/image";
import bgCircle from "../../../../public/advantageCircle.png";

const advantages = [
    {
        title: "30+",
        subtitle: "опытных экспертов, которые работают на ваш результат",
    },
    {
        title: "Топ-1",
        subtitle:
      "маркетинговая компания по версии The Great Award of the Year 2023 за выдающиеся достижения в продвижении бизнеса.",
    },
    {
        title: "60+",
        subtitle:
      "успешных проектов, которые помогли нашим клиентам увеличить продажи на 189%",
    },
    {
        title: "35+",
        subtitle:
      "опыт в отраслях бизнеса — от салонов красоты до строительных компаний",
    },
];

// 🔹 Анимация контейнера (плавное появление всех элементов)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, // Появление элементов с задержкой
        },
    },
};

// 🔹 Анимация для заголовка и подзаголовка
const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// 🔹 Анимация кружков (сначала увеличиваются, затем появляются)
const circleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

export const Advantages: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            className={styles.advantages}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <div className={styles.advantages__container}>
                <motion.div
                    className={styles.advantages__circles}
                    variants={containerVariants}
                >
                    <div className={styles.advantages__col1}>
                        {advantages.slice(0, 2).map((advantage, index) => (
                            <motion.div
                                key={index}
                                className={styles.advantages__circle}
                                variants={circleVariants}
                            >
                                <Image
                                    src={bgCircle}
                                    width={422}
                                    height={422}
                                    alt={`circle${index + 1}`}
                                    className={styles.image}
                                    priority={index === 0} 
                                />
                                <div className={styles.advantages__cirlceText}>
                                    <span className={styles.advantages__circleTitle}>
                                        {advantage.title}
                                    </span>
                                    <span className={styles.advantages__circleSubtitle}>
                                        {advantage.subtitle}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className={styles.advantages__col2}>
                        {advantages.slice(2, 4).map((advantage, index) => (
                            <motion.div
                                key={index + 2}
                                className={styles.advantages__circle}
                                variants={circleVariants}
                            >
                                <Image
                                    src={bgCircle}
                                    width={422}
                                    height={422}
                                    alt={`circle${index + 3}`}
                                    className={styles.image}
                                    priority={index === 0} 
                                />
                                <div className={styles.advantages__cirlceText}>
                                    <span className={styles.advantages__circleTitle}>
                                        {advantage.title}
                                    </span>
                                    <span className={styles.advantages__circleSubtitle}>
                                        {advantage.subtitle}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};
