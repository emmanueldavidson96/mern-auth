import {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify"
import { setCredentials } from "../store/slices/authSlice";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../store/slices/usersApiSlice";

const RegisterScreen = () => {
    const [email, set_email] = useState("");
    const [name, set_name] = useState("");
    const [password, set_password] = useState("");
    const [confirm_password, set_confirm_password] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userInfo} = useSelector((state) => state.auth)
    const [register, {isLoading}] = useRegisterMutation();
    
    const submit_handler = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password !== confirm_password){
            toast.error("passwords do not match")
        }else{
            try{
                const res = await register({name,email, password}).unwrap();
                dispatch(setCredentials({...res}))
                navigate("/")
            }catch(err){
                toast.error(err?.data?.message || err?.error)

            }
        }
    } 

    useEffect(() => {
        if(userInfo){
            navigate("/");
        }
    }, [navigate, userInfo])

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submit_handler}>
                {/* Name Form Group */}
                <Form.Group className="my-2" controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => set_name(e.target.value)}                    
                    >
                    </Form.Control>
                </Form.Group>                
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

                {/* Confirm Password Form Group */}
                <Form.Group className="my-2" controlId="confirm_password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="Enter Password"
                        value={confirm_password}
                        onChange={(e) => set_confirm_password(e.target.value)}                    
                    >
                    </Form.Control>
                </Form.Group>

                {isLoading && <Loader />}

                {/* Submit Button */}
                <Button type="submit" variant="primary" className="mt-3">
                    Sing Up
                </Button>

                {/* Register Instead */}
                <Row className="py-3">
                    <Col>
                        Already own an account?<Link to="/login">Login</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen