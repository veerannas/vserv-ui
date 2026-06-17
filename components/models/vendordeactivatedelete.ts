import IVendorDeactivate from "./vendordeactivate";

interface IVendorDeactivateDelete {
  password: string;
  vendorDeactivate: IVendorDeactivate;
}
export default IVendorDeactivateDelete;
export class VendorDeactivateDelete implements IVendorDeactivateDelete {
  password: string;
  vendorDeactivate: IVendorDeactivate;
  constructor(password: string = "", vendorDeactivate: IVendorDeactivate) {
    this.password = password;
    this.vendorDeactivate = vendorDeactivate;
  }
}
