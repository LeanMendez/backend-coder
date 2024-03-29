# Desafío N°15
## Consigna 1
Tomando con base el proyecto que vamos realizando, agregar un argumento más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho argumento será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork por defecto.
- Agregar en la vista info, el número de procesadores presentes en el servidor.
- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. - Listar los procesos por Forever y por sistema operativo.
- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos fork y cluster. Listar los procesos por PM2 y por sistema operativo.
- Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
- Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.



## Consigna 2

Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:


- Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.


- El resto de las consultas, redirigirlas a un servidor individual(FORK) escuchando en el puerto 8080.


- Verificar que todo funcione correctamente.

## Aspectos a tener en cuenta

Incluir el archivo de configuración de nginx junto con el proyecto.


Incluir también un pequeño documento en donde se detallen los comandos que deben ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores.
Ejemplo:

```bash
    pm2 start ./miservidor.js -- --port=8080 --modo=fork
    pm2 start ./miservidor.js -- --port=8081 --modo=cluster
    pm2 start ./miservidor.js -- --port=8082 --modo=fork
```

