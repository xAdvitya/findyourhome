import bcrypt from "bcrypt"
export const register = async (req, res) => {
  const {username,email,password } = req.body;

  const hashedPassword = await bcrypt.hash(password,10)

  // const newUser
};

export const login = (req, res) => {
  console.log('first');
};

export const logout = (req, res) => {
  console.log('first');
};
