import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import PrivateRoute from "./PrivetRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "../App.css";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";

function LoginPage(props) {
  const [showpass, setshowpass] = useState("password");
  const [showhide, setshowhide] = useState("show");
  const [information, setInformation] = useState({
    name: "",
    password: "",
  });
  const [conVal, setconVal] = useState(false);
  const showHide = (e) => {
    showpass === "password" ? setshowpass("text") : setshowpass("password");
    e.preventDefault();
    showhide === "show" ? setshowhide("hide") : setshowhide("show");
  };
  const handleChange = (e) => {
    setInformation({ ...information, [e.target.name]: e.target.value });
  };
  const logVerif = () => {
    let x = 0;
    props.user.map((element) => {
      return (
        element.name === information.name &&
        element.password === information.password &&
        x++
      );
    });
    x > 0 ? setconVal(true) : alert("wrong username or password");
  };
  return (
    <div
      className="container-fluid row"
      style={{ padding: "100px", display: "flex", justifyContent: "center" }}
    >
      <Route
        exact
        path="/"
        render={() => (
          <Link to="/log">
            <Button>Login</Button>
          </Link>
        )}
      />
      <Route
        exact
        path="/log"
        render={() => (
          <form className="container-fluid row" style={{ width: "500px" }}>
            <div className="inputForm col-4 "> Name: </div>

            <input
              className="inputForm col-8"
              type="text"
              placeholder="admin"
              name="name"
              value={information.name}
              onChange={handleChange}
            ></input>

            <div className="inputForm col-4">Password: </div>
            <input
              className="inputForm col-6"
              type={showpass}
              placeholder="admin"
              name="password"
              value={information.password}
              onChange={handleChange}
            ></input>
            <Button className="inputForm col-2" onClick={showHide}>
              {showhide}
            </Button>

            <div
              className="inputForm col-12"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Link to={`/connected`}>
                <Button onClick={logVerif}>
                  <h6 style={{ textDecoration: "none", color: "white" }}>
                    Login
                  </h6>
                </Button>
              </Link>
            </div>
          </form>
        )}
      />
      <div>
        <PrivateRoute
          path={`/connected`}
          connected={conVal}
          component={Dashboard}
        />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.FirstReducer,
  };
};
export default connect(mapStateToProps)(LoginPage);
