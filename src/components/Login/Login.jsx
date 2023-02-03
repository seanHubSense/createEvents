import { CircularProgress } from '@mui/material'
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import Person2Icon from '@mui/icons-material/Person2';
import SettingsIcon from '@mui/icons-material/Settings';

const Login = (props) => {
    // const [phone, setPhone] = useState("+447508567684")
    // const [code, setCode] = useState("55948")
    const [phone, setPhone] = useState("")
    const [code, setCode] = useState("")

    return (
        <MainScreen style={{ visibility: props.show ? "visible" : "hidden" }}>
            <LoginBox>
                <img style={{ height: 100 }} src="/images/catholic-events-icon.png" alt="logoicon" />
                <img style={{ height: 40 }} src="/images/catholic-events-logo-b.png" alt="logoName" />
                <br />
                <br />
                <br />
                <TextField placeholder="+447501234567" InputLabelProps={{ shrink: true, disabled: true }} hiddenLabel label="Phone Number" value={phone}
                    onChange={(value) => {
                        setPhone(value.target.value)
                    }} />
                <br />
                <TextField placeholder="18652" InputLabelProps={{ shrink: true, disabled: true }} hiddenLabel label="App Webcode" value={code}
                    onChange={(value) => {
                        setCode(value.target.value)
                    }} />
                <br />
                <br />
                <Button onClick={() => {
                    props.processLogin(phone, code)
                    // props.auth2([phone, code])
                }}>
                    {props.loading ?
                        <CircularProgress size="2rem" style={{ color: "white" }} />
                        :
                        <h4>
                            Connect
                        </h4>
                    }
                </Button>

                <br />

                {props.status && props.status > 300 && !props.loading &&
                    <h4 style={{ color: "red" }}>Invaild login details. Try again.</h4>}

                <h4>{"Login details can be found on the mobile app"}</h4>
                <RouteInstruct>
                    <Person2Icon />
                    <h4>Profile -></h4>
                    <SettingsIcon />
                    <h4> Settings</h4>
                </RouteInstruct>

            </LoginBox>
        </MainScreen>
    )
}

const Button = styled.div`
    background:#395bca;
    display:flex;
    cursor: pointer;
    width:200px;
    height:50px;
    min-height:50px;
    border-radius:10px;
    justify-content:center;
    align-items:center;
    h4{
        color:white;
        text-align:center;
        align-text:center;
        font-size:16px;
    }`
const MainScreen = styled.div`
    height:100%;
    width:100%;
    background:white;
    z-index:10;
    position:absolute;
    display:flex;
    justify-content:center;
    align-items:center;

`
const LoginBox = styled.div`
    height:500px;
    width:400px;
    background:white;

    display:flex;
    justify-content:start;
    align-items:center;
    flex-direction:column;

`
const RouteInstruct = styled.div`
    display:flex;
    justify-content:start;
    align-items:center;
    flex-direction:row;

`

export default Login
