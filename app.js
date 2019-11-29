const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
var cleverbot = require("cleverbot-free");

const app = express();//Se inicializa el servidor express}

/*Puerto desarrollo*/
//const port = 3000;//La aplicacion se ejecuta sobre el puerto 3000
/*Puerto produccion*/
const port =process.env.PORT || 8080;//La aplicacion se ejecuta sobre el puerto de produccion


//CORS Middleware
app.use(cors());//Permite el acceso a la aplicacion desde cualquier dominio

//Establecer static folder
app.use(express.static(path.join(__dirname,'public')));

//Body parser Middleware
app.use(bodyParser.json());

app.get('/:text', function(req,res){
  //Llamado a cleverbot
  const text = req.params.text;
  cleverbot(text).then(response => {
      res.send({chat:response});
  });
});

//Iniciar servidor
app.listen(port, function(){
	console.log('Server running on port '+port);
});
