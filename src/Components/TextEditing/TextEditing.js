import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./TextEditing.css";
import { useDispatch, useSelector} from "react-redux";
import { sendMailHandler } from "../../store/Mail-thunk";
import { MymailSliceAction } from "../../store/MymailSlice";


const TextEditing = () => {
  const Disptach = useDispatch();
  const Enteredemail = React.createRef(null);
  const Enteredsubject = React.createRef(null);
  const Enteredtext = React.createRef(null);
  const sentItemlist = useSelector((state) => state.mymail.sentItem);
  const FormsubmitHandler = (event) => {
    event.preventDefault();
    const mailData = {
      email: Enteredemail.current.value,
      subject: Enteredsubject.current.value,
      text: Enteredtext.current.value,
      From: localStorage.getItem("mailid"),
      readreceipt: false,
    };
    Disptach(sendMailHandler(mailData));
    if (sentItemlist.length > 0) {
      let oldlist = sentItemlist;
      let sentItem = [...oldlist, mailData];

      console.log(sentItem);
      Disptach(MymailSliceAction.updateSendItem(sentItem));
    } else {
      Disptach(MymailSliceAction.updateSendItem([mailData]));
    }
    console.log(mailData, "TextEditing-FormsubmitHandler");
  };
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col>
    
          <Form className="pt-1  pr-3" onSubmit={FormsubmitHandler}>
              <Card style={{ width: "50rem" }}>
              
                <Card.Body className="colours">
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      size="sm"
                      type="email"
                      placeholder="Enter email"
                      ref={Enteredemail}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="subject">
                    <Form.Label>subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter subject"
                      ref={Enteredsubject}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="message">
                    <Form.Label>message</Form.Label>
                    <Form.Control as="textarea" rows={5} ref={Enteredtext} />
                  </Form.Group>
                </Card.Body>

                <Card.Footer>
                  <Editor
                    // editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    // onEditorStateChange={updateTextDescription}
                  />
                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};
export default TextEditing;