import { createSlice } from "@reduxjs/toolkit";
import socket from "../../tools/socket-io";

const initialState = {
    notifications: []
};

const NotificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        nouveau: (state, action) => {
            console.log(action.payload)
            state.notifications.push(action.payload);
            socket.emit('notification',action.payload)
        }
    }
});

export const { nouveau } = NotificationSlice.actions;

export default NotificationSlice.reducer;
