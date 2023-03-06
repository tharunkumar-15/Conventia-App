export const SET_USER='SET_USER';
export const SET_CONVERSATION_TAB_SCREEN='SET_CONVERSATION_TAB_SCREEN';

export const setUser=user=>dispatch=>{
   dispatch({
    type:SET_USER,
    payload:user,
   })
};
export const setConversationTabScreen=conversationScreen=>dispatch=>{
   dispatch({
    type:SET_CONVERSATION_TAB_SCREEN,
    payload:conversationScreen,
   })
};