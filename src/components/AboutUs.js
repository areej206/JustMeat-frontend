
import React, { useEffect } from "react";
import Footer from "./Footer/Footer";
import { useLocation } from "react-router-dom";

const About = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const targetSection = document.getElementById(location.hash.substr(1));
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return (
        <>
            <div className="container-fluid">
                <div className="inner-container">
                    <p id="aboutus-section">
                        <h1>About Us</h1>
                        <p>
                            Welcome to JustMeat, your ultimate destination for halal meat shopping convenience! At JustMeat, we've crafted a platform that lets you order from multiple halal butchers at the tap of a button. Our focus on real-time inventory and seamless ordering ensures that your meat shopping experience is nothing short of exceptional.
                        </p>
                        <p>
                            Explore our platform to discover a wide range of halal meat options, sourced from trusted butchers across the region. Whether you're looking for premium cuts or specialty items, JustMeat has you covered. Our user-friendly interface and intuitive navigation make it easy to find exactly what you need, while our commitment to quality ensures that every order meets your expectations.

                        </p>
                        <p>
                            At JustMeat, we believe in transparency and trust. That's why we provide detailed information about each butcher, including their location, opening times, and customer reviews. We want you to feel confident in your choices and satisfied with every purchase.

                        </p>
                        <p>
                            Join the JustMeat community today and experience the future of halal meat shopping. Your satisfaction is our priority, and we're dedicated to delivering an unparalleled shopping experience, one order at a time.

                        </p>
                    </p>
                    <p id="contact-section">
                        <h1>Contact Us</h1>
                        <p>
                            Got a question, comment, or feedback? We'd love to hear from you! Our friendly and knowledgeable customer support team is here to assist you with anything you need. Whether you have inquiries about our platform, need help placing an order, or want to share your thoughts with us, we're just a click or call away.

                        </p>
                        <p>
                            You can reach us via email at info@justmeat.com or give us a call at 020-436-8340. We're available to help you seven days a week, so don't hesitate to get in touch. Your satisfaction is our priority, and we're committed to providing you with the best possible service.

                        </p>

                        <p id="team-section">
                            <h1>About Team</h1>
                            <p>
                                Meet the dedicated individuals who make JustMeat possible. Our team is comprised of experts in web development, user experience design, and customer service, all united by a common goal: to redefine the halal meat shopping experience.
                            </p>
                            <p>
                                From designing seamless user interfaces to ensuring the quality and reliability of our platform, each member of our team plays a vital role in delivering excellence to our customers. We're passionate about what we do and committed to continuously improving and innovating to better serve you.

                            </p>
                            <p>
                                At JustMeat, we value collaboration, integrity, and customer satisfaction above all else. We're here to make your halal meat shopping experience enjoyable and hassle-free, and we'll stop at nothing to ensure that you're completely satisfied with every aspect of our platform.

                            </p>

                        </p>
                    </p>
                    <p id="support-section">
                        <h1>Customer Support</h1>
                        <p>
                            At JustMeat, we're dedicated to providing you with exceptional customer support every step of the way. Whether you have questions, concerns, or need assistance, our team is here to help.

                        </p>
                        <p>
                            Our customer support representatives are available to assist you via email, phone, or live chat, whichever method you prefer. We'll work tirelessly to resolve any issues you may encounter and ensure that your experience with JustMeat is nothing short of outstanding.

                        </p>
                        <p>
                            Your satisfaction is our top priority, and we're committed to going above and beyond to exceed your expectations. Don't hesitate to reach out to us with any questions or feedback – we're here to help make your JustMeat experience as seamless and enjoyable as possible.



                        </p>

                    </p>
                </div>
            </div>
            <Footer />

        </>
    );
};

export default About;
