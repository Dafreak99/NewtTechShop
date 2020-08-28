import React, { Component } from "react";
import { Label, Input } from "reactstrap";
import Modal from "../../components/Modal";

export default class Top extends Component {
  render() {
    return (
      <div className="admintop">
        <Modal />
        <div className="search2">
          <Label>Search: </Label>
          <Input />
        </div>
      </div>
    );
  }
}
