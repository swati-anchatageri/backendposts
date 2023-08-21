const express =  require("express")
const {PostModel}= require("../model/postModel")
const {auth}=require("../middleware/authmiddleware")
const postRouter = express.Router()

postRouter.use(auth)
// adding new post
postRouter.post("/add",async(req,res)=>{
    const userID = req.body
    try {
        const newPost = new PostModel({...req.body,userID})
        await newPost.save();
        res.status(200).json({"msg":"New post has been added"})
    } catch (error) {
        res.status(400).json({"error":error.message})
    }
})


postRouter.get("/",async(req,res)=>{
try {
    const posts=await PostModel.find()
    res.status(200).json(posts)
} catch (error) {
    res.status(400).json({"error":error})
}
})

postRouter.patch("/update/:id",async(req,res)=>{
    const id = req.params
    // const post = await PostModel.findOne({_id:id})
    try {
        await PostModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).json({"msg":"Post is upadted"})
    } catch (error) {
        res.status(400).json({"error":error.message})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params
    const post = await PostModel.findOne({_id:id})
    try {
        await PostModel.findByIdAndDelete({_id:id},req.body)
        res.status(200).json({"msg":"Post is Deleted"})
    } catch (error) {
        res.status(400).json({"error":error.message})
    }
})


module.exports={postRouter}