interface IRole {
  id?: string;
  role?: string;
}
export default IRole;

export class Role implements IRole {
  id: string | undefined;
  role: string | undefined;

  constructor(id: string = "", role: string = "") {
    this.id = id;
    this.role = role;
  }
}
