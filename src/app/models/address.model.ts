import { CityModel } from "./city.model";
import { DistrictModel } from "./district.model";
import { NeighborhoodModel } from "./neigborhood.model";

export class AddressModel{
    constructor(
        public id: string, 
        public customerId: string,
        public addressTitle: string, 
        public city: CityModel, 
        public district: DistrictModel, 
        public neighborhood: NeighborhoodModel, 
        public addressDescription: string, 
        public street: string, 
        public street2: string, 
        public apartmentName: string, 
        public doorNo: string, // KapıNo
        public floor: string, // Kat
        public inDoorNo: string, // Daire
        public foOrder: string, 
        public dealerId: string,
        public dealerName: string,
        public dealerAddress: string,
        public dealerPhone : string,
        public dealerMinAmount: number,
        public dealerIsOutOfService : boolean,
        public dealerNearestServiceTime : string,
        public dealerPaymentType: string,
        public isSelected : boolean)
        {}
}