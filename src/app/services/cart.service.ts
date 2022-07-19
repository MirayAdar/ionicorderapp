import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
//import { CartItem } from "../models/cart-item.model";
import { Products } from "../models/products.model";
import { CartItem } from "../models/cartItem.model";


@Injectable({
    providedIn: "root"
})

export class CartService {
    // private items$ = new BehaviorSubject<CartItem[]>([])

    private cart = [];
    public items: CartItem[] = [];
    public total:number = 0;
    cartItemCount = new BehaviorSubject(0);
    getProducts(): Products[] {
        return [
            { productId: "1", bayiUrunTanim: "19 Lt. Damacana", fiyat: 15, imgBase64: "https://www.buzdagisu.com.tr/Upload/Products/damacana19lt_urunlist.png",quantity:0},
            { productId: "2", bayiUrunTanim: "0.5 Lt. Küçük Su", fiyat: 3, imgBase64: "https://i.ibb.co/fQHpj2j/6b8f0666-0f91-41ab-9ee6-f02e4b8bda4b-size780x780-quality60-crop-Center-removebg-preview.png",quantity:0 },
            { productId: "3", bayiUrunTanim: "Küçük Damacana", fiyat: 8, imgBase64: "https://www.buzdagisu.com.tr/Upload/Products/damacana19lt_urunlist.png",quantity:0},
            { productId: "4", bayiUrunTanim: "Battal Damacan", fiyat: 18, imgBase64: "https://www.buzdagisu.com.tr/Upload/Products/damacana19lt_urunlist.png",quantity:0},
        ];
    }


    getProductById(id: string): Products {
        return this.getProducts().find((product) => product.productId == id)
    }

    getCart(){
        return this.cart;
    }


    addProduct(product: Products) {
        let item = this.items.find(i => product.productId == i.product.productId);
        if (item != undefined) {
            item.product.quantity += 1;
        }
        else {
            this.items.push(new CartItem(product));
            product.quantity += 1;
        }
        this.cartItemCount.next(this.cartItemCount.value + 1);
        this.getTotalAmount();
    }


    decreaseProduct(product) {
        let item = this.items.find(i => product.productId == i.product.productId);
        if (item != undefined) {
            item.product.quantity -= 1;
        }
        let index = this.items.findIndex(i => product.productId == i.product.productId);
        if (item.product.quantity == 0) {
            this.items.splice(index, 1);
        }
        this.cartItemCount.next(this.cartItemCount.value - 1);
        this.getTotalAmount();
    }

    removeProduct(product) {
        let item = this.items.find(i => product.productId == i.product.productId);
        let index = this.items.findIndex(i => product.productId == i.product.productId);
        this.cartItemCount.next(this.cartItemCount.value - item.product.quantity);
        item.product.quantity = 0;
        this.items.splice(index, 1);
        this.getTotalAmount();
    }

    clearCartItems() {
        this.items.forEach(i => {
            i.product.quantity = 0
        })
        this.cartItemCount.next(0);
        this.items.splice(0, this.items.length);
        this.getTotalAmount();
    }

    getTotalAmount(){
        this.total = 0;
        this.items.forEach(i => {
           this.total += (i.product.quantity*i.product.fiyat);
        })
    }
}
