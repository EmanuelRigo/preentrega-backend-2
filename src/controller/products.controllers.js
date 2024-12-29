import {
  createService,
  readFilteredService,
  readAllService,
  readOneService,
  updateService,
  destroyService,
} from "../services/products.services.js";

const createProductController = async (req, res) => {
  const message = "PRODUCT CREATED";
  const data = req.body;
  const response = await createService(data);
  return res.json201(response, message);
};

const readOneProductController = async (req, res) => {
  const id = req.params.pid;
  const response = await readOneService(id);
  const message = "PRODUCT READ";
  if (response) {
    return res.json201(response, message);
  } else {
    return res.json404();
  }
};

const readProductsController = async (req, res) => {
  const { limit = 10, sort, query, available } = req.query;
  const pg = req.params.page || 1;
  const limitNumber = parseInt(limit, 10);
  const pageNumber = parseInt(pg, 10);

  if (isNaN(limitNumber) || limitNumber <= 0) {
    return res
      .status(400)
      .send({ error: "El parámetro 'limit' debe ser un número positivo." });
  }

  if (isNaN(pageNumber) || pageNumber <= 0) {
    return res
      .status(400)
      .send({ error: "El parámetro 'page' debe ser un número positivo." });
  }

  const filter = {};

  if (query) {
    filter.category = query;
  }

  if (available) {
    if (available === "true") {
      filter.status = true;
    } else if (available === "false") {
      filter.status = false;
    }
    console.log("filter con disponibilidad:", filter);
  }

  const options = {
    limit: limitNumber,
    page: pageNumber,
    sort,
    filter,
  };

  try {
    const response = await readFilteredService(options);
    console.log("🚀 ~ readProductsController ~ options:", options)
    
    const message = "PRODUCTS UPDATED";
    
    if (response.docs.length > 0) {
      return res.json201(response, message);
    } else {
      return res.json404();
    }
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return res.status(500).send({ error: "Error interno del servidor" });
  }
};

const readAllController = async (req, res) => {
  const response = await readAllService();
  const message = "PRODUCTS UPDATED";
  if (response.length > 0) {
    return res.json201(response, message);
  } else {
    return res.json404();
  }
};

const updateController = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const message = "PRODUCT UPDATED";
  const response = await updateService(id, data);

  if (response) {
    return res.json201(response, message);
  } else {
    return res.json404();
  }
};

const destroyController = async (req, res) => {
  const { id } = req.params;

  const message = "PRODUCT DELETED";

  const response = await destroyService(id);

  if (response) {
    return res.json201(response, message);
  } else {
    return res.json404();
  }
};

export {
  createProductController,
  readProductsController,
  readAllController,
  readOneProductController,
  updateController,
  destroyController,
};
