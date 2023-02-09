import { PrismaClient } from "@prisma/client";
import { json } from "express";

const prisma = new PrismaClient();


export const getEreport = async (req, res) => {
  const { id_student } = req.body;

    try {
        const response = await prisma.Ereport.findMany({
          select: {
            nilai: true,
            mapel: true
          },
          where: {
            id_ereport: id_student
          }
        });
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      } 
};

export const getAllEreport = async (req, res) => {

    try {
        const response = await prisma.Student.findMany({
          select: {
            nama_lengkap: true,
            kelas: true,
            ereport: true,
          },
          // where: {
          //   id_ereport: id_student
          // }
        });
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      } 
};