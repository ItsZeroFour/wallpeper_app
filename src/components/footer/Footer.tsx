import React from "react";
import style from "./footer.module.scss";
import Logo from "@assets/logo-2.svg?react";
import { Link } from "react-router-dom";
import telegram from "@assets/icons/telegram.png";
import instagram from "@assets/icons/instagram.png";

const Footer: React.FC = () => {
  return (
    <section className={style.footer}>
      <div className="container">
        <div className={style.footer__wrapper}>
          <div className={style.footer__left}>
            <Link to="/">
              <Logo />
            </Link>

            <ul>
              <li>
                <Link to="/">
                  <img src={telegram as unknown as string} alt="telegram" />
                </Link>
              </li>

              <li>
                <Link to="/">
                  <img src={instagram as unknown as string} alt="instagram" />
                </Link>
              </li>
            </ul>

            <Link to="/">Privacy Policy</Link>
          </div>
          <div className={style.footer__nav}>
            <nav>
              <ul>
                <li>
                  <Link to="/">About us</Link>
                </li>

                <li>
                  <Link to="/">The wish card</Link>
                </li>

                <li>
                  <Link to="/">Choose a dream</Link>
                </li>

                <li>
                  <Link to="/">Rules</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={style.footer__contacts}>
            <h4>Kontak</h4>
            <Link to="mailto:support@stockity.id">support@stockity.id</Link>
            <Link to="https://maps.app.goo.gl/KWKVuVGMMoYDbiWQ9">
              Appletree Ltd. Trust Company Complex, Ajeltake Road, Ajeltake
              Island, Majuro, Marshall Islands, MH96960
            </Link>
          </div>
          <div className={style.footer__right}>
            <ul>
              <li>
                <Link to="/">
                  <img src={telegram as unknown as string} alt="telegram" />
                </Link>
              </li>

              <li>
                <Link to="/">
                  <img src={instagram as unknown as string} alt="instagram" />
                </Link>
              </li>
            </ul>

            <Link to="/">Privacy Policy</Link>

            <p>© {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
