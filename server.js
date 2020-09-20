require('dotenv').config()
const socketio = require('socket.io')
const http = require('http')
const express = require('express')
const app =express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 5000
const { v4 } = require('uuid')

app.set('view engine','ejs')
app.use(express.static('./public'))

io.on('connection',(socket)=>{
    socket.on('')
})

app.get('/',(req,res)=>{
    res.redirect(`/${v4()}`)
})
app.get('/:id',(req,res)=>{
    res.render('room',{ id : req.params.id})
})
app.listen(port,()=>{
    console.log('App listening to PORT',port);
})