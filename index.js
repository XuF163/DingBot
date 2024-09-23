import { DWClient, EventAck, TOPIC_ROBOT } from 'dingtalk-stream';
import https from 'https';
import fs from 'fs';
import { sendMsg } from './Msg/sendMsg.js';
// 读取config.json文件中的clientId和clientSecret
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
// 检查是否有 clientId 和 clientSecret
if (!config.clientId || !config.clientSecret) {
    throw new Error('请在config.json中配置clientId和clientSecret');
}
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
    let webhook = message?.sessionWebhook || config.webhook || '';
    global.sessionWebhook = webhook
    console.log(webhook)
    console.log('接收[消息][id]', content,msgId);
    //sendMsg(content)
   if (content.includes('笑话')) {
    fetch('https://api.lolimi.cn/API/xiaohua/api.php')
        .then(response => response.text()) // 直接解析为文本
        .then(text => {
            sendMsg(text); // 发送获取到的文本
        })
        .catch(error => {
            console.error('获取笑话时出错:', error); // 错误处理
        });

}
   if (content.includes('天气')) {
       fetch('https://api.lolimi.cn/API/weather/?city=镇江')
            .then(response => response.json()) // 解析为 JSON
    .then(data => {
        // 获取 data 部分
        const weatherData = data.data;
        console.log(weatherData); // 打印 data 的内容

        // 你可以进一步使用 weatherData，例如发送消息
        sendMsg(`城市: ${weatherData.city}, \n温度: ${weatherData.temp}°C,\n 天气: ${weatherData.weather}`);
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


