const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
       const userId = decodedToken.userId;
       const is_moderateur = decodedToken.is_moderateur;
       req.auth = {
           userId: userId,
           moderateur: is_moderateur 
       };
	next();
   } catch(error) {
       res.status(401).json({ message: "Vous devez vous connecter !" });
   }
};