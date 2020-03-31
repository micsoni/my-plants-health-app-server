const express = require("express");
const Subscription = require("./model");
const webpush = require("web-push");
const auth = require("../auth/middleware")

const vapidKeys = {
  privateKey: "x-mp8o_YbCdL4ZzI0h7m9_eWg_oATekezB2ZeqWCJDY",
  publicKey:
    "BNjuWCXK71muGglEJvKvMGCN7Hu5LdRnKT8oR8WqxEJ7_rILcJk6qID83tPv4CChiVczG28YgMlMUw7zxcD5wok"
};

webpush.setVapidDetails(
  "mailto:micsoni@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const router = express.Router();

// handle PushNotification Subscription
router.post("/subscription", auth, async (req, res, next) => {

  try {
    req.body.userId = req.user.dataValues.id;
    const postSubscription = await Subscription.create(req.body);
    return res.send(postSubscription);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
