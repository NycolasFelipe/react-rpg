import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
  addCard,
  getCards,
  saveCard,
  deleteCard,
} from './controllers/index.js';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post("/add", addCard);
app.get("/get-cards", getCards);
app.put("/save", saveCard);
app.delete("/delete/:idcard", deleteCard);

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
})