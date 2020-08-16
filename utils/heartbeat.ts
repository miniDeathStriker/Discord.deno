import { Client } from "../index.ts";

export function heartBeat(){
    setInterval(() => {
        Client.prototype.ws.send(JSON.stringify({
            
        }))
    }, 45*1000 /* 45 seconds */)
}