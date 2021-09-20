
var hbs = require('handlebars');
var firebase = require("firebase");
const nodemailer = require('nodemailer');

var firebaseConfig = {
    /////////////////////////////////////////////
    //|Cole o Codigo De Conexão Com FireBase|///
    ///////////////////////////////////////////
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

exports.GuardarEmail = function(S){
    let Email = S;
    db.collection('Emails').add({ 
        Email: Email,            
    })
}

exports.EnviarAlterado = function(assunto,titulo,texto,url_img){
    var transporte = nodemailer.createTransport({
        host:'<servidor SMTP>',
        port: '<Porta>',
        auth: {
            user: '<Email>',
            pass: '<Senha>'
        } 
      });
      
      var template = hbs.compile('' + 
        '<h1>Olá {{nome}} {{sobrenome}}!</h1>' +
        '<p>É com grande prazer que venho dizer oi!</p>' +
        '<small>Clique <a href="http://seusistema.com.br?desinscrever={{email}}">aqui</a> para desinscrever-se.</small>' +
        '');
      
      var config = {
        remetente: 'Ebook Salve Seu Casamento <Email de quem enviou>',
        assunto: assunto
      };
      
      db.collection('Emails').onSnapshot(function(data){ 
          
          const Emails = []
          data.docs.map(function(val){
            Emails.push(val.data().Email);
          }) 
          var Usuarios = Emails
          function enviarA(i){
            var usuario = Usuarios[i];
          
            if(!usuario){
              transport.close();  
              return console.log('Acabamos de enviar!');
            }
            var html = template(usuario);
          
            transporte.sendMail({
              from: config.remetente,
              to: usuario,
              subject: config.assunto,
              htm: html
            }, function(err){
          
            if(err)
                throw err;
            console.log('E-mail para %s enviado!', usuario);
            enviarA(++i);
            });
          };
          
          enviarA(0);
    })  
}

exports.EnviarPadrao = function(){
    var transporte = nodemailer.createTransport({
        host:'<servidor SMTP>',
        port: '<Porta>',
        auth: {
            user: '<Email>',
            pass: '<Senha>'
        } 
      });
      
      var config = {
        remetente: 'Salve Seu Casamento <homemconfiante.suporte@gmail.com>',
        assunto: 'Nossos Produtos'
      };
      
      db.collection('Emails').onSnapshot(function(data){ 
          const Emails = []
          data.docs.map(function(val){
            Emails.push(val.data().Email);
          }) 
          var Usuarios = Emails
          function enviarP(i){
            var usuario = Usuarios[i]; 
          
            if(!usuario){
              transport.close();  
              return console.log('Acabamos de enviar!');
            }
        
            transporte.sendMail({
              from: config.remetente,
              to: usuario,
              subject: config.assunto,
              html: `
                    <h1>Ola</h1>
                    <p>Então após 10 minutos refletindo, largo tudo,<br>
                    fecho a janela e volto pro meu mundo dentro do quarto.<br>
                    Não sei até quando, não sei o porquê, só sei que tá tudo tão<br>
                    errado e quero me livrar disso o quanto antes.<br> 
                    E tu não tem nem ideia do quanto, amor meu.</p><br>
              `
            }, function(err){
          
              if(err)
                throw err;
              console.log('E-mail para %s enviado!', usuario);

              enviarP(++i);
            });
          };
          enviarP(0);
      })  
}
