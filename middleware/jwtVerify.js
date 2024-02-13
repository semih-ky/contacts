const jwt = require('jsonwebtoken');

exports.jwtVerify = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({message: "Unauthorized!"});
  }
  const token = authHeader.split(" ")[1];

  const somePublicKey = "some-privateKey-pem";
  try {
    const decodeJwt = await jwtVerify(token, somePublicKey);
    req.decodeJwt = decodeJwt;
    next();
  } catch (error) {
    return res.status(401).json({message: error});
  }
};

const jwtVerify = (tkn, publicKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(tkn, publicKey, function (error, decoded) {
      if (error) {
        console.log("Error: ", JSON.stringify(error, null, 2));
        reject("Invalid token or expired!");
      };
      if (decoded) resolve(decoded);
    });
  });
};