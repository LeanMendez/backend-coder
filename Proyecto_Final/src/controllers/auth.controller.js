import { UserModel } from "../models/mongoDB/user.models.js";
import { logger, loggerFileError } from "../logger/logger.js";
import bcrypt from "bcrypt";
import passport from "passport";

const authRegister = async (req, res) => {
  passport.authenticate("signupStrategy", (error, user, info) => {
    if (error || !user) return res.json({ message: info.message });
    req.logIn(user, function (error) {
      if (error)
        return res.json({ messge: "hubo un error al identificar al usuario" });
      try {
        if (req.user) {
          mailTransport.sendMail({
            from: "Server Node",
            to: process.env.ADMIN_MAIL,
            subject: "New Register",
            html: `
          <div>
          <h1>New user registered</h1>
          <h2>User information: </h2>
          <p>ID: <span>${user._id}</span></p>
          <p>Name: <span>${user.name}</span></p>
          <p>Email: <span>${user.email}</span></p>
          <p>Address: <span>${user.address}</span></p>
          <p>phone number: <span>${user.phone}</span></p>
          </div>
          `
          },
          (error, response)=>{
          if(error) loggerFileError.error(`Has been an error with the register email: ${error}`) 
          }
          );
        }
        res.send({ message: "usuario registrado" });
      } catch (error) {
        loggerFileError.error({
          message: "Hubo un error al enviar el mail al administrador",
          error: error,
        });
        res.send({ message: error });
      }
    }); 
  })(req, res);

  //
};

const authHome = async (req, res) => {
  try {
    logger.info(req.user);
    res.json("pagina del home");
  } catch (error) {
    loggerFileError.error(error);
  }
};

const authLogin = async (req, res) => {
  try {
    const body = req.body;
    if (req.session.user) {
      res.send({ message: "ya estas logueado" });
    } else if (body.email && body.password) {
      UserModel.findOne({ email: body.email }, (error, userFound) => {
        if (error) {
          res.send("TE ESTOY MANDANDO UN ERROR", error);
        }
        if (userFound) {
          if (bcrypt.compareSync(body.password, userFound.password)) {
            req.session.user = {
              id: userFound._id,
              username: userFound.username,
              password: userFound.password,
              phone: userFound.phone,
              email: userFound.email,
            };
            res.send({ message: "Session initialized" });
          } else {
            res.send({ message: "Invalid password" });
          }
        } else {
          res.send({ message: "The user does not exist" });
        }
      });
    } else {
      res.send({ message: "Invalid user inputs" });
    }
  } catch (error) {
    loggerFileError.error({
      message: "Failed to login user",
      error: error,
    });
    res.send({ success: false, message: "Failed to login user" });
  }
};

const authLogout = async (req, res) => {
  try {
    req.logOut((error) => {
      if (error)
        return res
          .status(400)
          .json({ message: `LogOut error`, error: error });
      return res
        .status(200)
        .json({ message: "Sesion finalizada correctamente" });
    });
  } catch (error) {
    loggerFileError.error(error);
  }
};

export { authLogin, authLogout, authHome, authRegister };
