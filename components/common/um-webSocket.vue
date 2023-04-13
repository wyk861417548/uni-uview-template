<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      token:this.$store.state.localData.token,

      ws:null,
      // 服务器ws地址
      wsUrl:'',

      //连接标识 避免重复连接
      isConnect:false,

      //断线重连后，延迟5秒重新创建WebSocket连接  rec用来存储延迟请求的代码
      timer:null,

      //服务器和客户端收到的信息内容如果如下 就识别为心跳信息 不要做业务处理
      checkMsg:'heartbeat',

      //每段时间发送一次心跳包 这里设置为20s
      timeout: 20000,

      // 参数
      id:''
    };
  },
  methods: {
    // 创建
    createWebSocket(id){
      this.id = id;
      this.ws = uni.connectSocket({
        url:this.wsUrl + id,
        complete: ()=> {}
      })

      this.connectWebSocket();
    },

    // 连接
    connectWebSocket(){
      uni.onSocketOpen(()=>{
        this.isConnect=true;

        uni.sendSocketMessage({data:JSON.stringify({token:this.token})})

        this.heartCheckStart();
      })

      // 当websocket连接失败
      uni.onSocketError((res)=>{
        console.log('onSocketError',res);
        this.isConnect=false;
        this.reConnect();
      });

      // 当websocket收到服务器发送的信息之后
      uni.onSocketMessage((res)=>{
        // console.log('onSocketMessage收到消息',res)
        this.$emit('onMsg',res)
      })
    },

    // 重新连接
    reConnect(){
      //如果已经连上就不在重连了
      if(this.isConnect) return;

      this.timer && clearTimeout(this.timer);

      this.timer = setTimeout(()=>{
        this.createWebSocket(this.id);
      },5000)
    },

    //一段时间后发送心跳包
    heartCheckStart(){
      this.timeoutObj = setInterval(()=>{
        if(this.isConnect) {
          uni.sendSocketMessage({data:JSON.stringify({type:this.checkMsg})})
        };
      }, this.timeout);
    },

    // 清除心跳
    heartCheckClear(){
      console.log("清除心跳");
      clearInterval(this.timeoutObj);
    },

    //关闭连接
    close(){
      console.log('ws关闭成功');
      this.heartCheckClear();
      this.ws && this.ws.close();
    }
  },
}
</script>
<style lang='scss' scoped>
</style>