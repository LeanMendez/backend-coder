const connection = new Mongo();
const database = connect("localhost:27017/ecommerce");

//inserciones de productos
database.products.insertMany([
  {
    title: "Harry Potter and the Deathly Hallows",
    price: 120,
    thumbnail: "https://images1.penguinrandomhouse.com/cover/9788418797026",
  },
  {
    title: "Fire & Blood",
    price: 580,
    thumbnail: "https://images3.penguinrandomhouse.com/cover/9780593598009",
  },
  {
    title: "The Children of Húrin",
    price: 900,
    thumbnail: "https://images3.penguinrandomhouse.com/cover/9780345518842",
  },
  {
    title: "The Silmarillion",
    price: 1280,
    thumbnail: "https://images1.penguinrandomhouse.com/cover/9780345325815",
  },
  {
    title: "Unfinished Tales",
    price: 1700,
    thumbnail: "https://images2.penguinrandomhouse.com/cover/9780345357113",
  },
  {
    title: "La musica del silencio",
    price: 2300,
    thumbnail: "https://images3.penguinrandomhouse.com/cover/9786073143790",
  },
  {
    title: "El Temor de un Hombre Sabio",
    price: 2860,
    thumbnail: "https://images4.penguinrandomhouse.com/cover/9788499899619",
  },
  {
    title: "Dune Messiah",
    price: 3350,
    thumbnail: "https://images4.penguinrandomhouse.com/cover/9786073197267",
  },
  {
    title: "The Stars, Like Dust",
    price: 4320,
    thumbnail: "https://images1.penguinrandomhouse.com/cover/9780593160015",
  },
  {
    title: "The End of Eternity",
    price: 4990,
    thumbnail: "https://images1.penguinrandomhouse.com/cover/9780593160022",
  },
]);

//inserciones de mensajes
database.messages.insertMany([
  { email: "juan@gmail.com", msg: "hola" },
  { email: "julian@gmail.com", msg: "que tal?" },
  { email: "jose@gmail.com", msg: "como te va?" },
  { email: "josue@gmail.com", msg: "que" },
  { email: "jope@gmail.com", msg: "frase!" },
  { email: "juana@gmail.com", msg: "mas" },
  { email: "julieta@gmail.com", msg: "vulgar!" },
  { email: "juliana@gmail.com", msg: "bueno, la verdad" },
  { email: "joaquin@gmail.com", msg: "es que Miranda" },
  { email: "jane@gmail.com", msg: "no me gusta" },
]);

