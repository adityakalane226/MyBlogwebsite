import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";


const app = express();
const port = 3000;

let blogs = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));


app.get('/',(req,res)=>{
    res.render("index.ejs",{blogs:null,editMode:null});
})

app.get('/blogs',(req,res)=>{
    res.render("blogs.ejs",{blogs:blogs});
})


app.post('/submit',(req,res)=>{
    let post={
        title :req.body.title,
        text :req.body.textbox
    }
    blogs.push(post);
    res.redirect('/blogs');
    console.log(post);
})

app.get('/blogs/:id',(req,res)=>{
    const blogId = req.params.id;
    const blog = blogs[blogId];
    if(blog){
        res.render("template.ejs",{blog,blogId});
    }else{
        res.status(404).send("blog not found");
    }
})
app.get("/blogs/:id/edit", (req, res) => {
    const blogId = req.params.id;
    const blog = blogs[blogId];
    res.render("index.ejs",{ blog, blogId,editMode:true });
});
app.post('/blogs/:id/submit',(req,res)=>{
    const blogId =req.params.id;
    blogs[blogId].title = req.body.title;
    blogs[blogId].text = req.body.textbox;
    res.redirect(`/blogs/${blogId}`);
})
app.delete('/blogs/:id/delete',(req,res)=>{
    blogs.splice(req.params.id,1)
    res.redirect('/blogs');

});


app.listen(port,(req,res)=>{
    console.log("Server started running on local port 3000");

})