import React, { useState, useRef, useEffect } from "react";
import style from "./dreams.module.scss";
import Item1 from "@assets/images/dreams/item-1.svg?react";
import Item2 from "@assets/images/dreams/item-2.svg?react";
import Item3 from "@assets/images/dreams/item-3.svg?react";
import Item4 from "@assets/images/dreams/item-4.svg?react";
import Item5 from "@assets/images/dreams/item-5.svg?react";
import Item6 from "@assets/images/dreams/item-6.svg?react";
import Item7 from "@assets/images/dreams/item-7.svg?react";
import Item8 from "@assets/images/dreams/item-8.svg?react";

import { motion, useInView } from "framer-motion";

const Dreams = () => {
  const ref = useRef(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [randomPercent, setRandomPercent] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const marginValue = windowWidth <= 900 ? "-100px" : "-400px";

  const isInView = useInView(ref, {
    once: true,
    margin: marginValue,
  });

  const originalList1 = [
    {
      img: Item1,
      title: "Mobil Impian",
    },
    {
      img: Item2,
      title: "Jalan-jalan Keliling Dunia",
    },
    {
      img: Item3,
      title: "Karier Sukses",
    },
    {
      img: Item4,
      title: "Kebebasan Finansial",
    },
    {
      img: Item5,
      title: "Hidup Damai dan Selaras",
    },
  ];

  const originalList2 = [
    {
      img: Item6,
      title: "Bantu Orang Tua",
    },
    {
      img: Item7,
      title: "Pendidikan Anak",
    },
    {
      img: Item8,
      title: "Rumah Impian",
    },
  ];

  const [list1, setList1] = useState(originalList1);
  const [list2, setList2] = useState(originalList2);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth <= 900) {
      if (list2.length > 0 && list1.length === originalList1.length) {
        const newList2 = [...list2];
        const movedItem = newList2.pop();
        setList2(newList2);
        setList1([...list1, movedItem]);
      }
    } else {
      if (list1.length !== originalList1.length) {
        setList1(originalList1);
        setList2(originalList2);
      }
    }
  }, [windowWidth, list1, list2, originalList1, originalList2]);

  const handleItemClick = (title) => {
    if (selectedItem === title) {
      setSelectedItem(null);
      setRandomPercent(null);
    } else {
      const percent = Math.floor(Math.random() * 21) + 75;
      setSelectedItem(title);
      setRandomPercent(percent);
    }
  };

  // Анимация для элементов списка
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className={style.dreams} ref={ref}>
      <div className="container">
        <div className={style.dreams__wrapper}>
          <motion.div
            className={style.dreams__top}
            // initial={{ opacity: 0, y: 30 }}
            // animate={isInView ? { opacity: 1, y: 0 } : {}}
            // transition={{ duration: 0.6 }}
          >
            <h2>Yuk, pilih mimpi kamu!</h2>
            <p>Lihat berapa banyak yang punya mimpi serupa</p>
          </motion.div>

          <motion.ul className={style.dreams__list}>
            {list1.map(({ img, title }, index) => {
              const Icon = img;
              const isSelected = selectedItem === title;

              return (
                <motion.li
                  key={title}
                  className={`${style.dreams__item} ${
                    isSelected ? style.selected : ""
                  }`}
                  onClick={() => handleItemClick(title)}
                  whileHover={!isSelected ? { scale: 1.05 } : {}}
                  whileTap={!isSelected ? { scale: 0.95 } : {}}
                  // variants={itemVariants}
                  // initial="hidden"
                  // animate={isInView ? "visible" : "hidden"}
                  custom={index}
                >
                  <motion.div
                    className={style.card}
                    animate={{ rotateY: isSelected ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Передняя сторона карточки */}
                    {!isSelected && (
                      <motion.div
                        className={style.card__front}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className={style.card__img}>
                          <Icon />
                        </div>
                        <p>{title}</p>
                      </motion.div>
                    )}

                    {/* Обратная сторона карточки */}
                    {isSelected && (
                      <motion.div
                        className={style.card__back}
                        initial={{ opacity: 0, rotateY: 180 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className={style.percent}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 15,
                            delay: 0.3,
                          }}
                        >
                          <p>{randomPercent}%</p>
                          <p className={style.card__title}>{title}</p>
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ul>

          {list2.length > 0 && (
            <motion.ul className={style.dreams__list}>
              {list2.map(({ img, title }, index) => {
                const Icon = img;
                const isSelected = selectedItem === title;
                const adjustedIndex = index + list1.length; // Смещаем индекс для второй группы

                return (
                  <motion.li
                    key={title}
                    className={`${style.dreams__item} ${
                      isSelected ? style.selected : ""
                    }`}
                    onClick={() => handleItemClick(title)}
                    whileHover={!isSelected ? { scale: 1.05 } : {}}
                    whileTap={!isSelected ? { scale: 0.95 } : {}}
                    // variants={itemVariants}
                    // initial="hidden"
                    // animate={isInView ? "visible" : "hidden"}
                    custom={adjustedIndex}
                  >
                    <motion.div
                      className={style.card}
                      animate={{ rotateY: isSelected ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Передняя сторона карточки */}
                      {!isSelected && (
                        <motion.div
                          className={style.card__front}
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Icon />
                          <p>{title}</p>
                        </motion.div>
                      )}

                      {/* Обратная сторона карточки */}
                      {isSelected && (
                        <motion.div
                          className={style.card__back}
                          initial={{ opacity: 0, rotateY: 180 }}
                          animate={{ opacity: 1, rotateY: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.div
                            className={style.percent}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 15,
                              delay: 0.3,
                            }}
                          >
                            <p>{randomPercent}%</p>
                            <p className={style.card__title}>{title}</p>
                          </motion.div>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dreams;
