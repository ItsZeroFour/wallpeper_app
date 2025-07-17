import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { motion } from "framer-motion";
import style from "./cards.module.scss";
import iphone from "@assets/images/cards/iPhone.png";
import Item1 from "@assets/images/cards/slider/item-1.svg?react";
import Item2 from "@assets/images/cards/slider/item-2.svg?react";
import Item3 from "@assets/images/cards/slider/item-3.svg?react";
import Item4 from "@assets/images/cards/slider/item-4.svg?react";
import Item5 from "@assets/images/cards/slider/item-5.svg?react";
import Item6 from "@assets/images/cards/slider/item-6.svg?react";
import Item7 from "@assets/images/cards/slider/item-7.svg?react";
import Item8 from "@assets/images/cards/slider/item-8.svg?react";
import Item9 from "@assets/images/cards/slider/item-9.svg?react";
import Item10 from "@assets/images/cards/slider/item-10.svg?react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import X from "@assets/images/cards/x.svg?react";
import Check from "@assets/images/cards/check.svg?react";
import Popup from "../popup/Popup";

const items = [
  {
    img: Item1,
    title: "Keberanian",
    text: "Saya tidak membiarkan rasa takut mengambil keputusan untuk saya",
    translation: {
      title: "Courage",
      text: "I do not let fear make decisions for me",
    },
  },
  {
    img: Item2,
    title: "Kehormatan",
    text: "Saya melakukan hal yang benar, bahkan ketika tidak ada yang melihat",
    translation: {
      title: "Honor",
      text: "I do the right thing, even when no one is watching",
    },
  },
  {
    img: Item3,
    title: "Keteguhan",
    text: "Saya tidak menyimpang dari jalan sampai saya mencapai tujuan saya",
    translation: {
      title: "Determination",
      text: "I do not stray from the path until I reach my goal",
    },
  },
  {
    img: Item4,
    title: "Kesetiaan",
    text: "Saya selalu menjadi pendukung bagi orang-orang yang",
    translation: {
      title: "Loyalty",
      text: "I am always a supporter of those I care about",
    },
  },
  {
    img: Item5,
    title: "Tanggung Jawab",
    text: "Gue pegang janji gue — itu nunjukin kekuatan hati gue",
    translation: {
      title: "Responsibility",
      text: "I keep my promises — that shows the strength of my heart",
    },
  },
  {
    img: Item6,
    title: "Pengendalian Diri",
    text: "Gue bisa ngontrol diri — itu kekuatan gue",
    translation: {
      title: "Self-Control",
      text: "I can control myself — that is my strength",
    },
  },
  {
    img: Item7,
    title: "Kesabaran",
    text: "Perubahan gede butuh waktu dan kesabaran",
    translation: {
      title: "Patience",
      text: "Big changes require time and patience",
    },
  },
  {
    img: Item8,
    title: "Ketekunan",
    text: "Gue tetep jalan terus, walau rasanya perjalanan masih jauh",
    translation: {
      title: "Perseverance",
      text: "I keep going, even if the journey feels long",
    },
  },
  {
    img: Item9,
    title: "Kebaikan Hati",
    text: "Gue ngelakuin hal baik tanpa ngarepin balasan",
    translation: {
      title: "Kindness",
      text: "I do good without expecting anything in return",
    },
  },
  {
    img: Item10,
    title: "Pengembangan Diri",
    text: "Setiap hari gue berusaha jadi lebih baik dari kemarin",
    translation: {
      title: "Self-Improvement",
      text: "Every day I strive to be better than I was yesterday",
    },
  },
];

const Cards: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const isDragging = useRef(false);

  const [activeCards, setActiveCards] = useState<number[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      startX = e.clientX;
      startY = e.clientY;
      isDragging.current = false;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const dx = Math.abs(e.clientX - startX);
      const dy = Math.abs(e.clientY - startY);
      if (dx > 5 || dy > 5) {
        isDragging.current = true;
      }
    };

    const handlePointerUp = () => {
      setTimeout(() => {
        isDragging.current = false;
      }, 0);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const getSelectedIndex = (currentSlideIndex: number): number => {
    return currentSlideIndex % items.length;
  };

  const handleAddCard = useCallback(() => {
    const currentSlideIndex =
      (sliderRef.current?.innerSlider as any)?.state?.currentSlide ?? 0;

    const selectedIndex = getSelectedIndex(currentSlideIndex);

    setActiveCards((prev) => {
      if (!prev.includes(selectedIndex) && prev.length < 3) {
        return [...prev, selectedIndex];
      }
      return prev;
    });

    setSelectedItems((prev) => {
      if (
        !prev.some((text) => text === items[selectedIndex].translation.text) &&
        prev.length < 3
      ) {
        return [...prev, items[selectedIndex].translation.text];
      }
      return prev;
    });

    sliderRef.current?.slickNext();
  }, []);

  const handleRemoveCard = useCallback(() => {
    setActiveCards((prevActive) => {
      if (prevActive.length === 0) return prevActive;

      const updatedActive = [...prevActive];
      const lastRemovedIndex = updatedActive.pop()!;

      setSelectedItems((prevSelected) => {
        const textToRemove = items[lastRemovedIndex].translation.text;
        return prevSelected.filter((text) => text !== textToRemove);
      });

      return updatedActive;
    });
  }, []);

  useEffect(() => {
    if (selectedItems.length === 3) {
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedItems]);

  const settings: Settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 500,
      centerMode: true,
      centerPadding: "0px",
      slidesToShow: 5,
      slidesToScroll: 5,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 660,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }),
    []
  );

  const renderCards = useCallback(() => {
    return items.map((item, index) => {
      const Icon = item.img;
      const isActive = activeCards.includes(index);

      const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging.current) return;

        if (!isActive && activeCards.length < 3) {
          setActiveCards((prev) => [...prev, index]);
          setSelectedItems((prev) => [...prev, item.translation.text]);
        }

        requestAnimationFrame(() => {
          sliderRef.current?.slickGoTo(index);
        });
      };

      return (
        <motion.div
          key={`card-${index}`}
          className={`${style.cards__item} ${isActive ? style.active : ""}`}
          onClick={handleCardClick}
          whileTap={!isActive ? { scale: 0.97 } : {}}
        >
          <div className={style.cards__item__container}>
            <motion.div className={style.cards__item__img}>
              <Icon />
            </motion.div>
            <div className={style.cards__item__text}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </div>
        </motion.div>
      );
    });
  }, [activeCards]);

  return (
    <section className={style.cards}>
      <div className="container">
        <div className={style.cards__wrapper}>
          <h2>Bangun papan keinginanmu</h2>
          <p>
            Tekan ikon + dan pilih 3 gambar yang sesuai dengan nilai-nilaimu.
            Buatlah kolasemu sendiri dan unduh papan keinginan ke smartphonemu
          </p>

          <img src={iphone as unknown as string} alt="iphone" />

          <div className={style.cards__list}>
            <Slider ref={sliderRef} {...settings}>
              {renderCards()}
            </Slider>
          </div>

          <div className={style.cards__panel}>
            <button onClick={handleRemoveCard}>
              <X />
            </button>

            <p>Dipilih: {selectedItems.length}/3</p>

            <button
              onClick={handleAddCard}
              // whileHover={buttonHover as unknown as string}
              // whileTap={buttonTap}
              disabled={selectedItems.length >= 3}
            >
              <Check />
            </button>
          </div>
        </div>
      </div>

      <div onClick={() => setIsPopupOpen(false)}>
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          selectedItems={selectedItems}
        />
      </div>
    </section>
  );
};

export default Cards;
