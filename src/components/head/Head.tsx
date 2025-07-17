import React from "react";
import style from "./head.module.scss";
import { Link } from "react-router-dom";
import person from "@assets/images/head/person.png";

const Head: React.FC = () => {
  return (
    <section className={style.head}>
      <div className="container">
        <div className={style.head__wrapper}>
          <div className={style.head__left}>
            <h1>Ciptakanlah mimpi bersama Stockity</h1>
            <p>
              Lakukan deposit mulai dari jumlah X dan ikut serta dalam undian
              berhadiah $300 untuk mewujudkan keinginanmu
            </p>
            <div>
              <Link to="/" style={{ display: "inline-block" }}>
                Ambil kesempatan
              </Link>
            </div>
          </div>

          <div className={style.head__right}>
            <img src={person as unknown as string} alt="person" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Head;
