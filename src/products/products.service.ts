import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

const fs=require('fs');

@Injectable()
export class ProductsService{
    
    

    private products: Product[]=[];
    insertProduct(title: string,description: string, price: number ){
        console.log(this.loadNewData());
        const prodId= this.products.length +1;
        const getdate= new Date();
        const date ={
            month:getdate.toLocaleString("en-US", { month: "long" }),
            day : getdate.toLocaleString("en-US", { day: "2-digit" }),
            year : getdate.getFullYear()
        }
        const newProduct = new Product(prodId, date, title, description, price);
        this.products.push(newProduct);
        fs.writeFileSync('src/products/data.json',JSON.stringify(this.products));
        return this.products;
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

    loadNewData(): any{
    const getData = fs.readFileSync('src/products/data.json');
    const dataBuffer = getData.toString();
    const prodData = JSON.parse(dataBuffer);
    return prodData
    
    }
}
