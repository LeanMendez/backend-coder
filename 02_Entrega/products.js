const fs = require("fs");

//HELPERS FUNCTIONS
//Determina el ID
const addId = (arr) => {
  if (arr.length !== 0) {
    const elementos = new Array(...arr);
    const newId = elementos.pop();
    return newId.id + 1;
  }
  return 1;
};


class Contenedor {
    constructor(filename) {
        this._filename = filename;
    }

 //METHODS
    save = async (product) => {
    try {
        if (fs.existsSync(`./files/${this._filename}.txt`)) {
            const content = await fs.promises.readFile(`./files/${this._filename}.txt`, "utf8");
            if (content) {
             const productos = JSON.parse(content);
             const newProduct = {
                id: addId(productos),
                ...product
            }
            productos.push(newProduct);
            await fs.promises.writeFile(`./files/${this._filename}.txt`, JSON.stringify(productos, null, 2));
            return newProduct.id;
            }else{
                const newProduct = {
                id: 1,
                ...product,
                };
                await fs.promises.writeFile(`./files/${this._filename}.txt`, JSON.stringify([newProduct], null, 2));
                return newProduct.id;
            }
        } else {
            const newProduct = {
            id: 1,
            ...product,
            };
            await fs.promises.writeFile(`./files/${this._filename}.txt`, JSON.stringify([newProduct], null, 2));
            return newProduct.id;
        }
    } catch (error) {
        console.log(error);
    }
    }

    getById = async (id) => {
        try {
            if(fs.existsSync(`./files/${this._filename}.txt`)){
                const content = await fs.promises.readFile(`./files/${this._filename}.txt`, "utf8");
                if(content){
                    const products = JSON.parse(content)
                    const selectedProduct = products.find(item => item.id === id); 
                    const finalProduct = selectedProduct === undefined ? null : selectedProduct ;
                    return finalProduct
                }else{
                    console.log('Document is empty')
                }
            }else{
                console.log('Document does not exist')
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAll = async () => {
        try {
            if (fs.existsSync(`./files/${this._filename}.txt`)) {
                const content = await fs.promises.readFile(`./files/${this._filename}.txt`, 'utf8')
                if (content) {
                    const products = JSON.parse(content)
                    return products                                        
                } else {
                    console.log('Document is empty')
                }
            } else {
                console.log('Document does not exist')
            }
        } catch (error) {
            console.log(error)
        }
    }

    deleteById = async (id) => {
        try {
            if(fs.existsSync(`./files/${this._filename}.txt`)){
                const content = await fs.promises.readFile(`./files/${this._filename}.txt`, "utf8");
                if(content){
                    const products = JSON.parse(content)
                    const arrProductFiltered = products.filter((item)=> item.id !== id)
                    await fs.promises.writeFile(`./files/${this._filename}.txt`, JSON.stringify(arrProductFiltered, null, 2));
                }else{
                    console.log('Document is empty')
                }
            } else {
                console.log('Document does not exists')
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    deleteAll = async () => {
        try {
            if(fs.existsSync(`./files/${this._filename}.txt`)){
                const content = await fs.promises.readFile(`./files/${this._filename}.txt`, "utf8");
                if(content){
                    await fs.promises.writeFile(`./files/${this._filename}.txt`, JSON.stringify([]))
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

}



// IMPLEMENTATION
const Products = new Contenedor("products");

const producto1 = {
  title: "Procesador Ryzen 5 5600",
  price: 257,
  thumbnail: "https://mexx-img-2019.s3.amazonaws.com/procesador-amd-ryzen-5_42556_1.jpeg",
};
const producto2 = {
  title: "Procesador Ryzen 7 5800x",
  price: 420,
  thumbnail: "https://m.media-amazon.com/images/I/61DYLoyNRWL._AC_SX450_.jpg",
};
const producto3 = {
    title: "Procesador Ryzen 7 5700x",
    price: 375,
    thumbnail: "https://mexx-img-2019.s3.amazonaws.com/Procesador-Amd-Ryzen-7-5700X-Ghz-AM4_42712_1.jpeg",
};

// TEST METHODS
const createProduct = async()=>{

    await Products.save(producto1);
    await Products.save(producto2);
    await Products.save(producto3);

    const resultadoId = await Products.getById(1);
    console.log(resultadoId) 

    const productos = await Products.getAll();
    console.log(productos)

    await Products.deleteById(2);

    //await Products.deleteAll();
}

createProduct();


