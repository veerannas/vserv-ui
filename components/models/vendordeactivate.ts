import IUserFeedBack, { UserFeedBack } from "./userfeedback";
import IVendorInfo, { VendorInfo } from "./vendorinfo";

interface IVendorDeactivate {
  id?: string;
  userFeedback?: IUserFeedBack;
  vendorInfo?: IVendorInfo;
}
export default IVendorDeactivate;
export class VendorDeactivate implements IVendorDeactivate {
  id: string;
  userFeedback: UserFeedBack;
  vendorInfo: VendorInfo;
  constructor(
    id: string = "",
    userFeedback: UserFeedBack,
    vendorInfo: VendorInfo
  ) {
    this.id = id;
    this.userFeedback = userFeedback;
    this.vendorInfo = vendorInfo;
  }
}
