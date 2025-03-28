import React, { useRef } from 'react'


const server_url = "http://localhost:8080"
var connections = {}
const peerConfigConnections = {
    "iceServers":[
        {"urls":"stun:stun.l.google.com:19302"}
    ]
}


export default function VideoMeetComponent() {



  return (
    <div>VideoMeetComponent</div>
  )
}
