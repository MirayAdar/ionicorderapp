import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Product } from "../models/product.model";

@Injectable({
    providedIn: "root"
})

export class ProductService {

    getProducts(): Product[] {
        return [
            {
                id: 1,
                title: "19 Lt. Damacana",
                price: 15,
                image: "https://www.buzdagisu.com.tr/Upload/Products/damacana19lt_urunlist.png",
                description: "lorem ipsum falan filan işte",
            },
            {
                id: 2,
                title: "0.5 Lt. Su",
                price: 2,
                image: "https://i.ibb.co/fQHpj2j/6b8f0666-0f91-41ab-9ee6-f02e4b8bda4b-size780x780-quality60-crop-Center-removebg-preview.png",
                description: "lorem ipsum falan filan işte"
            },
            {
                id: 3,
                title: "Küçük Damacana",
                price: 8,
                image: "https://www.buzdagisu.com.tr/Upload/Products/damacana19lt_urunlist.png",
                description: "lorem ipsum falan filan işte"
            },
            {
                id: 4,
                title: "Battal Damacana",
                price: 18,
                image: "https://www.buzdagisu.com.tr/Upload/Products/damacana19lt_urunlist.png",
                description: "lorem ipsum falan filan işte"
            }
        ]
    } 

    getProduct(id: number): Product {
        return this.getProducts().find((product) => product.id == id)
    }

    
}