require('dotenv').config()
const socketio = require('socket.io')
const http = require('http')
const express = require('express')
const app =express()
const server = http.createServer(app)
const io = socketio(server)
const {ExpressPeerServer} = require('peer')
const peerserver= ExpressPeerServer(server,{
    debug: true
})
const port = process.env.PORT || 5000
const { v4 } = require('uuid')

app.set('view engine','ejs')
app.use(express.static('./public'))

io.on('connection',(socket)=>{
    console.log("Web Socket On");
    socket.on('join-room',(roomID)=>{
        socket.join(roomID)
        socket.to(roomID).broadcast.emit('user-connected');
    })
})

app.get('/',(req,res)=>{
    res.redirect(`/${v4()}`)
})
app.get('/:id',(req,res)=>{
    res.render('room',{ id : req.params.id})
})
server.listen(port,()=>{
    console.log('App listening to PORT',port);
})