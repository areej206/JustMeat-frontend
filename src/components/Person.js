import React from "react";
import { useParams } from "react-router-dom";

const Person = ({ people }) => {
  const { personId } = useParams();
  const currentItem = people.filter((entry) => {
    return entry.id === personId;
  });
  const { fullName, bio } = currentItem[0];
  return (
    <>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-8">
          <div className="row" style={{ paddingTop: "1%" }}>
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src="/user-circle.svg"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 className="my-3">{fullName}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{fullName}</p>
                  </div>

                  <hr />
                  <p className="mb-0">Biography</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Person;
