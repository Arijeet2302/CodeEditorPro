const router = require('express').Router();
const FileSystem = require("./models/FileSystem");


addFile = async(req,res)=>{
    const {userid,username,FileName,Code,Language} = req.body;
    
    const documents = await FileSystem.find(
        { $and : [
            {userid : { $eq : userid}},
            {FileName : { $eq : FileName}},
            {Language : { $eq : Language}},
        ]
        });

    if (documents.length != 0){
        return res.send({msg: "FileName Already Exists"});
    }else{
        await FileSystem.create({userid,username,FileName,Code,Language});
        return res.send({msg : "File Saved"});
    }
}

deleteFile = async(req,res)=>{
    try{
        const {userid,FileName} = req.body;
        const deleteDocument = await FileSystem.findOneAndDelete(
            { $and : [
                {userid : { $eq : userid}},
                {FileName : { $eq : FileName}},
            ]
            });
  
        if (!deleteDocument){
            return res.send({msg : "File Not Found!!"});
        }
        return res.send({msg : "File deleted Succesfully"});
    }catch (e) {
        console.error("Error deleting Document: ",e);
        return res.send({msg: "Internal server Error"});
    }
}

showFiles = async(req,res)=>{
    try{
        const {userid} = req.body;
        const documents = await FileSystem.find({ userid : { $eq : userid}});
        return res.send(documents); 
    }catch(err){
        console.error("Error retrieving files", err);
    }
}

updateFile = async(req,res)=>{
    const {userid,FileName,Code,Language} = req.body;
    
    try{
        const document = await FileSystem.findOneAndUpdate(
            { $and : [
                {userid : { $eq : userid}},
                {FileName : { $eq : FileName}},
                {Language : { $eq : Language}},
            ]
            },
            { $set : { Code : Code}},
            { returnOriginal : false},
            );

        if (document){
            return res.send({msg : "File Saved!!"});
        }else{
            return res.send({msg : "File Not Found!!"}) 
        }
    }catch(err){
        console.log("Error while updating document",err);
        return res.send({msg:"Internal Server Error"});
    }

}

router.post("/add", addFile);
router.delete("/delete", deleteFile);
router.post("/files", showFiles);
router.post("/updateFile", updateFile);
module.exports = router;