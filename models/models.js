const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// let UserSchema = new Schema({
//     name: {type: String, required: true},
//     email: {type: String, required: true},
//     password: {type: String, required: true}
// });

let UserSchema = new Schema({
    username: String,
    email: String,
    description: String,
    category: String,
    password: String,
    salt: String
  }, {timestamps: true});


// let QuestionsSchema = new Schema({
//   question: String,
//   user: [{type: Schema.Types.ObjectId, ref: 'User'}],
//   category: String
// }, {timestamps: true});

// let AnswersSchema = new Schema({
//   answer: String,
//   question: [{type: Schema.Types.ObjectId, ref: 'Question'}],
//   user: [{type: Schema.Types.ObjectId, ref: 'User'}],
//   likes: Number
// }, {timestamps: true});

// let CommentsSchema = new Schema({
//   comment: String,
//   type: String,
//   question: [{type: Schema.Types.ObjectId, ref: 'Question'}],
//   answer: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
//   user: [{type: Schema.Types.ObjectId, ref: 'User'}],
//   likes: Number
// }, {timestamps: true});


// Export the model
module.exports = mongoose.model('User', UserSchema);