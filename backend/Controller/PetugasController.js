import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Get all Masyarakat untuk admin
export const GetAllPetugas = async (req, res) => {
    try {
      const response = await prisma.Petugas.findMany({
        select: {
          id_petugas: true,
          nama_petugas: true,
          username: true,
          telp: true,  
      }
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

//Delete Petugas
export const DeletePetugas = async (req, res) => {
  const { id_petugas } = req.body;

  try {
    const response = await prisma.Petugas.delete({
      where: {
        id_petugas: id_petugas
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};