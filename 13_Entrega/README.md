# Desafío N°13
## Consigna
Implementar sobre el entregable que venimos realizando un mecanismo de autenticación. Para ello:

Se incluirá una vista de registro, en donde se pidan email y contraseña. Estos datos se persistirán usando MongoDb, en una (nueva) colección de usuarios, cuidando que la contraseña quede encriptada (sugerencia: usar la librería bcrypt).

Una vista de login, donde se pida email y contraseña, y que realice la autenticación del lado del servidor a través de una estrategia de passport local.

Cada una de las vistas (logueo - registro) deberá tener un botón para ser redirigido a la otra.

Una vez logueado el usuario, se lo redirigirá al inicio, el cual ahora mostrará también su email, y un botón para desolguearse.

Además, se activará un espacio de sesión controlado por la sesión de passport. Esta estará activa por 10 minutos y en cada acceso se recargará este tiempo.

Agregar también vistas de error para login (credenciales no válidas) y registro (usuario ya registrado).

El resto de la funciones, deben quedar tal cual estaban el proyecto original.


## Rutas para el testeo de la aplicación

Se tienen 3 vistas las cuales se puede acceder para poder probar las funcionalidades.

Una ruta de Registro, donde el usuario podrá registrarse y se agregará su información a la base de datos.
``` bash
    http://localhost:8080/auth/register
```


Una ruta de Login, donde se iniciará sesión una vez el usuario esté registrado.
``` bash
    http://localhost:8080/auth/login
```

Y por último, la vista del Perfil, que es una ruta privada, a la que se accede únicamente si se está logueado en la aplicación.
``` bash
    http://localhost:8080/auth/profile
```