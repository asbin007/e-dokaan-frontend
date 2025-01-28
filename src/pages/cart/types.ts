import {  Status } from "./../../globals/types";

export interface ICartProduct {
  id: string;
  productName: string;
  productImgUrl: string;
  productPrice: number;
}
export interface ICartItem {
  id: string;
  productId: string;
  product: ICartProduct;
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
