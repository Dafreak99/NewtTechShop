import React, { Component, Suspense, lazy } from "react";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadData, loadCart } from "./store/actions/index";
import { connect } from "react-redux";

import setAuthToken from "./utils/AuthorizationHeader";

toast.configure();

const CommonContent = lazy(() => import("./pages/CommonContent.js"));
const Home = lazy(() => import("./pages/Home/HomePage"));
const Admin = lazy(() => import("./pages/Admin/AdminPage"));
const Search = lazy(() => import("./components/Search"));
const SignIn = lazy(() => import("./pages/SignIn&SignUp/SignIn"));
const SignUp = lazy(() => import("./pages/SignIn&SignUp/SignUp"));
const CartPage = lazy(() => import("./pages/Cart/CartPage"));
const DetailPage = lazy(() => import("./pages/Detail/DetailPage"));
const ContactPage = lazy(() => import("./pages/Contact/ContactPage"));
const AboutPage = lazy(() => import("./pages/About/AboutPage"));
const ErrorPage = lazy(() => import("./pages/Error/ErrorPage"));

const auth = {
  authentication: true,
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={() =>
      auth.authentication ? <Component /> : <Redirect to="/signin" />
    }
  />
);

class App extends Component {
  render() {
    let Adminn = () => <Admin />;
    return (
      <div className="App">
        <Suspense fallback={<div class="spinner" />}>
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route
              path="/signin"
              exact
              render={() => <SignIn signIn={this.signIn} />}
            />
            <Route
              path="/laptop"
              exact
              render={() => <CommonContent category="laptop" />}
            />
            <Route
              path="/phone"
              exact
              render={() => <CommonContent category="phone" />}
            />
            <Route
              path="/tablet"
              exact
              render={() => <CommonContent category="tablet" />}
            />
            <Route
              path="/others"
              exact
              render={() => <CommonContent category="others" />}
            />
            <Route
              path="/search=:key"
              render={(props) => <Search {...props} />}
            />
            <Route path="/cart" render={() => <CartPage />} />
            <PrivateRoute path="/admin" exact component={Adminn} />
            <Route path="/signup" exact component={SignUp} />
            <Route
              path="/detail=:id"
              exact
              render={(props) => <DetailPage {...props} />}
            />
            <Route path="/contact" exact render={() => <ContactPage />} />
            <Route path="/about" exact render={() => <AboutPage />} />

            <Route component={ErrorPage} />
          </Switch>
        </Suspense>
      </div>
    );
  }

  spinnerAnimation() {
    // Spinner Animation
    document.getElementById("root").classList.add("spinner");
    document.querySelector(".App").style.display = "none";
    setTimeout(() => {
      document.getElementById("root").classList.remove("spinner");
      document.querySelector(".App").style.display = "block";
    }, 1000);
  }

  async componentDidMount() {
    // Reset token after page refresh
    if (localStorage.authToken) {
      setAuthToken(localStorage.authToken);
    }

    this.spinnerAnimation();
    this.props.loadData();
    this.props.loadCart();
  }
}

export default withRouter(
  connect(
    null,
    { loadData, loadCart }
  )(App)
);
// IF SOME THING WRONG WITH THIS CHECK THE VERSION OF REDUX. recommend 6.00

// - exact là để cụ thể đường dẫn cần đi vào tránh trường hợp server bị confused
// - Các route cùng dùng chung 1 component đc gọi là Commoncontent
// - Category viết hoa là không bắt buộc nhưng vì ban đầu lỡ viết css .class có hoa nên đành ấy theo
// - Truyền category làm căn cứ logic cho Contentwrapper render đúng loại product
// - Line 49 là cách để lấy params ngẫu nghiên khi search. Ở phần kia của Search ta gọi this.props.match.params.key

// let a = "content lenovo m3";

// let b = a.split(" "); -> ['content', 'lenovo', 'm3']
// b.shift(); -> ['lenovo', 'm3']
// console.log(b.join(" ")); -> 'lenovo m3'

// PrivateRoute ở line 26 chiết xuất ra component và path
