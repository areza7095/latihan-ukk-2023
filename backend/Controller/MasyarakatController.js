import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Get all Masyarakat untuk admin
export const GetAllMasyarakat = async (req, res) => {
    try {
      const response = await prisma.Masyarakat.findMany({
        select: {
            nik: true,
            nama: true,
            username: true,
            telp: true,
            verifikasi: true   
        }
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  //Update Status Tanggapan
export const updateStatusVerifikasi = async (req, res) => {
  const { nik, verifikasi } = req.body;
  
  try {
    const Pengaduan = await prisma.Masyarakat.update({
      data: {
        verifikasi: verifikasi
      },
      where: {
        nik: nik
      }
    });

    //   });
    res.json(Pengaduan);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}