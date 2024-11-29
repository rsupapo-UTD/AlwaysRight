import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// 确保在 .env.local 文件中设置了 OPENAI_API_KEY
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for an e-commerce analytics dashboard. Help users with their questions about using the dashboard, understanding metrics, and general support inquiries."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const response = chatCompletion.choices[0]?.message?.content || 'Sorry, I could not generate a response';
    res.status(200).json({ response });
    
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ 
      message: 'Error processing your request',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 