import * as React from 'react';
import styles from './SendEmailUsingSpfx.module.scss';
import { ISendEmailUsingSpfxProps } from './ISendEmailUsingSpfxProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { CompoundButton, MessageBar, PrimaryButton, TextField } from 'office-ui-fabric-react';
import { MSGraphClient } from '@microsoft/sp-http';  
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types'; 
export interface IMessage{  
  isShowMessage:boolean;  
  messageType:number;  
  message:string;  
}  
export interface ISendEmailUsingSpfxState {  
  emailId: string;  
  statusMessage:IMessage;    
}  
export default class SendEmailUsingSpfx extends React.Component<ISendEmailUsingSpfxProps,ISendEmailUsingSpfxState, {}> {
  constructor(props: ISendEmailUsingSpfxProps) {  
    super(props);  
  
    //Set initial value for state  
    this.state = ({  
      emailId: "",  
      statusMessage: {  
        isShowMessage: false,  
        message: "",  
        messageType: 90000  
      }  
      
    }); 
    this.SendAnEmilUsingMSGraph=this.SendAnEmilUsingMSGraph.bind(this);
    this._getPermission=this._getPermission.bind(this);
    this.addtolist=this.addtolist.bind(this);
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
            "content": "This Email is sent using <b>MS Graph</b> <a href=https://ccsdev01.sharepoint.com/sites/SharePointSteps/SourceDocuments/Forms/AllItems.aspx?id=%2Fsites%2FSharePointSteps%2FSourceDocuments%2FgrindBindingfromstate%2Etxt&parent=%2Fsites%2FSharePointSteps%2FSourceDocuments>This is a link</a>"  
           
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
                "address": "dev11@ccsdev01.onmicrosoft.com" 
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
      this.props.Context.msGraphClientFactory  
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
  private _getPermission(): void {    
    //Check if TextField value is empty or not  
    
  
      //Create Body for Email  
      let emailPostBody: any = {  
        "id": "1",
      "roles": ["write"],
      "grantedTo": {
        "user": {
          "id": "174a0f40-ae8d-47af-8ed2-e72732dfe592",
          "displayName": "Dona Mariyam"
        }
      },
      "invitation": {
        "email": "Sreemol.m@ccs-technologies.com",
        "signInRequired": true
      },
      "shareId": "FWxc1lasfdbEAGM5fI7B67aB5ZMPDMmQ11U",
      "expirationDateTime": "2021-10-01T00:00:00Z"
      };  
  
      //Send Email uisng MS Graph  
      this.props.Context.msGraphClientFactory  
        .getClient()  
        .then((client: MSGraphClient): void => {  
          client  
          .api('/sites/%7B6e1262a2-71cd-4d77-a77a-9213573e897d%7D/drives/b!omISbs1xd02nepITVz6JfSWzDN7GYX5Fn2ugjf2wcydrFFPaXD8hQ5Juw8Ktv_Mj/items/013A6UOGCISUXWN2FK3ZBL7IPAML4RLDWQ/invite')  
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

 private addtolist(){
  const obj: string = JSON.stringify(
    {
      "fields": {
        'Title': 'Lin',
        'Announcement': 'Microsoft',
        'ExpDate':'2021/02/17',
      }
    }
    );
  this.props.Context.msGraphClientFactory
    .getClient()
    .then((client: MSGraphClient): void => {
      client         
       .api("/sites/36867b61-cb52-48cb-bbfd-d2b9c6570afd/lists/99d88499-437c-444c-9a06-65b4f3d76ac7/items")
       .header('Content-Type','application/json')
       .version("v1.0")
        .post(obj, (err, res, success) => {
          if (err) {  
          console.log(err);                 
          }                
          if (success)
          {
            console.log("success");
          }            
        })
    });
 }
    
  

  public render(): React.ReactElement<ISendEmailUsingSpfxProps> {
    return (
      <div className={ styles.sendEmailUsingSpfx }>       
  
  {/* Show Message bar for Notification*/}  
  {this.state.statusMessage.isShowMessage ?  
    <MessageBar  
      messageBarType={this.state.statusMessage.messageType}  
      isMultiline={false}  
      dismissButtonAriaLabel="Close"  
    >{this.state.statusMessage.message}</MessageBar>  
    : ''}  

    {/* Text field for entering Email id*/}  
  <TextField required label="Enter Email Id" value={this.state.emailId} onChange={(e) => this.OnChangeTextBox(e)} /><br />  
  {/* Button for Send Email using Graph API*/}  
  <CompoundButton onClick={() => this.SendAnEmilUsingMSGraph()} primary secondaryText="Send an Email using Graph" >  
    MS Graph  
   </CompoundButton> 
   <PrimaryButton text="Check" onClick={this._getPermission}></PrimaryButton>
   <PrimaryButton text="Check" onClick={this.addtolist}></PrimaryButton>
      </div>
    );
  }
}
