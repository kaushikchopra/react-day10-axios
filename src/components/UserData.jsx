import React, { useContext, useRef, useState } from "react";
import "../css/UserData.css";

import User from "./User";
import UserContext from "../context/userContext";
import AddData from "./AddData";
import EditData from "./EditData";

function UserData() {
  const { userData, selectedUser, setSelectedUser, isError, deleteUserData } =
    useContext(UserContext);

  const [isAddingData, setIsAddingData] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const topRef = useRef();

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  // Function to toggle the visibility of AddData
  const toggleAddData = () => {
    setIsAddingData(!isAddingData);
  };

  // Function to toggle the visibility of EditData
  const toggleEditData = () => {
    if (selectedUser) {
      setIsEditing(!isEditing);
    }
  };

  // Function to toggle the visibility of Delete Buttons
  const toggleDeleteButtons = () => {
    setShowDeleteButtons(!showDeleteButtons);
  };

  // Callback function to handle form submission in EditData
  const handleEditFormSubmit = () => {
    setShowAlert(true); // Show the alert
    setTimeout(() => {
      setShowAlert(false); // Hide the alert after a certain time (e.g., 2 seconds)
    }, 2000);
  };

  // Function to handle user deletion
  const handleDeleteUser = async (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );
    if (confirmDelete) {
      try {
        await deleteUserData(user.id);
        setSelectedUser("User has been deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div ref={topRef}></div>
        {isEditing ? (
          <EditData
            onEditData={() => setIsEditing(false)}
            selectedUser={selectedUser}
            onFormSubmit={handleEditFormSubmit}
          />
        ) : (
          <>
            {isAddingData ? (
              <AddData onAddData={() => setIsAddingData(false)} />
            ) : (
              <>
                <div className="user-data">
                  {selectedUser ? (
                    <>
                      <div className="alert-container">
                        {showAlert && (
                          <div className="alert">
                            User data has been updated successfully!
                          </div>
                        )}
                      </div>
                      {selectedUser ===
                      "User has been deleted successfully!" ? (
                        <p className="user-message">{selectedUser}</p>
                      ) : (
                        <User data={selectedUser} />
                      )}
                    </>
                  ) : (
                    <p>Please select a user to display their data.</p>
                  )}
                </div>
                {isError !== "" && <h2 className="error">{isError}</h2>}
                <div className="button-div">
                  <button onClick={toggleAddData} className="btn" type="button">
                    Add Data
                  </button>
                  <button
                    onClick={toggleEditData}
                    className="btn"
                    type="button"
                    disabled={!selectedUser}
                  >
                    Edit Data
                  </button>
                  <button
                    onClick={toggleDeleteButtons}
                    className="btn"
                    type="button"
                  >
                    Delete Data
                  </button>
                </div>
                <hr className="hr-line" />
                <h1>User Data</h1>
                <div className="user-name">
                  <ul>
                    {userData.map((user) => {
                      const { id, name } = user;
                      return (
                        <li
                          onClick={() => {
                            handleUserClick(user);
                            // Scroll to the top when a user name is clicked
                            // for smaller window screen
                            if (window.innerWidth <= 768) {
                              topRef.current.scrollIntoView({
                                behavior: "smooth",
                              });
                            }
                          }}
                          key={id}
                        >
                          {name}
                          {showDeleteButtons && (
                            <button
                              className="delete-button"
                              onClick={() => handleDeleteUser(user)}
                            >
                              X
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default UserData;
