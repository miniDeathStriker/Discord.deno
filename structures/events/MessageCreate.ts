import { Client } from "../../index.ts";

export function MessageCreate(client:Client, data:{}){
    client.emit("message", data)
}