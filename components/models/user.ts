import INameClass, { NameClass } from "./nameclass";
import IRole, { Role } from "./roles";

export interface IUser {
  id?: string;
  email?: string;
  name?: INameClass;
  roles?: IRole;
  ssnNumber?: string;
}

export class User implements IUser {
  id: string | undefined;
  name: NameClass;
  roles: Role;
  ssnNumber: string | undefined;
  email?: string | undefined;

  constructor(
    id: string = "",
    name: NameClass,
    roles: Role,
    ssnNumber: string = ""
  ) {
    this.id = id;
    this.name = name;
    this.roles = roles;
    this.ssnNumber = ssnNumber;
  }
}
