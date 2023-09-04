const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async createMessage(req, res) {
    const { client_name, client_email, client_message, userId } = req.body;

    try {
      let messagem = await prisma.messagens.findFirst({
        where: { client_email },
      });

      if (messagem) {
        return res.json({
          error: true,
          message:
            "Ops, sua menssagwm já foi cadastrada, aguarde a resposta do anunciante",
        });
      }

      messagem = await prisma.messagens.create({
        data: {
          client_name,
          client_email,
          client_message,
          userId,
        },
      });

      return res.json({
        error: false,
        message: "Sucesso: Menssagem cadastrada com sucesso!",
        messagem,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
  async findMenssage(req, res) {
    try {
      const { id } = req.params;

      const messages = await prisma.messagens.findMany({
        where: { userId: id },
      });

      return res.json({
        messages,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};
