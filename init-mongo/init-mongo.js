// Conectar al servidor de MongoDB
conn = new Mongo();

// Conectar a la base de datos admin para autenticarse
db = conn.getDB("admin");
db.auth("admin", "password"); // Reemplaza 'admin' y 'password' con tus credenciales reales

// Una vez autenticados, seleccionar la base de datos específica
db = conn.getDB("weather");

// Crear colecciones si no existen
if (!db.getCollectionNames().includes("weathersummaries")) {
  db.createCollection("weathersummaries");
}
if (!db.getCollectionNames().includes("locations")) {
  db.createCollection("locations");
}

// Insertar datos en la colección 'locations'
db.locations.insertMany([
  { name: "Quito" },
  { name: "Guayaquil" },
  { name: "Cuenca" },
  { name: "Santo Domingo" },
  { name: "Machala" },
  { name: "Durán" },
  { name: "Manta" },
  { name: "Portoviejo" },
  { name: "Ibarra" },
]);
