import React, { useEffect } from "react";
import "./Notifications.css";
import { 
    CheckCircle,
    AlertCircle,
    Info,
    Bell
 } from "lucide-react";

const Notifications = ({notif,resetNotifCounter}) => {

    useEffect(()=>{
        resetNotifCounter()
    },[])

    const getIcon = (type) => {
        switch (type) {
            case "success": return <CheckCircle size={18} className="text-green-500" />;
            case "error": return <AlertCircle size={18} className="text-red-500" />;
            case "info": return <Info size={18} className="text-blue-500" />;
            default: return <Bell size={18} className="text-gray-500" />;
        }
    };

    return (
        <div className="absolute top-8 right-1 w-80 max-h-60 bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">Notifications</h2>
            {notif.length === 0 ? (
                <p className="text-gray-500 text-center">Aucune notification</p>
            ) : (
                <div className="space-y-3">
                    {notif.reverse().map((ntf) => (
                        <div
                            key={ntf.id}
                            className="flex items-start space-x-3 p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
                            
                        >
                            {getIcon(ntf.type)}
                            <div className="flex-1">
                                <p className="text-sm font-medium">{ntf.message}</p>
                                <p className="text-xs text-gray-500">{new Date(ntf.timestamp).toLocaleTimeString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Notifications;