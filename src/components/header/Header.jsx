import React, { useEffect, useState } from "react";
import style from "./header.module.scss";
import { Link } from "react-router-dom";
import logo from "@assets/logo.svg";

const Header = () => {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.header__wrapper}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
