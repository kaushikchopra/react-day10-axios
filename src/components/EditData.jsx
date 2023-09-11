import React, { useContext, useState } from "react";
import UserContext from "../context/userContext";
import "../css/EditData.css";

function EditData({ onEditData, selectedUser, onFormSubmit }) {
  const { editUserData } = useContext(UserContext);

  // Initialize state to hold the edited user data
  const [editedUser, setEditedUser] = useState({
    ...selectedUser,
    address: {
      ...selectedUser.address,
    },
    company: {
      ...selectedUser.company,
    },
  });

  // Define a function to handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the editedUser state with the new value
    if (name.includes(".")) {
      const [parentName, nestedName] = name.split(".");
      setEditedUser({
        ...editedUser,
        [parentName]: {
          ...editedUser[parentName],
          [nestedName]: value,
        },
      });
    } else {
      setEditedUser({
        ...editedUser,
        [name]: value,
      });
    }
  };

  // Define a function to handle the form submission
  const handleSave = (e) => {
    e.preventDefault();

    try {
      editUserData(selectedUser.id, editedUser); // Call the editUserData function to update the user data
      onFormSubmit(); 
      onEditData();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Function to close the EditData window
  const handleClose = () => {
    onEditData();
  };

  return (
    <div className="edit-data-container">
      <div className="header">
        <h1>Edit User Data</h1>
        <button className="close-btn" onClick={handleClose}>
          X
        </button>
      </div>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={editedUser.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Street:</label>
          <input
            type="text"
            name="address.street"
            value={editedUser.address.street}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Suite:</label>
          <input
            type="text"
            name="address.suite"
            value={editedUser.address.suite}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="address.city"
            value={editedUser.address.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Company Name:</label>
          <input
            type="text"
            name="company.name"
            value={editedUser.company.name}
            onChange={handleChange}
          />
        </div>
        <button className="save-btn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditData;
