import https from "https";
import { DWClient, EventAck, TOPIC_ROBOT } from 'dingtalk-stream'
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
// 检查是否有 clientId 和 clientSecret
if (!config.webhook) {
    throw new Error('请在config.json中配置webhook');
}

 export async function sendMsg (msg) {
    const webhook = sessionWebhook|| config.webhook;

    console.log('准备发送', msg);
    const responseMessage = {
                 'msgtype': 'markdown',
                 'markdown': {
                     'title': '消息外显new',
                     'text': `>${msg}`,
                 },
    };
             //在 JSON.stringify 之前打印 markdown.text 属性
             // return responseMessage;
     try {
         console.log('发送消息[消息模块]', responseMessage.markdown.text);
     }
     catch (error) {
         console.error('处理消息时出错', error);
     }
             // 将对象转换为字符串后发送
     const data = JSON.stringify(responseMessage);
     console.log('msg发送预备', responseMessage)
     const options = {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         }
     };
     const req = https.request(webhook, options, (res) => {
         console.log(`状态码: ${res.statusCode}`);
                 // console.log('响应',res)
         res.on('data', (d) => {
             console.log('data:', d);
         });
     });
     req.on('error', (error) => {
                 console.error(error);
     });
     req.write(data);
     req.end();
     return {status: EventAck.SUCCESS, message: 'OK'}; // message 属性可以是任意字符串；

 }
 export async function  sendImg(url){
    const webhook = sessionWebhook|| config.webhook;
     console.log('准备发送', url);
    const responseMessage = {
                 'msgtype': 'markdown',
                  "markdown": {
         "title":"我是图片",
         "text": `![screenshot](${url})
`
     },
  }

             //在 JSON.stringify 之前打印 markdown.text 属性
             // return responseMessage;
     try {
         console.log('发送消息[消息模块]', responseMessage);
     }
     catch (error) {
         console.error('处理消息时出错', error);
     }
             // 将对象转换为字符串后发送
     const data = JSON.stringify(responseMessage);
     console.log('msg发送预备', responseMessage)
     const options = {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         }
     };
     const req = https.request(webhook, options, (res) => {
         console.log(`状态码: ${res.statusCode}`);
                 // console.log('响应',res)
         res.on('data', (d) => {
             console.log('data:', d);
         });
     });
     req.on('error', (error) => {
                 console.error(error);
     });
     req.write(data);
     req.end();
     return {status: EventAck.SUCCESS, message: 'OK'};


 }
