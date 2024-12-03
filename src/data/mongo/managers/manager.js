class Manager {
  constructor(model) {
    this.model = model;
  }

  getAll = async () => {
    try {
      return await this.model.find().lean();
    } catch (err) {
      return err.message;
    }
  };

  getFiltered = async (options) => {
    try {
      const { limit, page, sort, filter } = options;

      let sortOptions = {};
      if (sort) {
        sortOptions = sort === "asc" ? { price: 1 } : { price: -1 };
      }

      const query = filter || {};

      return await this.model.paginate(query, {
        limit: parseInt(limit, 10),
        page: parseInt(page, 10),
        sort: sortOptions,
        lean: true,
      });
    } catch (err) {
      console.error("Error en get:", err);
      return err.message;
    }
  };

  create = async (data) => {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  };

  getPaginated = async (pg) => {
    try {
      const page = pg || 1;
      return await this.model.paginate(
        {},
        { limit: 10, page: page, lean: true }
      );
    } catch (err) {
      return err.message;
    }
  };

  readByEmail = async (email) => {
    try {
      const one = await this.model.findOne({ email }).lean();
      return one;
    } catch (error) {
      throw error;
    }
  };

  readById = async (id) => {
    try {
      const one = await this.model.findOne({ _id: id }).lean();
      return one;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, data) => {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      return one;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (id) => {
    try {
      const one = await this.model.findByIdAndDelete(id);
      return one;
    } catch (error) {
      throw error;
    }
  };
}

export default Manager;
