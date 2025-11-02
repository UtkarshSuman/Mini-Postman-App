import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// To make css file working
app.use(express.static("public")); //this makes /public accessible
app.set("views", "./views");
app.set("view engine", "ejs");

app.set("views",path.join(__dirname,"views"));

const API_URL = "https://secrets-api.appbrewery.com";

const bearerToken = "0cf78a78-6985-4fc9-ab4e-a65013b4b1f0 ";
const config = {
  headers: { Authorization: `Bearer ${ bearerToken }` },
};

app.use(bodyParser.urlencoded({ extended: true}));

app.get("/",(req,res)=>{
  res.render("restAPIproject.ejs",{ content: "waiting for the data......" });
  res.render("restAPIproject");
});

app.post("/get-secret", async (req,res)=>{
  const id = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + id, config);
    res.render("restAPIproject.ejs",{ content: JSON.stringify(result.data)});  
  } catch (error) {
    res.render("restAPIproject.ejs",{ content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req,res)=>{
  try{
    const result = await axios.post(API_URL+"/secrets",req.body,config);
    res.render("restAPIproject.ejs",{ content: JSON.stringify(result.data)});
  } catch (error){
    res.render("restAPIproject.ejs",{ content: JSON.stringify(error.response.data)});
  }
});

app.post("/put-secret", async (req,res)=>{
  const id = req.body.id;
  try{
    const result = await axios.put(API_URL+"/secrets/"+id,req.body,config);
    res.render("restAPIproject.ejs",{ content: JSON.stringify(result.data)});
  } catch (error){
    res.render("restAPIproject.ejs",{ content: JSON.stringify(error.response.data)});
  }
});

app.post("/patch-secret", async (req,res)=>{
  const id = req.body.id;
  try{
    const result = await axios.patch(API_URL+"/secrets/"+id,req.body,config);
    res.render("restAPIproject.ejs",{ content: JSON.stringify(result.data)});
  } catch (error){
    res.render("restAPIproject.ejs",{ content: JSON.stringify(error.response.data)})
  }
});

app.post("/delete-secret", async (req,res)=>{
  const id = req.body.id;
  try{
    const result = await axios.delete(API_URL+"/secrets/"+id,config);
    res.render("restAPIproject.ejs",{ content: JSON.stringify(result.data)});
  } catch (error) {
    res.render("restAPIproject.ejs",{ content: JSON.stringify(error.response.data)});
  }
});

app.listen(port,()=>{
  console.log(`Server is running on port: ${port}.`);
});