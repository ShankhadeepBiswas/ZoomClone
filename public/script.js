socket = io();
const myVideo = document.createElement('video')
const vGrid = document.getElementById('video-grid')
const peer = new Peer(undefined,{
    path:'/peerjs',
    host:'/',
    port:'5000'
})

peer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id);
})
navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
}).then((stream)=>{
    addVideoStream(myVideo,stream)
})
vGrid.append(myVideo) 
const addVideoStream =(video,stream)=>{
    video.srcObject= stream;
    video.addEventListener('loadedmetadata',()=>{
      video.play()  
    })
}

socket.on('user-connected',(userId,stream)=>{
    connectToNewUser(userId,stream);
})
const connectToNewUser=(userId,stream)=>{
    console.log('New user!');
}