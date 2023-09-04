const prismaC = require("@prisma/client");
const prisma = new prismaC.PrismaClient();
const { hash } = require("bcrypt");

module.exports = {
  async createUser(req, res) {
    const { name, email, password } = req.body;
    try {
      let user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user) {
        return res.json({
          error: true,
          message: "Error: O usuário já está cadastrado!",
        });
      }

      const hashPassword = await hash(password, 8);

      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      });

      return res.json({
        error: false,
        message: "Sucesso: Usuário cadastrado com sucesso!",
        user,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },

  async findUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (error) {
      res.json({ message: error.message });
    }
  },
};
