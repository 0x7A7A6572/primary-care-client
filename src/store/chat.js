import $api from '@/http/index';
export default {
  // namespaced: true,//使用命名空间，这样只在局部使用
  state: {
    // 聊天内消息列表
    // msgList: [],
    // 聊天会话列表
    chatList: []
  },
  mutations: {
    // addMsg(state, msg) {
    //   state.msgList.push(msg);
    // },
    // setMsgList(state, msglist){
    //   state.msgList = msglist;
    // },
    addChat(state, chats){ 
      if(chats instanceof Array){
         state.chatList.push(...chats);
      }else{
        state.chatList.push(chats);
      }
    },
    setChatList(state, chatlist) {
      if(chatlist) state.chatList = chatlist;
    },
    updateChatListBySid(state, { sid, chat }) {
      state.chatList.forEach((e,i) => {
        if (e.sid == sid) {
         state.chatList[i].unreadCount += 1;
         state.chatList[i].lastMsg = chat.msg;
        }
      });
    }
    // addMsg(state, msg) {
    //   if (!state.chatList.has(msg.sid)) state.chatList.set(msg.sid, []);
    //   state.chatList.get(msg.sid).push(msg);
    // },
    // setChat(state, chat) {
    //   // console.log('mutations.setChat:',chat)
    //   state.chatList.set(chat?.[0]?.sid, chat);
    // }
  },
  getters: {
    // getMsglist(state){
    //   return state.msgList;
    // },
    getChat(state) {
      // return Array.from(state.chatList.values());
      return state.chatList;
    },
    getChatBySid(state) {
      return (sid) => {
        // console.log('getChatBySid',sid,state.chatList)
        // return state.chatList.get(sid);
        for (let e of state.chatList) {
          if (e.sid == sid) return e;
        }
      }
    },
    calendarHasChats(state){
     return state.chatList.map(v=>{
        return v.stime;
      })
    },
    dayHasChat(state){
      return (day)=>{
        const month = day.date.getMonth() + 1;
        const date = day.date.getDate();
        for (let e of state.chatList) {
          let d = new Date(e.stime);
          let dm = d.getMonth()+1;
          let dd = d.getDate();
          if (month == dm && date == dd) return true;
        }
        return false;
      }
    }
  },
  actions: {
    //  setMsgList({commit,getters}, chat){
    //   // console.log("actions.setChat",chat)
    //   return new Promise((resolve,rej)=>{
    //     commit('setMsgList',msgs2chatMsgs(chat,getters.user.uid));
    //     resolve(getters.getMsglist);
    //   })
    //  },
    //  addMsg({commit,getters}, m){
    //   return new Promise((resolve,rej)=>{
    //     commit('addMsg',{
    //         mid: m.mid,
    //         sid: m.sid,
    //         uid: m.sender,
    //         touid: m.recipient,
    //         time: m.sendtime,
    //         msg: m.content,
    //         type: m.type,
    //         role: m.sender == getters.user.uid ? "self" : "others",
    //     });
    //     resolve(getters.getMsglist);
    //   })
    //  }
    getChatlist({ commit }) {
      return new Promise((resolve, reject) => {
        $api.chat.list().then((res) => {
          commit('setChatList', res.data?.map((v) => {
                return {
                  unreadCount: 0,
                  lastMsg: '',
                  ...v
                };
              }));
          resolve(res.data);
        }).catch(err => reject(err));
      })
    },
    updateChatListBySid({commit,getters}, { sid, chat }) {
      return new Promise((resolve, reject) => {
        for(let e of getters.getChat){
          if (e.sid == sid) {
            e.unreadCount += 1;
            e.lastMsg = chat.msg;
            return resolve(getters.getChat);
          }
        }
          // 没有找到对应sid时需要更新
        $api.chat.list().then((res) => {
          // commit('addChat', res.data);
          commit('setChatList', res.data?.map((v,i) => {
            if(getters.getChat[i]){
              return {
                unreadCount: getters.getChat[i].unreadCount,
                lastMsg: getters.getChat[i].lastMsg,
                ...v
              };
            }else{
              return {
                unreadCount: 0,
                lastMsg: '',
                ...v
              };
            }
          }));
          resolve(getters.getChat);
        }).catch(err => reject(err));
      })
      }
  }

}

// function msgs2chatMsgs(msgs,uid) {
//  return msgs.map((v) => {
//     return {
//       mid: v.mid,
//       sid: v.sid,
//       uid: v.sender,
//       touid: v.recipient,
//       time: v.sendtime,
//       msg: v.content,
//       type: v.type,
//       role: v.sender == uid ? "self" : "others",
//     };
//   });
// }