import * as React from 'react';
import styles from './VoidWorkFlow.module.scss';
import { IVoidWorkFlowProps } from './IVoidWorkFlowProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DatePicker, DefaultButton, DialogFooter, ITextStyles, ITooltipHostStyles, Label, MessageBar, MessageBarType, TextField, TooltipHost } from 'office-ui-fabric-react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { sp } from "@pnp/sp/presets/all";
import SimpleReactValidator from 'simple-react-validator';
import * as moment from 'moment';
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };
const calloutProps = { gapSpace: 0 };
export interface IVoidWorkFlowState {
  currentuser: any;
  verifierId: any;
  Reviewer: any;
  approver: any;
  LinkToDoc: any;
  dcc: any;
  ExpiryDate:any;
  RetentionPeriod:any;
  RequestSend:string;
  comments:string;
}
const textbox : Partial<ITextStyles> = { root:{width:"100%"}};
const commentbox : Partial<ITextStyles> = { root:{width:"100%"}};
export default class VoidWorkFlow extends React.Component<IVoidWorkFlowProps,IVoidWorkFlowState, {}> {
  private validator: SimpleReactValidator;
   constructor(props: IVoidWorkFlowProps) {
    super(props);
    this.state = {
      currentuser: "",
      verifierId: "",
      Reviewer: "",
      approver: "",
      LinkToDoc: "",
      dcc: "",   
      ExpiryDate:"" ,
      RetentionPeriod:"",
      RequestSend:"none",
      comments:"",
    };
    this._onCancel=this._onCancel.bind(this);
  }

  public async componentDidMount() {
    sp.web.currentUser.get().then(currentUser =>{
      this.setState({
          currentuser:currentUser.Title,
      });     
    });
        const currentDate = new Date();
         let days = this.props.DueDateDefault;
         console.log(Number(days));
        // it adds 2 days to a current date
        currentDate.setDate(currentDate.getDate()+5);
        console.log(currentDate.toDateString());
        this.setState({
          ExpiryDate:currentDate,
        });
   
  }
  public componentWillMount = () => {
    this.validator = new SimpleReactValidator({
        messages: {
            required: "Please enter mandatory fields"
        }
    });
  
  }
  private _onCancel = () => {
    // window.location.href = this.props.RedirectUrl;
    this.setState({
      comments:"",
      approver:"",
    });}
    private _submitVoidWorkFlow = () => {
      if (this.validator.fieldValid("Approver") ) {

        this.validator.hideMessages();
        
        this.setState({ RequestSend: "" });
        setTimeout(() => this.setState({ RequestSend: 'none' }), 1000);
  
        // this._onCancel();
    }
   
    else {
        this.validator.showMessages();
        this.forceUpdate();
    }
  }
  public _Approver = (items: any[]) => {

    console.log(items);
    let getSelectedUsers = [];

    for (let item in items) {
        getSelectedUsers.push(items[item].id);
    }
    this.setState({ approver: getSelectedUsers[0] });
    console.log(getSelectedUsers);
    

}
  private _commentsChange = (ev: React.FormEvent<HTMLInputElement>, Comment?: string) => {
    this.setState({ comments: Comment });
}

  public render(): React.ReactElement<IVoidWorkFlowProps> {
    return (
      <div className={ styles.voidWorkFlow }>
         <div style={{ marginLeft: "auto",marginRight:"auto",width:"50rem" }}>
           <div><h3>Void workFlow request form</h3></div> 
           <br></br>
           <div style={{display:"flex"}}>
             <div>Document ID : NOT/SHML/INT-PRC/AM-00009</div>
             <div style={{padding:"0 0 0 366px"}}><a href="https://ccsdev01.sharepoint.com/sites/TrialTest/SitePages/RevisionHistory.aspx">Revision History</a></div>
           </div>
           <br></br>
           <Label >Document Name:  <a href={this.state.LinkToDoc}>NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</a></Label>
           
           <div >
             <table style={{width:"100%"}}>
               <tr><td><PeoplePicker
                  context={this.props.context}
                  titleText="Requester"
                  personSelectionLimit={1}
                  groupName={""} // Leave this blank in case you want to filter from all users    
                  showtooltip={true}
                  disabled={true}
                  ensureUser={true}
                  //selectedItems={this.state.currentuser}
                  defaultSelectedUsers={[this.state.currentuser]}
                  showHiddenInUI={false}
                  required={false}
                  principalTypes={[PrincipalType.User]}
                  resolveDelay={1000}
                
                /></td>
                <td style={{padding:"0 0 0 30px"}}><PeoplePicker
                context={this.props.context}
                titleText="Approver"
                personSelectionLimit={1}
                groupName={""} // Leave this blank in case you want to filter from all users    
                showtooltip={true}
                disabled={false}
                ensureUser={true}
                onChange={this._Approver}
                // selectedItems={this._getVerifier}
                //defaultSelectedUsers={[this.state.approver]}
                showHiddenInUI={false}
                required={true}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000}
              />
              <div style={{ color: "#dc3545" }}>{this.validator.message("Approver", this.state.approver, "required")}{" "}</div>
              </td>
              </tr>
              <tr><td><DatePicker label="Expiry Date:" id="DueDate"
                  //formatDate={(date) => moment(date).format('DD/MM/YYYY')}
                  isRequired={true}
                   value={this.state.ExpiryDate}
                  minDate={new Date()}
                  // className={controlClass.control}
                  // onSelectDate={this._onDatePickerChange}
                  placeholder="Due Date"
                />
                
              </td>
                <td style={{padding:"0 0 0 30px"}}>
                <TooltipHost
                    content="Enter in days"
                    // This id is used on the tooltip itself, not the host
                    // (so an element with this id only exists when the tooltip is shown)                              
                    calloutProps={calloutProps}
                    styles={hostStyles}
                  >
                    <TextField label="Retention period "  value={this.props.RetentionPeriod}  styles={textbox}/>
                     </TooltipHost>
                  </td></tr>
             </table> 
           </div>
           
                
                <TextField label="Comments" id="Comments" multiline autoAdjustHeight value={this.state.comments}onChange={this._commentsChange} style={{width:"80%"}} />
                <div style={{ display: this.state.RequestSend }}>
                        <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>  Void request send successfully.</MessageBar>
                    </div>  
                <DialogFooter>
                        <table style={{ float: "right" }}>
                            <tr>
                                <div>
                                    <td style={{ display: "flex" ,padding: "0 0 0 14px"}}>
                                        <Label style={{ color: "red", fontSize: "23px" }}>*</Label>
                                        <label style={{ fontStyle: "italic", fontSize: "12px" }}>fields are mandatory </label>
                                    </td>
                                    <DefaultButton style={{ float: "right", borderRadius: "10px", border: "1px solid gray" }} text="Cancel" onClick={this._onCancel}></DefaultButton >
                                    <DefaultButton style={{ float: "right", marginRight: "10px", borderRadius: "10px", border: "1px solid gray" }} text="Submit" onClick={this._submitVoidWorkFlow} />

                                </div>
                            </tr>

                        </table>
                    </DialogFooter> 
        </div>
      </div>
    );
  }
}
