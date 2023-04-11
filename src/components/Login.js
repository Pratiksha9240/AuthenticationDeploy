import { useRef, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import '../App.css'

const Login = () => {
  const emailInputRef = useRef();
  const passwodInputRef = useRef();
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwodInputRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEiVK95YIDqRJwmEkZfppgHHY4n2ITWAU",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      // data.expiresIn = '30000';
      console.log(data);

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      authCtx.login(data);
      
      history.replace('/Dashboard')
    } catch (error) {
      alert(error);
    }

    emailInputRef.current.value = '';
    passwodInputRef.current.value = '';
  };

  return (
    <Container className="Container">
      <Form onSubmit={submitHandler} className="Form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwodInputRef}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
        <br />
        <Link to="/signUp">
          Don't Have Account? SignUp Here !!!
        </Link>
      </Form>
    </Container>
  );
};

export default Login;
