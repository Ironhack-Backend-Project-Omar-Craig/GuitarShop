const router = require("express").Router();
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Review = require("../models/Reviews.model");
const { isLoggedIn, isLoggedOut } = require("../middleware/route.guard");

const bcrypt = require("bcryptjs");
const { populate } = require("../models/User.model");
const saltRounds = 10;

router.get("/", isLoggedIn, (req, res, next) => {
  try {
    res.render("profile/user-profile", {
      userInSession: req.session.currentUser,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/edit-details", isLoggedIn, (req, res, next) => {
  res.render("profile/edit-profile", { currentUser: req.session.currentUser });
});

router.post("/edit-details", async (req, res, next) => {
  const { email, name, consent } = req.body;
  await User.findByIdAndUpdate(req.session.currentUser._id, {
    email: email,
    name: name,
    consent: consent,
  });
  const updatedUser = await User.findById(req.session.currentUser._id);
  req.session.currentUser = updatedUser;
  res.redirect("/profile");
});

router.get("/change-password", isLoggedIn, (req, res, next) => {
  res.render("profile/change-password");
});

router.post("/change-password", async (req, res, next) => {
  try {
    const { currentPassword, newPasswordFirst, newPasswordSecond } = req.body;
    console.log(req.body);

    const currentUser = req.session.currentUser;
    const passwordHash = currentUser.passwordHash;
    console.log(passwordHash);

    if (!bcrypt.compareSync(currentPassword, passwordHash)) {
      res.render("profile/change-password", {
        errorMessage: "current password is incorrect",
      });
    }

    if (newPasswordFirst !== newPasswordSecond) {
      res.render("profile/change-password", {
        errorMessage: "passwords must match",
      });
    }

    if (currentPassword === newPasswordFirst) {
      res.render("profile/change-password", {
        errorMessage: "new password must be different",
      });
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(newPasswordFirst)) {
      res.render("profile/change-password", {
        errorMessage:
          "Password not long enough. Must contain at least one uppercase letter",
      });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPasswordFirst, salt);
    await User.findByIdAndUpdate(currentUser._id, {
      passwordHash: hashedPassword,
    });

    await res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.session.currentUser._id);
    await res.redirect("/");
  } catch (err) {
    next(err);
  }
});
router.post(
  "/add-to-favourites/:productId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.session.currentUser._id, {
        $push: { favourites: req.params.productId },
      });
      await res.redirect("/profile/favourites");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/favourites", isLoggedIn, async (req, res, next) => {
  try {
    const userPopulated = await User.findById(
      req.session.currentUser._id
    ).populate("favourites");
    console.log(userPopulated);
    res.render("profile/favourites", userPopulated);
  } catch (err) {
    next(err);
  }
});
router.post(
  "/favourites/:productId/remove",
  isLoggedIn,
  async (req, res, next) => {
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $pull: { favourites: req.params.productId },
    });
    const updatedUser = await User.findById(req.session.currentUser._id);
    res.redirect("/all-products");
  }
);

router.get("/reviews/:reviewId/edit", isLoggedIn, async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);
  const product = await Product.findById(review.product);
  res.render("profile/edit-review", { review, product });
});

router.post("/reviews/:reviewId/edit", isLoggedIn, async (req, res, next) => {
  const { text, stars } = req.body;
  const updatedReview = await Review.findByIdAndUpdate(req.params.reviewId, {
    text,
    stars,
  });
  await console.log(updatedReview);
  res.redirect("/profile/reviews");
});

router.get("/reviews", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findById(req.session.currentUser._id).populate(
      "reviews"
    );

    // const user = await User.findById(req.session.currentUser._id)
    //   .populate({ path: "thisReviewIsAbout reviews", strictPopulate: false })
    //   .populate({
    //     path: "reviews",
    //     populate: {
    //       path: "thisReviewIsAbout",
    //       model: "Review",
    //     },
    //   });

    // const user = await User.findById(req.session.currentUser._id)
    //   .populate({ path: "reviews", strictPopulate: false })
    //   .populate({
    //     path: "thisReviewIsAbout",
    //     populate: {
    //       path: "reviews",
    //       model: "Product",
    //     },
    //   });

    await console.log(`USER >>>>> ${user}`);
    await res.render("profile/reviews", user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
