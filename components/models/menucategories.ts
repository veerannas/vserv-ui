import IBusinessInfo, { BusinessInfo } from './businessinfo';
interface IMenuCategories{
    id?:string;
    categoryName?:string;
    businessInfo?:IBusinessInfo;
}
export default IMenuCategories;
export class MenuCategories implements IMenuCategories{
    id:string;
    categoryName:string;
    businessInfo:BusinessInfo;

    constructor(id:string="",categoryName:string="",businessInfo:BusinessInfo ){
        this.id=id;
        this.categoryName=categoryName;
        this.businessInfo=businessInfo;
    }

}