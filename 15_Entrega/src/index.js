"use strict";

var dotenv = _interopRequireWildcard(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));
var _socket = require("socket.io");
var _normalizr = require("normalizr");
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _passport = _interopRequireDefault(require("passport"));
var _passportLocal = require("passport-local");
var _minimist = _interopRequireDefault(require("minimist"));
var _cluster = _interopRequireDefault(require("cluster"));
var _os = _interopRequireDefault(require("os"));
var _route = require("./routes/route.js");
var _routeRandom = require("./routes/route.random.js");
var _config = require("./config/config.js");
var _ContainerFileSystem = require("./managers/ContainerFileSystem.js");
var _ContainerMariaDB = require("./managers/ContainerMariaDB.js");
var _user = require("./models/user.js");
var _generateHash = require("./helpers/generateHash.js");
var _desencriptarHash = require("./helpers/desencriptarHash.js");
var _configCredenciales = require("./config/configCredenciales.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
dotenv.config();
//declaracion de variables globales
const _filename = (0, _url.fileURLToPath)(import.meta.url);
const _dirname = _path.default.dirname(_filename);

//config de los args de minimist
const optionsFork = {
  alias: {
    m: "mode",
    p: "port"
  },
  default: {
    mode: "FORK",
    port: 8080
  }
};
const objArguments = (0, _minimist.default)(process.argv.slice(2), optionsFork);
const PORT = objArguments.port;
const MODO = objArguments.mode;
console.log("objArguments", MODO, "port", PORT);

//instancia de servicios
const serviceChat = new _ContainerFileSystem.ContainerFileSystem(_config.options.fileSystem.path);
const serviceProduct = new _ContainerMariaDB.ContainerMariaDb(_config.options.mariaDb);
const app = (0, _express.default)();
//const PORT = process.env.PORT || 8080;
//middlewares
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.static(_path.default.join(_dirname, "/views")));
app.use((0, _cookieParser.default)());

// session configuracion
app.use((0, _expressSession.default)({
  store: _connectMongo.default.create({
    mongoUrl: _configCredenciales.credenciales.MONGO_SESSION_API_KEY
  }),
  secret: "claveUltraSecreta",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000
  }
}));

//Conexion a la base de datos para las autenticaciones
const mongoURI = _configCredenciales.credenciales.MONGO_AUTENTICATION_API_KEY;
_mongoose.default.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, error => {
  if (error) return console.log(`ERROR MESSAGE: ${error}`);
  console.log("DATABASE CONNECTED");
});

//Passport configuracion
app.use(_passport.default.initialize());
app.use(_passport.default.session());

//Serializar y deserializar usuario
_passport.default.serializeUser((user, done) => {
  done(null, user.id);
});
_passport.default.deserializeUser((id, done) => {
  _user.UserModel.findById(id, (error, userFound) => {
    if (error) return done(error);
    return done(null, userFound);
  });
});

//Passport Strategy - crear usuario
_passport.default.use("signupStrategy", new _passportLocal.Strategy({
  passReqToCallback: true,
  usernameField: "email"
}, (req, username, password, done) => {
  console.log(username);
  _user.UserModel.findOne({
    email: username
  }, (error, userFound) => {
    if (error) return done(error, null, {
      message: "hubo un error"
    });
    if (userFound) return done(null, null, {
      message: "YA EXISTE OTRO USUARIO CON ESE CORREO"
    });
    const newUser = {
      name: req.body.name,
      email: username,
      password: (0, _generateHash.createHash)(password)
    };
    console.log(newUser);
    _user.UserModel.create(newUser, (error, userCreated) => {
      if (error) return done(error, null, {
        message: "error al registrar"
      });
      return done(null, userCreated, {
        message: "USUARIO CREADO"
      });
    });
  });
}));

//Passport Strategy - iniciar la sesion
_passport.default.use("loginStrategy", new _passportLocal.Strategy((username, password, done) => {
  console.log(username);
  console.log(password);
  _user.UserModel.findOne({
    email: username
  }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        message: "USUARIO INCORRECTO"
      });
    }
    if (!(0, _desencriptarHash.isValidPassword)(user, password)) {
      return done(null, false, {
        message: "PASSWORD INCORRECTA"
      });
    }
    return done(null, user);
  });
}));

//RUTAS DE PASSPORT AUTH
app.get("/auth/register", async (req, res) => {
  const errorMessage = req.session.messages ? req.session.messages[0] : "";
  console.log(req.session);
  res.render("signup", {
    error: errorMessage
  });
  req.session.messages = [];
});
app.get("/auth/login", (req, res) => {
  const errorMessage = req.session.messages ? req.session.messages[0] : "";
  res.render("login", {
    error: errorMessage
  });
  req.session.messages = [];
});
app.post("/auth/register", _passport.default.authenticate("signupStrategy", {
  failureRedirect: "/auth/register",
  failureMessage: true
}), (req, res) => {
  res.redirect("/auth/profile");
});
app.post("/auth/login", _passport.default.authenticate("loginStrategy", {
  failureRedirect: "/auth/login",
  failureMessage: true
}), (req, res) => {
  res.redirect("/auth/profile");
});
app.get("/auth/profile", async (req, res) => {
  if (req.isAuthenticated()) {
    let {
      name
    } = req.user;
    res.render("products", {
      username: name
    });
  } else {
    res.send("<div>Debes <a href='/auth/login'>inciar sesion</a> o <a href='/auth/register'>registrarte</a></div>");
  }
});
app.get("/auth/logout", (req, res) => {
  req.session.destroy();
  setTimeout(() => {
    res.redirect("/auth/login");
  }, 3000);
});

//motor de plantillas
app.engine("handlebars", _expressHandlebars.default.engine());
app.set("views", _path.default.join(_dirname, "/views"));
app.set("view engine", "handlebars");

//router
app.use("/api", _route.router);
app.use("/", _routeRandom.random);

//Normalizacion de la data
//autor
const authorSchema = new _normalizr.schema.Entity("autor");
//msg
const msgSchema = new _normalizr.schema.Entity("mensajes", {
  autor: authorSchema
});
//esquema chat
const chatSchema = new _normalizr.schema.Entity("chat", {
  mensajes: [msgSchema]
}, {
  idAttribute: "id"
});

//aplico normalizacion
const DataNormalize = data => {
  const normalizacion = (0, _normalizr.normalize)({
    id: "historial",
    mensajes: data
  }, chatSchema);
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
if (MODO === 'CLUSTER' && _cluster.default.isPrimary) {
  const numCPUs = _os.default.cpus().length;
  console.log("NUMERO DE NUCLEOS:", numCPUs);
  for (let i = 0; i < numCPUs; i++) {
    _cluster.default.fork();
  }
  _cluster.default.on('exit', worker => {
    console.log(`el subproceso ${worker.process.pid} fallo`);
    _cluster.default.fork();
  });
} else {
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} on process ${process.pid}`);
  });

  //websockets
  const io = new _socket.Server(server);
  io.on("connection", async socket => {
    console.log("se conecto un nuevo cliente", socket.id);
    socket.on("newProduct", async newProduct => {
      await serviceProduct.save(newProduct);
      io.sockets.emit("list", productos);
    });

    //Emisor de chat
    io.sockets.emit("chat", await NormalizeMsg());
    socket.broadcast.emit("nuevoUsuario");
    socket.on("newMsgs", async newMsgs => {
      await serviceChat.save(newMsgs);
      console.log(newMsgs);
      io.sockets.emit("chat", await NormalizeMsg());
    });
  });
}
