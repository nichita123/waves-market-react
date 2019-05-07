const express = require("express");
const app = express();

const async = require("async");
const multer = require("multer");
const moment = require("moment");
const mongoose = require("mongoose");
const SHA1 = require("crypto-js/sha1");
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");

require("dotenv").config();

const mongooseOptions = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 100, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useNewUrlParser: true
};

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, mongooseOptions).then(
  () => {
    console.log("connected to mongoDB");
  },
  err => {
    console.log("err", err);
  }
);
mongoose.set("useCreateIndex", true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("client/build"));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Models
const { User } = require("./models/user");
const { Site } = require("./models/site");
const { Wood } = require("./models/wood");
const { Brand } = require("./models/brand");
const { Product } = require("./models/product");
const { Payment } = require("./models/payment");

// MiddleWares
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin");

app.all("/", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  next();
});

//=================================
//             UTILS
//=================================

// const date = new Date();
// const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1('112fsdfase3rdsadfr34').toString().substring(0, 8)}`;

// console.log(po);

//=================================
//        EMAIL SENDER
//=================================
const { sendEmail } = require("./utils/mail");

//=================================
//             PRODUCTS
//=================================

app.post("/api/product/shop", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .populate("brand")
    .populate("wood")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);

      res.status(200).json({
        size: articles.length,
        articles
      });
    });
});

//BY ARRIVAL
// /articles?sortBy=createdAt&order=desc&limit=4

//BY Sell
// /articles?sortBy=sold&order=desc&limit=4
app.get("/api/product/articles", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Product.find()
    .populate("brand")
    .populate("wood")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);

      res.send(articles);
    });
});

// /api/product/article?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=single
app.get("/api/product/articles-by-id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Product.find({ _id: { $in: items } })
    .populate("brand")
    .populate("wood")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

app.post("/api/product/article", auth, admin, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      article: doc
    });
  });
});

app.post("/api/product/article/:id", auth, admin, (req, res) => {
  Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        ...req.body
      }
    },
    { new: true },
    (err, doc) => {
      try {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true,
          updatedArticle: doc
        });
      } catch (error) {
        return res.status(422).json({ success: false, error });
      }
    }
  );
});

app.delete("/api/product/article/:id", auth, admin, (req, res) => {
  Product.findById(req.params.id).exec((err, product) => {
    try {
      if (err) return res.status(422).json({ success: false, err });

      product.remove(err => {
        if (err) return res.status(422).json({ success: false, err });

        return res.status(200).json({ success: true });
      });
    } catch (error) {
      return res.status(422).json({ success: false, err });
    }
  });
});

//=================================
//              WOODS
//=================================

app.post("/api/product/wood", auth, admin, (req, res) => {
  const wood = new Wood(req.body);

  wood.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      wood: doc
    });
  });
});

app.get("/api/product/woods", (req, res) => {
  Wood.find({}, (err, woods) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(woods);
  });
});

//=================================
//              BRAND
//=================================

app.post("/api/product/brand", auth, admin, (req, res) => {
  const brand = new Brand(req.body);

  brand.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      brand: doc
    });
  });
});

app.get("/api/product/brands", (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
});

//=================================
//              USERS
//=================================

app.post("/api/users/reset-user", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    try {
      user.generateResetToken((err, user) => {
        if (err) return res.json({ success: false, err });

        sendEmail(user.email, user.name, null, "reset_password", user);

        return res.json({ success: true });
      });
    } catch (error) {
      if (error) return res.json({ success: false, error });
    }
  });
});

app.post("/api/users/reset-password", (req, res) => {
  var today = moment()
    .startOf("day")
    .valueOf();

  User.findOne(
    {
      resetToken: req.body.resetToken,
      resetTokenExp: {
        $gte: today
      }
    },
    (err, user) => {
      try {
        if (!user)
          return res.json({
            success: false,
            message: "Your token has expired, try again..."
          });

        user.password = req.body.password;
        user.resetToken = "";
        user.resetTokenExp = "";

        user.save((err, doc) => {
          if (err) return res.json({ success: false, err });

          return res.status(200).json({ success: true });
        });
      } catch (err) {
        if (err)
          return res.json({
            success: false,
            message: "Your token has expired, try again..."
          });
      }
    }
  );
});

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    sendEmail(doc.email, doc.name, null, "welcome");

    return res.status(200).json({
      success: true
    });
  });
});

app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found"
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("w_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true
          });
      });
    });
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

app.post("/api/users/success-buy", auth, (req, res) => {
  let history = [];
  let transactionData = {};
  const date = new Date();
  const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1(
    req.user._id
  )
    .toString()
    .substring(0, 8)}`;

  // user history
  req.body.cartDetail.forEach(item => {
    history.push({
      pOrder: po,
      dateOfPurchase: Date.now(),
      name: item.name,
      brand: item.brand.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID
    });
  });

  // payments dash
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email
  };

  transactionData.data = {
    ...req.body.paymentData,
    pOrder: po
  };
  transactionData.product = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: { history: history },
      $set: { cart: [] }
    },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);

      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        let products = [];
        doc.product.forEach(item => {
          products.push({
            id: item.id,
            quantity: item.quantity
          });
        });

        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity
                }
              },
              { new: false },
              callback
            );
          },
          err => {
            if (err) return res.json({ success: false, err });

            sendEmail(user.email, user.name, null, "purchase", transactionData);

            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: []
            });
          }
        );
      });
    }
  );
});

//=================================
//         Cart Actions
//=================================

app.post("/api/users/cart/add", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;

    doc.cart.forEach(item => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.id": mongoose.Types.ObjectId(req.query.productId)
        },
        {
          $inc: {
            "cart.$.quantity": 1
          }
        },
        {
          new: true
        },
        () => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId),
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    }
  });
});

app.get("/api/users/cart/remove-item", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { id: mongoose.Types.ObjectId(req.query._id) } } },
    { new: true },
    (err, doc) => {
      let cart = doc.cart;
      let array = cart.map(item => {
        return mongoose.Types.ObjectId(item.id);
      });

      Product.find({ _id: { $in: array } })
        .populate("brand")
        .populate("wood")
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart
          });
        });
    }
  );
});

app.post("/api/users/profile/edit", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: req.body
    },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });

      return res.status(200).send({
        success: true
      });
    }
  );
});

//=================================
//              ADMIN
//=================================

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage }).single("file");

app.post("/api/admin/upload-file", auth, admin, (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.json({ success: true });
  });
});

const fs = require("fs");
const path = require("path");

app.get("/api/admin/files", auth, admin, (req, res) => {
  const dir = path.resolve(".") + "/uploads/";

  fs.readdir(dir, (err, items) => {
    return res.status(200).send(items);
  });
});

app.get("/api/admin/download/:id", auth, admin, (req, res) => {
  const file = path.resolve(".") + `/uploads/${req.params.id}`;

  res.download(file);
});

app.post("/api/admin/upload-image", auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    result => {
      res.status(200).send({
        public_id: result.public_id,
        url: result.url
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto"
    }
  );
});

app.get("/api/admin/remove-image", auth, admin, (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.status(200).send("ok");
  });
});

//=================================
//     ADMIN MANAGE SITE INFO
//=================================

app.get("/api/site/site-data", (req, res) => {
  Site.find({}, (err, site) => {
    if (err) return res.status(400).send(err);

    res.status(200).send(site[0].siteInfo);
  });
});

app.post("/api/site/site-data", auth, admin, (req, res) => {
  Site.findOneAndUpdate(
    { name: "Site" },
    {
      $set: {
        siteInfo: req.body
      }
    },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });

      return res.status(200).send({
        success: true,
        siteInfo: doc.siteInfo
      });
    }
  );
});

// DEFAULT //
if (process.env.NODE_ENV === "production") {
  const path = require("path");

  app.get("/*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
