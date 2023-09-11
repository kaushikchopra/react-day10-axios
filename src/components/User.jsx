import React from "react";
import "../css/User.css";

function User({ data }) {
  const { name, username, email, address, company } = data;
  const { suite, street, city } = address;
  return (
    <>
      <div className="user">
        <div className="p-tag">
          <div>Name:</div>
          <div className="name">{name}</div>
        </div>
        <div className="p-tag">
          <div>User Name:</div>
          <div className="email">{username}</div>
        </div>
        <div className="p-tag">
          <div>Email ID:</div>
          <div className="username">{email}</div>
        </div>
        <div className="p-tag">
          <div>Address:</div>
          <div className="address">
            {street}, {suite}, {city}
          </div>
        </div>
        <div className="p-tag">
          <div>Company Name:</div>
          <div className="company-name">{company.name}</div>
        </div>
      </div>
    </>
  );
}

export default User;
