const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
app.listen(3000,console.log("Escuchando"))

app.use(express.json())
app.use(cors())


app.get("/canciones",(req,res)=>{
const lista = fs.readFileSync('repertorio.json','ascii')
res.json(JSON.parse(lista))
})

app.post("/canciones",(req,res)=>{
    const respuesta = req.body
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    canciones.push(respuesta)
    fs.writeFileSync("repertorio.json",JSON.stringify(canciones))
})

app.delete("/canciones/:id",(req,res)=>{
    const {id} = req.params
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    const cancion = canciones.findIndex(p=> p.id ==id)
    canciones.splice(cancion,1)
    fs.writeFileSync("repertorio.json",JSON.stringify(canciones))
})

app.put("/canciones/:id",(req,res)=>{
    const {id} = req.params
    const cancionNueva = req.body
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    const cancionCambiar = canciones.findIndex(p=> p.id ==id)
    canciones[cancionCambiar] = cancionNueva
    fs.writeFileSync("repertorio.json",JSON.stringify(canciones))
})