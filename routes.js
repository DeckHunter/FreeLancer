const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const app = express();

const port = 5000;

//Enviar Um Para Outra Pagina Ou Rota
//<button type="submit" class="btn btn-primary"><a routerLink="/operator">Criar</a></button

const Email_Functions = require('./src/FireBase')

var EC = "aG9tZW1jb25maWFudGUuc3Vwb3J0ZUBnbWFpbC5jb20="
var DEC = new Buffer(EC, "base64").toString("ascii")

//var SC = "TWIxNDA4OTY="
//var DSC = new Buffer(SC, "base64").toString("ascii")

app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.get('/',function(res,res){
    res.sendFile(__dirname+"/src/PaginaPrincipal.html")
})
app.get('/cadastro',function(res,res){
    res.sendFile(__dirname+"/src/index.html")
})
app.post('/guardar',(req,res)=>{
    const E =  req.body.fEmail;
    if(E === DEC){
        console.log("É O Dono ? : "+E)  
        res.sendFile(__dirname+"/src/PaginaDono.html") 
    }else{
        console.log("Email ADD : "+E)
        Email_Functions.GuardarEmail(E);
        res.sendFile(__dirname+"/src/Caminho.html");
    }
})

app.post('/enviarAlterado',(req, res)=>{
    const Assunto = req.body.fsubject;
    const Titulo = req.body.fTitulo;
    const Texto = req.body.ftext;
    const UrlImg = req.body.URLimg;
    res.send('<h1>Enviado Com Sucesso</h1>')
    Email_Functions.EnviarAlterado(Assunto,Titulo,Texto,UrlImg)
})
app.post('/enviarPadrao', (req, res) => {
    res.send('<h1>Enviado Com Sucesso</h1>')
    Email_Functions.EnviarPadrao()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
