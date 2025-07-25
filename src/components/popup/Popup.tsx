import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "./popup.module.scss";
import ArrowBottom from "@assets/icons/arrow-bottom.svg?react";
import { Link } from "react-router-dom";
import popupPhone from "@assets/images/popup_phone.webp";
import { motion, AnimatePresence } from "framer-motion";
import wallpaper from "@assets/images/wallpaper.png";
import Close from "@assets/icons/close.svg?react";

/* TYPES */
interface PopupProps {
  onClose: () => void;
  selectedItems: string[];
  isOpen: boolean;
}

type WrapTextFn = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
) => string[];

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

const Popup: React.FC<PopupProps> = React.memo(
  ({ onClose, selectedItems, isOpen }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [wallpaperLoaded, setWallpaperLoaded] = useState<boolean>(false);

    useEffect(() => {
      const preloadImages = async () => {
        try {
          const img = new Image();
          img.src = wallpaper as unknown as string;
          img.onload = () => setWallpaperLoaded(true);

          const phoneImg = new Image();
          phoneImg.src = popupPhone as unknown as string;
        } catch (error) {
          console.error("Error preloading images:", error);
        }
      };

      preloadImages();
    }, []);

    const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
    };

    const wrapText: WrapTextFn = useCallback((ctx, text, maxWidth) => {
      const words = text.split(" ");
      const lines: string[] = [];
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
      if (!wallpaperLoaded || !isOpen || !selectedItems?.length) return;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const image = new Image();
      image.onload = () => {
        try {
          canvas.width = image.width;
          canvas.height = image.height;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.drawImage(image, 0, 0);

          ctx.fillStyle = "white";
          ctx.font = "26px 'Arial', sans-serif";
          ctx.textBaseline = "top";

          const lineHeight = 36;
          const positions = [
            { x: 495, y: 562 },
            { x: 65, y: 1030 },
            { x: 500, y: 1480 },
          ];

          if (selectedItems.length > positions.length) {
            console.warn("Too many items, only first 3 will be rendered");
          }

          selectedItems.slice(0, 3).forEach((text, index) => {
            if (!text) return;

            const { x, y } = positions[index];
            const lines = wrapText(ctx, text, 280);

            lines.forEach((line, i) => {
              ctx.fillText(line, x, y + i * lineHeight);
            });
          });

          setImageLoaded(true);
        } catch (error) {
          console.error("Error drawing on canvas:", error);
          setImageLoaded(false);
        }
      };

      image.onerror = () => {
        console.error("Failed to load wallpaper image");
        setImageLoaded(false);
      };

      image.src = wallpaper as unknown as string;
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
            variants={backdropVariants}
            transition={{ duration: 0.3 }}
          >
            <div className="container">
              <div
                className={style.popup__wrapper}
                ref={wrapperRef}
                onClick={handleWrapperClick}
              >
                <div className={style.popup__close}>
                  <button onClick={onClose}>
                    <Close />
                  </button>
                </div>
                <div className={style.popup__content}>
                  <div className={style.popup__left}>
                    <div className={style.popup__left__text}>
                      <motion.h2
                        variants={contentVariants}
                        transition={{ delay: 0.2 }}
                      >
                        Kartu Harapan Sudah Siap!
                      </motion.h2>
                      <motion.p
                        variants={contentVariants}
                        transition={{ delay: 0.3 }}
                      >
                        Kamu sudah pilih 3 gambar yang cocok sama nilai-nilai
                        kamu. Download kartu harapan ini ke smartphone kamu
                      </motion.p>
                    </div>

                    <motion.div
                      className={style.popup__button}
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

                  <div className={style.popup__right}>
                    <img
                      src={popupPhone as unknown as string}
                      loading="eager"
                      alt="wallpaper"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export default Popup;
