import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getProfile = async (req, res) => {
  const { id_student } = req.body;

    try {
        const response = await prisma.Student.findMany({
          select: {
            nisn: true,
            nama_lengkap: true,
            kelas: true,
            alamat: true,
            jenis_kelamin: true
          },
          where: {
            id: id_student
          }
        });
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      } 
};

export const getAllProfile = async (req, res) => {

    try {
        const response = await prisma.Student.findMany({
          select: {
            nisn: true,
            nama_lengkap: true,
            kelas: true,
            alamat: true,
            jenis_kelamin: true
          }
        });
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      } 
};