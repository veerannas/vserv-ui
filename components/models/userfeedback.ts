interface IUserFeedBack {
  accountType?: string;
  reason?: string;
  otherReason?: string;
  feedback?: string;
}
export default IUserFeedBack;

export class UserFeedBack implements IUserFeedBack {
  public accountType: string ;
  reason: string | undefined;
  otherReason: string | undefined;
  feedback: string | undefined;

  constructor(
    accountType: string = "",
    reason: string = "",
    otherReason: string = ""
  ) {
    this.accountType = accountType;
    this.reason = reason;
    this.otherReason = otherReason;
  }
}
