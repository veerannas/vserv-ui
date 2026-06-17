interface ITeleInfo{
    countryCode:string;
    number:string;
    isPrimary:boolean;

}
export default ITeleInfo;
export class TeleInfo implements ITeleInfo{
    countryCode: string;
    number: string;
    isPrimary: boolean;
    constructor(countryCode:string="+1",number:string="",isPrimary: boolean=false){
        this.countryCode=countryCode;
        this.number=number;
        this.isPrimary=isPrimary;

    }
    
}