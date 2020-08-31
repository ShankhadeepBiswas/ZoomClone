require('dotenv').config()
const express = require('express')
const app =express()
const port = process.env.PORT || 5000
const { v4: uuidv4, v4} = require('uuid')

app.set('view engine','ejs')
app.use(express.static('./public'))

app.get('/',(req,res)=>{
    res.redirect(`/${v4()}`)
})
app.get('/:id',(req,res)=>{
    res.render('room',{ id : req.params.id})
})
app.listen(port,()=>{
    console.log('App listening to PORT',port);
})