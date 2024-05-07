import axios from "axios";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import "./Register.css";


const createUser = async (
    username: string,
    password: string,
    email: string,
    name: string,
    surname: string,
    role: string = "USER"
) => {
    try {
        const response = await axios.post("http://localhost:8080/api/v1/auth/register", {
            username: username,
            password: password,
            email: email,
            name: name,
            surname: surname,
            role: role
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        const status: number = (error as any).response?.status;
        if (status === 403) {
            return false;
        }
    }
    return false;
}

const handleRegister = () => {
    const username = (document.getElementById("username-register") as HTMLInputElement)?.value;
    const password = (document.getElementById("password-register") as HTMLInputElement)?.value;
    const passwordConfirm = (document.getElementById("confirm-password-register") as HTMLInputElement)?.value;
    const email = (document.getElementById("email-register") as HTMLInputElement)?.value;
    const name = (document.getElementById("name-register") as HTMLInputElement)?.value;
    const surname = (document.getElementById("surname-register") as HTMLInputElement)?.value;
    const alert = (document.getElementById("alert") as HTMLElement);
    const role: string = "USER";

    if (!username || !password || !email || password !== passwordConfirm) {
        alert.innerHTML = "Please fill in all fields";
        return false;
    }

    return createUser(username, password, email, name, surname, role);
}

const emailValidator = () => {
    const email = (document.getElementById("email-register") as HTMLInputElement)?.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const emailAlert = (document.getElementById("email-alert") as HTMLElement);

    if (!emailPattern.test(email)) {
        emailAlert.innerHTML = "Invalid email";
    }
}

const passwordConfirmValidator = () => {
    const confirmPasswordAlert = (document.getElementById("password-alert") as HTMLElement);

    const password = (document.getElementById("password-register") as HTMLInputElement)?.value;
    const confirmPassword = (document.getElementById("confirm-password-register") as HTMLInputElement)?.value;
    if (password !== confirmPassword) {
        confirmPasswordAlert.innerHTML = "Passwords do not match";
    }
    if (password === confirmPassword) {
        confirmPasswordAlert.innerHTML = "";
    }
}

const userExists = () => {
    const username = (document.getElementById("username-register") as HTMLInputElement)?.value;
    const usernameAlert = (document.getElementById("username-alert") as HTMLElement);

    axios.get(
        'http://localhost:8080/api/v1/auth/' + username
    ).then(
        (response) => {
            if (response.status === 204) {
                usernameAlert.innerHTML = "Username already exists";
            } 
        }
    ).catch(
        (error) => {
            if (error.response.status === 404) {
                usernameAlert.innerHTML = "";
            } else {
                usernameAlert.innerHTML = "An unexpected error occurred";
            }
        }
    );
}


function Register() {
    document.body.style.backgroundColor = "#222831";
    const navigate = useNavigate();
    

    return (
        <div className="login">
            <div className="login-container">
                <h1>AssetMate</h1>
                <div id="alert" className="alert"/>
                <h2>email</h2>
                <div id="email-alert" className="alert"/>
                <input
                    id="email-register"
                    type="text"
                    placeholder="email"
                    onBlur={emailValidator}
                />
                <h2>username</h2>
                <div id="username-alert" className="alert"/>
                <input
                    id="username-register"
                    type="text"
                    placeholder="username"
                    onBlur={userExists}
                />
                <h2>password</h2>
                <input
                    id="password-register"
                    type="password"
                    placeholder="password"
                />
                <h2>confirm password</h2>
                <div id="password-alert" className="alert"/>
                <input
                    id="confirm-password-register"
                    type="password"
                    placeholder="password"
                    onBlur={passwordConfirmValidator}
                />
                <h2>name</h2>
                <input
                    id="name-register"
                    type="text"
                    placeholder="name"
                />
                <h2>surname</h2>
                <input
                    id="surname-register"
                    type="text"
                    placeholder="surname"
                />

                <Button
                    text="Sign in"
                    onClick={
                        ()=> {
                            let res = handleRegister();
                            if (res) {
                                navigate("/login");
                            } 
                        }}
                />
            </div>
        </div>
    );
}

export default Register;
