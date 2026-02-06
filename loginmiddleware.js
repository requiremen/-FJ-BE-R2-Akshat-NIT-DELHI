const loginmiddleware = function(req,res,next){
    const body = ({
        Useremail : req.body.Useremail,
        Password: req.body.Password
    })
    const parsingbody = loginSshema.safeParse(body);
    if(!parsingbody.success){
        res.status(400).send({
            msg : "invalid data"
        })
        return;
        
    }res.validatebody = parsingbody.data;
    next();

}
