import { DWClient, EventAck, TOPIC_ROBOT } from 'dingtalk-stream';
import https from 'https';
import fs from 'fs';
import {sendImg, sendMsg} from './Msg/sendMsg.js';
import schedule from 'node-schedule';
// 读取config.json文件中的clientId和clientSecret
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
// 检查是否有 clientId 和 clientSecret
if (!config.clientId || !config.clientSecret) {
    throw new Error('请在config.json中配置clientId和clientSecret');
}
//消息处理队列
const processedMsgIds = new Set();
//初始化客户端
const client = new DWClient({
    clientId: config.clientId,
    clientSecret: config.clientSecret,
});
 console.log('服务器启动中，使用参数：', config.clientSecret,config.clientId);

//发消息测试

const onBotMessage = (event) => {
    //接收消息
    let message = JSON.parse(event.data);
    let content = (message?.text?.content || '').trim();
    let msgId = message?.msgId || '';
    //存储msgId(十分钟)

    let webhook = message?.sessionWebhook || config.webhook || '';
    global.sessionWebhook = webhook
    console.log(webhook)
    if (processedMsgIds.has(msgId)) {
        console.log('消息已处理，忽略重复消息:', msgId);
        return;
    }

    // 如果消息ID未处理过，处理该消息并将其记录
    processedMsgIds.add(msgId);
    console.log('接收[消息][id]', content,msgId);
    //sendMsg(content)
   if (content.includes('测试')) {
    fetch('https://api.lolimi.cn/API/xiaohua/api.php')
        .then(response => response.text()) // 直接解析为文本
        .then(text => {
            sendMsg(text); // 发送获取到的文本
            //发图片测
            sendImg('https://img.kookapp.cn/assets/2024-09/11/8KT0pgLDov0ug1ud.jpeg');
        })
        .catch(error => {
            console.error('获取笑话时出错:', error); // 错误处理
        });

}
   //自动天气
    function weatherFunction() {
    console.log('函数在每天六点执行');
    fetch('https://api.lolimi.cn/API/weather/?city=镇江')
            .then(response => response.json()) // 解析为 JSON
    .then(data => {
        // 获取 data 部分
        const weatherData = data.data;
        console.log(weatherData); // 打印 data 的内容

        // 你可以进一步使用 weatherData，例如发送消息
        sendMsg(`城市: ${weatherData.city}, \r\n温度: ${weatherData.tempn}°C,\r\n 天气: ${weatherData.weather}`);
    })
           .catch(error => {
               console.error('获取笑话时出错:', error); // 错误处理
           });
}

// 设置每天六点执行
const job = schedule.scheduleJob('0 6 * * *', weatherFunction);
//     const job = schedule.scheduleJob('* * * * *', weatherFunction);
   if (content.includes('天气')) {
       fetch('https://api.lolimi.cn/API/weather/?city=镇江')
            .then(response => response.json()) // 解析为 JSON
    .then(data => {
        // 获取 data 部分
        const weatherData = data.data;
        console.log(weatherData); // 打印 data 的内容

        // 你可以进一步使用 weatherData，例如发送消息
        sendMsg(`城市: ${weatherData.city}, \r\n温度: ${weatherData.temp}°C,\r\n 天气: ${weatherData.weather}`);
    })
           .catch(error => {
               console.error('获取笑话时出错:', error); // 错误处理
           });
   }



};
client
    .registerCallbackListener(TOPIC_ROBOT, onBotMessage)
    .connect()
//     const onClientConnected = () => {
//      //延迟3秒
//         setTimeout(() => {
//             sendMsg('机器人已启动，主动发送第一条消息！');
//         }, 100);
// }


