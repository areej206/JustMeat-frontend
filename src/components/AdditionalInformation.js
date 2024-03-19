import React, { useEffect } from "react";
import Footer from "./Footer/Footer";
import { useLocation } from "react-router-dom";

const AdditionalInformation = () => {
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
                <div id="privacy-policy-section" className="inner-container">
                    <h1>Privacy Policy</h1>
                    <p>This privacy policy outlines how our company collects, uses, and protects your personal information when you use our services. It also explains your rights and choices regarding your data.</p>
                </div>
                <div id="terms-section" className="inner-container">
                    <h1>Terms & Conditions</h1>
                    <p>Our terms and conditions govern your use of our website and services. By accessing or using our platform, you agree to comply with these terms and conditions.</p>
                </div>
                <div id="return-policy-section" className="inner-container">
                    <h1>Return Policy</h1>
                    <p>Our return policy outlines the process for returning purchased items, including eligibility criteria, return deadlines, and refund or exchange procedures.</p>
                </div>
                <div id="sitemap-section" className="inner-container">
                    <h1>Site Map</h1>
                    <p>Our site map provides an overview of the structure and organization of our website, making it easier for users to navigate and find the information they need.</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AdditionalInformation;
