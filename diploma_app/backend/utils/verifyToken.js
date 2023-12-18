import jwt from "jsonwebtoken";
import { createError } from "./error.js";
export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, "You are not authenticated!"))
    }
    jwt.verify(token,"Hnvl743Hsfu&49fnHGiagbHFE3Hnvsd7", (err,user)=>{
        if(err) return next(createError(403, "Token is not valid!"))
        req.user = user;
        next();
    })
}
export const verifyUser = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.iduser == req.params.iduser || req.user.usertype=="адмін"){
            next()
        }else{
            return next(createError(403, "You are not authorized!"))
        }
    })
}
export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.usertype==="адмін"){
            next()
        }else{
            return next(createError(403, "You are not admin!"))
        }
    })
}
export const verifyPatient = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if( req.user.iduser == req.params.iduser && req.user.usertype==="пацієнт"){
            next()
        }else{
            return next(createError(403, "You are not authorized!"))
        }
    })
}
export const verifyDoctor = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.iduser == req.params.iduser && req.user.usertype==="лікар"){
            next()
        }else{
            return next(createError(403, "You are not authorized!"))
        }
    })
}