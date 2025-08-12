const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const {z} =require('zod');
const app = express();
const { UserModel, NotesModel } = require('./db');
const path=require('path');
const cors=require('cors');
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));
function authMiddleware(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        })
    }
    try {
        const decode = jwt.verify(token, JWT_SECRET);
        req.userId = decode.userId;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}


app.post('/api/signup', async (req, res) => {
    const requiredBody=z.object({
        email:z.string().email(),
        password:z.string(),
        name:z.string()
    })

    const parsedData=requiredBody.safeParse(req.body);
    if(!parsedData.success){
        return res.json({
            message:"Incorrect format",
            error:parsedData.error
        })
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const hashedpassword = await bcrypt.hash(password, 5)
        await UserModel.create({ name, email, password: hashedpassword });
        res.status(201).json({
            message: "User SignedUp"
        })
    }
    catch (err) {
        return res.status(409).json({ message: "Email already registered" });
    } 
})

app.post('/api/signin', async (req, res) => {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({
        email,
    });
    if (!user)
        return res.status(403).json({
            message: "User do not exist"
        })
    const hashedpassword = await bcrypt.compare(password, user.password);

    if (!hashedpassword) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

})
app.use(authMiddleware);

app.get('/api/profile', async (req, res) => {
    const user = await UserModel.findById(req.userId)
    res.json({
        username: user.name,
        email: user.email
    })
})

app.post('/api/note', async (req, res) => {
    const { description } = req.body;
    await NotesModel.create({
        description,
        userId: req.userId
    })
    res.status(201).json({
        message: description
    })
})

app.get('/api/notes', async (req, res) => {
    const notes = await NotesModel.find({
        userId: req.userId
    })
    res.json(notes);
})

app.listen(process.env.PORT || 3000);