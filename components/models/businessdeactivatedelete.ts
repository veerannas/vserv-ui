import { BusinessDeactivate } from "./businessdeactivate";

interface IBusinessDeactivateDelete {
  password?: string;
  businessDeactivate?: BusinessDeactivate;
}
export default IBusinessDeactivateDelete;

export class BusinessDeactivateDelete implements IBusinessDeactivateDelete {
  password: string | undefined;
  businessDeactivate: BusinessDeactivate;
  constructor(password: string = "", businessDeactivate: BusinessDeactivate) {
    this.password = password;
    this.businessDeactivate = businessDeactivate;
  }
}
