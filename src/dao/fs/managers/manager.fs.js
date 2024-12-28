import fs from 'fs/promises';
import path from 'path';

class ManagerFS {
  constructor(filePath) {
    this.filePath = path.resolve(filePath);
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        return [];
      }
      throw err;
    }
  }

  async _writeFile(data) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    } catch (err) {
      throw err;
    }
  }

  getAll = async () => {
    try {
      return await this._readFile();
    } catch (err) {
      return err.message;
    }
  };

  getFiltered = async (options) => {
    try {
      const { limit, page, sort, filter } = options;
      const data = await this._readFile();

      let filteredData = data;
      if (filter) {
        filteredData = data.filter(item => {
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
      return filteredData.slice(start, end);
    } catch (err) {
      console.error("Error en getFiltered:", err);
      return err.message;
    }
  };

  create = async (data) => {
    try {
      const allData = await this._readFile();
      allData.push(data);
      await this._writeFile(allData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  getPaginated = async (pg) => {
    try {
      const page = pg || 1;
      const limit = 10;
      const data = await this._readFile();
      const start = (page - 1) * limit;
      const end = page * limit;
      return data.slice(start, end);
    } catch (err) {
      return err.message;
    }
  };

  read = async (filter) => {
    try {
      const data = await this._readFile();
      return data.filter(item => {
        return Object.keys(filter).every(key => item[key] === filter[key]);
      });
    } catch (error) {
      throw error;
    }
  };

  readByEmail = async (email) => {
    try {
      const data = await this._readFile();
      return data.find(item => item.email === email);
    } catch (error) {
      throw error;
    }
  };

  readById = async (id) => {
    try {
      const data = await this._readFile();
      return data.find(item => item._id === id);
    } catch (error) {
      throw error;
    }
  };

  readByIdPopulate = async (id) => {
    try {
      const data = await this._readFile();
      const cart = data.find(item => item._id === id);
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
      const allData = await this._readFile();
      const index = allData.findIndex(item => item._id === data._id);
      if (index !== -1) {
        allData[index].products = data.products;
        allData[index].updatedAt = new Date();
        await this._writeFile(allData);
        return allData[index];
      }
      return null;
    } catch (err) {
      console.error("Error al actualizar el carrito", err);
    }
  };

  update = async (id, data) => {
    try {
      const allData = await this._readFile();
      const index = allData.findIndex(item => item._id === id);
      if (index !== -1) {
        allData[index] = { ...allData[index], ...data };
        await this._writeFile(allData);
        return allData[index];
      }
      return null;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (id) => {
    try {
      const allData = await this._readFile();
      const index = allData.findIndex(item => item._id === id);
      if (index !== -1) {
        const [deletedItem] = allData.splice(index, 1);
        await this._writeFile(allData);
        return deletedItem;
      }
      return null;
    } catch (error) {
      throw error;
    }
  };
}

export default ManagerFS;