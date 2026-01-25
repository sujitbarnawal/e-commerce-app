export interface Product{
    id:string,
    title:string,
    price:string,
    description:string,
    category:string,
    image:string,
    rating_count:number|null,
    rating_rate:number|null
}

export interface CartProduct extends Product {
    quantity:number
}