import { useContext, useState } from "react";
import { Card, Container, Row, Col, Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";
import { register, login } from "../api.js";
import { UserContext } from "../App.js";

export default function User(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginFail, setLoginFail] = useState(false);
    const navigate = useNavigate();
    const {setUserId, setLoggedIn} = useContext(UserContext);
    async function onSubmit() {
        if (props.type == "register"){
            const {success, id} = await register(email, password);
            if (success){
                setLoggedIn(true);
                setUserId(id);
                navigate("/main/"+id);
            }
        } else{
            const {success, id} = await login(email, password);
            if (success){
                setLoggedIn(true);
                setUserId(id);
                navigate("/main/"+id);
            } else{
                // propt that password wrong
                setLoginFail(true);
            }
        }
        
    }
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col lg={4} >
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title as="h3">
                                {props.type == "register" ? "Register" : "Login"}
                            </Card.Title>
                            {loginFail && 
                            <Alert variant="danger" className="py-2">Password or Email is incorrect!</Alert>}
                            <Form>
                                <FloatingLabel
                                    className="my-4"
                                    controlId="floatingInput"
                                    label="Email address"
                                >
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(event) => {
                                            setEmail(event.target.value)
                                        }}
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    className="my-4"
                                    controlId="floatingPassword"
                                    label="Password"
                                >
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => {
                                            setPassword(event.target.value)
                                        }}
                                    />
                                </FloatingLabel>
                                <div className="d-grid">
                                    <Button
                                        variant="dark" size="lg"
                                        onClick={onSubmit}
                                    >
                                        Submit
                                    </Button>
                                </div>


                            </Form>
                            {props.type == "login" &&
                                <Card.Text className="text-muted mt-1">
                                    Don't have an account? {" "}
                                    <Link to="/register" className="text-muted">Register</Link>
                                </Card.Text>
                            }

                        </Card.Body>

                    </Card>
                </Col>
            </Row>

        </Container>
    )
}