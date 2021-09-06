import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IVoidWorkFlowProps {
  description: string;
  context: WebPartContext;
  DueDateDefault:number;
  RetentionPeriod:string;
  project:string;
  RedirectUrl:string;

}
