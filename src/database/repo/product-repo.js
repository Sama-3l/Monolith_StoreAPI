const { ProductModel, CategoryModel } = require("../models");
const { APIError, BadRequestError } = require("../../utils/app-errors");

//Dealing with data base operations
class ProductRepository {
  async CreateProduct({
    name,
    desc,
    banner,
    markupPrice,
    salePrice,
    onSale,
    category,
    inventory,
  }) {
    try {
      let currCategory = await CategoryModel.findOneAndUpdate(
        { name: category }, // Search for the category by name
        { $setOnInsert: { name: category, products: [] } }, // Insert if not exists
        { new: true, upsert: true } // Return the new document, and create it if it doesn't exist
      );
      const newProduct = new ProductModel({
        name,
        desc,
        banner,
        markupPrice,
        salePrice,
        onSale,
        category: currCategory._id, // Use ObjectId of the category
        inventory,
      });

      const productRes = await newProduct.save();

      currCategory.products.push(newProduct._id);

      await currCategory.save();
      return productRes;
    } catch (err) {
      console.log(err);
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Product"
      );
    }
  }

  async Products() {
    try {
      return await ProductModel.find();
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Products"
      );
    }
  }

  async Categories(){
    try{
      return await CategoryModel.find().populate("products");
    } catch(err){
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Products"
      );
    }
  }

  async FindById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Product"
      );
    }
  }

  async FindByCategory(category) {
    try {
      const products = await CategoryModel.find({ name: category });
      return products;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Category"
      );
    }
  }

  async FindSelectedProducts(selectedIds) {
    try {
      const products = await ProductModel.find()
        .where("_id")
        .in(selectedIds.map((_id) => _id))
        .exec();
      return products;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Product"
      );
    }
  }
}

module.exports = ProductRepository;