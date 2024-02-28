const express=require("express");
const cors=require("cors");
const sql=require("mssql");

const app=express();
app.use(express.json());
app.use(cors());
require('dotenv').config();
const dbConfig = {
    user: "vidya",
    password: "vv122004@S",
    server: "vidya-server.database.windows.net",
    database: "EMS",
    options: {
     // encrypt: true, 
      trustedConnection:false,
      enableArithAbort:true,
      trustServerCertificate: true,
    }
  };
  
  app.get('/', async(req,res)=>{
    try{
        await sql.connect(dbConfig);
        const response= await sql.query`select * from Employees`;
        res.json(response.recordset);
    }
    catch(err){
        console.error(err);
    }
  })

  app.post('/insert',async(req,res)=>{
    const {firstname, lastname, department, designation, salary, city,state,pincode,country,street,
      dob, age, gender, saccess, serverlevel, awards, award1, award2, award3, email, password, 
      certifications, cert1, cert2, cert3, url1, url2, url3, education}=req.body;
    try{
        await sql.connect(dbConfig);
        const response=await sql.query`INSERT INTO Employees (
          firstname, lastname, dob, email, pw, awards, award1, award2, award3, 
          age, designation, department, salary, address_street, address_area, 
          address_city, address_country, address_pincode, gender, saccess, 
          server_level, certifications, cert1, cert1_url, cert2, cert2_url, 
          cert3, cert3_url, education
        )
        VALUES (
          ${firstname}, ${lastname}, ${dob}, ${email}, ${password}, 
          ${awards}, ${award1}, ${award2}, ${award3}, ${age}, 
          ${designation}, ${department}, ${salary}, ${street}, 
          ${city},${state}, ${country}, ${pincode}, ${gender}, 
          ${saccess}, ${serverlevel}, ${certifications}, ${cert1}, 
          ${url1}, ${cert2}, ${url2}, ${cert3}, ${url3}, ${education}
        );`
        res.json(response.recordset);
    }
    catch(err){
      console.error(err);
    }
  })

const port = process.env.PORT ||  5000;
app.listen(port, ()=>{
    console.log("listening");
})
