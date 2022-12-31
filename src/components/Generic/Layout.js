import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import Snowfall from "./Effect/Snowfall";
import { motion } from "framer-motion";

const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'linear',
    duration: 2
  }; 

export function Layout() {
    const { pathname } = useLocation()

    return (
        <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}>
            <Header />
            <Snowfall />
            <Outlet />
        </motion.div>
    )
}