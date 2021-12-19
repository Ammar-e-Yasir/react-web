import React, { useContext } from "react";
import {
  Link
} from "react-router-dom";
import { GlobalContext } from "../context/context";
import Logout from "./logout";

export default function Nav() {
  const { state } = useContext(GlobalContext);









  return (
    <div>

     
      {state.authUser?.role == 'admin' ?
        <>


          <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2 text-center">
            <Link to='/' className="navbar-brand border px-4 rounded">Dashboard</Link>
            <button className="navbar-toggler shadow-none" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon "></span>
            </button>

            <div className="collapse navbar-collapse " id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item" >
                  <Link to='/' className="nav-link active ">Add Dish</Link>
                </li>
                <li className="nav-item ">
                  <Link to='/pending-orders' className="nav-link">Orders Pending</Link>
                </li>
                <li className="nav-item ">
                  <Link to='/accepted-orders' className="nav-link">Orders Accepted</Link>
                </li>
                <li className="nav-item ">
                  <Link to='/delivered-orders' className="nav-link">Orders Delivered</Link>
                </li>
                <Logout />
              </ul>
            </div>

          </nav>
        </> : null
      }
    </div>

  )











}