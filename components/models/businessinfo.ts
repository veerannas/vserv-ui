import IAddress, { Address } from "./address";
import { IUser } from "./user";
import IVendorInfo from "./vendorinfo";


interface IBusinessInfo {
  id?: string;
  companyName?: string;
  vendor?: IVendorInfo;
  manager?: IUser;
  address?: IAddress;
  email?: string;
  telephone?: [];
  // serviceId?: IServiceCategories;
  // serviceId?: IServiceCategories;
}
export default IBusinessInfo;

export class BusinessInfo implements IBusinessInfo {
  id: string | undefined;
  address!: Address;

  // constructor(id: string = "") {
  //   this.id = id;
  // }
  constructor(id: string = "",address: Address) {
    this.id = id;
    this.address=address;
  }
  
}
