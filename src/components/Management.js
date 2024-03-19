import React from "react";
import Footer from "./Footer/Footer";
import useFetchData from "./useFetchData";
import Butchers from "./StyledButcherList";
import '../Management.css'

const Management = () => {
  const { status, butchers } = useFetchData();
  if (status === 'fetched')
    return (


        <>

        <div className="inner-container">
          {/* <Search butchers={butchers} /> */}

          <Butchers butchers={butchers} />
        </div>
          <Footer />
        </>
  );
};

export default Management;