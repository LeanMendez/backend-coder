# Desafío N°14
## Consigna 1
Sobre el proyecto del último desafío entregable, mover todas las claves y credenciales utilizadas a un archivo **.env**, y cargarlo mediante la librería **dotenv**.


La única configuración que no va a ser manejada con esta librería va a ser el puerto de escucha del servidor. Éste deberá ser leído de los argumento pasados por línea de comando, usando alguna librería (minimist o yargs). En el caso de no pasar este parámetro por línea de comandos, conectar por defecto al puerto 8080.


Observación: por el momento se puede dejar la elección de sesión y de persistencia explicitada en el código mismo. Más adelante haremos también parametrizable esta configuración.

## Consigna 2

Agregar una ruta '/info' que presente en una vista sencilla los siguientes datos:
- Argumentos de entrada                                       
- Path de ejecución
- Nombre de la plataforma (sistema operativo)       
- Process id
- Versión de node.js                                             
- Carpeta del proyecto
- Memoria total reservada (rss)


## Rutas para el testeo de la aplicación

Se tienen 2 vistas las cuales se puede acceder para poder probar las funcionalidades.

Una ruta que devuelve una vista con información de diferentes variables del sistema
``` bash
    http://localhost:8080/info
```


Una ruta que devuelve una tabla con una lista de numeros aleatorios dependiendo del parametro **query** que se le agregue a la ruta, donde se muestra la cantidad de veces que salio el numero a lo largo de todas las iteraciones.  
``` bash
    http://localhost:8080/api/randoms?cant=
```
*Agregar un numero luego del signo igual de la ruta*.
