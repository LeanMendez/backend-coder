import express from 'express'
import { fork } from 'child_process'
import { info } from '../child/info.js'

const random = express.Router();

random.get('/info', async (req, res)=>{
res.render('info', {info})
})

random.get('/api/randoms', async (req, res) => {
    const child = fork("src/child/child.js");
    child.on("message", (msgChild)=> {
    //compruebo la flag enviada por el hijo
    if(msgChild === "listo") {
      const {cant} = req.query
          child.send(cant)
          console.log(req.query)
    }else{
          res.render("tableNumbers", { msgChild });
    }
  });
});

export {random}