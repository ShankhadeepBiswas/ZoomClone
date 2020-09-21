socket = io();
const myVideo = document.createElement('video')
const vGrid = document.getElementById('video-grid')
navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
}).then((stream)=>{
    myVideo.srcObject = stream //Adding stream to the element srcObject
    myVideo.play() // loads and starts media resource
})
vGrid.append(myVideo) 

socket.emit('join-room',ROOM_ID);
socket.on('user-connected',()=>{
    connectToNewUser();
})
const connectToNewUser=()=>{
    console.log('New user!');
}