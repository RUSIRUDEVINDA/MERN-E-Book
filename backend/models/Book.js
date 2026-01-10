import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        default:"",
    },
    content:{
        type:String,
        default:"",
    },
})

const bookSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    subtitle:{
        type:String,
        default:"",
    },
    author:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
        default:"",
    },
    chapters:[chapterSchema],
    status:{
        type:String,
        enum:['draft','published'],
        default:'draft',
    }
},
 {timestamps:true}
);

//  Create model
const Book = mongoose.model('Book', bookSchema);

//  Export model
export default Book;