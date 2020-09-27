const socketio = require('socket.io')
const express = require('express')
const app =express()
const server = require('http').Server(app)
const io = socketio(server)
const {ExpressPeerServer} = require('peer')
const peerserver= ExpressPeerServer(server,{
    debug: true,
    path: '/'
})
app.use('/peerjs', peerserver)
const port = process.env.PORT || 5000
const { v4 } = require('uuid')
app.set('view engine','ejs')
app.use(express.static('./public'))

io.on('connection',(socket)=>{
    console.log("Web Socket On");
    socket.on('join-room',(roomID,userId)=>{
        socket.join(roomID)
        socket.to(roomID).broadcast.emit('user-connected',userId);
        socket.on('message', msg =>{
            io.to(roomID).emit('createMessage', msg)
        })
        socket.on('disconnect',()=>{
            socket.to(roomID).broadcast.emit('user-disconnected',userId);
        })
    })
})

app.get('/',(req,res)=>{
    res.redirect(`/${v4()}`)
})
app.get('/:id',(req,res)=>{
    res.render('room',{ id : req.params.id, port})
})
server.listen(port,()=>{
    console.log('App listening to PORT',port);
})