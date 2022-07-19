import { AddressModel } from "./address.model";

export class CustomerModel{
    constructor(
        public customerId: string,
        public name:string,
        public surname:string,
        public telephone:string,
        public addresses: AddressModel[]) {}

}