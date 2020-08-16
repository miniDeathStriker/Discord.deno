import { Client } from "../index.ts";

export function heartBeat(interval:number, client:Client){
    setInterval(() => {
        client.ws.send(JSON.stringify({
            op: 11
        }))
    }, interval/* 45 seconds */)
}