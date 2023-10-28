const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    username : String,
    FileName : String,
    Code : String,
})

const FileSystem = mongoose.model('FileSystem', FileSchema);

module.exports = FileSystem;