const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 56000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
const { MongoClient } = require('mongodb');
const uri = 'mongodb://140.115.126.49:27020';
const client = new MongoClient(uri);

app.post('/UpdateChatlog', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('UserAgentLog');
    const collection = database.collection('historyChatlog');
    console.log(req.body.ChatLog);
    const findData = await collection.findOne({userId: 0, agentId: 0});

    if (findData === null) {
      const result = await collection.insertOne(
        { userId: 0, agentId: 0,
          chatlog: [req.body.ChatLog]}
      );
      res.send(result);
    }
    else {
      const result = await collection.updateOne(
        { userId: 0, agentId: 0 },
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
