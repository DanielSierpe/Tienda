'use strict'


var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'daniel123';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        nombres: user.apellidos,
        apellidos: user.apellidos,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(7,'days').unix()
    }

    return jwt.encode(payload,secret);
}