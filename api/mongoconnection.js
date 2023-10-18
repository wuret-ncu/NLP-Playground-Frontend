const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 56000;

const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const { MongoClient } = require('mongodb');
const uri = 'mongodb://mongochat.hsueh.tw:27020';
const client = new MongoClient(uri);

const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000, // set session timeout as an hour.
  },
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// 轉送 request 到 api上
app.post('/forwardRequest', async (req, res) => {
  // try {
    const model_endpoint = "http://localhost/callapi/chatGPT"; // model endpoint

    const { temperature, max_tokens, top_p, purpose } = req.query;
    const bodyData = req.body;

    // send request
    const response = await axios.post(model_endpoint, bodyData, {
      params: { temperature, max_tokens, top_p, purpose },
    });

    // get response
    res.json(response.data);

  // } catch (error) {
  //   // handle error event.
  //   res.status(500).json({ error: 'forward request error.' });
  // }
});


app.post('/UpdateChatlog', async (req, res) => {
  if (!req.session.uuid) {
    req.session.uuid = uuidv4(); // generate a unique uuid
  }
  try {
    await client.connect();
    const database = client.db('UserAgentLog');
    const collection = database.collection('historyChatlog');
    console.log(req.body.ChatLog);
    const findData = await collection.findOne({userId: req.session.uuid, agentId: 0});

    if (findData === null) {
      const result = await collection.insertOne(
        { userId: req.session.uuid, agentId: 0,
          chatlog: [req.body.ChatLog]}
      );
      res.send(result);
    }
    else {
      const result = await collection.updateOne(
        { userId: req.session.uuid, agentId: 0 },
        { $push: { chatlog: req.body.ChatLog }}
      );
      res.send(result);
    }
    await client.close();
  } catch (err) {
    console.error(err);
  } finally {
    
  }
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
