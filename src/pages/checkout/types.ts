

interface IProduct{
    productId: string;
    productQty: number;
}
export interface IOrderItems extends IProduct{
    orderId : string
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