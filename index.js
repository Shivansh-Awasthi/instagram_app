const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let posts = [
    {
        id: uuidv4(),
        username: "shivansh",
        img: "https://images.unsplash.com/photo-1618498082545-71f0da44cbcf?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "hey, wanna go for a run 🏃‍♀️?",
    },
    {
        id: uuidv4(),
        username: "VIshal",
        img: "https://images.unsplash.com/photo-1568454537842-d933259bb258?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "On the mountains..",
    },
    {
        id: uuidv4(),
        username: "isha",
        img: "https://images.unsplash.com/photo-1437915160026-6c59da36ede2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "Hey...check this out",
    },
]


app.get(("/insta"),(req,res)=>{
res.render("index.ejs", {posts})
});

app.get(("/insta/new"),(req,res)=>{
    res.render("new.ejs")
});

app.post("/insta",(req,res)=>{
    let {username, img, caption} = req.body;
    let id = uuidv4();
    posts.push({id,username, img, caption});
    res.redirect("/insta");
})

app.get("/insta/:id",(req,res) =>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs", {post});
});

app.patch("/insta/:id", (req,res) =>{
    let {id} = req.params;
    let newCaption = req.body.caption;
    let newImg = req.body.img;
    let post = posts.find((p)=> id === p.id);
    post.caption = newCaption;
    post.img = newImg; 
    res.redirect("/insta")
})


app.get("/insta/:id/edit",(req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
})


app.delete("/insta/:id", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/insta")
});



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
