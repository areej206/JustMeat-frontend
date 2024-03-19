import React, { useEffect } from 'react';
import Slider from 'react-slick';
import './BannerSlider.css';

const BannerSlider = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            const currentSlide = document.querySelector('.carousel-item.active');
            if (!currentSlide) return;
            const currentIndex = currentSlide.getAttribute('data-bs-slide-to');
            const nextIndex = (parseInt(currentIndex) + 1) % 3;
            const nextButton = document.querySelector(`button[data-bs-slide-to="${nextIndex}"]`);
            if (!nextButton) return;
            nextButton.click();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active banner-carousel-item">
                    <div className="container d-flex justify-content-between background">
                        <div className="d-flex justify-content-center align-items-start flex-column ms-5">
                            <section className='hero'>
                                <h2></h2>

                                <div className="hero-content">
                                    <div className="hero-content">
                                        <span className="description">
                                            100% Halal Certified Meat
                                        </span>
                                        <span className="text-success title mb-3">
                                            Bridging gaps between you and your local Halal Market
                                        </span>
                                        <span className="d-info">
                                            JustMeat revolutionizes the meat-buying experience by seamlessly connecting consumers
                                            with their local halal butchers through an intuitive online platform, fostering
                                            convenience and community engagement.
                                        </span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>


                <div className="carousel-item banner-carousel-item">
    <div className="container d-flex justify-content-between background">
        <div className="d-flex justify-content-center align-items-start flex-column ms-5">
            <section className='bannerMap'>
                <h2></h2>

                <div className="bannerMap-content">
                    <div className="bannerMap-content">
                        <span className="description">
                            Locate Nearby Butchers or Enter Any Address
                        </span>
                        <span className="text-success title mb-3">
                            Try Our Map Feature
                        </span>
                        <span className="d-info">
                            Whether you're on the go or settling into a new neighborhood, JustMeat leverages your
                            current location or lets you choose any destination, ensuring you always find the freshest
                            halal cuts nearby.

                        </span>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>

<div className="carousel-item banner-carousel-item">
    <div className="container d-flex justify-content-between background">
        <div className="d-flex justify-content-center align-items-start flex-column ms-5">
            <section className='bannerInventory'>
                <h2></h2>

                <div className="bannerInventory-content">
                    <div className="bannerInventory-content">
                        <span className="description">
                            Locate Nearby Butchers or Enter Any Address
                        </span>
                        <span className="text-success title mb-3">
                            Try Our Map Feature
                        </span>
                        <span className="d-info">
                            Whether you're on the go or settling into a new neighborhood, JustMeat leverages your
                            current location or lets you choose any destination, ensuring you always find the freshest
                            halal cuts nearby.

                        </span>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon bg-success" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon bg-success" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default BannerSlider;

