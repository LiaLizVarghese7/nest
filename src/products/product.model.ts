export class Product{
   
    constructor(public id:number,public date: { month: string, day: string, year: number}, public title: string, public description: string, public price: number){ }
}