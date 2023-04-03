import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mysql from "mysql2";
import { config } from "dotenv";
import path from "path";
import * as url from "url";

config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  insecureAuth: true,
});

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(express.static("./client/build"));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const query = async (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, rows, fields) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

app.post("/login", async (req, res) => {
  const name = req.body.name;
  try {
    const hasName = await query(`SELECT * FROM users WHERE name = '${name}';`);
    if (hasName.length > 0) {
      res.status(200).send("ok");
    } else {
      await query(`INSERT INTO users (name) VALUES ('${name}') `);

      res.status(200).send("ok");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/sendMessage", async (req, res) => {
  const senderID = req.body.sender_id;
  const recipID = req.body.recipient_id;
  const subject = req.body.subject;
  const message = req.body.message;

  try {
    const result = await query(
      `INSERT INTO messages (sender_id, recipient_id, subject, message) VALUES ('${senderID}', '${recipID}', '${subject}','${message}')`
    );
    io.emit("new message", recipID);
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/getUserByName", async (req, res) => {
  const name = req.body.name;

  try {
    const result = await query(`SELECT * FROM users WHERE name= '${name}'`);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/listSendMessage", async (req, res) => {
  const sender_id = req.body.sender_id;
  const recipient_id = req.body.recipient_id;

  try {
    const result = await query(
      `SELECT * FROM messages WHERE sender_id= '${sender_id}' and recipient_id='${recipient_id}' `
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/receivedMessage", async (req, res) => {
  const recipient_id = req.body.recipient_id;

  try {
    const result = await query(
      `SELECT * FROM messages WHERE recipient_id='${recipient_id}' `
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/list", async (req, res) => {
  try {
    const result = await query("SELECT * FROM users");

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(url.fileURLToPath(import.meta.url), "../client/build/index.html")
  );
});

server.listen(process.env.PORT, () => {
  console.log("start");
});
