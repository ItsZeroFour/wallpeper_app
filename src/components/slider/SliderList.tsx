import React, { useEffect, useRef, useState } from "react";
import style from "./slider.module.scss";
import ArrowLeft from "@assets/icons/arrow-left.svg?react";
import ArrowRight from "@assets/icons/arrow-right.svg?react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "@assets/images/slider/image-1.webp";
import img2 from "@assets/images/slider/image-2.webp";
import img3 from "@assets/images/slider/image-3.webp";
import img4 from "@assets/images/slider/image-4.webp";
import { motion, useInView } from "framer-motion";

interface Slide {
  id: number;
  img: string;
  title: string;
  text: string;
}

const SliderList: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const marginValue = windowWidth <= 900 ? "-50px" : "-400px";

  const isInView = useInView(sectionRef, {
    once: true,
    margin: marginValue,
  });

  const settings: React.ComponentProps<typeof Slider> = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    centerMode: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
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

  const slides: Slide[] = [
    { id: 1, img: img1 as unknown as string, title: "Global", text: "..." },
    { id: 2, img: img2 as unknown as string, title: "Simpel", text: "..." },
    { id: 3, img: img3 as unknown as string, title: "Fleksibel", text: "..." },
    { id: 4, img: img4 as unknown as string, title: "Minimal Trade $1", text: "..." },
  ];

  return (
    <section className={style.slider} ref={sectionRef}>
      <div className="container">
        <div className={style.slider__wrapper}>
          <motion.div
            className={style.slider__top}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2>Stockity, jalan aman buat ngejar mimpi kamu</h2>

            <div className={style.slider__nav}>
              <motion.button
                onClick={() => sliderRef.current?.slickPrev()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft />
              </motion.button>

              <motion.button
                onClick={() => sliderRef.current?.slickNext()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight />
              </motion.button>
            </div>
          </motion.div>

          <div className={style.slider__main}>
            <Slider ref={sliderRef} {...settings}>
              {slides.map((slide, index) => (
                <motion.div
                  key={slide.id}
                  className={style.slider__item}
                  custom={index}
                  whileTap={{ scale: 0.97 }}
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
                      <img src={slide.img} loading="lazy" alt={slide.title} />
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
