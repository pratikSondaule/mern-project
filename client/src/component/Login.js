import axios from "axios";
import { useState } from "react"
import { useNavigate, NavLink } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post("https://mern-project-3cuz.onrender.com/api/auth/login", {
                email,
                password
            })
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                alert("Login Successful");
                navigate("/")
            } else {
                alert("Something went wrong");
            };

        } catch (error) {
            console.log(error);
            alert("Invalid Credentials");
        }
    }

    return (
        <div className="box m-auto mt-5">
            <div className="text-center mb-3">
                <h1>Log in</h1>
            </div>
            <form method="POST">
                <div className="mb-3">
                    <input type="email" placeholder="Email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" required />
                </div>
                <div className="mb-3">
                    <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary form-control mb-3" onClick={login}>Log in</button>
            </form>
            <div className="text-center">
                <p >Or</p>
                <p >New User? <NavLink to="/register">Register</NavLink> </p>
            </div>
        </div>
    )

}

export default Login