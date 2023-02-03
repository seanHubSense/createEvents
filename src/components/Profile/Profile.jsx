import React from 'react'
import styled from 'styled-components'


const Profile = (props) => {

    if (props.user) {
        return (
            <Container>
                <TextSection>
                    <h4>
                        {props.user["name"]}
                    </h4>
                    <h4>
                        {props.user["number"]}
                    </h4>
                </TextSection>
                <ProfileImage>

                    {props.user["image"] ?
                        <img src={props.user["image"]} alt="profileImg" />
                    :
                        <h4>
                            {String(props.user["name"]).substring(0, 2)}
                        </h4>
                    }


                </ProfileImage>
            </Container >
        )
    }
    else { return (<div />) }
}

const ProfileImage = styled.div`
    width:60px;
    height:60px;
    border-radius:50%;
    background:red;
    overflow:hidden;
    justify-content:center;
    align-items:center;
    h4{
        color:white;
        position:absolute;
        text-align:center;
        width:60px;
    }
    img{
        height:60px;
        width:60px;
    }

`
const Container = styled.div`
    height:80px;
    display:flex;
    flex-direction:row;
    padding-right:80px;
    justify-content:center;
    align-items:center;

`
const TextSection = styled.div`
    width:250px;
    height:80px;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    
    h4{
        color:white;
        margin:0px;
    }


`

export default Profile
