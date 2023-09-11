import React, { useState, useContext } from "react";
import "../css/AddData.css";
import UserContext from "../context/userContext";

function AddData({ onAddData }) {
  const { addUserData } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    company: { name: "" },
  });

  const [alertMessage, setAlertMessage] = useState(null);

  // Function to handle the data input of the new user
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parentName, nestedName] = name.split(".");
      setFormData({
        ...formData,
        [parentName]: {
          ...formData[parentName],
          [nestedName]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Define a function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      addUserData(formData); // Call the addUserData function to add the new user data

      // Clear the form
      setFormData({
        name: "",
        username: "",
        email: "",
        address: { street: "", suite: "", city: "" },
        company: { name: "" },
      });

      // Set the alert message and clear it after 2 seconds
      setAlertMessage("User data added successfully!");
      setTimeout(() => {
        setAlertMessage(null);
      }, 2000);
    } catch (error) {
      console.error("Error adding user data:", error);
    }
  };

  // Function to close the AddData window
  const handleClose = () => {
    onAddData();
  };

  return (
    <div className="add-data-container">
      <div className="alert-container">
        {alertMessage && <div className="alert">{alertMessage}</div>}
      </div>
      <div className="header">
        <h1>Add New User Data</h1>
        <button className="close-btn" onClick={handleClose}>
          X
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Street:</label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Suite:</label>
          <input
            type="text"
            name="address.suite"
            value={formData.address.suite}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Company Name:</label>
          <input
            type="text"
            name="company.name"
            value={formData.company.name}
            onChange={handleChange}
          />
        </div>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddData;
