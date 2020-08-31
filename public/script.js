const myVideo = document.createElement('video')
const vGrid = document.getElementById('video-grid')
navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
}).then((stream)=>{
    myVideo.srcObject = stream //Adding stream to the element srcObject
    myVideo.play() // loads and starts media resource
})
vGrid.append(myVideo) // Appending element "video" to div tag of id="video-grid"