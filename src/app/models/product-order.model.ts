export class ProductOrder {
    constructor(public productId: string, public quantity: number, public priceAmount?: number, public productNames?: string,public imgBase64? : string ){}
}
