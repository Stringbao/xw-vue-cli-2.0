

const ResponseEntity = {
    setEneity:options=>{
        if(!options){
            options = {
                res:res,
                status:"200",
                msg:"",
                data:[]
            }
        }else{
            options.status = options.status?options.status:"200";
            options.msg = options.msg?options.msg:"";
            options.data = options.data?options.data:[];
        }
        return options.res.status(200).json({status:options.status,msg:options.msg,data:options.data});
    }
}



module.exports = ResponseEntity;