import * as React from 'react';
import styles from './SendRequest.module.scss';
import { ISendRequestProps } from './ISendRequestProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Checkbox, DatePicker, DefaultButton, DialogFooter, Dropdown, FontWeights, getTheme, IconButton, IDropdownOption, IDropdownStyles, IIconProps, Label, Link, mergeStyleSets, MessageBar, MessageBarType, PrimaryButton, TextField } from 'office-ui-fabric-react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import SimpleReactValidator from 'simple-react-validator';
import { sp, Web, View, ContentType } from "@pnp/sp/presets/all";

export interface ISendRequestState {
  currentuser: any;
  verifierId: any;
  Reviewer: any;
  approver: any;
  LinkToDoc: any;
  dcc: any;
  hideproject: boolean;
  RequestSend:string;
  comments:string;
  expiryDate:any;
}
export default class SendRequest extends React.Component<ISendRequestProps, ISendRequestState, {}> {
  private validator: SimpleReactValidator;
  public constructor(props: ISendRequestProps) {
    super(props);
    this.state = {
      currentuser: "",
      verifierId: "",
      Reviewer: "",
      approver: "",
      LinkToDoc: "",
      dcc: "",
      hideproject: true,
      RequestSend:"none",
      comments:"",
      expiryDate:""
    };
    this._onCancel=this._onCancel.bind(this);
    this._submitSendRequest=this._submitSendRequest.bind(this);
    this._openRevisionHistory=this._openRevisionHistory.bind(this);
  }
  public async componentDidMount() {

    await this.User();
    console.log(this.props.project);
    if (this.props.project) {
      this.setState({ hideproject: false });
    }
  }
  public componentWillMount = () => {
    this.validator = new SimpleReactValidator({
        messages: {
            required: "Please enter mandatory fields"
        }
    });
  
  }
  public async User() {
    let user = await sp.web.currentUser();
    this.setState({
      currentuser: user.Title,
    });
  }
  public _getVerifier = (items: any[]) => {

    console.log(items);
    let getSelectedUsers = [];

    for (let item in items) {
      getSelectedUsers.push(items[item].id);
    }
    this.setState({ verifierId: getSelectedUsers[0] });
    console.log(getSelectedUsers);
  }
  private _onCancel = () => {
    // window.location.href = this.props.RedirectUrl;
    window.location.replace(this.props.RedirectUrl);
    this.setState({
      comments:"",
      approver:"",
      expiryDate:"",
    });
  
  }
    private _submitSendRequest = () => {
      if (this.validator.fieldValid("Approver") && this.validator.fieldValid("ExpiryDate") ) {

        this.validator.hideMessages();
        
        this.setState({ RequestSend: "" });
        setTimeout(() => this.setState({ RequestSend: 'none' }), 3000);
        window.location.replace(this.props.RedirectUrl);
  
        // this._onCancel();
    }
   
    else {
        this.validator.showMessages();
        this.forceUpdate();
    }
  }
  private _commentsChange = (ev: React.FormEvent<HTMLInputElement>, Comment?: string) => {
    this.setState({ comments: Comment });
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
private _onExpDatePickerChange = (date?: Date): void => {

  this.setState({ expiryDate: date});

}

private _openRevisionHistory=()=>{
  window.open("https://ccsdev01.sharepoint.com/sites/TrialTest/SitePages/RevisionHistory.aspx");
}
  public render(): React.ReactElement<ISendRequestProps> {
    const controlClass = mergeStyleSets({
      control: {
        // margin    : '0 0 15px 0',
        maxWidth: '450px',
      },
    });
    const level: IDropdownOption[] = [

      { key: 'DIC', text: 'DIC' },
      { key: 'IDC', text: 'IDC' },
      { key: 'IFR', text: 'IFR' },
      { key: 'IFC', text: 'IFC' },
      { key: 'ABT', text: 'ABT' },
      { key: 'VOID', text: 'VOID' },
];
const BUOptions:IDropdownOption[]=[
  {key:'BU1',text:'BU1'}
];
const CategoryOptions:IDropdownOption[]=[
  {key:'BU1',text:'BU1'}
];
    const dropdownStyles: Partial<IDropdownStyles> = {
      dropdown: { width: 180 },
    };
    return (
      <div className={styles.sendRequest} >
         <div style={{ marginLeft: "auto",marginRight:"auto",width:"50rem" }}>
         <div className={styles.title}> Review and approval request form</div>
         <br></br>
         <div></div>
           <div style={{display:"flex"}}>
             <div style={{fontWeight:"bold"}}>Document ID : EMEC_1010_00001</div>
             <div style={{padding:"0 0 0 366px"}}>
            
               </div>
           </div>
           <br></br>
         
        <div >
          
          <Label >Document :  <a href={this.state.LinkToDoc}>EMEC_1010_00001_MigrationDocument.docx</a></Label>
          <div></div>
          <table>
            <tr>
              <td><Label >Orginator : SUNIL JOHN </Label></td>
              <td><Label >Requester : SUBHA RAVEENDRAN</Label></td>
              <td ><Label >Revision : 0 </Label></td>
              <td > <Link onClick={this._openRevisionHistory} underline>Revision History </Link>  </td>
            </tr>
            {/* <tr>
              <td><Label >Business Unit : BU1 </Label></td>
              <td><Label >Category : CAT1 </Label></td>
              <td><Label >Sub-Category : SubCat1 </Label></td>
            </tr> */}
          </table>
          <table>
            <tr hidden={this.state.hideproject}>
              <td style={{width:"50%"}}>
                <Dropdown id="RevisionLevel"
                  placeholder="Select an option"
                  label="Revision Level"
                  options={level}

                // styles={dropdownStyles}
                // selectedKey={this.state.selectedmin}
                // onChanged={(option) => this.min(option)}
                />
              </td>
              <td>
                <PeoplePicker
                  context={this.props.context}
                  titleText="DCC"
                  personSelectionLimit={1}
                  groupName={""} // Leave this blank in case you want to filter from all users    
                  showtooltip={true}
                  disabled={false}
                  ensureUser={true}
                  // selectedItems={this._getVerifier}
                  defaultSelectedUsers={[this.state.dcc]}
                  showHiddenInUI={false}
                  // isRequired={true}
                  principalTypes={[PrincipalType.User]}
                  resolveDelay={1000}
                />
              </td>
            </tr>
          </table>
          <table>
            
            <tr>
              <td>
                <PeoplePicker
                  context={this.props.context}
                  titleText="Reviewer(s)"
                  personSelectionLimit={8}
                  groupName={""} // Leave this blank in case you want to filter from all users    
                  showtooltip={true}
                  disabled={false}
                  ensureUser={true}
                  // selectedItems={this._getVerifier}
                  defaultSelectedUsers={[this.state.Reviewer]}
                  showHiddenInUI={false}
                  // isRequired={true}
                  principalTypes={[PrincipalType.User]}
                  resolveDelay={1000}
                />
              </td>
              
            </tr>
          </table>
          <table>
            <tr>
            <td>
              <PeoplePicker
                context={this.props.context}
                titleText="Approver"
                personSelectionLimit={1}
                groupName={""} // Leave this blank in case you want to filter from all users    
                showtooltip={true}
                disabled={false}
                ensureUser={true}
                onChange={this._Approver}
                //selectedItems={[this.state.approver]}
                //defaultSelectedUsers={[this.state.approver]}
                showHiddenInUI={false}
                required={true}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000}
              />
                  <div style={{ color: "#dc3545" }}>{this.validator.message("Approver", this.state.approver, "required")}{" "}</div>
              </td>
              <td>
                <DatePicker label="Due Date:" id="DueDate" 
                  onSelectDate={this._onExpDatePickerChange}
                  placeholder="Select a date..."
                  isRequired={true}
                  value={this.state.expiryDate}
                  minDate={new Date()}
                  // className={controlClass.control}
                  // onSelectDate={this._onDatePickerChange}                 
                />
                <div style={{ color: "#dc3545" }}>{this.validator.message("ExpiryDate", this.state.expiryDate, "required")}{" "}</div>
              </td>
              
            </tr>
          </table>
          <table>

            <tr><td> <TextField label="Comments" id="Comments" multiline autoAdjustHeight value={this.state.comments} onChange={this._commentsChange}  /></td></tr>
            <tr><td hidden={this.state.hideproject}><Checkbox label="Approve in same revision ? " boxSide="end" /></td></tr>
          </table>
          <div style={{ display: this.state.RequestSend }}>
                        <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>  Request send successfully.</MessageBar>
                    </div> 
          <DialogFooter>
                        <table style={{ float: "right" }}>
                            <tr>
                                <div>
                                    <td style={{ display: "flex" ,padding: "0 0 0 617px"}}>
                                        <Label style={{ color: "red", fontSize: "23px" }}>*</Label>
                                        <label style={{ fontStyle: "italic", fontSize: "12px" }}>fields are mandatory </label>
                                    </td>
                                    <DefaultButton style={{ float: "right", borderRadius: "10px", border: "1px solid gray" }} text="Cancel" onClick={this._onCancel}></DefaultButton >
                                    <DefaultButton style={{ float: "right", marginRight: "10px", borderRadius: "10px", border: "1px solid gray" }} text="Submit" onClick={this._submitSendRequest} />

                                </div>
                            </tr>

                        </table>
                    </DialogFooter>
        </div>
        </div>  
      </div>
    );
  }
}
