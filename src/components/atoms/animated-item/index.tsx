import { fadeIn, staggerTransition, viewportConfig } from "@/lib/motion";
import { motion } from "framer-motion";

interface AnimatedItemProps {
    children: React.ReactNode;
    idx: number;
}

export const AnimatedItem = ({ children, idx }: AnimatedItemProps) => {
    return (
        <motion.div
            variants={fadeIn("up", "spring", idx * 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            transition={staggerTransition(idx)}
        >
            {children}
        </motion.div>
    );
};