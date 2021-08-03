import * as React from 'react';
import styles from './VoidWorkFlow.module.scss';
import { IVoidWorkFlowProps } from './IVoidWorkFlowProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DatePicker, DefaultButton, DialogFooter, Label, TextField } from 'office-ui-fabric-react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { sp } from "@pnp/sp/presets/all";
export interface IVoidWorkFlowState {
  currentuser: any;
  verifierId: any;
  Reviewer: any;
  approver: any;
  LinkToDoc: any;
  dcc: any;
  
}
export default class VoidWorkFlow extends React.Component<IVoidWorkFlowProps,IVoidWorkFlowState, {}> {
   constructor(props: IVoidWorkFlowProps) {
    super(props);
    this.state = {
      currentuser: "",
      verifierId: "",
      Reviewer: "",
      approver: "",
      LinkToDoc: "",
      dcc: "",    
    };
  }

  public async componentDidMount() {
    sp.web.currentUser.get().then(currentUser =>{
      this.setState({
          currentuser:currentUser.Title,
      });
      alert(this.state.currentuser);
    });
  }
  private _onCancel = () => {
    // window.location.href = this.props.RedirectUrl;
    this.setState({
      
    });}
    private _submitVoidWorkFlow = () => {
      // window.location.href = this.props.RedirectUrl;
      this.setState({
        
      });}
  public render(): React.ReactElement<IVoidWorkFlowProps> {
    return (
      <div className={ styles.voidWorkFlow }>
         <div > 
           <div><h3>Void WorkFlow Send Request</h3></div>       
           <Label >Document Name:  <a href={this.state.LinkToDoc}>NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</a></Label>
           <PeoplePicker
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
                  required={true}
                  principalTypes={[PrincipalType.User]}
                  resolveDelay={1000}
                />
                <PeoplePicker
                  context={this.props.context}
                  titleText="Approver"
                  personSelectionLimit={1}
                  groupName={""} // Leave this blank in case you want to filter from all users    
                  showtooltip={true}
                  disabled={false}
                  ensureUser={true}
                  // selectedItems={this._getVerifier}
                  //defaultSelectedUsers={this.state.currentuser}
                  showHiddenInUI={false}
                  required={true}
                  principalTypes={[PrincipalType.User]}
                  resolveDelay={1000}
                />
                <DatePicker label="Due Date:" id="DueDate" style={{ width: '300px' }}
                  //formatDate={(date) => moment(date).format('DD/MM/YYYY')}
                  isRequired={true}
                  // value={this.state.ExpireDate}
                  minDate={new Date()}
                  // className={controlClass.control}
                  // onSelectDate={this._onDatePickerChange}
                  placeholder="Due Date"
                />
                <TextField label="Comments" id="Comments" multiline autoAdjustHeight />
                <TextField label="Retention period in days " id="Comments"  />
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
