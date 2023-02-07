const router = require("express").Router();
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Review = require("../models/Reviews.model");
const {
  isLoggedIn,
  isLoggedOut,
  isAdmin,
} = require("../middleware/route.guard");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

router.get("/signup", isLoggedOut, (req, res, next) => {
  try {
    res.render("auth/signup");
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password, passwordSecondEntry, name, consent } = req.body;

    if (!email || !password || !passwordSecondEntry || !name || !consent) {
      console.log("info missing"); // if one of the fields has not been filled in
      res.render("auth/signup", {
        errorMessage:
          "Please fill in all mandatory fields. Email and password are required.",
      });
      return;
    }
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; //This is a regular expression that will ensure the user's password
    // is long enough and has at least one uppercase letter
    if (!regex.test(password)) {
      res.render("auth/signup", {
        errorMessage:
          "Password not long enough. Must contain at least one uppercase letter",
        email: email,
        password: password,
      });
      return;
    }
    if (password !== passwordSecondEntry) {
      res.render("auth/signup", { errorMessage: "passwords must match" });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      email: email,
      passwordHash: hashedPassword,
      name: name,
      consent: consent,
      userType: "user",
    });
    res.redirect("/login");
  } catch (err) {
    next(err);
  }
});

router.get("/login", isLoggedOut, (req, res, next) => {
  try {
    res.render("auth/login");
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    console.log(`SESSION -----> ${req.session}`);
    const { email, password } = req.body;
    if (!email || !password) {
      res.render("auth/login", {
        errorMessage: "please enter a valid email and password",
      });
    }
    const user = await User.findOne({ email });

    await console.log(user);
    if (!user) {
      await res.render("auth/login", { errorMessage: "User not found" });
    }
    if (bcrypt.compareSync(password, user.passwordHash)) {
      req.session.currentUser = user;
      const reviews = await Review.find();

      for (x of reviews) {
        let userID = req.session.currentUser._id.toString(); //convert ObjectID to a string
        if (userID === x.userID) {
          await Review.findByIdAndUpdate(x._id, { active: true });
        }
      }
      // await console.log(reviews);
      // console.log(req.session.currentUser);
      // console.log(reviews[0].userID);
      if (req.session.currentUser.userType === "admin") {
        await res.redirect("/admin");
      } else {
        await res.redirect("/profile");
      }
    }
    if (!bcrypt.compareSync(password, user.passwordHash)) {
      await res.render("auth/login", {
        errorMessage: "Incorrect Password",
        email: email,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/logout", async (req, res, next) => {
  const reviews = await Review.find();

  for (x of reviews) {
    let userID = req.session.currentUser._id.toString();
    if (userID === x.userID) {
      await Review.findByIdAndUpdate(x._id, { active: false });
    }
  }

  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

router.get("/all-products", async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    console.log(allProducts);

    res.render("all-products", { allProducts });
  } catch (err) {
    next(err);
  }
});

router.get("/acoustic%20guitar", (req, res, next) => {
  Product.find({ productType: "acoustic guitar" })
    .then((acousticGuitars) => {
      console.log(acousticGuitars);
      res.render("all-products", { acousticGuitars });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/electric%20guitar", (req, res, next) => {
  Product.find({ productType: "electric guitar" })
    .then((electricGuitars) => {
      console.log(electricGuitars);
      res.render("all-products", { electricGuitars });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/bass%20guitar", (req, res, next) => {
  Product.find({ productType: "bass guitar" })
    .then((bassGuitars) => {
      console.log(bassGuitars);
      res.render("all-products", { bassGuitars });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/pedal", (req, res, next) => {
  Product.find({ productType: "pedal" })
    .then((pedals) => {
      console.log(pedals);
      res.render("all-products", { pedals });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/amplifier", (req, res, next) => {
  Product.find({ productType: "amplifier" })
    .then((amplifiers) => {
      console.log(amplifiers);
      res.render("all-products", { amplifiers });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/products/:productId", (req, res, next) => {
  Product.findById(req.params.productId)
    .then((individualProduct) => {
      console.log(individualProduct);
      res.render("individualProduct", individualProduct);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
