import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Picture from "../images/picture.png";
import axios from "axios";
import { toast } from "react-toastify";
import { loadData } from "../store/actions";
import { connect } from "react-redux";

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: "",
      price: null,
      category: null,
      brand: null,
      specification: null,
      description: null,
      thumbnailImage: null,
      detailImage: null,
      detailImage2: null,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <div className="modall">
        <Button color="primary" size="lg" onClick={this.toggle}>
          {this.props.buttonLabel}Add
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add new product</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handelSubmit}>
              <div className="form-left">
                <FormGroup>
                  <Label for="name">Name: </Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    autoFocus
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price: </Label>
                  <Input
                    type="text"
                    name="price"
                    id="price"
                    autoComplete="off"
                    onChange={(e) => this.setState({ price: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="category">Category: </Label>
                  <Input
                    type="text"
                    name="category"
                    id="category"
                    autoComplete="off"
                    onChange={(e) =>
                      this.setState({ category: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="category">Brand: </Label>
                  <Input
                    type="text"
                    name="brand"
                    id="brand"
                    autoComplete="off"
                    onChange={(e) => this.setState({ brand: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Thumbnail Image: </Label>
                  <Label for="image" className="sub-label">
                    <img src={Picture} />
                    Choose a picture
                  </Label>
                  <Input
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) =>
                      this.setState({ thumbnailImage: e.target.files[0] })
                    }
                  />
                </FormGroup>
              </div>
              {/* ------- end form left------------ */}
              <div className="form-right">
                <FormGroup>
                  <Label for="name">Specification: </Label>
                  <Input
                    type="textarea"
                    name="specification"
                    id="specification"
                    autoComplete="off"
                    autoFocus
                    onChange={(e) =>
                      this.setState({ specification: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="price">Description: </Label>
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    autoComplete="off"
                    col={20}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Detail Image: </Label>
                  <Label for="detailimage" className="sub-label">
                    <img src={Picture} />
                    Choose a picture
                  </Label>
                  <Input
                    type="file"
                    name="detailimage"
                    id="detailimage"
                    onChange={(e) =>
                      this.setState({ detailImage: e.target.files[0] })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="detailimage2" className="sub-label 2">
                    <img src={Picture} />
                    Choose a picture
                  </Label>
                  <Input
                    type="file"
                    name="detailimage2"
                    id="detailimage2"
                    onChange={(e) =>
                      this.setState({ detailImage2: e.target.files[0] })
                    }
                  />
                </FormGroup>
              </div>
              {/* ----------------end form right---------------- */}
              <FormGroup className="addBtn">
                <Button>Submit</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }

  handelSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("name", this.state.name);
    formData.append("price", this.state.price);
    formData.append("category", this.state.category);
    formData.append("specification", this.state.specification);
    formData.append("brand", this.state.brand);
    formData.append("description", this.state.description);

    formData.append("thumnail", this.state.thumbnailImage);
    formData.append("detailImage", this.state.detailImage);
    formData.append("detailImage2", this.state.detailImage2);

    try {
      let res = await axios.post("/add", formData);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.responds.data.message);
      toast.error(error.responds.data.message);
    }
    this.setState({
      modal: false,
      name: "",
      price: null,
      category: null,
      brand: null,
      specification: null,
      description: null,
      thumbnailImage: null,
      detailImage: null,
      detailImage2: null,
    });
    this.props.loadData();
  };
}

export default connect(
  null,
  { loadData }
)(ModalExample);
