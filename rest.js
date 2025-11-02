// follows 5 principles
// one is it follows HTTP Protocols and thats are
// GET POST PUT PATCH DELETE
import axios from "axios";

// 1.GET
app.get("/", async (req,res) => {
  try{
    const response = await axios.get("URL",{
      params: {
        ID: 123,
      },
    });
    res.json({data: response.data});
  } catch(error){
    res.status(404).send(error.response.data);
  }
});

// 2.POST
app.post("/", async (req,res) => {
  try{
    await axios.post("URL",body,config);
    res.sendStatus(201);
  } catch  (error) {
    res.status(404).send(error.response.data);
  }
});

//PUT
app.put("/", async (req,res) => {
  try{
    await axios.put("URL",body,config);
    res.sendStatus(200);
  } catch (error){
    res.status(404).send(error.response.data);
  }
});

//PATCH
app.patch("/", async (req,res) => {
  try{
    await axios.patch("URL",body,config);
    res.sendStatus(200);
  } catch (error){
    res.status(404).send(error.response.data);
  }
});

//DELETE
app.delete("/", async (req,res) => {
  try{
    await axios.delete("URL",config);
    res.sendStatus(200);
  } catch (error){
    res.status(404).send(error.response.data);
  }
});
