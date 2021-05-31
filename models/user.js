const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type:String
    },
    password: {
        type:String
    },
    name: {
        type: String
    },
    postings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Posting'
        }
    ]
});
userSchema.methods.RemovePosting = function(postingId){
    console.log(postingId);
    const updatedPostings = this.postings.filter(posting => {
        return posting._id.toString() !== postingId.toString()
    })
    this.postings = updatedPostings;
    return this.save();
}

module.exports = mongoose.model('User', userSchema);