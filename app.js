const express = require ("express")
const app = express()
const multer  = require("multer")




async function start(){
    try{
        
        app.use(multer({dest:"uploads"}).single("filedata"));
        app.post("/upload", function (req, res, next) {
            
            let filedata = req.file;
             console.log(filedata);
             if(!filedata)
             res.send("Ошибка при загрузке файла");
             else
             res.send("Файл загружен");
        });

        app.listen(5000, ()=> console.log("App has been started on 5000 port"))

    }
    catch(e)
    {
        console.log (e)

    }
}

start()