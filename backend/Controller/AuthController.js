import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

//Import Validation
import RegisterValidationMasyarakat from "../config/RegisterValidationMasyarakat.js";
import RegisterValidationPetugas from "../config/RegisterValidationPetugas.js";

//Register Masyrakat
export const RegisterMasyarakat = async (req, res) => {
  const { error } = RegisterValidationMasyarakat(req.body);
  const { nik, username, nama, password, telp } = req.body;

  if (error)
    return res.status(400).json({
      status: res.statusCode,
      message: error.details[0].message,
    });

    // if NIK exist
    const nikkExist = await prisma.Masyarakat.findUnique({
      where: {
        nik: nik,
      },
    });
    if (nikkExist)
      return res.status(400).json({
        status: res.statusCode,
        message: "NIK Sudah digunakan !",
      });

    // if username exist
  const usernamekExist = await prisma.Masyarakat.findUnique({
    where: {
      username: username,
    },
  });
  if (usernamekExist)
    return res.status(400).json({
      status: res.statusCode,
      message: "Username Sudah digunakan !",
    });

  // Hash Password
  const salt = await bcrypt.genSalt(8);
  const hashPassword = await bcrypt.hash(password, salt);

  //Create User
  try {
    const SaveUser = await prisma.Masyarakat.create({
      data: {
        nik: nik,
        username: username,
        nama: nama,
        password: hashPassword,
        telp: telp,
        verifikasi: "pending"
      },
    });
    res.json(SaveUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//Login Masyrakat
export const LoginMasyarakat = async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.Masyarakat.findUnique({
    where: {
      username: username,
    },
  });
  if (!user)
    return res.status(400).json({
      status: res.statusCode,
      message: "Username Anda Salah!",
    });

  // check password
  const validPwd = await bcrypt.compare(password, user.password);
  if (!validPwd)
    return res.status(400).json({
      status: res.statusCode,
      message: "Password Anda Salah!",
    });

  //validasi verifikasi
  const verifikasi = await prisma.Masyarakat.findUnique({
    where: {
      username: username,
    },
    select: {
      verifikasi: true
    }
  });

  if (verifikasi.verifikasi === 'pending')
    return res.status(400).json({
      status: res.statusCode,
      message: "Akun anda belum terverifikasi, mohon hubungi Petugas",
    })

    if (verifikasi.verifikasi === 'banned')
    return res.status(400).json({
      status: res.statusCode,
      message: "Mohon Maaf akun anda telah di banned oleh Petugas, Segera hubungi petugas",
    })

  // membuat token menggunkan JWT
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '3d'
    }
  );

  // Get Data Diri for getting Information 
  const dataDiri = await prisma.Masyarakat.findUnique({
    where: {
      username: username,
    },
    select: {
      nik: true,
      nama: true,
      telp: true,
    }
  });

  

  res.header("x-auth-token", token).json({
    message: "success",
    accessToken: token,
    dataDiri: dataDiri
  });

  //console JWT token
  // console.log("Your JWT Token", token);
};

//Register Petugas
export const RegisterPetugas = async (req, res) => {
  const { error } = RegisterValidationPetugas(req.body);
  const { nama_petugas, username, password, telp, level } = req.body;
  const today = new Date();
  const id_petugas = `${today.getFullYear()}${today.getHours()}${today.getMinutes()}${today.getSeconds()}`

  if (error)
    return res.status(400).json({
      status: res.statusCode,
      message: error.details[0].message,
    });

    // if username exist
  const usernamekExist = await prisma.Petugas.findUnique({
    where: {
      username: username,
    },
  });
  if (usernamekExist)
    return res.status(400).json({
      status: res.statusCode,
      message: "Username Sudah digunakan !",
    });

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //Create User
  try {
    const SaveUser = await prisma.Petugas.create({
      data: {
        id_petugas: parseInt(id_petugas),
        nama_petugas: nama_petugas,
        username: username,
        password: hashPassword,
        telp: telp,
        level: level
      },
    });
    res.json(SaveUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//Login Petugas
export const LoginPetugas = async (req, res) => {
  const { username, password } = req.body;
  // const { id_user, login_date } = req.body;

  // if username exist
  const user = await prisma.Petugas.findUnique({
    where: {
      username: username,
    },
  });
  if (!user)
    return res.status(400).json({
      status: res.statusCode,
      message: "Username Anda Salah!",
    });

  // check password
  const validPwd = await bcrypt.compare(password, user.password);
  if (!validPwd)
    return res.status(400).json({
      status: res.statusCode,
      message: "Password Anda Salah!",
    });

  // membuat token menggunkan JWT
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '3d'
    }
  );

  //Get NIK for getting Information 
  const userData = await prisma.Petugas.findUnique({
    where: {
      username: username,
    },
    select: {
      id_petugas: true,
      level: true,
      nama_petugas: true,
      telp: true
    }
  });

  

  res.header("x-auth-token", token).json({
    accessToken: token,
    userData: userData
  });

  //console JWT token
  // console.log("Your JWT Token", token);
};
