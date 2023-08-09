import React from "react";
import { Link, Outlet } from "react-router-dom";

const People = ({ people }) => {
  return (
    <div className="container-fluid">
      <h2>Meet our Staff</h2>
      <ul className="list-group">
        {people.map((person) => (
          <li className="list-group-item" key={person.id}>
            <Link to={person.id}>{person.fullName}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default People;
