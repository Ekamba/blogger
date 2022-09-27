import React from 'react';
import { AiFillGithub, AiFillLinkedin, AiOutlineGlobal } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer__container">
      <div className="footer__copyright">
        <p>© 2022 Copyright: Axel Ekamba</p>
        <div className="links">
          <a
            href="https://www.linkedin.com/in/axel-ekamba/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://github.com/Ekamba"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
          </a>
          <a
            href="https://ekambaportfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineGlobal />
          </a>
          <a
            href="https://www.facebook.com/EkambAcademy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
