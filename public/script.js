const socket = io('/');
const myVideo = document.createElement('video')
const vGrid = document.getElementById('video-grid')
var peer = new Peer(undefined,{
    path:'/peerjs',
    host:'/',
    port:'5000'
})
navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
}).then(stream=>{
    addVideoStream(myVideo,stream)
    socket.on('user-connected',(userId)=>{
        connectToNewUser(userId,stream);
    })
    peer.on('call',call=>{
        call.answer(stream);
        const video = document.createElement('video')
        call.on('stream',UserVideoStream=>{
            addVideoStream(video,UserVideoStream);
        })
    })
}) 
peer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id);
})
const addVideoStream =(video,stream)=>{
    video.srcObject= stream;
    video.addEventListener('loadedmetadata',()=>{
      video.play()  
    })
    vGrid.append(video)
}

const connectToNewUser=(userId,stream)=>{
    const call= peer.call(userId,stream)
    const video= document.createElement('video')
    call.on('stream', UserVideoStream=>{
        addVideoStream(video,UserVideoStream)
    })
}