import React, { Component } from "react";
import Top from "./Top";
import "./Admin.css";
import DataTable from "./DataTable";

export default class Admin extends Component {
  render() {
    return (
      <div className="adminpage">
        <Top />
        <DataTable />
      </div>
    );
  }
}
