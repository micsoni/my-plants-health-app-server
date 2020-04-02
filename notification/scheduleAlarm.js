const Alarm = require("../alarm/model");
const webpush = require("web-push");
const Plant = require("../plant/model");
const User = require("../user/model");
const Subscription = require("./model");
const { Op } = require("sequelize");

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

async function main() {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const day = now.getDay();

  console.log("Looking for alarms to ", now.toString());
  const alarms = await Alarm.findAll({
    where: { time: minutes },
    include: { all: true, nested: true }
  }).filter(alarm => alarm.dayOfTheWeek.includes(day));

  console.log(`Found ${alarms.length} alarms`);

  const promisses = alarms.reduce((acc, alarm) => {
    return acc.concat(
      alarm.plant.user.subscriptions
        .filter(sub => sub.active)
        .map(async subscription => {
          try {
            await webpush.sendNotification(
              subscription,
              JSON.stringify({
                title: alarm.name,
                text: `Time to care for your ${alarm.plant.name}! :)`,
                image: alarm.plant.image,
                tag: "alarm",
                url: `https://happyplants.netlify.com/plants/${alarm.plantId}`
              })
            );
          } catch (err) {
            console.log(err);
            await subscription.update({ active: false });
          }
        })
    );
  }, []);

  await Promise.all(promisses);
}

module.exports = main;
