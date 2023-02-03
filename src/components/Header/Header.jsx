import React from 'react'
import styled from 'styled-components'
import Profile from '../Profile/Profile'

const Header = (props) => {
    return (
        <Container>
            <Logo>
                <img style={{ height: 40 }} src="/images/catholic-events-logo.png" alt="logoName" />
                <h6>
                    Event Organiser
                </h6>
            </Logo>
            <Profile user={props.user}/>
        </Container>
    )
}
const Logo = styled.div`
    color:white;
    display:flex;
    justify-content: center;
    align-items: end;
    h6{
        margin:0px;
        padding:0px;
        padding-left:20px;
        font-size:15px;
        opacity:0.5;
        font-weight:500;
    }
`

const Container = styled.div`
    background:rgb(57,91,202);
    width:100vp;
    height:80px;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 40px;
    padding-right: 40px;

`


export default Header
