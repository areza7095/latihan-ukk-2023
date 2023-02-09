import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Sending Attendance from User
export const UserAttendance = async (req, res) => {
  const {  jam_absen, long, lat, lokasi, tanggal, id_student  } = req.body;
  
  try {
    const SendAttendance = await prisma.Attendance.create({
      data: {
        jam_absen: jam_absen,
        long: long,
        lat: lat,
        lokasi: lokasi,
        tanggal: tanggal,
        id_attendance: id_student,
      },
      include: {
        student: true
      }
    });

    //   });
    res.json(SendAttendance);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


export const getAllAttendance = async (req, res) => {

  try {
      const response = await prisma.Student.findMany({
        select: {
          nama_lengkap: true,
          kelas: true,
          attendance: true,
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
