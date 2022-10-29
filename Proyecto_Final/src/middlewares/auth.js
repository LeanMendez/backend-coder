import {config} from '../config/config.js'

const isAdminVerif = (req, res, next) => {
  //AL CAMBIAR EL VALOR DE rol AUTORIZA O DESAUTORIZA LA RUTA
  if (config.isAdmin) {
    res
      .status(401)
      .json({
        error: -1,
        descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada`,
      });
  }
  next();
};

export { isAdminVerif };
