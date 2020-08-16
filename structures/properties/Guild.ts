import { Client } from "../../"

export class Guild extends Client {
    constructor(){
        super(Client.prototype.options)
    }
}