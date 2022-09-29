# Desafío N°3 
## Consignas
1. Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:


    a) Ruta get **'/productos'** que devuelva un array con todos los productos disponibles en el servidor.

    b) Ruta get **'/productoRandom'** que devuelva un producto elegido al azar entre todos los productos disponibles.

2. Incluir un archivo de texto **'productos.txt'** y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

    Antes de iniciar el servidor, colocar en el archivo **'productos.txt'** tres productos como en el ejemplo del desafío anterior.

    ### Ejemplo de archivo *productos.txt* con 4 productos:

```json
[
	{
		"id": 1,
		"title": "Fire and Blood",
		"price": 3500,
		"thumbnail": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0083/9780008307738.jpg"
	},
	{
		"id": 2,
		"title": "Cuentos inconclusos de Númenor y la tierra media",
		"price": 1200,
		"thumbnail": "https://images-na.ssl-images-amazon.com/images/I/91HZ7o3iP6L.jpg"
	},
	{
		"id": 3,
		"title": "El Silmarillion",
		"price": 1000,
		"thumbnail": "https://images.cdn3.buscalibre.com/fit-in/360x360/13/03/1303ec299ddfb566d4d5f56b345e10d0.jpg"
	},
	{
		"id": 4,
		"title": "La música del silencio",
		"price": 1500,
		"thumbnail": "https://www.librosyliteratura.es/wp-content/uploads/2014/11/la-musica-del-silencio.jpg"
	}
]
```