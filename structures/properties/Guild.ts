import { Client } from "../../index.ts"

export class Guild extends Client {
    constructor(){
        super(Client.prototype.options)
    }
}