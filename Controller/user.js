const User = require('../Models/users');
const Order = require('../Models/order');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateAccessToken(id){
    return jwt.sign(id, "secretkey");
}

exports.signUp = (req, res, next) =>{
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const password = req.body.password;

    const saltRounds = 10;
    

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            // Store hash in your password DB.
            if(err){
                res.json({message: 'Unable to create new user'})
            }
            User.create({ name, email, contact, password: hash }).then(() => {
                res.status(201).json({message: 'Successfuly created new user'})

            }).catch(err => {

                res.status(403).json(err.errors[0].message);
            })

        });
    });
}

exports.login = (req, res, next) => {
    
    const email= req.body.email;
    const password = req.body.password;
    User.findAll({where: {email:email}}).then(user => {
        if(user[0] != undefined){
            bcrypt.compare(password, user[0].password, (err, response) => {
                if(err){
                    return res.json({success: false, message: 'Something went wrong'});
                }
                if(response){

                    const jwtToken = generateAccessToken(user[0].id);

                    res.json({token: jwtToken, success: true, message: 'Successfully logged In' , user: user})
                }
                else{
                    return res.status(401).json({success: false, message: 'Password does not match'});
                }
            })
        }
        else{
            return res.status(404).json({success: false, message: 'User Not Found'})
        }
    })
    .catch(err => {
        console.log(err);
    })
    
}

exports.checkPremium = async (req, res, next) => {

        const id = req.user.id;
        Order.findAll( {where: {userId: id}} )
        .then( user => {
            if(user[0] != undefined){
                return res.status(200).json({ message: "premium user" });
            }else{
                return res.status(404).json( {message: 'This User is Not a Premium Member yet'});
            }
        }).catch (err => {
        console.log(err);
         });
}