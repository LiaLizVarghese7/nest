import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
@Controller('products')
export class ProductController{
    constructor(private readonly productsService: ProductsService ){}
    @Post()
    addProduct(@Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number
    ): any{
        const generatedId = this.productsService.insertProduct(prodTitle, prodDescription, prodPrice);
        return {id: generatedId};
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