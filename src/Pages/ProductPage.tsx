import React, { useState, useEffect } from "react";
import { IUsers } from "../models/IUsers";
import { UserService } from "../services/UserService";
import "./Page.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddUserForm from "./AddUserForm";
//interface Props {}
interface IState {
  loading: boolean;
  users: IUsers[];
  errorMsg: string;
}
interface UserType {
    id: number;
    name: string;
    username: string;
    email: string;
  }
  



const ProductPage: React.FC = () => {
  const [state, setState] = useState<IState>({
    loading: false,
    users: [] as IUsers[],
    errorMsg: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
/*
  useEffect(() => {
    setState({ ...state, loading: true });
    UserService.getAllUsers()
      .then((res) => setState({ ...state, loading: false, users: res.data }))
      .catch((err) =>
        setState({ ...state, loading: false, errorMsg: err.message })
      );
  }, []);*/
  useEffect(() => {
    const localUsers = localStorage.getItem("users");
  
    if (localUsers) {
      setState({ ...state, users: JSON.parse(localUsers) });
    } else {
      setState({ ...state, loading: true });
      UserService.getAllUsers()
        .then((res) => {
          const transformedData = res.data.map((user:UserType) => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
          }));
  
          localStorage.setItem("users", JSON.stringify(transformedData));
          setState({ ...state, loading: false, users: transformedData });
        })
        .catch((err) =>
          setState({ ...state, loading: false, errorMsg: err.message })
        );
    }
  }, [state]);
  

  const { loading, users, errorMsg } = state;

  const handleRead = (userId: number) => {
    // Implement read functionality
    console.log(`Read user with ID ${userId}`);
  };

  const handleUpdate = (userId: number) => {
    // Implement update functionality
    console.log(`Update user with ID ${userId}`);
  };

  const handleDelete = (userId: number) => {
    // Implement delete functionality
    console.log(`Delete user with ID ${userId}`);
  };

  const handleAddClick = () => {
    setShowAddForm(true);
    setShowTable(false);
  };
  /*const handleAddSubmit = (newUser: { name: string; username: string; email: string }) => {
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setState({ ...state, users: updatedUsers });
    setShowAddForm(false);
  };*/

  const handleAddSubmit = async (newUser: { id:number; name: string; username: string; email: string }) => {
    try {
      // Fetch the complete user data from the API
      const response = await UserService.getAllUsers();
      const fullUserData = response.data;
  
      // Extract only the needed columns for the new user
      const newUserColumns: IUsers = {
        id: newUser.id, // Provide a default value for id
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: { lat: "0", lng: "0" }
        }, // Provide default values for optional properties
        phone: "",
        website: "",
        company: {
            name: "",
            catchPhrase: "",
            bs: ""
        },
      };
  
      const updatedUsers = [...state.users, newUserColumns];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setState({ ...state, users: updatedUsers });
      setShowAddForm(false);
      setShowTable(true);
    } catch (error) {
      console.error("Error fetching data from API:", error);
      // Handle the error accordingly
    }
  };
  
  



  return (
    <div className="title">
      <h1>Product Details</h1>
      {errorMsg && <p>{errorMsg}</p>}
      {loading && <h2>{loading}</h2>}
      {showTable&&(
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <td>
              <b>ID</b>
            </td>
            <td>
              <b>Name</b>
            </td>
            <td>
              <b>UserName</b>
            </td>
            <td>
              <b>Email</b>
            </td>
            <td>
                <b>Manage</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleRead(user.id)}>Read</button>
                  <button onClick={() => handleUpdate(user.id)}>Update</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>)}
      <button onClick={handleAddClick} style={{ display: showAddForm ? 'none' : 'block' }}>Add</button>
      {showAddForm && <AddUserForm onSubmit={handleAddSubmit} existingUserIds={[]} />}
    </div>
  );
};

export default ProductPage;
