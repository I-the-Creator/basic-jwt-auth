// Scheme of 'User' entity

const { Schema, model } = require('mongoose')

//Schema - как пользователь хранится в БД
const User = new Schema({
    username: {type: String, inique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}]  // набор ролей пользователя 
})

//Model
module.exports = model('User', User);  // model name and schema as a paremeters