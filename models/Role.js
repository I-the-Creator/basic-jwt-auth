// Scheme of 'Role' entity

const { Schema, model } = require('mongoose')

//Schema - как пользователь хранится в БД
const Role = new Schema({
    value: {type: String, inique: true, default: "USER"},
})

//Model
module.exports = model('Role', Role);  // model name and schema as a paremeters