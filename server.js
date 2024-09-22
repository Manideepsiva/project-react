const express = require('express');
const mongoose = require('mongoose');
var bodyParser  = require('body-parser');
var  session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");
const user = require('./schemas/userschema');
const jwt = require("jsonwebtoken");
const cors = require("cors");
const testnames = require("./schemas/testschema")
const hospmodel = require("./schemas/hospitalschema");
const Appointment = require('./schemas/clientappointmentschema');
const Transaction = require('./schemas/clientTransaction');
let typestest;



var app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "life is so hectic";


async function connectbase(){
    await mongoose.connect('mongodb://127.0.0.1:27017/project-nexus-react');

}

async function gettest(){
    const doc = await testnames.findOne({ id: 1 }); 
   console.log(doc);
   typestest = doc.tests; 
   


}

connectbase().catch((error)=> console.log(error));
gettest();

const authroute = (req,res,next)=>{
    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(' ')[1];
    if(!token) return res.sendStatus(401);
    jwt.verify(token,SECRET_KEY,(err,user)=>{
        if(err)return  res.sendStatus(403);
        next();
    })
}


app.post('/api/register',async(req,res)=>{
    const {usermail,password} = req.body;
    const newuser = new user({
        usermail,
        password
    });

    console.log("recived here");

    const finduser = await user.findOne({usermail:usermail});
    if(finduser) res.status(400).send("user already exist with given mail address");
    else{



    newuser.save().then(()=>{console.log("user is succesfullly created");
        res.status(200).send("user created successfully ");

    }).catch(err=>{
        res.status(500).send("error in creating user");
    })
}
 

})



app.post('/api/login',async (req,res)=>{
const {usermail,password} = req.body;

const finduser = await user.findOne({usermail:usermail});
if(!finduser) res.status(300).send("user doesnt exist with given mail address");
else{
    const pass = finduser.password;
    const result = await bcrypt.compare(password,pass);
    if(result){
        const token = jwt.sign({usermail},SECRET_KEY,{expiresIn:'1d'});
        res.json({token});
    }

    else{
        res.status(400).send("invalid credentials");
    }
}

})




app.post('/api/verify-token',(req,res)=>{
    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(' ')[1];
    if(!token) return res.sendStatus(401);
    jwt.verify(token,SECRET_KEY,(error,user)=>{
        if(error){
            console.log("bad man");
             return res.sendStatus(403);

        }
        console.log("hey yoyoyoyo");
        return res.sendStatus(200);
    })
    

})

const statekeywords = ['andhra pradesh','tamil nadu','karanataka','telangana']; 
const andhrakeywords = ['alluri sitharama raju','anakapalli','ananthapuramu','annamayya','bapatla','chittoor','dr.b.r.ambedkar konaseema','east godavari','eluru','guntur','kakinada','krishna','kurnool','nandhyala','ntr','palnadu','parvathipuram manyam','prakasam','sri pottisriramulu nellore','sri sathaya sai','srikakulam','tirupati','vishakapatanam','vizianagaram','west godavari','ysr kadapa'];
const karanatakakeywords = ['bengaluru rural','bengaluru urban','chitradurga','tumakuru'];
const tamilkeywords = ['chennai','kanchipuram','thiruvallur'];
const telanganakeywords = ['hyderabad','bhadradri kothagudem','medchal malkajgiri','ranga reddy'];

app.post('/api/Testsuggestions',(req,res)=>{
    console.log('ok');
    const Typedtest = req.body.typedtest;
    console.log(Typedtest);

    let result = [];
    const searchTerm = Typedtest.toLowerCase();
    for (const item of typestest) {
        if (item.toLowerCase().includes(searchTerm)) {
          result.push(item);
          if (result.length === 5) break; 
        }
      }
      console.log(result);
      res.json({ results: result });


})


app.post('/api/Testcheck',(req,res)=>{
    const testch = req.body.testName;
    const lowc = testch.toLowerCase();
    for(const item of typestest)
    {if(item.toLowerCase() == lowc){
        return res.sendStatus(200);
    }

    }

    res.sendStatus(301);
})

app.post("/api/Statesuggestions",(req,res)=>{
    console.log("in sttate")

    const Typedtest = req.body.typedstate;
    console.log(Typedtest)
    let result = [];
    const searchTerm = Typedtest.toLowerCase();
    for (const item of statekeywords) {
        if (item.toLowerCase().includes(searchTerm)) {
          result.push(item);
          if (result.length === 5) break; 
        }
      }
      console.log(result);
      res.json({ results: result });
})


app.post("/api/Districtsuggestions",(req,res)=>{

    var keyletter = req.body.typeddist;
    var statekey = req.body.state;
    var resultkey = [];
    if(statekey.toLowerCase() === 'andhra pradesh')
    {  console.log('insider andhra');
    resultkey = andhrakeywords.filter((state)=>{
        if(state.toLowerCase().includes(keyletter.toLowerCase())){
            return state;
        }
    });
    var jdata = { state : resultkey};

   return  res.json(jdata);
    }

    else if(statekey.toLowerCase()== 'karanataka'){
        resultkey = karanatakakeywords.filter((state)=>{
            if(state.toLowerCase().includes(keyletter.toLowerCase())){
                return state;
            }
        });
        var jdata = { state : resultkey};
    
       return  res.json(jdata);

    }

    else if(statekey.toLowerCase() == 'tamil nadu'){
        resultkey = tamilkeywords.filter((state)=>{
            if(state.toLowerCase().includes(keyletter.toLowerCase())){
                return state;
            }
        });
        var jdata = { state : resultkey};
    
       return  res.json(jdata);

    }
    else if(statekey.toLowerCase() == 'telangana'){
        resultkey = telanganakeywords.filter((state)=>{
            if(state.toLowerCase().includes(keyletter.toLowerCase())){
                return state;
            }
        });
        var jdata = { state : resultkey};
    
       return  res.json(jdata);
    }
return res.sendStatus(301);

})

app.post("/api/bothcheck",(req,res)=>{
    const {state,district} = req.body;
    console.log("the state and dist are",state,district)
    let both = 0;
    let statein = 0;
    let distin = 0;
    for(const item of statekeywords)
    {     console.log(item,state)
        if(item.toLowerCase() == state.trim().toLowerCase()){ statein = 1;
            console.log("the state and dist are in  inside",state,district)

        }
    }

    if(statein == 0) return res.json({both:0,state:1,district:0})

  if(state == 'andhra pradesh'){

    for(const item of andhrakeywords )
        {
            if(item.toLowerCase() == district.toLowerCase()) {distin = 1;
                console.log("the  dist are in  inside",state,district)
            }
        }

        if(distin == 0) return res.json({both:0,state:0,district:1})

    }

    else if(state == 'karanataka'){
        for(const item of karanatakakeywords )
            {
                if(item.toLowerCase() == district.toLowerCase()) distin = 1;
            }
    
            if(distin == 0) return res.json({both:0,state:0,district:1})

    }

    else if( state == 'tamil nadu'){
        for(const item of tamilkeywords )
            {
                if(item.toLowerCase() == district.toLowerCase()) distin = 1;
            }
    
            if(distin == 0) return res.json({both:0,state:0,district:1})


    }

    else if( state == 'telanagana'){
        for(const item of telanganakeywords)
            {
                if(item.toLowerCase() == district.toLowerCase()) distin = 1;
            }
    
            if(distin == 0) return res.json({both:0,state:0,district:1})


    }
   

   if(statein == 1 && distin == 1){
    return res.json({both:0,state:0,district:0});
   }
   else{
    return res.json({both:1,state:1,district:1});
   }
  

})

app.get("/api/getratesclient",async (req,res)=>{
    console.log("request recived");
const district = req.query.district.toUpperCase();
const state = req.query.state.toUpperCase();
console.log("the test is",req.query.test);

const test = req.query.test.toLowerCase();
console.log("afrer",test);
console.log("the request is",district,state,"the test is",test);

const hospitals = await hospmodel.find({
    State: state,
    District: district,
    tests: { $elemMatch: { testName: test } } 
}, {_id:1,
    nameOfHospital: 1,
    mitraContactNumber: 1,
    Address: 1,
    tests: { $elemMatch: { testName: test } } // Get the matching test object
});

const resultArray = hospitals.map(hospital => {
    const testInfo = hospital.tests[0]; // Get the first matching test (if any)
    return {
        id:hospital._id,
        nameOfHospital: hospital.nameOfHospital,
        mitraContactNumber: hospital.mitraContactNumber,
        address: hospital.Address,
        price: testInfo ? testInfo.price : null // Price will be null if no test found
    };
});

console.log(resultArray)

  return res.json(resultArray);



})



app.get("/api/protected",authroute,(req,res)=>{
    res.sendStatus(200);
})

app.post("/api/bookappointment",authroute,async (req,res)=>{
    console.log("recived bro")
   

    const {
        patientName,
        testname,
        gender,
        email,
        phone,
        area,
        city,
        state,
        postalCode,
        appointmentDate,
        timeSlot,
        additionalInfo,
        hospitalid,
        amount, 
        paymentMethod
    } = req.body;
    const appointmentDateObj = new Date(appointmentDate);
    console.log(patientName);

    try {
        const appointment = new Appointment({
            patientName,
            testname,
            gender,
            email,
            phone,
            area,
            city,
            state,
            postalCode,
            appointmentDate :appointmentDateObj,
            timeSlot,
            additionalInfo,
            hospitalid
        });

        const savedAppointment = await appointment.save();

        const transaction = new Transaction({
            amount,
            paymentMethod,
            appointmentId: savedAppointment._id
        });
        const savedTransaction = await transaction.save();
        savedAppointment.transaction = savedTransaction._id;
        await savedAppointment.save();


        return res.status(201).json({ success: true, appointment: savedAppointment });
    } catch (error) {
        console.error(error);
       return  res.status(500).json({ success: false, message: 'Failed to book appointment.', error });
    }

})

app.use((req, res, next) => {
    console.log("invalid url");
    res.status(404).json({ message: 'Resource not found' });
  });



app.listen(3001,()=>{
    console.log("backend server running at 3001");
})




