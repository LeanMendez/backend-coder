export const checkLogin = (req, res, next) =>{
    if(req.user) next()
    res.json({message: "Por favor, inicia sesion."})
}