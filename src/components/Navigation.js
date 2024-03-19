import React, { useState } from "react";
import { faFacebook, faInstagram, faLinkedin, faTwitter, faEnvelope, faPhone } from '@fortawesome/free-brands-svg-icons';
import { faCartShopping, faCrosshairs, faEnvelope as faEnvelopeSolid, faPhone as faPhoneSolid, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navigation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <div class="navbar navbar-expand-lg bg-dark n">
        <div class="container">
          <div class="w-100 d-flex justify-content-between">
            <div>
              <a href="mailto:info@justmeat.com" style={{ textDecoration: 'none' }}>
                <FontAwesomeIcon icon={faEnvelopeSolid} className="text-light contact-info contact-icon" />
                <a href="mailto:info@justmeat.com" class="navbar-sm-brand text-light text-decoration-none contact-info">info@justmeat.com</a>
              </a>
              <span class="mx-3 contact-info-spacing">|</span>
              <a href="tel:=4420-436-8340" style={{ textDecoration: 'none' }}>
                <FontAwesomeIcon icon={faPhoneSolid} className="fa-phone contact-info text-light contact-icon" />
                <a href="tel:=4420-436-8340" class="navbar-sm-brand text-white text-decoration-none contact-info ">020-436-8340</a>
              </a>
            </div>
            <div>
              <a href="" class="text-white nav-icon"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="" class="text-white nav-icon"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="" class="text-white nav-icon"><FontAwesomeIcon icon={faLinkedin} /></a>
              <a href="" class="text-white nav-icon"><FontAwesomeIcon icon={faTwitter} /></a>
            </div>
          </div>
        </div>
      </div>

      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container d-flex justify-content-between">

          <div>
            <a href="/" className="nav-item nav-link">
              <img src="JustMeatlogo.png" alt="JustMeat logo" width="240" height="75" className="icon" />
            </a>
          </div>


          {/* <div className="grid-item grid-search">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search butchers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button">
                    Search
                  </button>
                </div>
              </div>
            </div> */}

          <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  {/* <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                  </li> */}
                  <li class="nav-item nav-items">
                    <a class="nav-link nav-links" href="/">Home</a>
                  </li>
                  <li class="nav-item nav-items">
                    <a class="nav-link nav-links" href="/map">Map</a>
                  </li>
                  <li class="nav-item nav-items">
                    <a class="nav-link nav-links" href="/butchers">Butchers</a>
                  </li>
                  <li class="nav-item nav-items">
                    <a class="nav-link nav-links" href="/reviews">Reviews</a>
                  </li>

                  {/* Add authetication  */}
                  <li class="nav-item nav-items">
                    <a class="nav-link nav-links" href="/admin">Management</a>
                  </li>
                  {/* authetication  */}

                  <li class="nav-item">
                    <a href="/profile" className="nav-item nav-link">
                      {/* <img src="profile-icon.svg" alt="Profile" className="icon" /> */}
                  <FontAwesomeIcon icon={faUser} className="icon" style={{ width: '15px', height: '30px', marginRight:'25px' }} />

                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="/basket" className="nav-item nav-link">
                      {/* <img src="cartIcon.svg" alt="Cart" className="icon" /> */}
                  <FontAwesomeIcon icon={faCartShopping} className="icon" style={{ width: '20px', height: '30px' }} />

                    </a>
                  </li>





                  {/* <li className="nav-item">
                    <a href="/basket" className="nav-item nav-link">
                      <span className="nav-cart-icon" style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon icon={faCartShopping} style={{ marginTop:"5px" ,fontSize: "22px" }} />
                      </span>
                    </a>
                  </li> */}
                </ul>

                {/* <div class="position-relative">
                  <a href="" class="text-decoration-none text-dark">
                    <i class="fa-solid fa-magnifying-glass nav-icon"></i>
                  </a>
                  <div class="position-absolute rounded-circle cart">
                    <span>7</span>
                  </div>
                </div> */}

                {/* 
                <span className=" crosshairs-box" style={{ cursor: "pointer" }} >
                    <FontAwesomeIcon className="crosshairs" icon={faCrosshairs} />
                </span> */}

              </div>
            </div>
          </nav>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
