import jwt from "jsonwebtoken"
import { env } from "../utils/env"

export class jwtService {
    public static generateToken(id: string) {
        const token = jwt.sign({id}, env.jwtSecret!, { expiresIn: '5d' })
        return token
    }
    public static verifyToken(token: string) {
        const decoded = jwt.verify(token, env.jwtSecret!)
        return decoded
    }
}