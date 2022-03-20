import express from "express";
import mongoose from "mongoose";
import data from "./data.js"
import videos from "./dbModel.js"



// App Config 
const app = express();
const port= process.env.PORT || 8000;

// Middlewares 

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"),
        res.setHeader("Access-Control-Allow-Headers", "*"),
        next()
});

// DB Configuration
const urlDB = `mongodb+srv://amelss:Yellowbubble26@tiktok-clone.7qmcu.mongodb.net/tiktok-clone?retryWrites=true&w=majority`;
mongoose.connect(urlDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// API Endpoints

app.get('/', (req, res) => res.status(200)
    .send('Hello World!'))

app.get('/v1/posts', (req, res) => res.status(200)
.send(data))    

app.get('/v2/posts', (req, res) => {
    videos.find((err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
    })
})

app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body

    videos.create(dbVideos, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
// Listener

app.listen(port, () => console.log(`Listening on localhost: ${port}`))    