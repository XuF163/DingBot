// import { DWClient, EventAck, TOPIC_ROBOT } from 'dingtalk-stream';
// import https from 'https';
// import fs from 'fs';
// import { sendMsg } from './Msg/sendMsg.js';
// // 读取config.json文件中的clientId和clientSecret
// const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
// // 检查是否有 clientId 和 clientSecret
// if (!config.clientId || !config.clientSecret) {
//     throw new Error('请在config.json中配置clientId和clientSecret');
// }
// const client = new DWClient({
//     clientId: config.clientId,
//     clientSecret: config.clientSecret,
// });
// //const options = program.opts();
// const onBotMessage = (event) => {
//     let message = JSON.parse(event.data);
//     let content = (message?.text?.content || '').trim();
//     let webhook = message?.sessionWebhook || '';
//     let text = 'echo received message:\n' +
//         content.split('\n').map((item) => {
//             return '>1. ' + item.trim();
//         }).join('\n');
//     try {
//         console.log('接收消息', message.text.content);
//     }
//     catch (error) {
//         console.log(message);
//     }
//
//     const responseMessage = {
//         'msgtype': 'markdown',
//         'markdown': {
//             'title': '消息外显raw',
//             'text': `${text}`,
//         },
//         'at': {
//             'atUserIds': [message?.senderStaffId || '']
//         }
//     };
//     // 在 JSON.stringify 之前打印 markdown.text 属性
//     try {
//         console.log('发送消息:', responseMessage.markdown.text);
//         sendMsg('测试1');
//     }
//     catch (error) {
//         console.error('处理消息时出错', error);
//     }
//    // 将对象转换为字符串后发送
//
//     const data = JSON.stringify(responseMessage);
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     };
//     const req = https.request(webhook, options, (res) => {
//         console.log(`状态码: ${res.statusCode}`);
//         res.on('data', (d) => {
//             console.log('data:', d);
//         });
//     });
//     req.on('error', (error) => {
//         console.error(error);
//     });
//     req.write(data);
//     req.end();
//     return { status: EventAck.SUCCESS, message: 'OK' }; // message 属性可以是任意字符串；
// };
// client
//     .registerCallbackListener(TOPIC_ROBOT, onBotMessage)
//     .connect();
