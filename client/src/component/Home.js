import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom"


const Home = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const userHome = async () => {
        try {
          
            const res = await axios.get("https://mern-project-3cuz.onrender.com/api/auth/test",{
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            setUser(res.data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        userHome();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if(!localStorage.getItem("token")){
        return (
            <div className="box m-auto mt-5">
                <div className="text-center mb-3">
                    <h1>Hello There !!!</h1>
                </div>
                <div className="text-center">
                    <NavLink to="/login" className="btn btn-primary m-2">Login</NavLink>
                    <NavLink to="/register" className="btn btn-primary m-2">Register</NavLink>
                </div>
            </div>
        );
    }else{

        return (
            <div className="box m-auto mt-5">
                <div className="text-center mb-3">
                    <h1>Welcome {user && user.name}</h1>
                </div>
                <p className="text-center mb-3">You have logged in successfully</p>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        )
    }


}

export default Home