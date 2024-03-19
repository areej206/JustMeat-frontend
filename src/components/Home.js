import React from "react";
import useFetchData from "./useFetchData";
import BannerSlider from '../components/Banners/BannerSlider'
import Content from "./HomeContent/Content";
import Footer from "./Footer/Footer";

const Home = () => {
  const { status, butchers } = useFetchData();
  if (status === 'fetched')
    return (
      <div>

        <BannerSlider />
        <div className="content-container">

          <Content />
        </div>

        <div className='RegisterBanner'>
          <div className='containerRegister'>
            <div className='content'>

              <h1>
                Stay home & get your daily meat from a butcher of your choice
              </h1>
              <button type="button" class="btn btn-primary">Register Now</button>
            </div>

            <div className='register-container-image'>
              <img src="images/signin1.png" className="signin-img" alt='img3' />
            </div>

          </div>

        </div>


        <div className='AimBanner'>
          <div className='content'>
            <h1>
              Our Aim
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className='content-image'>
            <img src="banner/test.png" className="signin-img" alt='img3' />

          </div>


        </div>


        <Footer />

      </div>

    );
};

export default Home;
