import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import useFetchData from "../useFetchData";
import './Butcher.css';


const Butcher = () => {


  const { butcherTitle } = useParams();
  const { status, butchers } = useFetchData();
  const [searchField, setSearchField] = useState("");

  // Find the butcher with the matching title
  const butcher = butchers.find((butcher) => butcher.title === butcherTitle);

  if (status !== "fetched" || !butcher) {
    return <p>Loading...</p>;
  }

  // Filter items based on search input
  const filteredItems = Object.entries(butcher.inventory).filter(
    ([group, items]) =>
      group.toLowerCase().includes(searchField.toLowerCase()) ||
      items.some(
        (item) =>
          item.item.toLowerCase().includes(searchField.toLowerCase()) ||
          (item.price > 0 && item.price.toString().includes(searchField))
      )
  );

  return (
    <>
      <div className="container-fluid">
        <h2 className="ButcherHeading">{butcher.title}</h2>

        {/* Search input for filtering content */}
        <input
          className="form-control"
          type="text"
          placeholder="Search ..."
          onChange={(e) => setSearchField(e.target.value)}
        />

        <div className="inner-container">
          {filteredItems.map(([group, items]) => {

            return (
              <div key={group} className="inventory-group">
                <h4 className="CategoryHeading">{group}</h4>

                <div className="group-content">
                  {items.map((item) => (
                    <div key={item.item} className="inventory-item">
                      <div className="item-container">
                        <Link to={`/butchers/${encodeURIComponent(butcher.title)}/product/${encodeURIComponent(item.item)}`}>
                          <p className="item-details">
                            <span className="item-name">{item.item}</span>
                            <span className="price">
                              {item.price > 0 ? `£${item.price}` : ""}
                            </span>
                            <span>
                              <p className="quantity">
                                {item.quantity > 0 ? (
                                  <>
                                    {item.quantity > 0 ? `${item.quantity} in stock` : "Out of Stock"}
                                  </>
                                ) : (
                                  "Out of Stock"
                                )}
                              </p>
                            </span>
                          </p>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Butcher;