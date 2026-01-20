import { User } from "./data"
import {H3Event} from 'h3'

//Auth helpers
export const generateToken=(userId:string):string=>{
  return Buffer.from(JSON.stringify({userId,exp:Date.now()+86400000})).toString('base64')
}

export const verifyToken=(token:string):{userId:string}|null=>{
    try {
        const decoded= JSON.parse(Buffer.from(token,'base64').toString())
        if(decoded.exp<Date.now()){
            return null
        }
        return {userId:decoded.userId}
    } catch {
        return null       
    }
}

export const getUserFromToken = (event: H3Event): { userId: string } | null => {
  const token = getCookie(event, 'admin_token')
  if (!token) return null
  return verifyToken(token)
}

export const requireAuth=(event:H3Event)=>{
    const user=getUserFromToken(event)
    if(!user){
        throw createError({
            statusCode:401,
            statusMessage:"Unauthorized"
        })
    }
    return user
}


export const requireAdmin=(event:H3Event,userRole:string)=>{
    if(userRole!=='admin'){
        throw createError({
            statusCode:403,
            statusMessage:"Forbidden - Admin access required"
        })
    }
}

export const sanitizeUser=(user:User)=>{
    const {password,...sanitized}=user
    return sanitized

}