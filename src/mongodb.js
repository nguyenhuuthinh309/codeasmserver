const mongoose = require('mongoose');

const url = "mongodb+srv://thinh309:thinh3092003@cluster0.adfcye6.mongodb.net/asm?retryWrites=true&w=majority";

mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log("kết nối thành công");
})
.catch((err)=>{
    throw err;
});

const LogInSchema = new mongoose.Schema({

name: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true
}
})

const Collection1 = new mongoose.model("taikhoan",LogInSchema);
module.exports = Collection1

// const LogInSchema1 = new mongoose.Schema({

//     fullname: {
//     type: String,
//     required: false
// },
// email: {
//     type: String,
//     required: false
// },
// password: {
//     type: String,
//     required: false
// },
// files:{
//     type: Array,
//     required: false
// }
// })

// const Collection = new mongoose.model("user",LogInSchema1);
// module.exports = Collection
