export enum Status {
  SUCCESS = "success",
  ERROR = "error",
  LOADING = "loading",
}

interface ICategory{
    id:string,
    categoryName: string
}
export interface IProduct {
  id: string;
productName: string;
  productDescription: string;
  productPrice: number;
  productTotalStock: number;
  discount: number;
  productImageUrl: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  Category: ICategory;
}


export interface IProducts{
    products:IProduct[],
    status:Status
}