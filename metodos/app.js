
//-----------Dependencias-----------------------------
var app=require("express")();
var http=require("http").Server(app);
const bodyParser=require('body-parser');
const { parse } = require("path");
var io=require("socket.io")(http);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})
http.listen(process.env.PORT||3000,function(){
    console.log("listen in 3000");
}); 

console.log('crecimiento y decademiento');
//var pd=0.138629;

//var t=5;
//var p=2;
//var h=0.2;

io.on("connection",async(socket)=>{

    
        console.log("Nueva conexion");
    
    //toma el objeto mensaje lo crea y lo imprime en el chat 
        socket.on("nuevo_mensaje",function(ejercicio){
            
            var i=0;
            var pd=ejercicio.pad;
            var t=ejercicio.ta;
            var p=ejercicio.pa;
            var h=ejercicio.ha;
            //parseados
            pd=parseFloat(pd);
            t=parseFloat(t);
            p=parseFloat(p);
            h=parseFloat(h);

            console.log(h);
            for(i=0;i<=20;i++){

            p=p+(pd*p)*((t+h)-t);
            t=t+h;
            
            printmensaje =`<strong>Respuesta #${i}<br>Valor de P=${p}</strong><BR>Valor de T=${t}`;
            io.emit("nuevo_mensaje",printmensaje);
    
            }
            
        });
    
        socket.on("disconect", function(){
            console.log("desconexion");
        });
        
    });
    
   


