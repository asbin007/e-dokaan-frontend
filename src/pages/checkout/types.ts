

interface IProduct{
    productId: string;
    productQty: number;
    orderStatus?:string,
    totalAmount?:number,
    Payment? : {
        paymentMethod : PaymentMethod, 
        
    }
}
export interface IOrderItems extends IProduct{
    id : string
}
export enum PaymentMethod{
    Esewa = "esewa", 
    Khalti = "khalti", 
    COD = "cod"
}
export interface IData{
    firstName : string, 
    lastName : string, 
    phoneNumber : string, 
    email : string, 
    City : string, 
    zipCode : string, 
    state : string, 
    AddressLine : string, 
    totalAmount : number, 
    paymentMethod:PaymentMethod,
    products:IProduct[]
}