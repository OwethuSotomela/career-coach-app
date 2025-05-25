const Chat = require('../models/Chat');
const { Configuration, OpenAIApi } = require('openai');

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const handleChat = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }]
    });

    const aiReply = response.data.choices[0].message.content;

    const chat = new Chat({ userMessage: message, aiResponse: aiReply });
    await chat.save();

    res.json({ reply: aiReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong with AI' });
  }
};

module.exports = { handleChat };
