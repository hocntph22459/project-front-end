import { ADD_TO_BILL, REMOVE_FROM_BILL } from "../redux/contants/bill/bill.type";

interface IBill {
  _id?: string;
  key: string;
  name: string;
  email: string;
  phone: number;
  address: string,
  items: product[];
  total: number;
  status: String;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface product {
  _id: string;
  image: string;
  name: string;
  price: number;
  size: number;
  quantity: number;
}
export default IBill


export interface IBillItem {
  _id: string;
  name: string;
  email: string;
  phone: number;
  address: string,
  items: product[];
  total: number;
}

export interface IBillState {
  BillItems: IBillItem[];
}

export interface IBillAddAction {
  type: typeof ADD_TO_BILL;
  payload: IBillItem;
}

export interface IBillRemoveAction {
  type: typeof REMOVE_FROM_BILL;
  payload: string;
}

export type IBillAction = IBillAddAction | IBillRemoveAction;
