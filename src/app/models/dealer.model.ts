export class DealerModel {
    constructor(
        public bayiId: string, 
        public bayiAdi: string, 
        public address: string, 
        public phone: string, 
        public minPrice: number, 
        public IsOutOfService : boolean, 
        public paymentTypes: string,
        public NearestServiceTime:string
        )
        {}
}