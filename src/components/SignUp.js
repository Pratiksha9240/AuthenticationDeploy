import { useRef, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import '../App.css';

const SignUp = () => {
  const emailInputRef = useRef();
  const passwodInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwodInputRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEiVK95YIDqRJwmEkZfppgHHY4n2ITWAU",
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

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      history.replace('/login')

    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  return (
    <Container>
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
          {isLoading ? "Signing Up..." : "Sign Up"}
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
