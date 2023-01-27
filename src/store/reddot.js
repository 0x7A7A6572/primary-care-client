export default {
  state: {
    // 消息未读红点
    // chatUnread: new Map(),
    chatUnread: {
      /*
      21：{
        unread：1，
        lastmsg： 'this is msg'
      }
      */
    }, 
    // tabbar通知红点
    tabbarDot: {
      Home: 0,
      ChatList: 0,
      Medicine: 0,
      User:0
    },
  },
  mutations: {
    addChatUnread(state, info) {
      // if (!state.chatUnread.has(info.sid)) state.chatUnread.set(info.sid, []);
      // state.chatUnread.get(info.sid).push(info);
      // if(!state.chatUnread[info.sid]) state.chatUnread[info.sid] = [];
      // state.chatUnread[info.sid].push(info);
      if(!state.chatUnread[info.sid]) state.chatUnread[info.sid] = {
        unread:66,
        lastmsg: ''
      };
      state.chatUnread[info.sid].unread++;
      state.chatUnread[info.sid].lastmsg = info.msg;
    },
    clearChatUnread(state,sid){
      // state.chatUnread.delete(sid);
      state.chatUnread[sid] = null;
    },
    // tabbar
    addTabbarDot(state,name){
      state.tabbarDot[name]++;
    },
    clearTabbarDot(state, name){
      state.tabbarDot[name] = 0;
    },
    setTabbarDotHome(state,num){
      state.tabbarDot.Home = num;
    },
    setTabbarDotChat(state,num){
      state.tabbarDot.ChatList = num;
    },
    setTabbarDotMedicine(state,num){
      state.tabbarDot.Medicine = num;
    },
    setTabbarDotUser(state,num){
      state.tabbarDot.User = num;
    }
  },
  getters: {
    getTabbarDot(state){
      return state.tabbarDot;
    },
    getChatUnread(state){
      return state.chatUnread;
    },
    getChatUnreadBySid(state) {
      return (sid) => {
        return state.chatUnread[sid];
        // return state.chatUnread.get(sid);
      }
    },
  }
}