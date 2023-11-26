const cartdbModel = require('../models/cartdbModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "CLAVE_ULTRA_SECRETA";

const parseToken = (token) =>{
    const decoded = jwt.decode(token, SECRET_KEY)
    const { nameLogin } = decoded
    const nameWitoutAt = nameLogin.split('@')[0]
    return nameWitoutAt
}

const postCartItem = async (req, res)=>{
    const token = req.headers['cookie'].replace('access-token=', '')

    const modelResponse = await cartdbModel.postCartItem(req.body.id, parseToken(token))

    if (modelResponse == true){
        res.status(200).send('OK')
    }else{
        res.status(300).send('Algo anda mal...')
    }
}

const getCartItems = async (req, res)=>{
    const token = req.headers['cookie'].replace('access-token=', '');
    const modelResponse = await cartdbModel.getCartItems(parseToken(token));
    if(modelResponse != false){
        res.status(200).send(modelResponse)
    }else if(modelResponse.length == 0){
        res.status(400).send('no hay elementos en su carrito')
    }else{
        res.status(300).send('algo salió mal')
    }
}

const deleteCartItem = async (req, res)=>{
    const token = req.headers['cookie'].replace('access-token=', '');
    const modelResponse = await cartdbModel.deleteCartItem(req.body.id, parseToken(token));
    if (modelResponse == false){
        res.status(300).send('algo salió mal');
    }else{
        res.status(200).send('OK')
    }
}

module.exports = {
    postCartItem,
    getCartItems,
    deleteCartItem
}