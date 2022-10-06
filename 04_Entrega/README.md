# Desafío N°4 
## Consignas
1. Realizar un proyecto de servidor basado en *Node.js* y *Express* que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:


    a) Ruta GET **'/api/productos/'** que devuelva todos los productos.

    b) Ruta GET **'api/productos/:id'** devuelve un producto según su id.

	c) Ruta POST **'api/productos/'** recibe y agrega un producto, y lo devuelve con su id asignado.

	d) Ruta PUT **'api/productos/:id'** recibe y actualiza un producto según su id.

	e) Ruta DELETE **'api/productos/:id'** elimina un producto según su id.


2. Cada producto estará representado por un objeto con el siguiente formato:

    
```json
	{
		"title": "Fire and Blood",
		"price": 3500,
		"thumbnail": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0083/9780008307738.jpg"
	}
```
3. Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando en 1, y que se irá incrementando a medida de que se incorporen productos. Ese id será utilizado para identificar un producto que va a ser listado en forma individual.

4. Para el caso de que un producto no exista, se devolverá el objeto:
{ error : 'producto no encontrado' }.

5. Incorporar el Router de *Express* en la url base **'/api/productos'** y configurar todas las subrutas en base a este.

6. Crear un espacio público de servidor que contenga un documento *index.html* con un formulario de ingreso de productos con los datos apropiados. **Pendiente**

7. El servidor debe estar basado en *Express* y debe implementar los mensajes de conexión al puerto **8080** y en caso de error, representar la descripción del mismo.

8. Las respuestas del servidor serán en formato **JSON**. La funcionalidad será probada a través de Postman y del formulario de ingreso.



