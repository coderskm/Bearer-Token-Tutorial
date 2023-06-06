const {BadRequestError} = require("../errors");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.status(200).json({ msg: `user created`, token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNum = Math.floor(Math.random() * 100);
  return res.status(200).json({ msg: `hello, ${req.user.username}`, secret: `${luckyNum}` });
};

module.exports = { login, dashboard };

/* 
1> check username, password in POST request which is login:-
--> if exist create new JWT.
--> send back to front end.

2> setup authentication so only request with JWT can access dashboard
*/
