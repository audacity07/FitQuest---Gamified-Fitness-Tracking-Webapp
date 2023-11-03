import styes from "./Navbar/Navbar.module.css";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";


export const MobileNavLink = ({ title, href, dataText }) => {
    const mobileLinkVars = {
        initial: {
            y: "30vh",
            transition: {
                ease: [0.37, 0, 0.63, 1],
                duration: 0.5
            }
        }, open: {
            y: 0,
            transition: {
                ease: [0, 0.55, 0.45, 1],
                duration: 0.7
            }
        }

    }
    const customStyle = {
        WebkitTextStroke: "1px #fff"
    }
    return (
        <motion.div variants={mobileLinkVars} >
            <Link
                to={href}
                style={customStyle}
                dataText={dataText}
                className={`${styes.mobileLavlink} relative text-5xl uppercase line-clamp-1 text-transparent font-extrabold tracking-widest`}>
                {title}</Link>
        </motion.div>
    )
}