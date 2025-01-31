import {configureStore} from '@reduxjs/toolkit'
import NotificationReducer from '../features/Notifications/NotificationSlice.js'

export const store = configureStore(
    {
        reducer: {
           notification : NotificationReducer
        }
    }
)