import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Pengaduan untuk masyarakat
export const SendPengaduan = async (req, res) => {
  const { id_pengaduan, nik, isi_laporan, jdl_laporan } = req.body;
  // console.log(req.body)
  // console.log(req.file)
  const today = new Date();
  
  if (!req.file) {
    res.status(422).json({ msg: "Image Harus di Upload" });
  } else {
    const image = req.file.path.replace(/\\/g, "/");

    try {
      const Pengaduan = await prisma.Pengaduan.create({
        data: {
          nik: nik,
          id_pengaduan: parseInt(id_pengaduan),
          jdl_laporan: jdl_laporan,
          isi_laporan: isi_laporan,
          foto: image,
          tgl_pengaduan: today,
          status: "Tertunda"
        },
        include: {
          author: true,
          tanggapan: true,
        },
      });
      res.json(Pengaduan);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
};

//Get pengaduan by NIK untuk masyarakat
export const GetAllPengaduanbyNik = async (req, res) => {
  const { nik } = req.body;

  try {
    const response = await prisma.Pengaduan.findMany({
      where: {
        nik: nik,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//Get pengaduan by Id_pengaduan untuk masyarakat
export const GetPengaduanbyID = async (req, res) => {
  const { id_pengaduan } = req.body;

  try {
    const response = await prisma.Pengaduan.findMany({
      include: {
        tanggapan: true,
      },
      where: {
        id_pengaduan: id_pengaduan,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//Get all pengaduan untuk admin dan petugas
export const GetAllPengaduan = async (req, res) => {
  try {
    const response = await prisma.Pengaduan.findMany({
      include: {
        tanggapan: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//Get pengaduan by Id_pengaduan untuk admin dan petugas
export const GetAllPengaduanbyID = async (req, res) => {
  const { id_pengaduan } = req.body;

  try {
    const response = await prisma.Pengaduan.findMany({
      include: {
        tanggapan: true,
      },
      where: {
        id_pengaduan: id_pengaduan,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//Delete pengaduan
export const DeletePengaduan= async (req, res) => {
  const { id_pengaduan } = req.body;

  try {
    const response = await prisma.Pengaduan.delete({
      where: {
        id_pengaduan: id_pengaduan
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

