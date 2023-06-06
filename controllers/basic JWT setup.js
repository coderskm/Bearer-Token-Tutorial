const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("please provide email and password", 400);
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.status(200).json({ msg: `user created`, token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No Token Provided", 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    const luckyNum = Math.floor(Math.random() * 100);
    return res.status(200).json({ msg: `hello, ${decoded.username}`, secret: `${luckyNum}` });
  } catch (err) {
    throw new CustomAPIError("Not Authorized", 401);
  }
  //console.log(token);
  //console.log(req.headers);
};

module.exports = { login, dashboard };

/* 
1> check username, password in POST request which is login:-
--> if exist create new JWT.
--> send back to front end.

2> setup authentication so only request with JWT can access dashboard
*/
