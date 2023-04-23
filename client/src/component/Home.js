import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"


const Home = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const userHome = async () => {
        try {
          
            const res = await axios.get("http://localhost:8000/api/auth/test",{
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
        navigate("/login")
    }

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

export default Home