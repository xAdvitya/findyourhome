import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'not Authenticated!' });
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
      if (err) return res.status(401).json({ message: 'token not valid!' });
      res.status(200).json({ message: 'Authenticated!' });
      req.userId = payload.id
      next();
    });

}