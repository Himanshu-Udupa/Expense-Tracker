import express, { json } from "express";
import cors from "cors";
import def from "./db/db.js";
import mongoose from "mongoose";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath, pathToFileURL } from "url";
const { db } = def;
// import { readdirSync } from "fs";
// import dotenv from "dotenv";
// import router from "./routes/transactions.js";

const app = express();

// require("dotenv").config();

const PORT = process.env.PORT || 3001;

//middlewares
app.use(json());
app.use(cors());

import { Schema, model } from "mongoose";

const IncomeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    // type: {
    //   type: String,
    //   default: "income",
    // },
    // date: {
    //   type: Date,
    //   required: true,
    //   trim: true,
    // },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
  },
  { timestamps: true }
);

const ExpenseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    // type: {
    //   type: String,
    //   default: "expense",
    // },
    // date: {
    //   type: Date,
    //   required: true,
    //   trim: true,
    // },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
  },
  { timestamps: true }
);

const incomeModel = mongoose.model("Income", IncomeSchema);
const expenseModel = mongoose.model("Expense", ExpenseSchema);

app.post("/add-income", async (req, res) => {
  const { title, amount, category, description } = req.body;

  const income = new incomeModel({
    title,
    amount,
    category,
    description,
  });

  try {
    //validations
    if (!title || !category || !description) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ error: error, message: "Server Error" });
  }

  console.log(income);
});

app.get("/get-incomes", async (req, res) => {
  try {
    const incomes = await find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.delete("/delete-income/:id", (req, res) => {
  const { id } = req.params;
  findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
});

app.post("/add-expense", async (req, res) => {
  const { title, amount, category, description } = req.body;

  const income = new expenseModel({
    title,
    amount,
    category,
    description,
  });

  try {
    //validations
    if (!title || !category || !description) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(income);
});

app.get("/get-expenses", async (req, res) => {
  try {
    const incomes = await find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.delete("/delete-expense/:id", (req, res) => {
  const { id } = req.params;
  findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Expense Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
});

// Your server start code would go here
const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
