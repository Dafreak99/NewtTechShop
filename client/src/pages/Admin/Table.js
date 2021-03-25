import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { loadData } from "../../store/actions";

class Table extends Component {
  constructor() {
    super();
    this.state = {
      percent: "",
    };
  }

  render() {
    const { content } = this.props;
     
    return (
      <div className="tableheading">
        <tr>
          <th className="firstColumn">Name</th>
          <th className="secondColumn">Price</th>
          <th>Category</th>
          <th>Date</th>
          <th>Disc Price</th>
          <th>Action</th>
        </tr>
        {content.map((each) => (
          <tr>
            <td className="firstColumn">{each.productName}</td>
            <td className="secondColumn">${each.productPrice}</td>
            <td>{each.category}</td>
            <td>{each.date}</td>
            <td>${each.discountPrice}</td>
            <td>
              <a
                onClick={(e) => this.onDelete(e, each._id)}
                className="fa fa-trash"
              />
              <a
                // onClick={(e) => this.onEdit(e, each._id)}
                href={"http://localhost:5000/edit/" + each._id}
                className="fa fa-edit"
              />
              {each.discountPrice === 0 ? (
                <a
                  method="POST"
                  onClick={() => this.onDiscount(each._id)}
                  className="fa fa-percent"
                />
              ) : (
                <a
                  onClick={() => this.onDeDiscount(each._id)}
                  className="fa fa-percent"
                  id="second-icon"
                />
              )}
            </td>
          </tr>
        ))}
      </div>
    );
  }

  async onDelete(e, id) {
    e.preventDefault();
    try {
      let res = await axios.post("/delete", { id });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    this.props.loadData();
  }
  onChange(input) {
    this.setState({
      percent: input,
    });
  }

  onDiscount = async (id) => {
    let input = prompt("Enter the percentage: ");
    this.setState({ discount: !this.state.discount });
    this.onChange(input);

    try {
      let res = await axios.post("/discount", { id, percent: input });
      toast.success(res.data.message);
      this.props.loadData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
    this.props.loadData();
  };

  onDeDiscount = async (id) => {
    try {
      let res = await axios.post("/no-discount", { id });
      toast.success(res.data.message);
      this.props.loadData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
    this.props.loadData();
  };
}

const mapStateToProps = (state) => {
  return {
    content: state.reducer.content,
  };
};

export default connect(
  mapStateToProps,
  { loadData }
)(Table);
// - DELETE, EDIT, DISCOUNT đều phải gọi đến server 5000 để lưu lại vì đó là DB chính k phải this.state
// - Onclick ở line 39 invoke hàm ở line 55. Có promt nên sẽ k chuyển trang liền mà đợi điền promt
// - Promt đó là % cần discount và gán cho state gán lại cho url để backend handle
