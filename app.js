const express = require ("express")
const app = express()
const multer  = require("multer")
const FileStorageEngine = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, "./uploads", )
    },
    filename: (req, file,cb )=>{
        cb(null,"1.xlsx")
    }
    
})



async function start(){
    try{
        
        const upload = multer({storage: FileStorageEngine,})

        app.use(multer({dest:"uploads"}).single("filedata"));

        app.post("/upload",upload.single('1'), (req, res) => {
             console.log (req.file)
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