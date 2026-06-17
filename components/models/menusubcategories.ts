import IBusinessInfo from "./businessinfo";
import IMenuCategories, { MenuCategories } from "./menucategories";
interface IMenuSubCategories {
  id?: string;
  menuCategories?: IMenuCategories;
  menuName?: string;
  currency?: string;
  price?: string;
  isDeactivated?: boolean;
}
export default IMenuSubCategories;
export class MenuSubCategories implements IMenuSubCategories {
  id: string;
  menuCategories: MenuCategories;
  menuName: string;
  currency: string;
  price: string;
  isDeactivated: boolean;
  information: any;

  constructor(
    id: string = "",
    menuCategories: MenuCategories,
    menuName: string = "",
    currency: string = "$",
    price: string = "",
    information="",
    isDeactivated: boolean = false
  ) {
    this.id = id;
    this.menuCategories = menuCategories;
    this.menuName = menuName;
    this.currency = currency;
    this.price = price;
    this.information = information;
    this.isDeactivated = isDeactivated;
  }
}
