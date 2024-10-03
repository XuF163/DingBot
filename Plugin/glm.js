import axios from "axios";
const url = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const key = '5a0056fea2b67abc9f99590241d326de.GstO7aPoyEJEL7er'
const logs= []
const _messages = []
export default class glm {

  async chat(msg) {
    logs.push(msg)
    _messages.push({role: 'user', content: msg})
    const data = {
      model: 'glm-4-plus', // 你的模型编码
      messages: `${_message}`
      request_id: 'unique_request_id_123456', // 可选参数，唯一请求ID
      do_sample: true, // 启用采样策略
      temperature: 0.7, // 可选，控制输出随机性
      max_tokens: 1024, // 可选，模型输出最大token数
      stream: false // 同步调用，等待一次性返回完整结果
    };

     console.log(data)
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`, // 使用你自己的API访问令牌
      }
    });

    // 输出返回结果
    console.log('glm-id', response.data.id);
    console.log('glmMsg',response.data.choices[0].message.content)
    _messages.push({role: 'system', content: response.data.choices[0].message.content})
    return response.data.choices[0].message.content;


  }
}
