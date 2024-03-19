import React from "react";
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link, Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footerin1'>
                <div className='f1'>
                    <img src="JustMeatlogo.png" alt='logo' className='logo' />
                    <p>
                        Just Meat is an application that binds the halal market place onto one platform, making it easier for Muslims all around the world to locate the halal meat markets in their local area.
                    </p>

                    <p>
                        <a href="https://www.google.com/maps?q=123+Cowcaddens+Rd,+Glasgow+G4+0BA,+Scotland" style={{ textDecoration: 'none' }}>
                            <div className="contact-info-footer">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon-footer" />
                                <p className="icon-text-footer">123 Cowcaddens Rd, Glasgow G4 0BA, Scotland</p>
                            </div>
                        </a>


                        <a href="mailto:info@justmeat.com" style={{ textDecoration: 'none' }}>
                            <div className="contact-info-footer">
                                <FontAwesomeIcon icon={faEnvelope} className="contact-icon-footer" />
                                <p className="icon-text-footer">info@justmeat.com</p>
                            </div>
                        </a>

                        <a href="tel:=4420-436-8340" style={{ textDecoration: 'none' }}>
                            <div className="contact-info-footer">
                                <FontAwesomeIcon icon={faPhone} className="contact-icon-footer" />
                                <p className="icon-text-footer">020-436-8340</p>
                            </div>
                        </a>

                    </p>

                </div>
                <div className='f2'>
                    <h3>About Us</h3>

                    <Link to="/about#aboutus-section" className='stylenone'>About us</Link>
                    <Link to="/about#contact-section" className='stylenone'>Contact us</Link>
                    <Link to="/about#team-section" className='stylenone'>About team</Link>
                    <Link to="/about#support-section" className='stylenone'>Customer Support</Link>

                </div>
                <div className='f2'>

                <h3>Our Information</h3>

                    <Link to="/info#privacy-policy-section" className='stylenone'>Privacy policy</Link>
                    <Link to="/info#terms-section" className='stylenone'>Terms & conditions</Link>
                    <Link to="/info#return-policy-section" className='stylenone'>Return Policy</Link>
                    <Link to="/info#sitemap-section" className='stylenone'>Site Map</Link>



                </div>

                <div className='f3'>
                    <h3>Subscribe Now</h3>
                    <p>Subscribe your email for newsletter and featured news based on your interest</p>
                    <div className='inputcontainer'>
                        <span className='icon1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                            </svg>

                        </span>
                        <input type='text' placeholder='Enter your email' />
                        <span className='icon2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>

                        </span>
                    </div>
                </div>
            </div>
            <div className='footerin2'>
                <h3>© Copyright 2023 Fit Grocery, Inc.  All rights reserved</h3>
                {/* <img src="logo192.png" width="10px" height="10px" alt='payimg' /> */}
            </div>
        </div>
    );
};

export default Footer;
