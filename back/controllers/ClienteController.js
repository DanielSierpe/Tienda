'use strict'

var Cliente = require('../models/cliente');
var jwt = require('../helpers/jwt');
var bcrypt = require('bcrypt-nodejs');

const registro_cliente = async function(req,res){
    var data = req.body;
    var clientes_Arr = [];

    clientes_Arr = await Cliente.find({email:data.email});
    if(clientes_Arr.length == 0){
      
        if(data.password){
            bcrypt.hash(data.password,null,null, async function(err,hash){
                if(hash){
                    data.password = hash;
                    var reg = await Cliente.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message:'ErrorServer',data:undefined}); 
                }
            })
        }else{
            res.status(200).send({message:'NO HAY UNA CONTRASEÑA',data:undefined});  
        }

    }else{
        res.status(200).send({message:'El correo ya existe en la base de datos',data:undefined});

    }

  }


const login_cliente = async function(req,res){
    var data =req.body;
    var clientes_Arr = [];
    clientes_Arr = await Cliente.find({email:data.email});
    if(clientes_Arr.length==0){
        res.status(200).send({message: 'No se encontro el correo', data: undefined});
    }else{
        let user = clientes_Arr[0];
        bcrypt.compare(data.password, user.password, async function(error,check){
            if(check){
                res.status(200).send({data:user,
                token: jwt.createToken(user)
                });
                
            }else{
                res.status(200).send({message: 'La contraseña no coincide', data: undefined}); 
            }
        });
   
    }
}   
   
module.exports = {
    registro_cliente,
    login_cliente
}