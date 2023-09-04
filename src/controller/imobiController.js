const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async createImobi(req, res) {
    try {
      const thumb = req.file.filename;

      const {
        id,
        name,
        email,
        telefone,
        tipo,
        endereco,
        cidade,
        uf,
        valor,
        descricao,
      } = req.body;

      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        return res.json({ message: "Usuário não encontrado" });
      }

      const slugify = (str) =>
        str
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "");

      const slug = slugify(tipo);

      const imobi = await prisma.imobi.create({
        data: {
          thumb,
          tipo,
          endereco,
          cidade,
          uf,
          valor,
          descricao,
          name,
          email,
          telefone,
          slug,
          userId: user.id,
        },
      });

      return res.json({
        error: true,
        message: "Sucesso: Imóvel cadastrado com sucesso!",
        imobi,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
  async findAllImobi(req, res) {
    try {
      const imobi = await prisma.imobi.findMany();

      return res.json(imobi);
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
  async findAllId(req, res) {
    const { id } = req.params;
    try {
      const imobi = await prisma.imobi.findUnique({ where: { id } });

      if (!imobi) {
        return res.json({ message: "O imovel não foi encontrado" });
      }

      return res.json(imobi);
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
  async findImobi(req, res) {
    try {
      const { slug } = req.params;

      const imobi = await prisma.imobi.findFirst({
        where: {
          slug,
        },
      });
      if (!imobi) {
        return res.json({
          message: "Não encontramos nenhum imóvel cadastrado",
        });
      }

      return res.json(imobi);
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};
