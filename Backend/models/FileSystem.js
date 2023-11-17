const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    userid : String,
    username : String,
    FileName : String,
    Code : String,
    Language : String,
})

const FileSystem = mongoose.model('FileSystem', FileSchema);

module.exports = FileSystem;