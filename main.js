// Requerir el interfaz http
const http = require("http");
// Definir el puerto a utilizar para escuchar
const port = 3000;

//Importamos el modulo querystring
const qs = require("querystring");

//Descomentar si queremos hacer uso del módulo jpv
//Importamos el módulo jpv para validar json
/* const jpv = require("jpv");
const pattern = {
  name: "(string)",
  phone: "(string)",
};
 */
const enviarResponse = (response, estado, texto) => {
  response.statusCode = estado;
  response.setHeader("Content-Type", "text/plain");
  //para que nos permita obtener el response en el fetch (mode: cors)
  response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  response.end(texto);
};

// Crear el servidor y definir la respuesta que se le da a las peticiones
const server = http.createServer((request, response) => {
  // Extrear el contenido de la petición
  const { headers, method, url } = request;
  let body = [];
  request
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      // El cuerpo de la petición puede venir en partes, aquí se concatenan;
      body.push(chunk);
    })
    .on("end", () => {
      if (request.method === "POST") {
        // El cuerpo de la petición está completo
        body = Buffer.concat(body).toString();
        //Creamos el objeto usuario a insertar en la bbdd lo parseamos usando querystring
        //const usuario = JSON.stringify(qs.parse(body), null, " ");
        const usuario = qs.parse(body);

        //Validamos que el json recibido coincide con nuestro formato de json indicado en pattern
        //        const isValidJSON = jpv.validate(usuario, pattern, { debug: true });

        //Comentar si queremos probar el uso del modulo jpv
        isValidJSON = false;
        if (usuario.name != undefined && usuario.phone != undefined) {
          if (
            typeof usuario.name === "string" &&
            typeof usuario.phone === "string"
          ) {
            isValidJSON = true;
          }
        }

        if (isValidJSON) {
          // Importar el cliente de MongoDB
          const MongoClient = require("mongodb").MongoClient;
          // Especificar la URL de conexión por defecto al servidor local
          const urlBD = "mongodb://localhost:27017";
          // Nombre de la base de datos a la que conectarse
          const dbName = "nodejs-mongo";

          // Crear una instancia del cliente de MongoDB
          const client = new MongoClient(urlBD, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

          // Conectar el cliente al servidor
          client
            .connect()
            .then(async () => {
              console.log("Conectado con éxito al servidor");
              const db = client.db(dbName);

              // Obtener la referencia a la colección
              const collection = db.collection("usuarios");

              // Llamar a la función para insertar
              const insertResult = await collection.insertOne(usuario);
              //            console.log("Resultado de la inserción: ", insertResult.result);
              const findResult = await collection.find({}).toArray();
              console.log("Documentos recuperados: ", findResult);
              enviarResponse(
                response,
                200,
                "Inserción en la colección correcta"
              );
              client.close();
            })
            .catch((error) => {
              enviarResponse(
                response,
                201,
                "Se ha producido un error en la inserción en la bbdd" + error
              );
              client.close();
            });
        } else {
          enviarResponse(response, 201, "Formato erróneo");
        }
      } else {
        enviarResponse(response, 201, "Debe usar el método POST");
      }
    });
});

// Ejecutar el servicio para que permanezca a la espera de peticiones
server.listen(port, () => {
  console.log("Servidor ejecutándose...");
});
