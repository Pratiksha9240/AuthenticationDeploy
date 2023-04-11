import { useContext, useRef } from "react";
import { Form,Button,Container } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";

const Profile = () => {

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const history = useHistory();

    const passwodInputRef = useRef();

    const submitHandler = async(event) => {
        event.preventDefault();
        const enteredPassword = passwodInputRef.current.value;

        try{const response = await fetch( "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCEiVK95YIDqRJwmEkZfppgHHY4n2ITWAU",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        })

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.error.message);
        }
    
        // authCtx.setToken(data.idToken);
        history.replace('/')
    }
        
        catch(error){
            alert(error);
        }

    }

  return (
    <>
      <h2>My Profile</h2>
      <Container>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwodInputRef}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Change Password
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Profile;
