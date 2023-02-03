import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import FocusedEvent from './components/FocusedEvent/FocusedEvent';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Sidebar from './components/SideBar/Sidebar';


function App() {
  const [selected, setSelected] = useState({ key: 0 })
  const [userData, setUserData] = useState()
  const [eventData, setEventData] = useState([])
  const [auth, setAuth] = useState("")
  const [auth2, setAuth2] = useState([])
  const [showLogin, setShowLogin] = useState(true)
  const [loginStatus, setLoginStatus] = useState()
  const [loading, setLoading] = useState(false)


  const processLogin = async (phone, code) => {
    setLoading(true)
    try {
      // const eventData = await fetch(`http://localhost:5001/catholicsense-f8d60/us-central1/getOrganiserEvents?phoneNo=${phone}&password=${code}`)
      const eventData = await fetch(`https://us-central1-catholicsense-f8d60.cloudfunctions.net/getOrganiserEvents?phoneNo=${phone}&password=${code}`)
      // const eventData = await fetch(`https://us-central1-catholicsense-f8d60.cloudfunctions.net/getWebHomepage`)
      const eventJson = await eventData.json();
      setLoginStatus(eventJson["result"])
      if (eventJson["result"] === 200) {
        setUserData(eventJson["user"])
        setEventData(eventJson["organisedEvent"])
        setAuth(`?phoneNo=${phone}&password=${code}`)
        setShowLogin(false)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const removeEvent = (eventID) => {
    const index = eventData.findIndex((item) => item["key"] === eventID)
    setEventData(eventData.splice(index, 1))
    setSelected({ key: 0 })
  }
  const editEvent = (event) => {
    const index = eventData.findIndex((item) => item["key"] === event["key"])
    eventData.splice(index, 1)
    eventData.push(event)
    setEventData(eventData)
    setSelected({ key: 0 })
  }
  const createEvent = (event) => {
    eventData.push(event)
    setEventData(eventData)
    setSelected({ key: 0 })
  }

  const reload = () => {
    processLogin(auth2[0], auth2[1])
    setSelected({ key: 0 })
  }
  return (
    <div >
      <Login auth2={setAuth2} processLogin={processLogin} show={showLogin} status={loginStatus} loading={loading} />
      <Header user={userData} />

      <Body>
        <Sidebar select={setSelected} events={eventData} />
        <FocusedEvent reload={reload} userID={userData ? userData["key"] : 0} selected={selected} auth={auth} create={createEvent} remove={removeEvent} edit={editEvent} />

      </Body>

    </div>
  );
}

const Body = styled.div`
  display:flex;
  height:100vp;
  max-height:100vp;
  overflow:hidden;
  width:100%;
  flex-direction:row;
  bavkground:blue;
  
`

export default App;
