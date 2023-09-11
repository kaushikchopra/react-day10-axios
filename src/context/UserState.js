import UserContext from "./userContext";
import { useEffect, useState } from 'react';
import axios from "axios";

const UserState = ({ children }) => {
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isError, setIsError] = useState("");
    // Adding a new state to maintain the newly added User Data
    const [newUserData, setNewUserData] = useState(null);
    

    // Function to fetch user data from the API
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            setUserData(response.data); // Fetch and store user data from the API
        } catch (error) {
            setIsError(error.message);
        }
    };

    // Add a new User Data
    const addUserData = async (user) => {
        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/users", user);
            setUserData([...userData, response.data]);

            setNewUserData(response.data); // New User Data is added via POST
        } catch (error) {
            setIsError(error.message);
        }
    };

    // Edit a specific User Data
    const editUserData = async (userId, updatedUserData) => {
        try {
            if (newUserData && newUserData.id === userId) {
                // If the user to edit is the newly added data, update it in the local state
                setNewUserData(updatedUserData);
                setSelectedUser(updatedUserData);  // Update the selectedUser state with the edited data
                setUserData(userData.map(user => (user.id === userId ? updatedUserData : user)));
            } else {
                const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, updatedUserData);

                setSelectedUser({ ...selectedUser, ...response.data });
                // Update the userData state using map
                setUserData(userData.map(user => (user.id === userId ? { ...user, ...response.data } : user)));
            }
        } catch (error) {
            throw new Error("Error updating user data: " + error.message);
        }
    };

    // Delete a specific User Data
    const deleteUserData = async (userId) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
            
            // Update the userData state by removing the deleted user
            setUserData(userData.filter(user => user.id !== userId));
        } catch (error) {
            throw new Error("Error deleting user data: " + error.message);
        }
    };

    return (
        <UserContext.Provider value={{ userData, selectedUser, setSelectedUser, isError, addUserData, editUserData, deleteUserData }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState;
