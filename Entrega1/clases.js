class Usuario{
    constructor(name, surname, books, pets){
        this.nombre = name;
        this.apellido = surname;
        this.libros = books;
        this.mascotas = pets;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(petName){
        this.mascotas.push(petName);
    }
    countMascotas(){
        return this.mascotas.length;
    }
    addBook(nombre, autor){
        const newBook = {nombre: nombre, autor: autor};
        this.libros.push(newBook);
    }
    getBookNames(){
        const arrBooks = this.libros.map((libro)=>libro.nombre);
        return arrBooks;
    }
}

const usuario = new Usuario("Pepito", "Gomez",[{nombre: "El Silmarillon", autor:"J.R.R Tolkien"},{nombre:"El señor de los anillos", autor: "J.R.R Tolkien"}], ["Nala", "Yumi", "Felipe", "Juana"]);


console.log(usuario);

console.log(usuario.getFullName()); // Pepito Gomez

usuario.addMascota('Simon');

console.log(usuario.mascotas); // [ 'Nala', 'Yumi', 'Felipe', 'Juana', 'Simon' ]

console.log(usuario.countMascotas()); // 5

usuario.addBook("El Hobbit", "J.R.R Tolkien");

console.log(usuario.libros); //[{nombre: "El Silmarillon", autor:"J.R.R Tolkien"},{nombre:"El señor de los anillos", autor: "J.R.R Tolkien"},{nombre:"El Hobbit", autor: "J.R.R Tolkien"}]

console.log(usuario.getBookNames()); // [ 'El Silmarillon', 'El señor de los anillos', 'El Hobbit' ]
