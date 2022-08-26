import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Res } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductController{
    constructor(private readonly productsService: ProductsService ){}
    @Post()
    addProduct(@Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price',ParseIntPipe) prodPrice: number
    ): any{
        const regex= new RegExp('.*');
        const result1 = regex.test(prodTitle);
        const result2 = regex.test(prodDescription);
        console.log(result1,result2);
        const generatedId = this.productsService.insertProduct(prodTitle, prodDescription, prodPrice);
        return generatedId;
        // if(result1 == true && result2 == true){
        // const generatedId = this.productsService.insertProduct(prodTitle, prodDescription, prodPrice);
        // return generatedId
        // }
        // else if(result1==false){
        //     if(result2 ==false){
        //         return 'title and description entered is not a string'
        //     }
        //     return 'title entered is not a string'  
        // }
        // else{
        //     return 'description entered is not a string'
        // }
    } 

    @Get()
    getAllProducts(){
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProducts(@Param('id') prodId: number) {
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: number,
        @Body('title') prodTitle: string
     ){
        this.productsService.updateTitle(prodId, prodTitle);
        return null
    }
}