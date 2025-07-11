import React from "react";
import style from "./header.module.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.header__wrapper}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>

          <nav>
            <ul>
              <li>
                <Link to="/">The wish card</Link>
              </li>

              <li>
                <Link to="/">About us</Link>
              </li>

              <li>
                <Link to="/">Choose a dream</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
