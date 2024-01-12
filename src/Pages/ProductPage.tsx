import React, { useState, useEffect } from "react";
import { IUsers } from "../models/IUsers";
import { UserService } from "../services/UserService";
import "./Page.css";
import 'bootstrap/dist/css/bootstrap.min.css';
interface Props {}
interface IState {
  loading: boolean;
  users: IUsers[];
  errorMsg: string;
}

const ProductPage: React.FC = () => {
  const [state, setState] = useState<IState>({
    loading: false,
    users: [] as IUsers[],
    errorMsg: "",
  });

  useEffect(() => {
    setState({...state,loading:true})
    UserService.getAllUsers()
      .then((res) => setState({...state,loading:false,users:res.data}))
      .catch(err => setState({...state,loading:false,errorMsg:err.message}));
  }, []);

const {loading,users,errorMsg}=state

  return (
  <div className="title">
    <h1>Product Page</h1>
    {errorMsg && <p>{errorMsg}</p>}
    {loading && <h2>{loading}</h2>}
<table className="table table-bordered table-striped">
    <thead>
        <tr>
            <td><b>ID</b></td>
            <td><b>Name</b></td>
            <td><b>UserName</b></td>
            <td><b>Email</b></td>
            
        </tr>
    </thead>
    <tbody>
        {
            users.length>0 && users.map(user =>(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>


                </tr>
            ))
        }
    </tbody>
</table>

  </div>
  );
};

export default ProductPage;
