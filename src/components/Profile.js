// Profile.js
import React from "react";
import useFetchData from "./useFetchData";
import Footer from "./Footer/Footer";
import { Link } from "react-router-dom";

const Profile = () => {
  const { status, users } = useFetchData();

  console.log("Profile status:", status);
  console.log("Profile users:", users);

  if (status === 'fetched') {
    return (
      <>
        <div className="container-fluid">
          <div className="border-container">

            <div className="profile-container">
              {users.map(user => (
                <div key={user.id} className="user-info-section">
                  <img className="user-pfp" src={user.profile_picture} alt="Profile" />
                  <span className="edit-pfp">Edit</span>
                  <div>{user.firstname} {user.lastname}</div>
                  <div>{user.email}</div>
                </div>
              ))}

              <div className="profile-options">
                <Link to="/profile/system-preferences" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="inner-container">
                    <h3>Accessibility Settings</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                </Link>

                <Link to="/profile/account-details" style={{ textDecoration: "none", color: "inherit" }}>

                  <div className="inner-container">
                    <h3>Edit Account Details</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                </Link>

                <Link to="/profile/reviews" style={{ textDecoration: "none", color: "inherit" }}>

                  <div className="inner-container">
                    <h3>View Posted Reviews</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                </Link>

                <Link to="/profile/order-history" style={{ textDecoration: "none", color: "inherit" }}>

                  <div className="inner-container">
                    <h3>View Order History</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                </Link>

              </div>



            </div>
          </div>
        </div >

        <Footer />

      </>

    );
  } else {
    return <div>Loading...</div>; // Handle other status states if needed


  }
};

export default Profile;
