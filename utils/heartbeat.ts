import { Client } from "../index.ts";

export function heartBeat(interval:number, client:Client){
    setInterval(() => {
        client.ws.send(JSON.stringify({
            op: 1,
            d: null
        }))
    }, interval)
}