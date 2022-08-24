import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
@Injectable()
export class ProductsService{
    private products: Product[] = [];
    insertProduct(title: string,description: string, price: number ){
        const prodId= this.products.length +1;
        const newProduct = new Product(prodId, title, description, price);
        this.products.push(newProduct);
        return prodId;
    } 
    getProducts(){
        return [...this.products];
    }
    getSingleProduct(productId: number){
        const product = this.findProduct(productId)[0];
        return {...product};
    }
    updateTitle(productId: number, prodTitle: string){
        const [product, index] = this.findProduct(productId);
        this.products[index].title=prodTitle;
    }

    private findProduct(id:number): [Product, number]{
        const productIndex = this.products.findIndex(prod=> id == prod.id);
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException('Could not find product');
        }
        return [product, productIndex];
    }
}
