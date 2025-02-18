import {  Status } from "./../../globals/types";

export interface ICartProduct {
  id: string;
  productName: string;
  productImgUrl: string;
  productPrice: number;
  productDescription: string;
  productTotalStock: number;
  discount: number;
  categoryId: string;
  

}
export interface ICartItem {
  id: string;
  productId: string;
  Product: ICartProduct;
  quantity: number;
}

export interface ICartInitialState {
  items: ICartItem[];
  status: Status;
}

export interface ICartUpdateItem {
  productId: string;
  quantity: number;
}
