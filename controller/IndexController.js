const Product = require("../models/Product");
const Cart = require("../models/Cart");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");

module.exports = {
  getProduct: async (req, res) => {
    let data = await Product.find();

    res.send(data.reverse());
  },
  postAdd: async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    let cleanImgPath = cutRedundancyImagePath(req.files);
    const {
      name,
      price,
      category,
      description,
      specification,
      brand,
    } = req.body;

    let product = new Product({
      productName: name,
      productPrice: parseFloat(price),
      discountPrice: 0,
      currentPrice: parseFloat(price),
      category: category,
      brand: brand,
      date: new Date(),
      quantity: 1,
      description: description,
    });

    convertSpecification(product.specification, specification);

    product.image = cleanImgPath[0];
    product.detailImage.set(0, cleanImgPath[1]);
    product.detailImage.set(1, cleanImgPath[2]);

    try {
      await product.save();
      res.send({ message: "Added new product" });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    let { id } = req.body;

    try {
      await Product.findOneAndRemove({ _id: id });
      res.send({ message: "Delete Successful" });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  },
  getEdit: (req, res) => {
    Product.findOne({ _id: req.params.id }).then((data) => {
      console.log(data);
      res.render("Edit", { product: data });
    });
  },
  postEdit: (req, res) => {
    const id = req.params.id;
    Product.findById(id).then((data) => {
      console.log(data.image);
      const image = data.image;
      if (req.file === undefined) {
        data.image = image;
        data.productName = req.body.name;
        data.productPrice = req.body.price;
        data.category = req.body.category;
        console.log(data);
        data.save();
        res.redirect("http://localhost:3000/admin");
        // res.redirect("https://se-projectt.herokuapp.com/admin");
      } else {
        data.image = req.file.path.split("\\").slice(1).join("\\");
        data.productName = req.body.name;
        data.productPrice = req.body.price;
        data.category = req.body.category;
        data.save();
        res.redirect("http://localhost:3000/admin");
        // res.redirect("https://se-projectt.herokuapp.com/admin");
      }
    });
  },
  discountProduct: async (req, res) => {
    const { id, percent } = req.body;

    let data = await Product.findById(id);

    let discount = (percent * data.productPrice) / 100;
    data.discountPrice = discount;
    data.currentPrice = data.productPrice - discount;

    try {
      await data.save();
      res.send({ message: "Updated" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  deDiscount: async (req, res) => {
    const { id } = req.body;

    let data = await Product.findById(id);
    data.discountPrice = 0;
    try {
      await data.save();
      res.send({ message: "Updated" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  },
  addtocart: async (req, res) => {
    const { id } = req.params;
    try {
      let item = await Cart.findOne({ _id: id });
      // If item already exists, then increases quantity
      if (item) {
        item.quantity++;
        await item.save();
        return res.send({ item, message: "Increase quantity in your cart" });
      }

      let product = await Product.findById(id);

      const {
        productName,
        productPrice,
        discountPrice,
        image,
        category,
        currentPrice,
        _id,
      } = product;

      let cart = new Cart({
        username: req.user.username,
        productName,
        productPrice,
        discountPrice,
        currentPrice,
        image,
        category,
        quantity: 1,
        date: new Date(),
        _id,
      });

      await cart.save();
      console.log(cart);
      res.send({
        item: cart,
        message: "Add to card successfully",
      });
    } catch (error) {
      console.log(error);
    }
  },
  cartInfo: async (req, res) => {
    let token = req.headers.authorization;

    if (!token) return res.send([]);
    let id = jwt.decode(token);
    let user = await User.findById(id);
    let data = await Cart.find({ username: user.username });
    res.send(data);
  },
  updateCart: (req, res) => {
    const { cart } = req.body;
    cart.forEach((each) => {
      let query = { _id: each._id };
      let valueUpdate = { $set: { quantity: each.quantity } };
      Cart.updateMany(query, valueUpdate, (err, result) => {
        err ? console.log(err) : console.log("Sucess");
      });
    });
  },
  removefromcart: (req, res) => {
    const { id } = req.params;

    Cart.findOneAndRemove({ _id: id }).then((data) => res.send(data));
  },
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
    });
  },
  message: (req, res) => {
    console.log(req.body);
  },
  productReview: (req, res) => {
    Product.findOne({ _id: req.body.id }).then((data) => {
      assignReview(data, req.body);

      data.save((err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  },
};

function assignReview(data, inputbody) {
  const { username, reviewStar, reviewMessage } = inputbody;
  const length = data.review.length;

  data.review.push({
    username,
    reviewStar,
    reviewMessage,
    reviewDate: new Date(),
  });
}
function cutRedundancyImagePath(imgPath) {
  return imgPath.map((each) => each.path.split("\\").slice(1).join("\\"));
}

function convertSpecification(model, input) {
  let arr = input.split("\r\n"); // split to array

  for (let i = 0; i < arr.length; i++) {
    model.set(i, capitalizeFirstLetter(arr[i]));
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
