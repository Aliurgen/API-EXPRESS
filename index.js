const express =require('express');
const mongoose=require('mongoose')

const app=express();

// middleware

app.use(express.json())
// app.use(middleman);

//database connection

mongoose.connect('mongodb://localhost:27017/dummy')
.then(()=>{
    console.log("database connection successful");
})
.catch((err)=>{
    console.log(err);
})

//schema for products

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is mandatory"]
    },
    price:{
        type:Number,
        required:[true,"Price is mandatory"],
        min:1
    },
    quantity:{
        type:Number,
        required:[true,"Qty is mandatory"]
    },
    category:{
        type:String,
        enum:['electronics','clothing','household']
    }
},{timestamps:true})

// model creation 

const productModel=mongoose.model("products",productSchema);



app.get("/products",(req,res)=>{

    productModel.find()
    .then((product)=>{
        res.send({data:product})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem"})
    })
})


app.get("/products/:id",(req,res)=>{

    productModel.findOne({_id:req.params.id})
    .then((product)=>{
        res.send({data:product})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem"})
    })
})





app.post("/products",(req,res)=>{

    let product=req.body;
    productModel.create(product)
    .then((document)=>{
        res.send({data:document,message:"Product Created"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem"})
    })
})





app.delete("/products/:id",(req,res)=>{

    productModel.deleteOne({_id:req.params.id})
    .then((info)=>{
        res.send({message:"Product Deleted"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem"})
    })
    
    
})






app.put("/products/:id",(req,res)=>{

    let product=req.body;

    productModel.updateOne({_id:req.params.id},product)
    .then((info)=>{
        res.send({message:"Product updated"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem"})
    })
    
})



// express.json(req,res,next)
// {
//     req.on("data",(chunk)=>{
//         product+=chunk
//     })

//     let product="";
//     req.on("end",()=>{
//         console.log(JSON.parse(product));
//         next();
//     })
// }






//middleware logic

// app.get("/testing/:id",middleman,(req,res)=>{
//     console.log("main endpoint");
//     res.send({message:"Testing request"})
// })


// function middleman(req,res,next)
// {
//     if(req.params.id<10)
//     {
//         res.send(({message:"You are blocked"}))
//     }
//     else
//     {
//         next()
//     }
// }

app.listen(8000,()=>{
    console.log('server up & running');
    
})
