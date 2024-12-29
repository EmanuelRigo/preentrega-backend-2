import fs from 'fs/promises';
import path from 'path';

class ManagerFS {
  constructor(filePath) {
    this.filePath = path.resolve(filePath);
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      console.log("Contenido del archivo JSON:", data); // Log para ver el contenido del archivo
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log("Archivo no encontrado, devolviendo array vacío."); // Log para archivo no encontrado
        return [];
      }
      console.error("Error al leer el archivo:", err); // Log para cualquier otro error
      throw err;
    }
  }

  async _readFileForEmail() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      console.log("Contenido del archivo JSON para email:", data); // Log para ver el contenido del archivo
      return { docs: JSON.parse(data), error: null };
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log("Archivo no encontrado, devolviendo objeto vacío."); // Log para archivo no encontrado
        return { docs: [], error: null };
      } else if (err instanceof SyntaxError) {
        console.error("Formato JSON inválido:", err); // Log para error de formato JSON
        return { docs: [], error: 'Invalid JSON format' };
      }
      console.error("Error al leer el archivo:", err); // Log para cualquier otro error
      return { docs: [], error: err.message };
    }
  }

  async _writeFile(data) {
    try {
      console.log("Escribiendo datos en el archivo JSON:", JSON.stringify(data, null, 2)); // Log para ver los datos que se están escribiendo
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
      console.log("Archivo JSON escrito con éxito."); // Log para escritura exitosa
    } catch (err) {
      console.error("Error al escribir el archivo:", err); // Log para error de escritura
      throw err;
    }
  }

  getAll = async () => {
    try {
      const docs = await this._readFile();
      return docs;
    } catch (err) {
      return err.message;
    }
  };

  getFiltered = async (options) => {
    try {
      const { limit, page, sort, filter } = options;
      const docs = await this._readFile();
      console.log("🚀 ~ ManagerFS ~ getFiltered= ~ docs :", docs );

      let filteredData = docs;
      if (filter) {
        filteredData = docs.filter(item => {
          return Object.keys(filter).every(key => item[key] === filter[key]);
        });
      }

      if (sort) {
        filteredData.sort((a, b) => {
          if (sort === 'asc') return a.price - b.price;
          return b.price - a.price;
        });
      }

      const start = (page - 1) * limit;
      const end = page * limit;
      const paginatedData = filteredData.slice(start, end);

      return {
        docs: paginatedData,
        totalDocs: filteredData.length,
        limit,
        totalPages: Math.ceil(filteredData.length / limit),
        page,
        pagingCounter: start + 1,
        hasPrevPage: page > 1,
        hasNextPage: end < filteredData.length,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: end < filteredData.length ? page + 1 : null
      };
    } catch (err) {
      console.error("Error en getFiltered:", err);
      return { docs: [], error: err.message };
    }
  };

  create = async (data) => {
    try {
      const docs = await this._readFile();
      docs.push(data);
      await this._writeFile(docs);
      return data;
    } catch (error) {
      throw error;
    }
  };

  getPaginated = async (pg) => {
    try {
      const page = pg || 1;
      const limit = 10;
      const docs = await this._readFile();
      const start = (page - 1) * limit;
      const end = page * limit;
      const paginatedData = docs.slice(start, end);

      return {
        docs: paginatedData,
        totalDocs: docs.length,
        limit,
        totalPages: Math.ceil(docs.length / limit),
        page,
        pagingCounter: start + 1,
        hasPrevPage: page > 1,
        hasNextPage: end < docs.length,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: end < docs.length ? page + 1 : null
      };
    } catch (err) {
      return { docs: [], error: err.message };
    }
  };

  read = async (filter) => {
    try {
      const docs = await this._readFile();
      return docs.filter(item => {
        return Object.keys(filter).every(key => item[key] === filter[key]);
      });
    } catch (error) {
      throw error;
    }
  };

  readByEmail = async (email) => {
    try {
      const { docs, error } = await this._readFileForEmail();
      if (error) throw new Error(error);
      return docs.find(item => item.email === email);
    } catch (error) {
      throw error;
    }
  };

  readById = async (id) => {
    try {
      const docs = await this._readFile();
      return docs.find(item => item._id === id);
    } catch (error) {
      throw error;
    }
  };

  readByIdPopulate = async (id) => {
    try {
      const docs = await this._readFile();
      const cart = docs.find(item => item._id === id);
      if (cart) {
        // Simulate population
        cart.products = cart.products.map(product => {
          return { ...product, _id: { /* populated product data */ } };
        });
      }
      return cart;
    } catch (err) {
      console.error("Error al buscar el carrito:", err);
      return null;
    }
  };

  addProduct = async (data) => {
    try {
      const docs = await this._readFile();
      const index = docs.findIndex(item => item._id === data._id);
      if (index !== -1) {
        docs[index].products = data.products;
        docs[index].updatedAt = new Date();
        await this._writeFile(docs);
        return docs[index];
      }
      return null;
    } catch (err) {
      console.error("Error al actualizar el carrito", err);
    }
  };

  update = async (id, data) => {
    try {
      const docs = await this._readFile();
      const index = docs.findIndex(item => item._id === id);
      if (index !== -1) {
        docs[index] = { ...docs[index], ...data };
        await this._writeFile(docs);
        return docs[index];
      }
      return null;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (id) => {
    try {
      const docs = await this._readFile();
      const index = docs.findIndex(item => item._id === id);
      if (index !== -1) {
        const [deletedItem] = docs.splice(index, 1);
        await this._writeFile(docs);
        return deletedItem;
      }
      return null;
    } catch (error) {
      throw error;
    }
  };
}

export default ManagerFS;