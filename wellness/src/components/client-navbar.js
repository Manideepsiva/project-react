import React from "react";
import clientstyle from "../assets/css/style.module.css"
import { Link } from "react-router-dom";

function Clientnav(){
    return (
        <>

<header className={clientstyle['header']} data-header>
      <div className={clientstyle['container']}>

        <a href="#" className={clientstyle['logo']}>
          <img src="log02.svg" width="50" height="46" alt="Doclab home" />
        </a>

        <nav className={clientstyle['navbar']} data-navbar>

          <div className={clientstyle['navbar-top']}>

            <a href="#" className={clientstyle['logo']}>
              <img src="log02.svg" width="50" height="46" alt="Doclab home" />
            </a>

            <button className={clientstyle['nav-close-btn']} aria-label="close menu" data-nav-toggler>
              <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
            </button>

          </div>

          <ul className={clientstyle['navbar-list']}>

            <li className={clientstyle['navbar-item']}>
              <a href="/dashboard" className={`${clientstyle['navbar-link']} ${clientstyle['title-md']}`}>Home</a>
            </li>

            <li className={clientstyle['navbar-item']}>
              <a href="/dashboard/upcomingapplist" className={`${clientstyle['navbar-link']} ${clientstyle['title-md']}`}>Appointments</a>
            </li>

            <li className={clientstyle['navbar-item']}>
              <a href="/services" className={`${clientstyle['navbar-link']} ${clientstyle['title-md']}`}>Services</a>
            </li>

            <li className={clientstyle['navbar-item']}>
              <a href="#" className={`${clientstyle['navbar-link']} ${clientstyle['title-md']}`}><Link to={"/logout"}>logout</Link></a>
            </li>

           
          </ul>

          <ul className={clientstyle['social-list']}>

            <li>
              <a href="#" className={clientstyle['social-link']}>
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className={clientstyle['social-link']}>
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className={clientstyle['social-link']}>
                <ion-icon name="logo-pinterest"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className={clientstyle['social-link']}>
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className={clientstyle['social-link']}>
                <ion-icon name="logo-youtube"></ion-icon>
              </a>
            </li>

          </ul>

        </nav>

        <button className={clientstyle['nav-open-btn']} aria-label="open menu" data-nav-toggler>
          <ion-icon name="menu-outline"></ion-icon>
        </button>

        <div className={clientstyle['overlay']} data-nav-toggler data-overlay></div>

      </div>
    </header>

        </>
    )
}


export default Clientnav;