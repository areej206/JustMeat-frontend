import React, { useEffect, useState, useCallback } from "react";

export default function StaffPage() {
  const [orders, setOrders] = useState([
    { name: "", table: "", foodOrder: [""] },
  ]);

  const fetchData = useCallback(() => {
    const settings = {
      method: "GET",
      // headers: {
      //   Authorization: token,
      // },
    };
    const url = "http://localhost:3001/viewOrders";
    fetch(url, settings)
      .then((response) => response.json())
      .then((incomingData) => {
        console.log(incomingData);
        let customerOrder = [{ name: "", table: "", foodOrder: [] }];
        let formattedData = incomingData.map((item, index) => {
          let name = item.order[0];
          let table = item.order[1];
          let foodOrder = item.order.slice(2, item.order.length);
          customerOrder[index] = { name, table, foodOrder };
        });
        setOrders(customerOrder);
       
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container-fluid">
      <h1 className="headingStyleLeft">Staff Dashboard</h1>
      <div>
        <h2 className="headingStyleLeft">Current Orders</h2>
        {orders.map((item) => (
          <>
            <h3 className="headingStyleLeft">
              Table number: {item.table} Customer name: {item.name}
            </h3>
            <ul className="list-group">
              {item.foodOrder.map((element) => (
                <div className="headingStyleLeft">
                  <li className="list-group-item">{element}</li>
                </div>
              ))}
            </ul>
          </>
        ))}
      </div>
    </div>
  );
}
