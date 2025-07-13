import React from "react";
import style from "./head.module.scss";
import { Link } from "react-router-dom";
import person from "@assets/images/head/person.webp";
import { motion } from "framer-motion";

const Head = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageAnim = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className={style.head}>
      <div className="container">
        <motion.div
          className={style.head__wrapper}
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.div className={style.head__left} variants={container}>
            <motion.h1 variants={item}>
              Ciptakanlah mimpi bersama Stockity
            </motion.h1>
            <motion.p variants={item}>
              Lakukan deposit mulai dari jumlah X dan ikut serta dalam undian
              berhadiah $300 untuk mewujudkan keinginanmu
            </motion.p>
            <motion.div variants={item}>
              <Link
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ display: "inline-block" }}
              >
                Ambil kesempatan
              </Link>
            </motion.div>
          </motion.div>

          <motion.div className={style.head__right} variants={imageAnim}>
            <img src={person} alt="person" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Head;
