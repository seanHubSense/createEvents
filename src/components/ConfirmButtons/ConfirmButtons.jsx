import { CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'


const ConfirmButtons = (props) => {
    const [loading, setLoading] = useState(false)

    const body = {
        category: props.category,
        description: props.description,
        hashtags: props.hash ? [props.categoryName, ...props.hash.map(hash => { return String(hash).substring(1) }) ] : [props.categoryName],
        eventName: props.name,
        eventStartDate: props.date,
        eventStartTime: new Date(props.date).getHours() + ":" + (("0" + new Date(props.date).getMinutes()).slice(-2)),
        fullLocation: props.location,
        postcode: props.postcode,
        image: props.image,
        longlat: props.longlat,
        organiser: props.userID,
        price: props.price,
        repeat: props.repeat === true,
        key: props.eventID,
    }
    const validEvent = () => {
        if (props.description &&
            props.name &&
            props.date &&
            props.location &&
            props.image &&
            props.postcode &&
            props.longlat &&
            props.userID
        ) return true
        else {
            return false
        }

    }
    console.log(body)


    const Create = async () => {
        setLoading(true)
        try {
            // const eventData = await fetch(`http://localhost:5001/catholicsense-f8d60/us-central1/createEvent${props.auth}`, {
            await fetch(`https://us-central1-catholicsense-f8d60.cloudfunctions.net/createEvent${props.auth}`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(body) // body data type must match "Content-Type" header
            });
            console.log("create")
            props.reload()

            // const eventJson = await eventData.json();
            // if (eventJson["result"] === 200) {
            //     props.create(eventJson["targetEvent"])
            // }else{
            //     props.reload()
            // }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const Delete = async () => {
        setLoading(true)
        try {
            // const eventData = await fetch(`http://localhost:5001/catholicsense-f8d60/us-central1/deleteEvent${props.auth}`, {
            await fetch(`http://localhost:5001/catholicsense-f8d60/us-central1/deleteEvent${props.auth}`, {

                // const eventData = await fetch(`https://us-central1-catholicsense-f8d60.cloudfunctions.net/deleteEvent${props.auth}`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(body) // body data type must match "Content-Type" header
            });

            console.log("delete")
            props.reload()
            // const eventJson = await eventData.json();
            // if (eventJson["result"] === 200) {
            //     props.edit(eventJson["key"])
            // }else{
            //     props.reload()
            // }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const Edit = async () => {
        setLoading(true)
        try {
            // const eventData = await fetch(`http://localhost:5001/catholicsense-f8d60/us-central1/editEvent${props.auth}`, {
            await fetch(`https://us-central1-catholicsense-f8d60.cloudfunctions.net/editEvent${props.auth}`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(body) // body data type must match "Content-Type" header
            });

            console.log("delete")
            props.reload()
            // const eventJson = await eventData.json();
            // if (eventJson["result"] === 200) {
            //     props.edit(eventJson["targetEvent"])
            // }else{
            //     props.reload()
            // }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }




    if (props.eventID === 0) {
        return (
            <ButtonGroup >
                <Button style={{ background: "#395bca", border: '2px solid #395bca', opacity: validEvent() ? 1 : .2 }} onClick={() => validEvent() ? Create() : console.log()} >
                    <h3>
                        SAVE & PUBLISH
                    </h3>
                </Button>
            </ButtonGroup>
        )
    }
    else {
        return (
            <ButtonGroup>
                <a href={"https://www.catholicsense.app/event/"+props.eventID} target="_blank" rel="noopener noreferrer">
                    <Button style={{ border: '2px solid black' }} >
                        <h4>
                            VIEW EVENT
                        </h4>
                    </Button>
                </a>
                <Button style={{ background: "red", border: '2px solid red' }} onClick={validEvent && Delete}>
                    {loading ?
                        <CircularProgress size="2rem" /> :
                        <h3>
                            DELETE
                        </h3>
                    }
                </Button>
                <Button style={{ background: "#395bca", border: '2px solid #395bca', opacity: validEvent() ? 1 : .2 }} onClick={props.setKeyZero}>
                    {loading ?
                        <CircularProgress size="2rem" style={{ color: "white" }} /> :
                        <h3>
                            DUPLICATE
                        </h3>
                    }
                </Button>
                <Button style={{ background: "#395bca", border: '2px solid #395bca', opacity: validEvent() ? 1 : .2 }} onClick={() => validEvent() ? Edit() : console.log(body)}>
                    {loading ?
                        <CircularProgress size="2rem" style={{ color: "white" }} /> :
                        <h3>
                            UPDATE & PUBLISH
                        </h3>
                    }
                </Button>


            </ButtonGroup>
        )
    }
}

const ButtonGroup = styled.div`
    display:flex;
    width:100%;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;

`
const Button = styled.div`
    display:flex;
    cursor: pointer;
    width:200px;
    height:50px;
    border-radius:10px;
    justify-content:center;
    align-items:center;
    h4{
        color:black;
        text-align:center;
        align-text:center;
        font-size:16px;
    }
    h3{
        font-size:16px;
        color:white;
        text-align:center;
        align-text:center;
    }

`
export default ConfirmButtons
