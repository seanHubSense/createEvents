import React from 'react'
import styled from 'styled-components'
import dateToTile from '../Utils/common'

const EventItem = (props) => {
    const today = new Date()
    const yesterday = today.setDate(today.getDate() - 1)
    if (props.event["eventName"])
        return (

            <Container key={props.event["key"]} onClick={()=>props.select(props.event)}>
                <ImageNameSection>
                    <img src={props.event["image"][0]} alt="eventMini" style={{ width: 100, height: 60 }} />
                    <TextSection>

                        <h4>
                            {props.event["eventName"]}
                        </h4>
                    </TextSection>
                </ImageNameSection>

                <h3 style={{ color: new Date(props.event["eventStartDate"])<yesterday?"red":"black" }}>
                    {dateToTile(props.event["eventStartDate"])}
                </h3>
                <Splitter />
            </Container>
        )
    else {
        return (
            <div />
        )
    }
}
const Splitter = styled.hr`
    width:100%;
    opacity:0.2;
`
const Container = styled.div`
    cursor: pointer;
    width:300px;
    margin-left:10px;
    display:flex;
    flex-direction:column;
    h3{
        font-size:12px;
    }


`
const TextSection = styled.div`
    padding-left:10px;
    height:81px;
    display:flex;
    justify-content:start;
    h4{
        font-size:16px;
    }
`
const ImageNameSection = styled.div`
    display:flex;
    flex-direction:row;
    align-items:end;
    justify-content:start;
`

export default EventItem
