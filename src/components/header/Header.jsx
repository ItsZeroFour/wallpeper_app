import React, { useEffect, useState } from "react";
import style from "./header.module.scss";
import { Link } from "react-router-dom";
import logo from "@assets/logo.svg";
import Telegram from "@assets/icons/telegram.svg?react";
import Instagram from "@assets/icons/instagram.svg?react";
import { motion, AnimatePresence } from "framer-motion";

const menuVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const socialVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
    },
  },
  exit: { opacity: 0, scale: 0.8 },
};

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenu]);

  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.header__wrapper}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>

          <nav>
            <ul>
              <li>
                <Link to="/">The wish card</Link>
              </li>

              <li>
                <Link to="/">About us</Link>
              </li>

              <li>
                <Link to="/">Choose a dream</Link>
              </li>
            </ul>
          </nav>

          <button
            className={showMenu && style.active}
            onClick={() => setShowMenu(!showMenu)}
          >
            <div></div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            className={style.header__menu}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <motion.nav>
              <motion.ul>
                <motion.li variants={itemVariants}>
                  <Link to="/" onClick={() => setShowMenu(false)}>
                    The wish card
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link to="/" onClick={() => setShowMenu(false)}>
                    About us
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link to="/" onClick={() => setShowMenu(false)}>
                    Choose a dream
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link to="/" onClick={() => setShowMenu(false)}>
                    Rules
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.nav>

            <motion.ul variants={socialVariants}>
              <motion.li variants={itemVariants}>
                <Link to="/">
                  <Telegram />
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link to="/">
                  <Instagram />
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
