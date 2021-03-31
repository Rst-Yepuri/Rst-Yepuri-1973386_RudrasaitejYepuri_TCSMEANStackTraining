import { Option } from "./option.model";

export class Question{
    constructor(public questionId:number,public questionText:string,public option:Option[],public answer:string, public isHidden:boolean){

    }
}