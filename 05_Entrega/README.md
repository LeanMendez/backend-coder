# Desafío N°5 
## Consignas
1. Utilizando la misma API de productos del proyecto entregable de la clase anterior, construir un web server (no REST) que incorpore:


    a) Un formulario de carga de productos en la ruta raíz (configurar la ruta **'/productos'** para recibir el POST, y redirigir al mismo formulario).

    b) Una vista de los productos cargados (utilizando plantillas de **handlebars**) en la ruta GET **'/productos'**.

	c) Ambas páginas contarán con un botón que redirija a la otra.

2. Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por **pug**.

3. Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por **ejs**.
   
4. Por escrito, indicar cuál de los tres motores de plantillas prefieres para tu proyecto y por qué.

### Aspectos a incluir en el entregable:
* Realizar las plantillas correspondientes que permitan recorrer el array de productos y representarlo en forma de tabla dinámica, siendo sus cabeceras el nombre de producto, el precio y su foto (la foto se mostrará como un imágen en la tabla)
* En el caso de no encontrarse datos, mostrar el mensaje: 'No hay productos'.

### Sugerencias
* Utilizar iconfinder (https://www.iconfinder.com/free_icons) para obtener la url de las imágenes de los productos (click derecho sobre la imagen -> copiar dirección de la imagen)

### Opcional
* Utilizar bootstrap para maquetar la vista creada por dicho motor de plantillas y el formulario de ingreso de productos.



---
## Respuesta consigna 4:

Considero que por su simplecidad a la hora de escribirlo, su sintáxis y su legibilidad, me resulto mas cómodo trabajar con el motor de plantillas **handlebars**. Lo prefiero por sobre los otros, porque de cierta forma se parece a la sintáxis que utiliza React para interpolar variables dentro de JSX. 

No obstante Ejs me pareció interesante también, y no tuve problemas con la interpolación de variables. Pero tiene una sintáxis un poco mas rebuscada que handlebars.

Y el que menos me agradó fue Pug, ya que tuve problemas para hacer importaciones de archivos *.pug* dentro de otros, y fue un poco frustrante trabajar con él. Sin embargo, rescato positivo que la sintáxis de indentación cuando te acostumbras se escribe bastante rápido.








