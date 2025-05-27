import IBusinessInfo, { BusinessInfo } from "./businessinfo";
import IUserFeedback, { UserFeedBack } from "./userfeedback";

interface IBusinessDeactivate {
  id?: string;
  businessInfo?: IBusinessInfo;
  userFeedback?: IUserFeedback;
}
export default IBusinessDeactivate;

export class BusinessDeactivate implements IBusinessDeactivate {
  id: string | undefined;
  businessInfo: BusinessInfo;
  userFeedback: UserFeedBack;
  constructor(businessInfo: BusinessInfo, userFeedback: UserFeedBack) {
    this.businessInfo = businessInfo;
    this.userFeedback = userFeedback;
  }
}
