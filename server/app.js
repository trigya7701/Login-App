const express=require("express");
const bodyParser=require("body-Parser");
const cors=require("cors");
const mongoose=require("mongoose");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));



const db='mongodb+srv://trigya:X5lrhoge@@@cluster0.75mqw.mongodb.net/customerdb?retryWrites=true&w=majority';

mongoose.connect(db,{
  useNewUrlParser:true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify:false});



const customerSchema=new mongoose.Schema({
  Username:String,
  Mobile:Number,
  Email:String,
  Address:String
});
const Customer=mongoose.model("Customer",customerSchema);
console.log("hi");
app.post("/register",(req,res)=>{
  const username=req.body.username;
  const mobile=req.body.mobile;
  const email=req.body.email;
  const address=req.body.address;
  // console.log("hi");
  // console.log(username);
  // console.log(mobile);
  // console.log(email);
  // console.log(address);

  const data=new Customer({
    Username:username,
    Mobile:mobile,
    Email:email,
    Address:address
  });
  data.save();

})

app.get("/getdata",(req,res)=>{
  Customer.find({},(err,data)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send(data);
    }
  });
});

app.post("/deltedata",(req,res)=>{
  Customer.deleteOne({_id:req.body.id },(err)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send("Data Deleted");
    }
  });
});


app.listen(5000);
