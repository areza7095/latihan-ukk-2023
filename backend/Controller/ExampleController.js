//sample Controler

import { PrismaClient } from "@prisma/client";
import { json } from "express";

const prisma = new PrismaClient();


export const getUsers = async (req, res) => {
    try {
        const response = await prisma.User.findMany({
        //   select: {
        //     email: true,
        //     password: true,
        //     log_user: true
        //   },
            include: {
                log_user: true
            }
        });
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      } 
};

export const getStudent = async (req, res) => {
    try {
        const response = await prisma.Student.findMany({
          include : {
            attendance: true,
            ereport: true
          }
        });
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      } 
};