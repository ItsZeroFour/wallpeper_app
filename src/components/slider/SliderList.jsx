import React, { useRef } from "react";
import style from "./slider.module.scss";
import ArrowLeft from "../../assets/icons/arrow-left.svg?react";
import ArrowRight from "../../assets/icons/arrow-right.svg?react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/images/slider/image-1.png";
import img2 from "../../assets/images/slider/image-2.png";
import img3 from "../../assets/images/slider/image-3.png";
import img4 from "../../assets/images/slider/image-4.png";
import { motion, useInView } from "framer-motion";

const SliderList = () => {
  const sliderRef = useRef();
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, margin: "-450px" });

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    centerMode: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          centerPadding: "20px",
        },
      },
    ],
  };

  const slides = [
    {
      id: 1,
      img: img1,
      title: "Global",
      text: "Sekitar 1 juta trader aktif dari seluruh dunia, setiap hari",
    },
    {
      id: 2,
      img: img2,
      title: "Simpel",
      text: "Tampilan yang gampang dipakai & banyak alat trading lengkap",
    },
    {
      id: 3,
      img: img3,
      title: "Fleksibel",
      text: "Trading buka 24/7. Pakai versi desktop atau aplikasi sesukamu",
    },
    {
      id: 4,
      img: img4,
      title: "Minimal Trade $1",
      text: "Siapa aja bisa ikut trading",
    },
  ];

  // Анимации
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
  };

  const navVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const slideItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    }),
    hover: {
      y: -10,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section className={style.slider} ref={sectionRef}>
      <div className="container">
        <div className={style.slider__wrapper}>
          <motion.div
            className={style.slider__top}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2 variants={titleVariants}>
              Stockity, jalan aman buat ngejar mimpi kamu
            </motion.h2>

            <motion.div className={style.slider__nav} variants={navVariants}>
              <motion.button
                onClick={() => sliderRef.current.slickPrev()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft />
              </motion.button>

              <motion.button
                onClick={() => sliderRef.current.slickNext()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight />
              </motion.button>
            </motion.div>
          </motion.div>

          <div className={style.slider__main}>
            <Slider ref={sliderRef} {...settings}>
              {slides.map((slide, index) => (
                <motion.div
                  key={slide.id}
                  className={style.slider__item}
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={slideItemVariants}
                  whileHover="hover"
                >
                  <div className={style.slider__content}>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                    >
                      0{index + 1}
                    </motion.p>

                    <motion.div
                      className={style.slider__img}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
                    >
                      <img src={slide.img} alt={slide.title} />
                    </motion.div>

                    <motion.div
                      className={style.slider__text}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 + 0.4 }}
                    >
                      <h4>{slide.title}</h4>
                      <p>{slide.text}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderList;
