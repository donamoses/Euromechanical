import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IVerticalTimeLineNewProps {
  description: string;
  siteUrl:string;
  listName:string;
  tableWithTimeLine:boolean;
  context:WebPartContext;
}
