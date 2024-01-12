import React, { useState } from "react";

interface AddUserFormProps {
    existingUserIds: number[];
  onSubmit: (newUser: { id: number; name: string; username: string; email: string }) => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ existingUserIds, onSubmit }) => {
  const [newUser, setNewUser] = useState({ id: 0,name: "", username: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!Number.isInteger(newUser.id) || newUser.id <= 0) {
        alert("ID must be a positive integer.");
        return;
      }
      //const isExistingId = state.users.some((user: { id: number; }) => user.id === newUser.id);
      const isExistingId = existingUserIds.includes(newUser.id);
  
      if (isExistingId) {
        alert("ID must be unique. Please choose a different ID.");
        return;
      }
    onSubmit(newUser);
    setNewUser({ id: 0, name: "", username: "", email: "" }); // Reset the form after submission
  };

  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
      <label>ID:</label><br></br>
        <input
          type="number"
          value={newUser.id}
          onChange={(e) => setNewUser({ ...newUser, id: parseInt(e.target.value, 10) })}
        /><br></br>
        <label>Name:</label> <br></br>
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        /><br></br>
        <label>Username:</label> <br></br>
        <input
          type="text"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        /><br></br>
        <label>Email:</label> <br></br>
        <input
          type="text"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        /> <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserForm;
