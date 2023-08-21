const express = require("express")
const {connection}=require("./db")
const {userRouter}= require("./router/userRouter")
const {postRouter}=require("./router/postRouter")
const app=express()
app.use(express.json())


app.use("/users",userRouter)
app.use("/posts",postRouter)
app.get("/",(req,res)=>{
    res.send("home page")
})

app.listen(8800,async()=>{
    try {
        await connection
        console.log("connecte to db")
        console.log("server is running at 8800")
    } catch (error) {
        console.log(error)
    }
    
})