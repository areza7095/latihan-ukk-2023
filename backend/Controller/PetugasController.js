import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";


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
      },
      where: {
        level: "petugas"
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

//Update Petugas
export const UpdatePetugas = async (req, res) => {
  const { id_petugas, password } = req.body;

  console.log(req.body)
  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const response = await prisma.Petugas.update({
      data: {
        password: hashPassword,
      },
      where: {
        id_petugas: id_petugas
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};