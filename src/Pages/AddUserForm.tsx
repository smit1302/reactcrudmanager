// AddUserForm.tsx
import React, { useState } from "react";

interface AddUserFormProps {
  onSubmit: (newUser: { name: string; username: string; email: string }) => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onSubmit }) => {
  const [newUser, setNewUser] = useState({ name: "", username: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newUser);
  };

  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <label>Username:</label>
        <input
          type="text"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <label>Email:</label>
        <input
          type="text"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserForm;
