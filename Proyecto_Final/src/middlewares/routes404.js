const isImplemented = async (req, res, next) => {
  res
    .status(400)
    .json({
      error: -2,
      descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`,
    });
};

export { isImplemented };
