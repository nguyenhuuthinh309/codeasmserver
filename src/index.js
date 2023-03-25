const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const http = require("http");
const Collection1 = require('./mongodb');


const templatePath = path.join(__dirname,'../tempelates');

const publicPath = path.join(__dirname, '../public');


const weblab = path.join(__dirname, '../weblab')
console.log(publicPath);
app.use(express.json());
app.set('view engine','hbs');
app.set('views',templatePath);

app.use(express.urlencoded({extended:false}))



app.get('/', (req, res) => {
    res.render('login')
});
app.get('/signup', (req, res) => {
    res.render('signup')
});

app.get('/signup', (req, res) => {
    res.render('signup')
});


app.post('/signup',async (req, res) => {
const data={
    name: req.body.name,
    password: req.body.password
}
await Collection1.insertMany([data])

res.render('login');

})


app.get('/list', (req, res) => {
    Collection1.find({}).then(taikhoan1 =>{
        res.render('view_taikhoan',{
            taikhoan:taikhoan1.map(taikhoan2 => taikhoan2.toJSON())
        })
    })
 
});

// app.get("/edit/:id", (req, res) => {
//     Collection1.findById(req.params.id, (err, taikhoan1) =>{
//          if (!err) {
//         res.render('/signup.hbs', {
//             taikhoan: taikhoan1.toJSON()
//         })
//     }
//     })
   
// })

app.post('/login', async (req, res) => {

    try {
        const check = await Collection1.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("AddorEdit", { naming: `${req.body.password}+${req.body.name}` })
        }
        else {
            res.send("incorrect password")
        }
    } 
    catch (e) {
    res.send("wrong details")
        

    }
});

app.get("/del/:id",async (req, res) => {
    try{
        const taikhoan = await Collection1.findByIdAndDelete(req.params.id,req.body);
        if(!taikhoan) res.status(404).send("no item  found");
        else{
            res.redirect("/list");
        }
        res.status(200).send();

    }catch(error) {
        res.status(500).send(error);
    }
    });
   


// Collection1.findById('641dadb8c4d900495ace2525',(error,data)=>{
//     if(error){
//         console.log(error);
//     }else{
//         console.log(data);
//     }
// })

// app.post('/add',async (req, res) => {
//     const data1={
//         name: req.body.name,
//         password: req.body.password,
//         email: req.body.email,
//         files: req.body.files
//     }
//     await Collection1.insertMany([data1])
    
//     res.render('AddorEdit');
    
//     })

app.listen(8000,()=>{
    console.log('porrt connectedn')
})