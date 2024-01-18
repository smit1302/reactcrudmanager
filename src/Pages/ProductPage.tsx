import React, { useState, useEffect } from "react";
import { IUsers } from "../models/IUsers";
import { UserService } from "../services/UserService";
import "./Page.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddUserForm from "./AddUserForm";
import ConfirmationModal from "./ConfirmationModal";

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
  const handleUpdateClick = (user: IUsers) => {
    setIsUpdateMode(true);
    setUpdatedUser(user);
    setShowAddForm(true);
    setShowTable(false);
    setShowAddButton(false);
  };
  const [state, setState] = useState<IState>({
    loading: false,
    users: [] as IUsers[],
    errorMsg: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<IUsers | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IUsers | null>(null);
  const [showAddButton, setShowAddButton] = useState(true);
  const [isViewMode, setIsViewMode] = useState(false);

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
          const transformedData = res.data.map((user: UserType) => ({
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
  }, []);

  const { loading, users, errorMsg } = state;
  //Update part
  const handleUpdate = (updatedUser: {
    id: number;
    name: string;
    username: string;
    email: string;
  }) => {
    // Implement update functionality
    console.log(`Update user with ID ${updatedUser.id}`);

    // Find the index of the updated user in the users array
    const updatedIndex = state.users.findIndex(
      (user) => user.id === updatedUser.id
    );

    // If the user is found, update the user in the array
    if (updatedIndex !== -1) {
      const updatedUsers = [...state.users];
      console.log("updated data : " + updatedUser);

      // Get the existing user
      const existingUser = updatedUsers[updatedIndex];

      // Update the existing user with the new data
      const newUser: IUsers = {
        ...existingUser,
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
      };

      updatedUsers[updatedIndex] = newUser;

      // Update local storage with the modified users array
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Update state to reflect the modification
      setState({ ...state, users: updatedUsers });
      setShowTable(true); // Optionally, show the table again after modification
      setShowAddForm(false);
      setShowAddButton(true);
    }
    //API for the Update part
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      body: JSON.stringify({
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  //Delete part
  const handleDeleteClick = (user: IUsers) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
    setShowTable(false);
    setShowAddButton(false);
    console.log("setShowAdd button", setShowAddButton);
    setShowAddForm(false);
  };
  const handleDeleteConfirm = () => {
    if (userToDelete) {
      const updatedUsers = state.users.filter(
        (user) => user.id !== userToDelete.id
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setState({ ...state, users: updatedUsers });
      setShowTable(true);
      setUserToDelete(null);
      setShowDeleteModal(false);
      setShowAddButton(true);
      //API for the delete
      fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "DELETE",
      });
    }
  };

  const handleDeleteCancel = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
    setShowTable(true);
    setShowAddButton(true);
  };
  /*  const handleDelete = (userId: number) => {
    // Implement delete functionality
    const updatedUsers = state.users.filter((user) => user.id !== userId);

    // Update local storage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Update state to reflect the deletion
    setState({ ...state, users: updatedUsers });
    setShowTable(true); // Optionally, show the table again after deletion
  };
*/
  const handleAddClick = () => {
    setShowAddForm(true);
    setShowTable(false);
    setShowAddButton(false);
    setUpdatedUser(null);
  };

  const handleAddSubmit = async (newUser: {
    id: number;
    name: string;
    username: string;
    email: string;
  }) => {
    try {
      // Fetch the complete user data from the API
      const response = await UserService.getAllUsers();
      const fullUserData = response.data;
      //Sending Data to APi
 fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          id: newUser.id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: { lat: "0", lng: "0" },
          }, // Provide default values for optional properties
          phone: "",
          website: "",
          company: {
            name: "",
            catchPhrase: "",
            bs: "",
          },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // Extract only the needed columns for the new user
      const newUserColumns: IUsers = {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: { lat: "0", lng: "0" },
        }, // Provide default values for optional properties
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      };

      const updatedUsers = [...state.users, newUserColumns];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setState({ ...state, users: updatedUsers });
      setShowAddForm(false);
      setShowTable(true);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
    setShowAddButton(true);
  };
  //View Part
  const handleViewClick = (user: IUsers) => {
    setIsUpdateMode(false);
    setUpdatedUser(user);
    setShowAddForm(true);
    setShowTable(false);
    setShowAddButton(false);
    setIsViewMode(true);
    console.log("User id", user);
    //API for the view part
    fetch(`https://jsonplaceholder.typicode.com/posts/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((userData) => {
        // Handle the retrieved data (e.g., update state in a React component)
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  };

  const handleView = () => {
    setIsViewMode(false);
    setUpdatedUser(null);
    setShowAddForm(false);
    setShowTable(true);
    setShowAddButton(true);
  };

  return (
    <div className="title">
      <h1>Product Details</h1>
      {errorMsg && <p>{errorMsg}</p>}
      {loading && <h2>{loading}</h2>}
      {showTable && (
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
                    <button onClick={() => handleUpdateClick(user)}>
                      Update
                    </button>
                    <button onClick={() => handleDeleteClick(user)}>
                      Delete
                    </button>
                    <button onClick={() => handleViewClick(user)}>View</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <button
        onClick={handleAddClick}
        style={{ display: showAddButton ? "block" : "none" }}
      >
        Add
      </button>
      {showAddForm && (
        <AddUserForm
          // onSubmit={isUpdateMode ? handleUpdate : handleAddSubmit}
          onSubmit={
            isUpdateMode
              ? handleUpdate
              : isViewMode
              ? handleView
              : handleAddSubmit
          }
          existingUserIds={state.users.map((user) => user.id)}
          isUpdateMode={isUpdateMode}
          isViewMode={isViewMode}
          updatedUser={updatedUser}
          onResetUpdateMode={() => {
            setIsUpdateMode(false);
            setIsViewMode(false);
          }}
          onClose={handleView}
        />
      )}
      {showDeleteModal && (
        <ConfirmationModal
          title="Confirm!"
          message="Are you sure you want to delete this record?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default ProductPage;
