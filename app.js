const express = require("express");
const sequelize = require("./config/database");
const Card = require("./models/Card");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();

app.post("/send-card", async (req, res) => {
  try {
    const { name, message, targetEmail } = req.body;

    const newCard = await Card.create({
      name,
      message,
      targetEmail,
    });

    res.json(newCard);
  } catch (error) {
    console.error("Error sending card:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get-card/:cardId", async (req, res) => {
  try {
    const cardId = req.params.cardId;
    const card = await Card.findByPk(cardId);

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.json(card);
  } catch (error) {
    console.error("Error getting card:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
