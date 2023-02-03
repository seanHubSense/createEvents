import { Checkbox, FormControlLabel, MenuItem } from '@mui/material'
import { Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ConfirmButtons from '../ConfirmButtons/ConfirmButtons'
import { getIdByCategory, listCategories, listCategoriesNames } from '../Utils/categories'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Autocomplete from "react-google-autocomplete";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ReactImagePickerEditor from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'


const FocusedEvent = (props) => {




    const [eventKey, setEventKey] = useState(0)
    const [eventDate, setEventDate] = useState(new Date().toISOString().substring(0, 16))
    const [eventName, setEventName] = useState("")
    const [eventImage, setEventImage] = useState("")
    const [eventPrice, setEventPrice] = useState("")
    const [eventTextLocation, setEventTextLocation] = useState("")
    const [eventLongLat, setEventLongLat] = useState("")
    const [eventCategory, setEventCategory] = useState("")
    const [eventCategoryID, setEventCategoryID] = useState("")
    const [eventRepeat, setEventRepeat] = useState(false)
    const [eventDecscription, setEventDecscription] = useState("")
    const [eventPostcode, setEventPostcode] = useState("")

    useEffect(() => {
        if (props.selected.key !== 0) {

            setEventKey(props.selected.key)
            setEventName(props.selected.eventName)
            setEventImage(typeof (props.selected.image) === "string" ? props.selected.image : props.selected.image[0])
            setEventPrice(props.selected.price)
            setEventTextLocation(props.selected.fullLocation)
            setEventPostcode(props.selected.postcode)
            setEventLongLat(props.selected.longlat)
            setEventCategory(listCategoriesNames()[Number(props.selected.category)])
            setEventCategoryID(props.selected.category)
            setEventRepeat(props.selected.repeat === true)
            setEventDate(String(props.selected.eventStartDate).substring(0, 16))
            setEventDecscription(props.selected.description)
        }
        else {
            setEventDate(new Date().toISOString().substring(0, 16))
            setEventKey(0)
            setEventName("")
            setEventPrice("")
            setEventImage("")
            setEventTextLocation("")
            setEventLongLat("")
            setEventPostcode("")
            setEventCategory("")
            setEventCategoryID("")
            setEventRepeat("")
            setEventDate("")
            setEventDecscription("")

        }


    }, [props.selected,])
    const config2 = {
        language: 'en',
        width: eventImage && eventImage.includes("firebasestorage") ? '50px' : "600px",
        height: eventImage && eventImage.includes("firebasestorage") ? '50px' : "400px",
        objectFit: 'contain',
        aspectRatio: 3 / 2,
        compressInitial: 30,
        hideAddBtn: true,
        hideDownloadBtn: true,
        hideDeleteBtn: true,
    };
    const setOnline = () => {
        setEventTextLocation("Online")
        setEventLongLat("Online")
        setEventPostcode("Online")
    }


    return (
        <Container>
            <ContainerTop>
                <ImageBox >

                    < ReactImagePickerEditor

                        config={config2}
                        imageSrcProp={eventImage && eventImage.includes("firebasestorage")?"":eventImage}

                        imageSave={(newDataUri) => {
                            setEventImage(newDataUri)
                        }}
                        imageChanged={(newDataUri) => {
                            if (newDataUri === eventImage) {
                                console.log("no change")
                            }
                            setEventImage(newDataUri)
                        }}
                    />
                    {eventImage && eventImage.includes("firebasestorage") &&
                        <img
                            alt="duplicateImage"
                            style={{ position: "relative", width: 600, height: 400, top: -50, zIndex: -1 }}
                            src={eventImage}
                        />
                    }
                </ImageBox>
                <ContainerListDetails>
                    <TextField InputLabelProps={{ shrink: true }} hiddenLabel label="Event Title" value={eventName}
                        onChange={(value) => {
                            setEventName(value.target.value)
                        }}
                    />
                    <br />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            value={eventDate}
                            onChange={(newValue) => {
                                setEventDate(newValue);
                            }}
                        />
                    </LocalizationProvider>

                    <br />
                    <TextField InputLabelProps={{ shrink: true }} hiddenLabel label="Price" value={eventPrice}
                        onChange={(value) => {
                            setEventPrice(value.target.value)
                        }}
                    />
                    <br />
                    <ContainerLocation>

                        <ContainerLocation2>

                            <TextField InputLabelProps={{ shrink: true, disabled: true }} hiddenLabel label="Location" value={eventTextLocation} />
                            <Autocomplete
                                options={{
                                    types: ["postal_code", "street_address", "street_number", "point_of_interest", "place_of_worship"]
                                }}
                                apiKey="AIzaSyASjZVnv-mMwIyX2k4c0q1lNv2I1X8xZFg"
                                onPlaceSelected={(place) => {
                                    const postcodeIndex = place.address_components.length
                                    setEventPostcode(place.address_components[postcodeIndex - 1].long_name)
                                    setEventTextLocation(place.formatted_address)
                                    setEventLongLat([place.geometry.location.lng(), place.geometry.location.lat()])

                                }}
                            />
                        </ContainerLocation2>
                        <OnlineButton onClick={setOnline}>
                            <h5>
                                Online
                            </h5>
                        </OnlineButton>
                    </ContainerLocation>

                    <br />
                    <TextField InputLabelProps={{ shrink: true }} hiddenLabel label="Category" select value={eventCategory} >
                        {listCategories().map((item) => {
                            return (<MenuItem value={item.label} name={item.id} key={item.id}
                                onClick={(item) => {
                                    setEventCategoryID(getIdByCategory(item.currentTarget.dataset.value))
                                    setEventCategory(item.currentTarget.dataset.value)
                                }}>
                                {item.label}
                            </MenuItem>)
                        })}
                    </TextField>

                    <br />
                    <FormControlLabel control={<Checkbox checked={Boolean(eventRepeat)} onClick={() => { setEventRepeat(!eventRepeat) }} />} label="Repeat" />

                </ContainerListDetails>
            </ContainerTop>
            <ContainerDescription>
                <TextField multiline={true} InputLabelProps={{ shrink: true }} hiddenLabel label="Description" value={eventDecscription}
                    style={{ marginTop: 10, width: "100%", height: "100%" }}
                    onChange={(value) => {
                        setEventDecscription(value.target.value)
                    }} />
                <h5>Add hashtags to improve the visibility of this event in the search listing</h5>
            </ContainerDescription>
            <ContainerBot>
                <ConfirmButtons reload={props.reload} userID={props.userID} eventID={eventKey} create={props.create} remove={props.remove} edit={props.edit} auth={props.auth}
                    date={eventDate}
                    name={eventName}
                    image={eventImage}
                    price={eventPrice}
                    location={eventTextLocation}
                    category={eventCategoryID}
                    categoryName={eventCategory}
                    longlat={eventLongLat}
                    repeat={eventRepeat}
                    description={eventDecscription}
                    hash={eventDecscription.match(/#[a-z,0-9]+/gi)}
                    postcode={eventPostcode}
                    setKeyZero={() => setEventKey(0)}
                />
            </ContainerBot>
        </Container>
    )
}

const Container = styled.div`
    background:rgb(0 0 0 / 1%);
    width:100%;
    height:89vh;
    overflow: auto;

`
const ContainerDescription = styled.div`
    margin:30px;
    maxHeight: 300px;
    overflow: auto;
    
    h5{
        opacity:0.5;
        font-weight:10;
    }

`
const ImageBox = styled(Box)`
    width:630px;
    height:410px;

`
const ContainerTop = styled.div`
    display:flex;
    margin:30px;
    flex-direction:row;
    img{
        width:630px;
        height:410px;
    }

`
const ContainerLocation = styled.div`
    display:flex;
    flex-direction:row;

`
const ContainerLocation2 = styled.div`
    display:flex;
    flex-direction:column;
    width:350px;
`
const OnlineButton = styled.div`
    h5{
        color:white;
    }
    cursor: pointer;
    display:flex;
    background: #395bca;
    width:50px;
    height:50px;
    justify-content:center;
    align-items:center;
    border-radius:2px;

`
const ContainerBot = styled.div`
    display:flex;
    flex-direction:row;

`
const ContainerListDetails = styled.div`
    display:flex;
    flex-direction:column;
    margin-top:10px;
    margin-left:10px;
    width:400px;
`

export default FocusedEvent
