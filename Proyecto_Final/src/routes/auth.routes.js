import Router from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash } from "../utils/createHash.js";
import { UserModel } from "../models/mongoDB/user.models.js";
import { checkLogin } from "../middlewares/checkLogin.js";
import {
  authLogout,
  authLogin,
  authHome,
  authRegister,
} from "../controllers/auth.controller.js";
import { loggerFileError, logger, loggerFileWarn } from "../logger/logger.js";
import { isValidPassword } from "../utils/validateHash.js";

const authRouter = Router();

//serializacion y deserializacion del usuario
passport.serializeUser((user, done) => {
  return done(null, user.id);
}); //internamente passport hace req.session.passport.user = {userId}

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (error, userFound) => {
    return done(error, userFound);
  });
}); //internamente passport hace req.user = userFound

// Estrategia de registro
passport.use(
  "signupStrategy",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async (req, username, password, done) => {
      try {
        UserModel.findOne({ email: username }, (error, userFound) => {
          if (error) {
            return done(null, null, { message: `hubo un error: ${error}` });
          }
          if (userFound) {
            return done(null, null, {
              message: "Ya existe otro usuario con ese correo",
            });
          }
          const newUser = {
            email: req.body.email,
            password: createHash(password),
            name: req.body.name,
            age: req.body.age,
            phone: req.body.phone,
            address: req.body.address,
            avatar: req.body.avatar,
          };

          UserModel.create(newUser, (error, userCreated) => {
            if (error)
              return done(error, null, { message: "error al registrar" });
            return done(null, userCreated, { message: "usuario creado" });
          });
        });
      } catch (error) {
        loggerFileError.error(error);
      }
    }
  )
);

// passport strategy iniciar sesion
passport.use(
  "loginStrategy",
  new LocalStrategy(async (username, password, done) => {
    logger.info(username);
    try {
      UserModel.findOne({ username: username }, (err, user) => {
        logger.info(user);
        if (err) return done(err);
        if (!user) return done(null, false);
        if (!user.password) return done(null, false);
        if (!isValidPassword(user, password)) {
          logger.info("existen datos");
          return done(null, false, { message: "password invalida" });
        }
        return done(null, user);
      });
    } catch (error) {
      loggerFileWarn.warn(error);
    }
  })
);

//rutas de auth
authRouter.post("/register", authRegister);

authRouter.get("/home", checkLogin, authHome);

authRouter.post("/logout", authLogout);

authRouter.post(
  "/login",
  passport.authenticate("loginStrategy", {
    failureMessage: true,
    failureRedirect: "/",
  }),
  authLogin
);

export { authRouter };
