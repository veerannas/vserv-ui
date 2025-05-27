import {User} from "./user";

interface IVendorInfo {
  id: string;
  managingDirector: User;
}

export default IVendorInfo;

export class VendorInfo implements IVendorInfo{
  id: string;
  managingDirector: User;
  static constructorId: any;

  constructor(id:string="",managingDirector:User){
    this.id=id;
    this.managingDirector=managingDirector;
  }
  constructorId(id:string=""){
    this.id=id;
  }
  // get unitPrice(): number {
  //   return this._unitPrice || 0;
  // }
  // set unitPrice(value: number) {
  //   if (value < 0) {
  //     value = 0;
  //   }
  //   this._unitPrice = value;
  // }

}
  