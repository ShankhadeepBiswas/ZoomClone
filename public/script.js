const socket = io('/');
const myVideo = document.createElement('video')
let myVideoStream
const vGrid = document.getElementById('video-grid')
var peer = new Peer(undefined,{
    path:'/peerjs',
    host:'/',
    port:'443'
})
navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
}).then(stream=>{
    myVideoStream = stream
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

let text = $('input')
$('html').keydown(e=>{
    if(e.which == 13 && text.val().length !== 0){
        console.log(text.val());
        socket.emit('message',text.val())
        text.val('')
    }
})
socket.on('createMessage', msg =>{
    $('.messages').append(`<li class="message"><b>user</b><br/>${msg}</li>`)
    scrollToBottom()
})
const scrollToBottom = ()=>{
    let d=$('.main__chat_window')
    d.scrollTop(d.prop("scrollHeight"));
}
//Mute our Video
const  muteUnmute = ()=>{
    const enabled = myVideoStream.getAudioTracks()[0].enabled
    if(enabled){
        myVideoStream.getAudioTracks()[0].enabled = false
        setUnmuteButton();
    }else{
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}
//Button changes
const setMuteButton=()=>{
    const html= `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
    `
    document.querySelector(".main__mute_button").innerHTML=html
}
const setUnmuteButton=()=>{
    const html= `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
    `
    document.querySelector(".main__mute_button").innerHTML=html
}
//Disable Video
const  playStop = ()=>{
    const enabled = myVideoStream.getVideoTracks()[0].enabled
    if(enabled){
        myVideoStream.getVideoTracks()[0].enabled = false
        setStopVideo();
    }else{
        setPlayVideo();
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}
//Button changes
const setPlayVideo=()=>{
    const html= `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
    `
    document.querySelector(".main__video_button").innerHTML=html
}
const setStopVideo=()=>{
    const html= `
    <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
    `
    document.querySelector(".main__video_button").innerHTML=html
}