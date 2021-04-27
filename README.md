# Node

Práctica del Tema 5 Node.js

Requisitos, tener instalado lo necesario para hacer la práctica, instalación del cliente postman, instalación de MongoDB. Todo ello se ha hecho siguiendo los pasos que se indican en la documentación del tema.

Fichero index.html, página mediante la cual a través de un formulario rellenamos los datos a insertar en nuestra base de datos local MongoDB. Se ha consultado en google como poder realizar un post. Se hace usando el fetch. Para poder capturar los valores que devuelve el response se ha habilitado el tema del cors e indicado en la cabecera del response el "Access-Control-Allow-Origin" con la ip correspondiente.

Fichero main.js, código donde se pone en marcha el servidor pendiente de recibir la peticiones. Cuando nos llega una petición ya bien sea por la página index.html o bien por el postman se validan los datos obtenidos. 

Se ha experimentado con el módulo jpv para la validación del formato de los datos recibidos. Si se quiere probar habrá que realiza la instalación del módulo desde el terminal mediante la instrucción:

npm install jpv

Deberemos descomentar las líneas que van de la 11 - 16
/* const jpv = require("jpv");
const pattern = {
  name: "(string)",
  phone: "(string)",
};
 */
 
 La línea 47
 //        const isValidJSON = jpv.validate(usuario, pattern, { debug: true });

Deberemos comentar las líneas que van de la línea 50 - 58

El módulo nos permite validar un json en base a un patron que se haya definido. Podemos ver más información en https://www.npmjs.com/package/jpv

Por defecto se ha dejado la validación que vemos en las líneas 50 a 58.

Si los datos son validados de forma correcta se crea una conexión a la bbdd local de MongoDB y se inserta en la colección usuarios, devolviendo por consola todos los valores que hay en la colección usuarios. En caso de error se devuelve el estado específico 201 con un mensaje de error, en el caso de que la inserción haya sido correcta se devuelve el estado 200 con mensaje de inserción correcta.

Se adjunta captura de pantallas de las lo que se ve al usar postman, al indicar de forma errónea el parámetro en postman, el error que se vería si usaramos el módulo jpv para la validación, se ve por consola.

