import { Client } from "../../index.ts";
import { MessageUpdate } from "../events/MessageUpdate.ts";
import { MessageCreate } from "../events/MessageCreate.ts";


export function emit(event:string, client: Client, data:{}){
    console.log(`${event} main.ts`)
}