import express from 'express';
import cors from 'cors';
import {
    createProxyMiddleware
} from 'http-proxy-middleware';
import OpenAI from 'openai';

const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// // 配置代理
// const proxy = createProxyMiddleware({
//     target: 'http://127.0.0.1:7890', // Clash 代理地址
//     changeOrigin: true, // 如果目标是 https，需要这个选项
//     // 其他可选配置
// });
// // 应用代理中间件
// app.use('/', proxy); // 将所有请求代理到 Clash


// Initialize the OpenAI client
const apiKey = "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";
const openai = new OpenAI({
    apiKey
});
const assistantId = "asst_YovbJCk792wRsmuDGtnyI0jG";

app.post('/chat', async (req, res) => {
    const {
        message
    } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                "role": "user",
                "content": message
            }],
        });
        console.log(response);
        console.log(response.choices[0].message.content);
        // const thread = await client.chat.completions.create({
        //     model: 'text-davinci-003', // 选择要使用的模型
        //     messages: [{
        //         role: 'user',
        //         content: message
        //     }]
        // });
        // console.log(thread);
        // const {
        //     choices
        // } = thread.data;
        // const reply = choices[0].message.content;

        // 如果需要使用后续的 client.threads.messages.create 和 client.threads.runs.createAndPoll，请取消注释这部分代码

        /*
        const userMessage = await client.threads.messages.create({
            threadId: thread.id,
            role: 'user',
            content: message
        });

        const run = await client.threads.runs.createAndPoll({
            threadId: thread.id,
            assistantId: assistantId,
            instructions: 'Please be nice to users.'
        });

        if (run.status === 'completed') {
            const messages = await client.threads.messages.list({
                threadId: thread.id
            });
            const response = messages.data[0].content[0].text.value;
            return res.json({ response });
        } else {
            return res.json({ error: `Run status: ${run.status}` });
        }
        */

        return res.json({
            response
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});