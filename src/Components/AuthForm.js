import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";



import { AuthsliceAction } from "../store/Auth";
import { Sendlogin,sendsignup } from "../store/Action-thunk";
import UisliceAction from "../store/Uivisible";

const AuthForm = () => {
  const Disptach = useDispatch();
  const islogin = useSelector((state) => state.uiauth.islogin);
  const Enteredname = React.createRef(null);
  const Enteredemail = React.createRef(null);
  const EnteredPassword = React.createRef(null);
  const EnteredConfirmPassword = React.createRef(null);
  const onsubmitHandler = (event) => {
    event.preventDefault();
    const obj = {
      email: Enteredemail.current.value,
      password: EnteredPassword.current.value,
      returnSecureToken: true,
    };
    if (obj.email === "" && obj.password === "") {
      return;
    }
    if (islogin) {
      Disptach(Sendlogin(obj));
    }
    if (!islogin && obj.password === EnteredConfirmPassword.current.value) {
      Disptach(sendsignup(obj));
    }
    // Disptach(AuthsliceAction.Login(obj));
    //;
    console.log(obj);
  };
  const buttonToggle = () => {
    Disptach(UisliceAction.setisLogin());
  };
  return (
    <Container className="pt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form
            className="shadow p-3 mt-5 bg-white rounded"
            onSubmit={onsubmitHandler}
          >
            <h3>{islogin ? "Login" : "SignUp"}</h3>
            <Form.Group controlId="email">
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={Enteredemail}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Control
                type="password"
                placeholder="Enter password"
                autoComplete="off"
                ref={EnteredPassword}
              ></Form.Control>
            </Form.Group>
            {!islogin && (
              <Form.Group controlId="Confirm Password">
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  ref={EnteredConfirmPassword}
                ></Form.Control>
              </Form.Group>
            )}
            <Button
              type="submit"
              variant="primary"
              className="btn btn-primary btn-lg btn-block mb-2"
            >
              {islogin ? "Login" : "SignUp"}
            </Button>
            <Form.Group controlId="btn-secondary">
              <Button
                className="btn btn-secondary btn-lg btn-block"
                onClick={buttonToggle}
              >
                {islogin ? "SignUp" : "Login existing account"}
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;