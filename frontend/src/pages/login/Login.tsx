import "./Login.css";
import Button from "../../components/button/Button";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";



const Login = () => {
    const navigate = useNavigate();
    document.body.style.backgroundColor = "#222831";

    const handleLogin = () => {
        const username = (document.getElementById("username") as HTMLInputElement)?.value;
        const password = (document.getElementById("password") as HTMLInputElement)?.value;
        const alert = document.getElementById("alert");
        if (!username || !password) {
            if (alert) {
                alert.innerHTML = "Please fill in all fields";
            }
        }
        axios.post('http://localhost:8080/api/v1/auth/authenticate',
            {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then((response) => {
                localStorage.setItem('token', response.data.token)
                navigate("/");
            }
        ).catch((error) => {
            if (error.response.status === 404) {
                if (alert) {
                    alert.innerHTML = "User not found";
                }
            } else if (error.response.status === 403) {
                if (alert) {
                    alert.innerHTML = "Incorrect password";
                }
            }
            else {
                if (alert) {
                    alert.innerHTML = "An unexpected error occurred";
                }
            }
        });
    };


    return (
        <div className="login">
            <div className="login-container">
                <h1>AssetMate</h1>
                <div id="alert"/>
                <h2>email</h2>
                <input
                    id="username"
                    type="text"
                    placeholder="username"
                />
                <h2>password</h2>
                <input
                    id="password"
                    type="password"
                    placeholder="password"
                />
                <Link to='/'>Forgot your password?</Link>
                <Button
                    text="Login"
                    onClick={handleLogin}
                />
                <Button
                    text="Register"
                    onClick={() =>{navigate("/register")}}
                />
            </div>
        </div>
    );
}

export default Login;