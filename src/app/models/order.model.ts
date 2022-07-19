import { ProductOrder } from "./product-order.model";

export class Order {
    constructor(public addressId: string, public products: ProductOrder[], public priceAmount?: number, public paymentType?: number, public note?: string, public dealerName?: string, public cstStatus?: number, public id?: string ){}
}
