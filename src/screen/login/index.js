import React, { useEffect, useState } from 'react';
import './index.css'
import { login } from '../../redux/reducer/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [loginError, setLoginError] = useState("");


    //Store 
    const authStore = useSelector(state => state.auth);
    const {
        authLoader,
        adminDetails,
        loginStatus
    } = authStore;
    useEffect(() => {
        if (loginStatus == "Username/password is incorrect") {
            setLoginError(loginStatus);
        } else if (loginStatus == "Successfully signin") {
            console.log("success");
            navigation("/home")
        }
    }, [loginStatus])
    const loginFunc = () => {
        if (userName && userPassword) {
            setLoginError("");
            dispatch(login({
                username: userName,
                password: userPassword
            }))
        } else {
            setLoginError("Empty Field Found!");
        }
    }
    return (
        <div class="container h-100" >
            <div class="d-flex justify-content-center h-100" style={{ marginTop: 200 }}>
                <div class="user_card">
                    <div class="d-flex justify-content-center">
                        <div class="brand_logo_container">
                            <img src="https://upload.wikimedia.org/wikipedia/en/4/49/Anna_University_Logo.svg" class="brand_logo" alt="Logo" />
                        </div>
                    </div>

                    <div class="d-flex justify-content-center form_container" >

                        <form>
                            <center ><label style={{ marginTop: -200, color: "white", fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>LOGIN</label></center>
                            <div class="input-group mb-3">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                </div>
                                <input
                                    onChange={(e) => { setUserName(e.target.value) }}
                                    type="text" name="" class="form-control input_user" value={userName} placeholder="username" />
                            </div>
                            <div class="input-group mb-2">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                                </div>
                                <input
                                    onChange={(e) => { setUserPassword(e.target.value) }}
                                    type="password" name="" class="form-control input_pass" value={userPassword} placeholder="password" />
                            </div>
                            <center><label style={{ color: "red", fontSize: 15 }}>{loginError}</label></center>

                            <div class="d-flex justify-content-center mt-3 login_container">
                                <button
                                    onClick={() => { loginFunc() }}
                                    type="button" name="button" class="btn login_btn">Login</button>
                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Login;