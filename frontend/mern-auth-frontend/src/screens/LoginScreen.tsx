import {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../store/slices/usersApiSlice";
import { setCredentials } from "../store/slices/authSlice";
import {toast} from "react-toastify";
import Loader from "../components/Loader";

const LoginScreen = () => {
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading, error}] = useLoginMutation();
    const {userInfo} = useSelector((state) => state.auth);
    
    useEffect(() => {
        if(userInfo){
            navigate("/")
        }
    }, [navigate, userInfo])
    
    const submit_handler = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate("/")
        }catch(error){
            toast.error(error?.data?.message || error?.error)
        }
    } 
    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submit_handler}>                
                {/* Email Form Group */}
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => set_email(e.target.value)}                    
                    >
                    </Form.Control>
                </Form.Group>

                {/* Password Form Group */}
                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => set_password(e.target.value)}                    
                    >
                    </Form.Control>
                </Form.Group>

                {
                    isLoading && 
                    <Loader />
                }

                <Button type="submit" variant="primary" className="mt-3">
                    Sign In
                </Button>

                <Row className="py-3">
                    <Col>
                        New Customer? <Link to="/register">Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen