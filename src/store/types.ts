
export interface User{
    name:string;
    age:number

}
interface ProductInfo{
    productNm:string;
    qty:number;
}
export interface Product {
    products: [] | ProductInfo[];
}