import React from "react";
import style from "./header.module.scss";
import { Link } from "react-router-dom";
import Logo from "@assets/logo.svg?react";

const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.header__wrapper}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
