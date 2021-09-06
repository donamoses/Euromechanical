import * as React from 'react';
import styles from './Trial.module.scss';
import { ITrialProps } from './ITrialProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { CompoundButton, DialogFooter, MessageBar, MessageBarType, PrimaryButton, TextField } from 'office-ui-fabric-react';
import SimpleReactValidator from 'simple-react-validator';
import "@pnp/sp/sputilities";
import { IEmailProperties } from '@pnp/sp/sputilities';
import { sp } from '@pnp/sp';
import "@pnp/sp/sites";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import { MSGraphClient } from '@microsoft/sp-http';  
import "@pnp/sp/site-groups";
export interface ITrialState {
  title:any;
  mobile:any;
  DataAdded:any;
  currentemail:any;
  emailId: string;  
  statusMessage:IMessage;    
}
export interface IMessage{  
  isShowMessage:boolean;  
  messageType:number;  
  message:string;  
}  


export default class Trial extends React.Component<ITrialProps,ITrialState, {}> {
  private validator: SimpleReactValidator;
  constructor(props: ITrialProps) {
    super(props);
    this.state = {
      title: "",
      mobile:"",
      DataAdded:'none',
      currentemail:"",
      emailId: "",  
      statusMessage: {  
        isShowMessage: false,  
        message: "",  
        messageType: 90000  
      } 
    };
    this._titleChange = this._titleChange.bind(this);
    this._mobileChange = this._mobileChange.bind(this);
    this._onSave = this._onSave.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this.SendAnEmilUsingMSGraph=this.SendAnEmilUsingMSGraph.bind(this);
  }
  public async componentDidMount() {
    let user = await sp.web.currentUser();
    console.log(user);
    this.setState({
      currentemail: user.Email
    });
  }
  public async componentWillMount() {
    this.validator = new SimpleReactValidator({
        messages: {
            required: "Please enter mandatory fields"
        }
    });

}
private _titleChange = (ev: React.FormEvent<HTMLInputElement>, Title?: string) => {
    this.setState({ title: Title || '' });
    if(this.validator.fieldValid("Title")){
    
    this.validator.hideMessages();
  }
  else{
    this.validator.showMessages();
    this.forceUpdate();
  }
}
private _mobileChange = (ev: React.FormEvent<HTMLInputElement>, Mobile?: string) => {
  this.setState({ mobile: Mobile || '' });
  if(this.validator.fieldValid("Mobile")){
  
  this.validator.hideMessages();
}
else{
  this.validator.showMessages();
  this.forceUpdate();
}
}
private _onSave = async () => {
  if(this.validator.fieldValid("Title") && this.validator.fieldValid("Mobile")){
    this.validator.hideMessages();
    this.setState({ DataAdded: '' });
    setTimeout(() => this.setState({ DataAdded: 'none' }), 1000);
    this._email();
  }
  else {
    this.validator.showMessages();
    this.forceUpdate();
}
}
private async _email(){
    const emailProps: IEmailProperties = {
    From: "dev11@ccsdev01.onmicrosoft.com",
    To: ["dev11@ccsdev01.onmicrosoft.com"],
    
    Subject: "New Item",
    Body: "<p>Hi, </p><p>A new item is added <p>",
    AdditionalHeaders: {
      "content-type": "text/html"
    }
  };
  await sp.utility.sendEmail(emailProps);
  alert("Email Sent!");
}
private _onCancel = () => {
  this.setState({
    title: "",
    mobile:"",
    DataAdded:""
  });
}
private OnChangeTextBox(e): void {  
  this.setState({  
    emailId: e.target.value  
  });  
} 
private SendAnEmilUsingMSGraph(): void {  
  
  //Check if TextField value is empty or not  
  if (this.state.emailId) {  

    //Create Body for Email  
    let emailPostBody: any = {  
      "message": {  
        "subject": "Mail Sent using MS Graph",  
        "body": {  
          "contentType": "HTML",  
          "content": "This Email is sent using <b>MS Graph</b> <a href=https://ccsdev01.sharepoint.com/:w:/r/sites/TrialTest/_layouts/15/Doc.aspx?sourcedoc=%7B662F9548-AAE8-42DE-BFA1-E062F9158ED0%7D&file=_sites_DMS_SourceDocuments_HR-CS-00062%20new.docx&action=default&mobileredirect=true>Open Document</a>"  
         
        },  
        "toRecipients": [  
          {  
            "emailAddress": {  
              "address": this.state.emailId  
            }  
          }  
        ],  
        "ccRecipients": [
          {  
            "emailAddress": {  
              "address": "dev14@ccsdev01.onmicrosoft.com" 
            }  
          }  
        ],
        "attachments": [
          {
            "@odata.type": "#microsoft.graph.fileAttachment",
            "name": "attachment.txt",
            "contentType": "text/plain",
            "contentBytes": "SGVsbG8gV29ybGQh"
          }
        ],
      }  
    };  

    //Send Email uisng MS Graph  
    this.props.context.msGraphClientFactory  
      .getClient()  
      .then((client: MSGraphClient): void => {  
        client  
          .api('/me/sendMail')  
          .post(emailPostBody, (error, response: any, rawResponse?: any) => {  
            //Set Error Message Bar for any error  
            if (error) {  
              this.setState({  
                statusMessage: { isShowMessage: true, message: error.message, messageType: 1 }  
              });  
            }  
             //Set Success Message Bar after Sending Email  
            else {  
              this.setState({  
                statusMessage: { isShowMessage: true, message: "Email Sent using MS Graph", messageType: 4 }  
              });  
            }  
          });  
      });  
  }  
  else {  
    this.setState({  
      statusMessage: { isShowMessage: true, message: "Please Enter Email ID", messageType: 1 }  
    });  
  }  
}  
// Add Permission to a user

private async AddPermission(): Promise<void> {  
  let grp;
  const groupName = "DocAccess";
  grp = await sp.web.siteGroups.getByName(groupName)(); 
  console.log(grp);
  let grp1: any[] = await sp.web.siteGroups.getByName("DocAccess").users();  
  console.log(grp1);
} 
public render(): React.ReactElement<ITrialProps> {
    return (
      <div className={ styles.trial }>
        <TextField label="Title" value={this.state.title} onChange={this._titleChange} required></TextField>
        <div style={{ color: "#dc3545" }}>{this.validator.message("Title", this.state.title, "required|alpha_space")}{" "}</div>
        <TextField label="Mobile" value={this.state.mobile} onChange={this._mobileChange} ></TextField>
        <div style={{ color: "#dc3545" }}>{this.validator.message("Mobile", this.state.mobile, "numeric|min:6|max:10")}{" "}</div>
        <DialogFooter>
                    <PrimaryButton text="Save" onClick={this._onSave} />
                    <PrimaryButton text="Cancel" onClick={this._onCancel} />
                </DialogFooter>
                <div style={{ display: this.state.DataAdded }}>
                    <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>  New Data Added.</MessageBar>
                </div>
                {/* Show Message bar for Notification*/}  
  {this.state.statusMessage.isShowMessage ?  
    <MessageBar  
      messageBarType={this.state.statusMessage.messageType}  
      isMultiline={false}  
      dismissButtonAriaLabel="Close"  
    >{this.state.statusMessage.message}</MessageBar>  
    : ''}  
                <TextField required label="Enter Email Id" value={this.state.emailId} onChange={(e) => this.OnChangeTextBox(e)} /><br /> 
                <CompoundButton onClick={() => this.SendAnEmilUsingMSGraph()} primary secondaryText="Send an Email using Graph" ></CompoundButton>
                <CompoundButton onClick={() => this.AddPermission()} primary secondaryText="Add Permission to Document"></CompoundButton>
      </div>
    );
  }
}
