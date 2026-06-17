interface IAddress {
  addressLineOne?: string;
  addressLineTwo?: string;
  addressLineThree?: string;
  addressLineFour?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  longitude?: string;
  latitude?: string;
}

export default IAddress;

export class Address implements IAddress {
  addressLineOne: string | undefined;
  addressLineTwo: string | undefined;
  addressLineThree: string | undefined;
  addressLineFour: string | undefined;
  postalCode: string | undefined;
  city: string | undefined;
  state: string | undefined;
  country: string | undefined;
  longitude: string | undefined;
  latitude: string | undefined;
  constructor(addressLineOne:string="",city:string="",state:string="",country:string="",postalCode:string=""){
    this.addressLineOne=addressLineOne;
    this.city=city;
    this.state=state;
    this.country=country;
    this.postalCode=postalCode;
  }
 
}
