import React, {useState} from 'react'

import {Button} from "reactstrap";
import Jitsi from "react-jitsi";


export const Video = () => {

    const [displayName, setDisplayName] = useState('')
    const [roomName, setRoomName] = useState('')
    const [password, setPassword] = useState('')
    const [onCall, setOnCall] = useState(false)
    const [api, setApi] = useState()
    const logApi = () => console.log(api)

    return onCall
        ? (
            <>
                <Jitsi
                    noSSL={false}
                    domain={"tenbo.app"}
                    roomName={roomName}
                    displayName={displayName}
                    password={password}
                    onAPILoad={JitsiMeetAPI => setApi(JitsiMeetAPI)}
                />
                <Button onClick={logApi}>check api</Button>
            </>
        )
        : (
            <>
                <h1>Create a Meeting</h1>
                <input type='text' placeholder='Room name' value={roomName}
                       onChange={e => setRoomName(e.target.value)}/>
                <input type='text' placeholder='Your name' value={displayName}
                       onChange={e => setDisplayName(e.target.value)}/>
                <button onClick={() => setOnCall(true)}> Let&apos;s start!</button>
            </>
        )

}