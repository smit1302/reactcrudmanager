import React, { useEffect, useState } from "react";
import { IUsers } from "../models/IUsers";

interface AddUserFormProps {
  existingUserIds: number[];
  onSubmit: (newUser: { id: number; name: string; username: string; email: string }) => void;
  isUpdateMode: boolean;
  isViewMode: boolean;
  updatedUser?: IUsers | null;
  onResetUpdateMode: () => void;
  onClose: () => void;
  
}

const AddUserForm: React.FC<AddUserFormProps> = ({ existingUserIds, onSubmit, isUpdateMode, isViewMode,updatedUser,onResetUpdateMode }) => {
  const [newUser, setNewUser] = useState({
    id: isUpdateMode ? (updatedUser?.id || 0) : 0,
    name: isUpdateMode ? (updatedUser?.name || "") : "",
    username: isUpdateMode ? (updatedUser?.username || "") : "",
    email: isUpdateMode ? (updatedUser?.email || "") : "",
  });
  
  useEffect(() => {
    if ((isUpdateMode ||isViewMode)&& updatedUser) {
      // If in update mode, pre-fill the form with the existing user data
     // setNewUser(updatedUser);
     setNewUser({
      id: updatedUser.id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
    });
    }
    
  }, [isUpdateMode,isViewMode ,updatedUser]);
//It will check whether user added is distinct or not
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!Number.isInteger(newUser.id) || newUser.id <= 0) {
      alert("ID must be a positive integer.");
      return;
    }

    const isExistingId = existingUserIds.includes(newUser.id);

    if (isExistingId && !isUpdateMode && !isViewMode) {
      alert("ID must be unique. Please choose a different ID.");
      return;
    }
    if (isUpdateMode) {
      onResetUpdateMode();
    }
    onSubmit(newUser);
    setNewUser({ id: 0, name: "", username: "", email: "" }); // Reset the form after submission
  };

  return (
    <div>
      <h2>{isUpdateMode ? "Update User" : (isViewMode ? "View User" : "Add New User")}</h2>{/*It Will check whether we are adding a new User or Update */}
      <form onSubmit={handleSubmit}>
        <label>ID:</label>
        <br></br>
        <input
          type="number"
          value={newUser.id}
          onChange={(e) => setNewUser({ ...newUser, id: parseInt(e.target.value, 10) })}
          disabled={isViewMode}
        />
        <br></br>
        <label>Name:</label> <br></br>
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          disabled={isViewMode}
        />
        <br></br>
        <label>Username:</label> <br></br>
        <input
          type="text"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          disabled={isViewMode}
        />
        <br></br>
        <label>Email:</label> <br></br>
        <input
          type="text"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          disabled={isViewMode}
        /><br></br>
        <button type="submit">{isUpdateMode ? "Update" : (isViewMode ? "Close" : "Submit")}</button>
      </form>
    </div>
  );
};

export default AddUserForm;
