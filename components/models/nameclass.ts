interface INameClass {
  firstName?: string;
  middleName?: string;
  lastName?: string;
}
export default INameClass;

export class NameClass implements INameClass {
  firstName: string | undefined;
  middleName: string | undefined;
  lastName: string | undefined;

  constructor(
    firstName: string = "",
    middleName: string = "",
    lastName: string = ""
  ) {
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
  }
}
