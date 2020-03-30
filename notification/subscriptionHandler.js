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

router.get("/subscription/:id", async function sendPushNotification(req, res) {
  const subscriptionId = req.params.id;

  const pushSubscription = await Subscription.findByPk(subscriptionId)
 
  setTimeout(function() {
    webpush
      .sendNotification(
        pushSubscription,
        JSON.stringify({
          title: "New Alarm",
          text: "Time to water your plant! :)",
          image:
            "https://res.cloudinary.com/plants-health/image/upload/v1585307183/plant_lv1cuj.png",
          tag: "new-alarm",
          url: "/plant/:plantId"
        })
      )
      .catch(err => {
        console.log(err);
      });
  }, 5000);
  res.status(202).json({});
});

module.exports = router;
