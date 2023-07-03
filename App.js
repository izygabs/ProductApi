const express = require("express");
const app = express();
const PORT = process.env.PORT || 6000;
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { User, Products } = require("./Validate");
const { log } = require("console");

dotenv.config({ path: "./data.env" });

mongoose.connect("mongodb://127.0.0.1:27017/Product", {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const userSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Password: String,
  phoneNumber: Number,
});

const productSchema = new mongoose.Schema({
  productName: String,
  Price: String,
  Category: String,
  Description: String,
  Rating: Number,
});
const Users = mongoose.model("User", userSchema);
const Product = mongoose.model("Products", productSchema);

app.get("/home", (req, res) => {
  res.send("hello products");
});

app.post("/signUp", (req, res) => {
  const { error, value } = User(req.body);
  if (error) {
    res.status(404);
  } else {
    try {
      const user = new Users({
        Name: value.Name,
        Email: value.Email,
        Password: value.Password,
        phoneNumber: value.phoneNumber,
      });
      user.save().then(() => {
        res.send("Sign up successful");
      });
    } catch (error) {
      res.status(404);
    }
  }
});

app.post("/login", async (req, res) => {
  const { error, value } = User(req.body);
  if (error) {
    res.status(404);
  } else {
    try {
      const userlogin = new Users({
        Email: value.Email,
        Password: value.Password,
      });
      userlogin.save.then(() => {
        res.send("Login successful");
      });
    } catch (error) {
      res.status(404);
    }
  }
});

app.post("/createProducts", (req, res) => {
  const { error, value } = Products(req.body);
  if (error) {
    res.status(404);
  } else {
    try {
      const createProducts = new Product({
        productName: value.productName,
        Price: value.Price,
        Category: value.Category,
        Description: value.Description,
        Rating: value.Rating,
      });
      createProducts.save().then(() => {
        res.send("Product created successfully");
      });
    } catch (error) {
      res.status(404);
    }
  }
});

app.get("/allProducts", async (req, res) => {
  try {
    const getProducts = await Product.find({});
    res.status(201).json(getProducts);
  } catch (error) {
    console.log(error);
  }
});

app.get("/aProduct", async (req, res) => {
  try {
    const getProduct = await Product.findOne({
      _id: req.body.id,
    });
    res.send(getProduct);
  } catch (error) {
    console.log(error);
  }
});

app.put("/changePassword", async (req, res) => {
  const { id, password, newPassword, confirmPassword } = req.body;
  try {
    await Users.updateOne(
      { _id: id },
      { Password: password },
      { $set: { Password: newPassword } },
      { Password: confirmPassword }
    );
    res.status(201).send("Password changed");
  } catch (error) {
    console.log(error);
  }
});

app.put("/updateProduct", async (req, res) => {
  const { id, price } = req.body;
  try {
    await Product.updateOne({ _id: id }, { $set: { Price: price } });
    res.status(201).send("update successfull");
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const deleteProduct = await Product.deleteOne({
      _id: req.body.id,
    });
    res.status(201).send(deleteProduct);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("Server is served on Port" + " " + PORT);
});
