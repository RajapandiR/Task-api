import jwt from "jsonwebtoken"

class JWTClass {

    issueToken(payload: any) {
        return jwt.sign(payload, process.env.TOKEN_SECRET,
            //   { expiresIn: '100m' }
        );
    }

    verifyToken(payload: any) {

        return jwt.verify(payload, process.env.TOKEN_SECRET)
    }

}

export const JWT = new JWTClass()