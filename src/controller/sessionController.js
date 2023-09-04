const prismaC = require("@prisma/client");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new prismaC.PrismaClient();

module.exports = {
  async createSession(req, res) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.json({ message: "Usuário ou senha incorretas / email" });
      }

      const checkPassword = await compare(password, user.password);

      if (!checkPassword) {
        return res.json({ message: "Usuário ou senha incorretas / senha" });
      }

      const token = jwt.sign({ id: user.id }, "is8jd3j3ejnfunoir3r9j34n", {
        expiresIn: "1d",
      });

      delete user.password;

      return res.json({ user, token });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};
