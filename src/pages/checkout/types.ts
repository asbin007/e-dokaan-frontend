

interface IProduct{
    productId: string;
    productQty: number;
}
export interface IOrderItems extends IProduct{
    orderId: string;
}
export enum PaymentMethod{
    Esewa = "esewa", 
    Khalti = "khalti", 
    Cod = "cod"
}
export interface IData{
    firstName : string, 
    lastName : string, 
    phoneNumber : string, 
    email : string, 
    city : string, 
    zipCode : string, 
    state : string, 
    addressLine : string, 
    totalAmount : number, 
    paymentMethod:PaymentMethod[],
    products:IProduct[]
}