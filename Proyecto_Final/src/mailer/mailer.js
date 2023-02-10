import nodemailer from "nodemailer";
import { loggerFileError } from "../logger/logger.js";

export const mailTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.ADMIN_MAIL,
    pass: process.env.ADMIN_PASS_GOOGLE,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

export const mailSender = (user) => {
  mailTransport.sendMail({
    from: "Server Node",
    to: process.env.ADMIN_MAIL,
    subject: "Nuevo Registro",
    html: `
	<div>
	<h1>Nuevo registro de usuario</h1>
	<h2>Datos del usuario: </h2>
	<p>Id: <span>${user._id}</span></p>
	<p>Nombre: <span>${user.name}</span></p>
	<p>Email: <span>${user.email}</span></p>
	<p>Dirección: <span>${user.address}</span></p>
	<p>Teléfono: <span>${user.phone}</span></p>
	</div>
	`
  },
  (error, response)=>{
	if(error) loggerFileError.error(`hubo un error al enviar el mail de registro: ${error}`) 
  }
  );
};


