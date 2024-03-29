import * as dotenv from "dotenv";
dotenv.config()
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { normalize, schema } from "normalizr";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import parseArgs from "minimist";
import cluster from "cluster";
import os from "os";

import { router } from "./routes/route.js";
import { random } from "./routes/route.random.js";
import { options } from "./config/config.js";
import { ContainerFileSystem } from "./managers/ContainerFileSystem.js";
import { ContainerMariaDb } from "./managers/ContainerMariaDB.js";
import { UserModel } from "./models/user.js";
import { createHash } from "./helpers/generateHash.js";
import { isValidPassword } from "./helpers/desencriptarHash.js";
import { credenciales } from "./config/configCredenciales.js";


//declaracion de variables globales
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//config de los args de minimist
const optionsFork = {alias: {m: "mode", p: "port"}, default: {mode: "FORK", port: 8080}}
const objArguments = parseArgs(process.argv.slice(2), optionsFork)
const PORT = objArguments.port
const MODO = objArguments.mode
console.log("objArguments", MODO, "port", PORT)

//instancia de servicios
const serviceChat = new ContainerFileSystem(options.fileSystem.path);
const serviceProduct = new ContainerMariaDb(options.mariaDb);

const app = express();
//const PORT = process.env.PORT || 8080;
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/views")));
app.use(cookieParser());

// session configuracion
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: credenciales.MONGO_SESSION_API_KEY,
    }),
    secret: "claveUltraSecreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

//Conexion a la base de datos para las autenticaciones
const mongoURI = credenciales.MONGO_AUTENTICATION_API_KEY;

mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) return console.log(`ERROR MESSAGE: ${error}`);
    console.log("DATABASE CONNECTED");
  }
);

//Passport configuracion
app.use(passport.initialize());
app.use(passport.session());

//Serializar y deserializar usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (error, userFound) => {
    if (error) return done(error);
    return done(null, userFound);
  });
});

//Passport Strategy - crear usuario
passport.use(
  "signupStrategy",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    (req, username, password, done) => {
      console.log(username);
      UserModel.findOne({ email: username }, (error, userFound) => {
        if (error) return done(error, null, { message: "hubo un error" });
        if (userFound)
          return done(null, null, {
            message: "YA EXISTE OTRO USUARIO CON ESE CORREO",
          });
        const newUser = {
          name: req.body.name,
          email: username,
          password: createHash(password),
        };
        console.log(newUser);
        UserModel.create(newUser, (error, userCreated) => {
          if (error)
            return done(error, null, { message: "error al registrar" });
          return done(null, userCreated, { message: "USUARIO CREADO" });
        });
      });
    }
  )
);

//Passport Strategy - iniciar la sesion
passport.use(
  "loginStrategy",
  new LocalStrategy((username, password, done) => {
    console.log(username);
    console.log(password);
    UserModel.findOne({ email: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "USUARIO INCORRECTO" });
      }
      if (!isValidPassword(user, password)) {
        return done(null, false, { message: "PASSWORD INCORRECTA" });
      }
      return done(null, user);
    });
  })
);

//RUTAS DE PASSPORT AUTH
app.get("/auth/register", async (req, res) => {
  const errorMessage = req.session.messages ? req.session.messages[0] : "";
  console.log(req.session);
  res.render("signup", { error: errorMessage });
  req.session.messages = [];
});

app.get("/auth/login", (req, res) => {
  const errorMessage = req.session.messages ? req.session.messages[0] : "";
  res.render("login", { error: errorMessage });
  req.session.messages = [];
});

app.post(
  "/auth/register",
  passport.authenticate("signupStrategy", {
    failureRedirect: "/auth/register",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/auth/profile");
  }
);

app.post(
  "/auth/login",
  passport.authenticate("loginStrategy", {
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/auth/profile");
  }
);

app.get("/auth/profile", async (req, res) => {
  if (req.isAuthenticated()) {
    let { name } = req.user;
    res.render("products", { username: name });
  } else {
    res.send(
      "<div>Debes <a href='/auth/login'>inciar sesion</a> o <a href='/auth/register'>registrarte</a></div>"
    );
  }
});

app.get("/auth/logout", (req, res) => {
    req.session.destroy();
  setTimeout(() => {
    res.redirect("/auth/login");
  }, 3000);
});

//motor de plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

//router
app.use("/api", router);
app.use("/", random)


//Normalizacion de la data
//autor
const authorSchema = new schema.Entity("autor");
//msg
const msgSchema = new schema.Entity("mensajes", { autor: authorSchema });
//esquema chat
const chatSchema = new schema.Entity(
  "chat",
  {
    mensajes: [msgSchema],
  },
  { idAttribute: "id" }
);

//aplico normalizacion
const DataNormalize = (data) => {
  const normalizacion = normalize(
    { id: "historial", mensajes: data },
    chatSchema
  );
  return normalizacion;
};

const NormalizeMsg = async () => {
  const resultado = await serviceChat.getAll();
  const mensajesNormalizados = DataNormalize(resultado);
  //console.log(JSON.stringify(mensajesNormalizados, null,"\t"))
  return mensajesNormalizados;
};
NormalizeMsg();



//instancia del server
if(MODO ==='CLUSTER' && cluster.isPrimary){
  const numCPUs = os.cpus().length
  console.log("NUMERO DE NUCLEOS:",numCPUs)

  for(let i=0; i<numCPUs; i++){
    cluster.fork()
  }
  cluster.on('exit', (worker)=>{
    console.log(`el subproceso ${worker.process.pid} fallo`);
    cluster.fork()
  })
}else{

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} on process ${process.pid}`);
});

//websockets
const io = new Server(server);

io.on("connection", async (socket) => {
  console.log("se conecto un nuevo cliente", socket.id);

  socket.on("newProduct", async (newProduct) => {
    await serviceProduct.save(newProduct);
    io.sockets.emit("list", productos);
  });

  //Emisor de chat
  io.sockets.emit("chat", await NormalizeMsg());

  socket.broadcast.emit("nuevoUsuario");

  socket.on("newMsgs", async (newMsgs) => {
    await serviceChat.save(newMsgs);
    console.log(newMsgs);
    io.sockets.emit("chat", await NormalizeMsg());
  });
});
}