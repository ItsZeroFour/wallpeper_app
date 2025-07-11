import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import style from "./cards.module.scss";
import iphone from "../../assets/images/cards/iPhone.png";
import Item1 from "../../assets/images/cards/slider/item-1.svg?react";
import Item2 from "../../assets/images/cards/slider/item-2.svg?react";
import Item3 from "../../assets/images/cards/slider/item-3.svg?react";
import Item4 from "../../assets/images/cards/slider/item-4.svg?react";
import Item5 from "../../assets/images/cards/slider/item-5.svg?react";
import Item6 from "../../assets/images/cards/slider/item-6.svg?react";
import Item7 from "../../assets/images/cards/slider/item-7.svg?react";
import Item8 from "../../assets/images/cards/slider/item-8.svg?react";
import Item9 from "../../assets/images/cards/slider/item-9.svg?react";
import Item10 from "../../assets/images/cards/slider/item-10.svg?react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import X from "../../assets/images/cards/x.svg?react";
import Check from "../../assets/images/cards/check.svg?react";

// Анимации
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const buttonHover = {
  scale: 1.1,
  transition: { type: "spring", stiffness: 400 },
};

const buttonTap = {
  scale: 0.95,
};

const Cards = () => {
  const items = [
    {
      img: Item1,
      title: "Keberanian",
      text: "Saya tidak membiarkan rasa takut mengambil keputusan untuk saya",
    },

    {
      img: Item2,
      title: "Kehormatan",
      text: "Saya melakukan hal yang benar, bahkan ketika tidak ada yang melihat",
    },

    {
      img: Item3,
      title: "Keteguhan",
      text: "Saya tidak menyimpang dari jalan sampai saya mencapai tujuan saya",
    },

    {
      img: Item4,
      title: "Kesetiaan",
      text: "Saya selalu menjadi pendukung bagi orang-orang yang",
    },

    {
      img: Item5,
      title: "Tanggung Jawab",
      text: "Gue pegang janji gue — itu nunjukin kekuatan hati gue",
    },

    {
      img: Item6,
      title: "Pengendalian Diri",
      text: "Gue bisa ngontrol diri — itu kekuatan gue",
    },

    {
      img: Item7,
      title: "Kesabaran",
      text: "Perubahan gede butuh waktu dan kesabaran",
    },

    {
      img: Item8,
      title: "Ketekunan",
      text: "Gue tetep jalan terus, walau rasanya perjalanan masih jauh",
    },

    {
      img: Item9,
      title: "Kebaikan Hati",
      text: "Gue ngelakuin hal baik tanpa ngarepin balasan",
    },

    {
      img: Item10,
      title: "Pengembangan Diri",
      text: "Setiap hari gue berusaha jadi lebih baik dari kemarin",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const sliderRef = useRef();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <motion.div className={style.cards} ref={ref}>
      <div className="container">
        <motion.div
          className={style.cards__wrapper}
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          initial="hidden"
        >
          <motion.h2 variants={itemVariants}>
            Bangun papan keinginanmu
          </motion.h2>
          <motion.p variants={itemVariants}>
            Tekan ikon + dan pilih 3 gambar yang sesuai dengan nilai-nilaimu.
            Buatlah kolasemu sendiri dan unduh papan keinginan ke smartphonemu
          </motion.p>

          <motion.img
            src={iphone}
            alt="iphone"
            variants={itemVariants}
            transition={{ type: "spring", stiffness: 300 }}
          />

          <motion.div
            className={style.cards__list}
            style={{ width: "80%", margin: "0 auto" }}
            variants={itemVariants}
          >
            <Slider ref={sliderRef} {...settings}>
              {items.map((item, index) => {
                const Icon = item.img;

                return (
                  <motion.div key={index} className={style.cards__item}>
                    <div className={style.cards__item__container}>
                      <motion.div className={style.cards__item__img}>
                        <Icon />
                      </motion.div>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </Slider>
          </motion.div>

          <motion.div className={style.cards__panel} variants={itemVariants}>
            <motion.button
              onClick={() => sliderRef.current.slickNext()}
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <X />
            </motion.button>

            <p>Dipilih: 0/3</p>

            <motion.button whileHover={buttonHover} whileTap={buttonTap}>
              <Check />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cards;
