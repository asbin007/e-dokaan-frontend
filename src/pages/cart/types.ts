import { IProduct, Status } from './../../globals/types';
  

export interface ICartItem{
    product:IProduct,
    quantity:number
}
export interface ICartInitialState{
    items:ICartItem[],
    status:Status

}