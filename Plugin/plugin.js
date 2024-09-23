import {sendMsg} from "../Msg/sendMsg.js";

export default class Plugin{
    //创建一个插件类用于加载插件
    constructor(){
        //构造函数
        this.name = "plugin";
        //正则匹配
        this.reg  = ''
    }

    //消息处理函数
    async Plugin(reg,msg) {
        //以reg匹配msg
        if (!reg.test(msg)) {
            //如果匹配
            return true
        }

    }

    // async pluginExample(reg,msg){
    //     if(reg.test(msg)){
    //         res = await fetch('https://api.lolimi.cn/API/xiaohua/api.php')
    //         //解json中的字段
    //         text = res.text
    //         sendMsg(text)
    //     }
    // }



}
