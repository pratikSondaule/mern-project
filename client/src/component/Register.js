import {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    const register = async(e) => {

        e.preventDefault();

        try {
            
            if(password === cpassword) {
                const res = await axios.post("http://localhost:8000/api/auth/register",{name, email, password, cpassword});
                if(res.status === 201){
                    alert("User register successfully");
                    navigate("/login");
                }else if(res.status === 200){
                    alert("User already exists");
                    navigate("/login");
                }else{
                    alert("Something went wrong");
                };
            }

        } catch (error) {
            
        }

    }

    return (
        <div className="box m-auto mt-5">
            <div className="text-center mb-3">
                <h1>Register</h1>
            </div>
            <form method="POST" className="form">
                <div className="mb-3">
                    <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => {setName(e.target.value)}} className="form-control" required />
                </div>
                <div className="mb-3">
                    <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} className="form-control" required />
                </div>
                <div className="mb-3">
                    <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} className="form-control" required />
                </div>
                <div className="mb-3">
                    <input type="password" name="cpassword" placeholder="Confirm Password" value={cpassword} onChange={(e) => {setCPassword(e.target.value)}} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary form-control mb-3" onClick={register}>Register</button>
            </form>

            <div className="text-center">
                <p>Or</p>
                <p>Already a user? <NavLink to="/login">Login</NavLink></p>
            </div>
        </div>
    )

}

export default Register