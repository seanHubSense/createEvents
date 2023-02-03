import React from 'react'
import styled from 'styled-components'
import EventItem from '../EventItem/EventItem'


const Sidebar = (props) => {


    const sortedEvent = props.events.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.

        return new Date(b.eventStartDate) - new Date(a.eventStartDate);
    });
    console.log(sortedEvent)

    return (
        <ListBox>
            <NewEventButton onClick={() => props.select({ key: 0 })} key="newevent">
                <h3>
                    CREATE NEW EVENT
                </h3>
            </NewEventButton>
            {sortedEvent && sortedEvent.map(item => {
                return (
                <EventItem key={item.key} select={props.select} event={item} />)
            })
            }

        </ListBox>
    )
}

const NewEventButton = styled.div`
    display:flex;
    height:60px;
    width:300px;
    cursor: pointer;
    background:rgb(57,91,202);
    margin:10px;
    justify-content:center;
    align-items:center;
    border-radius:10px;
    h3{
        color:white;
        font-size:16px;
    }

`
const ListBox = styled.div`
    maxHeight: 100vh;
    width:500px;
    overflow: auto;
    display:flex;
    flex-direction: column;
    height:89vh;

`

export default Sidebar
