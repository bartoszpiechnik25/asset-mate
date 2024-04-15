import Button from "../../components/button/Button";

function Register() {
    document.body.style.backgroundColor = "#222831";
    return (
        <div className="login">
            <div className="login-container">
                <h1>AssetMate</h1>
                <h2>email</h2>
                <input
                    type="text"
                    placeholder="email"
                />
                <h2>username</h2>
                <input
                    type="text"
                    placeholder="username"
                />
                <h2>password</h2>
                <input
                    type="password"
                    placeholder="password"
                />
                <h2>confirm password</h2>
                <input
                    type="password"
                    placeholder="password"
                />
                <h2>name</h2>
                <input
                    type="text"
                    placeholder="name"
                />
                <h2>surname</h2>
                <input
                    type="text"
                    placeholder="surname"
                />

                <Button
                    text="Sign in"
                    onClick={()=>{console.log("Register Clicked")}}
                />
            </div>
        </div>
    );
}

export default Register;
