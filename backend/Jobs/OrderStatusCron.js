const cron = require("node-cron");
const Order = require("../schema/orderSchema");

// 🕐 Auto-set "In Progress" when startDate <= now and status = "Allocated"
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const result = await Order.updateMany(
      { status: "Allocated", startDate: { $lte: now } },
      { $set: { status: "In Progress" } }
    );
    if (result.modifiedCount > 0)
      console.log(`✅ ${result.modifiedCount} orders moved to In Progress`);
  } catch (err) {
    console.error("❌ Error updating In Progress orders:", err.message);
  }
});

// 🏁 Auto-set "Completed" when endDate < now and status = "In Progress"
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const result = await Order.updateMany(
      { status: "In Progress", endDate: { $lt: now } },
      { $set: { status: "Completed" } }
    );
    if (result.modifiedCount > 0)
      console.log(`✅ ${result.modifiedCount} orders marked as Completed`);
  } catch (err) {
    console.error("❌ Error updating Completed orders:", err.message);
  }
});
