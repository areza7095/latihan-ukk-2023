import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Mengirimkan Tanggapan
export const SendTanggapan = async (req, res) => {
    const { tgl_tanggapan, tanggapan, id_petugas, id_pengaduan } = req.body;
    
    try {
      const Pengaduan = await prisma.Tanggapan.create({
        data: {
          tgl_tanggapan: tgl_tanggapan,
          tanggapan: tanggapan,
          id_petugas: id_petugas,
          id_pengaduan: id_pengaduan
        },
        include: {
          author: true,
          user: true
        }
      });
  
      //   });
      res.json(Pengaduan);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
};

//Update Tanggapan
export const updateTanggapan = async (req, res) => {
    const { tgl_tanggapan, tanggapan, id_petugas, id_pengaduan } = req.body;
    
    try {
      const Pengaduan = await prisma.Tanggapan.update({
        data: {
          tgl_tanggapan: tgl_tanggapan,
          tanggapan: tanggapan,
          id_petugas: id_petugas,
          id_pengaduan: id_pengaduan
        },
        where: {
          id_pengaduan: id_pengaduan
        }
      });
  
      //   });
      res.json(Pengaduan);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
};