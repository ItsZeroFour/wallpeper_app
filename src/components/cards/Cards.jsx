import React, { useEffect, useRef, useState } from "react";
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
import Close from "../../assets/icons/close.svg?react";
import Popup from "../popup/Popup";

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

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0.8 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3 },
  },
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
  const sliderRef = useRef();

  const isInView = useInView(ref, { once: true, margin: "-400px" });

  const [activeCards, setActiveCards] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddCard = () => {
    const currentSlideIndex = sliderRef.current.innerSlider.state.currentSlide;
    const selectedIndex = (currentSlideIndex + 2) % items.length;

    if (!activeCards.includes(selectedIndex) && selectedItems.length < 3) {
      setActiveCards([...activeCards, selectedIndex]);
      setSelectedItems([...selectedItems, items[selectedIndex].text]);
    }
    sliderRef.current.slickNext();
  };

  const handleRemoveCard = () => {
    const currentSlideIndex = sliderRef.current.innerSlider.state.currentSlide;
    const selectedIndex = (currentSlideIndex + 2) % items.length;

    if (activeCards.includes(selectedIndex)) {
      setActiveCards(activeCards.filter((index) => index !== selectedIndex));
      setSelectedItems(
        selectedItems.filter((_, i) => activeCards.indexOf(selectedIndex) !== i)
      );
    }
    sliderRef.current.slickNext();
  };

  const handleRemoveSpecificCard = (index) => {
    setActiveCards(activeCards.filter((cardIndex) => cardIndex !== index));
    setSelectedItems(
      selectedItems.filter((_, i) => activeCards.indexOf(index) !== i)
    );
  };

  useEffect(() => {
    if (selectedItems.length === 3) {
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedItems]);

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
    <motion.section className={style.cards} ref={ref}>
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
                const isActive = activeCards.includes(index);
                const selectedIndex = activeCards.indexOf(index) + 1;
                const totalSelected = 3;

                return (
                  <motion.div
                    key={index}
                    className={`${style.cards__item} ${
                      isActive ? style.active : ""
                    }`}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    // whileHover={!isActive ? { scale: 1.03 } : {}}
                    whileTap={!isActive ? { scale: 0.97 } : {}}
                  >
                    <motion.div
                      className={style.cards__item__container}
                      transition={{ duration: 0.3 }}
                    >
                      {isActive && (
                        <motion.div
                          className={style.cards__item__top}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <motion.div
                            className={style.card__number}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <p>
                              {selectedIndex}/{totalSelected}
                            </p>
                          </motion.div>

                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveSpecificCard(index);
                            }}
                            whileHover={{ scale: 1.2, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Close />
                          </motion.button>
                        </motion.div>
                      )}

                      <motion.div
                        className={style.cards__item__img}
                        animate={
                          isActive
                            ? {
                                scale: 1.1,
                              }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <Icon />
                      </motion.div>

                      <motion.div className={style.cards__item__text}>
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </Slider>
          </motion.div>

          <motion.div className={style.cards__panel} variants={itemVariants}>
            <motion.button
              onClick={handleRemoveCard}
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <X />
            </motion.button>

            <p>Dipilih: {selectedItems.length}/3</p>

            <motion.button
              onClick={handleAddCard}
              whileHover={buttonHover}
              whileTap={buttonTap}
              disabled={selectedItems.length >= 3}
            >
              <Check />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {isPopupOpen && (
        <div onClick={() => setIsPopupOpen(false)}>
          <Popup onClose={() => setIsPopupOpen(false)} selectedItems={selectedItems} />
        </div>
      )}
    </motion.section>
  );
};

export default Cards;
