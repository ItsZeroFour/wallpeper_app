import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "./popup.module.scss";
import ArrowBottom from "../../assets/icons/arrow-bottom.svg?react";
import { Link } from "react-router-dom";
import popupPhone from "../../assets/images/popup_phone.webp";
import { motion, AnimatePresence } from "framer-motion";
import wallpaper from "../../assets/images/wallpaper.png";
import Close from "../../assets/icons/close.svg?react";

/* ANIMATIONS */
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const popupVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const Popup = (React.memo = ({ onClose, selectedItems, isOpen }) => {
  const wrapperRef = useRef();
  const canvasRef = useRef(null);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [wallpaperLoaded, setWallpaperLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        const img = new Image();
        img.src = wallpaper;
        img.onload = () => setWallpaperLoaded(true);

        const phoneImg = new Image();
        phoneImg.src = popupPhone;
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    };

    preloadImages();
  }, []);

  const handleWrapperClick = (e) => {
    e.stopPropagation();
  };

  const wrapText = useCallback((ctx, text, maxWidth) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }, []);

  useEffect(() => {
    if (!wallpaperLoaded || !isOpen) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = wallpaper;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);

      ctx.fillStyle = "white";
      ctx.font = "64px sans-serif";
      ctx.textBaseline = "top";

      const lineHeight = 72;
      const positions = [
        { x: 980, y: 1120 },
        { x: 140, y: 2030 },
        { x: 940, y: 2980 },
      ];

      selectedItems.forEach((text, index) => {
        const { x, y } = positions[index];
        const lines = wrapText(ctx, text, 520);
        lines.forEach((line, i) => {
          ctx.fillText(line, x, y + i * lineHeight);
        });
      });

      setImageLoaded(true);
    };

    image.onerror = () => {
      console.error("Failed to load wallpaper image");
    };
  }, [wallpaperLoaded, isOpen, selectedItems, wrapText]);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const link = document.createElement("a");
      link.download = "wallpaper.png";
      link.href = canvas.toDataURL("image/png", 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={style.popup}
          onClick={onClose}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          transition={{ duration: 0.3 }}
        >
          <div className="container">
            <motion.div
              className={style.popup__wrapper}
              ref={wrapperRef}
              onClick={handleWrapperClick}
              variants={popupVariants}
            >
              <div className={style.popup__close}>
                <button onClick={onClose}>
                  <Close />
                </button>
              </div>
              <div className={style.popup__content}>
                <div className={style.popup__left}>
                  <motion.h2
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                    transition={{ delay: 0.2 }}
                  >
                    Kartu Harapan Sudah Siap!
                  </motion.h2>
                  <motion.p
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                    transition={{ delay: 0.3 }}
                  >
                    Kamu sudah pilih 3 gambar yang cocok sama nilai-nilai kamu.
                    Download kartu harapan ini ke smartphone kamu
                  </motion.p>

                  <motion.div
                    className={style.popup__button}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                    transition={{ delay: 0.4 }}
                  >
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                    <Link to="/">Lakukan deposit sekarang</Link>

                    {imageLoaded ? (
                      <button onClick={handleDownload}>
                        Download Kartu Harapan <ArrowBottom />
                      </button>
                    ) : (
                      <button>Mengunduh sedang dimuat...</button>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  className={style.popup__right}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <img src={popupPhone} loading="eager" alt="wallpaper" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default Popup;
