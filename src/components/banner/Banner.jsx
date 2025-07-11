import React from "react";
import { Link } from "react-router-dom";
import style from "./banner.module.scss";

const Banner = () => {
  return (
    <div className={style.banner}>
      <div className="container">
        <div className={style.banner__wrapper}>
          <h2>
            Lakukan deposit mulai dari jumlah X <br /> dan ikut serta dalam
            undian berhadiah <br /> <span>$300</span> untuk mewujudkan
            keinginanmu.
          </h2>

          <Link to="/">Lakukan deposit sekarang</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
