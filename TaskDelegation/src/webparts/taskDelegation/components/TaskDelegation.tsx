import * as React from 'react';
import styles from './TaskDelegation.module.scss';
import { ITaskDelegationProps } from './ITaskDelegationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { sp } from '@pnp/sp/presets/all';
import { Checkbox, DatePicker, DefaultButton, DialogFooter, Label } from 'office-ui-fabric-react';


export interface ITaskDelegationState {
  assignExistingTask:string;
  fromDate:any;
  toDate:any;
  delegatedTo:any;
  delegatedBy:any;
  delegatedFor:any;
  AssignExistingTaskChecked:boolean;
}
export default class TaskDelegation extends React.Component<ITaskDelegationProps,ITaskDelegationState, {}> {
  constructor(props: ITaskDelegationProps) {
    super(props);
    this.state = {
       assignExistingTask:"",
        fromDate:"",
        toDate:"",
        delegatedBy:"",
        delegatedFor:"",
        delegatedTo:"",
        AssignExistingTaskChecked:false,
    };
  }

  public _getDelegatedBy = (items: any[]) => {
    console.log(items);
    let getSelectedUsers = [];
    for (let item in items) {
        getSelectedUsers.push(items[item].id);
    }
    this.setState({ delegatedBy: getSelectedUsers[0] });
    console.log(getSelectedUsers);
}
public _getDelegatedFor = (items: any[]) => {
  console.log(items);
  let getSelectedUsers = [];
  for (let item in items) {
      getSelectedUsers.push(items[item].id);
  }
  this.setState({ delegatedFor: getSelectedUsers[0] });
  console.log(getSelectedUsers);


}
public _getDelegatedTo = (items: any[]) => {
  console.log(items);
  let getSelectedUsers = [];
  for (let item in items) {
      getSelectedUsers.push(items[item].id);
  }
  this.setState({ delegatedTo: getSelectedUsers[0] });
  console.log(getSelectedUsers);


}
private _onFromDatePickerChange = (date?: Date): void => {

  this.setState({ fromDate: date, });

}
private _onToDatePickerChange = (date?: Date): void => {

  this.setState({ toDate: date, });

}
private _onAssignExistingTaskChecked = (ev: React.FormEvent<HTMLInputElement>, isChecked?: boolean) => { 
    if (this.state.AssignExistingTaskChecked == true) {
          this.setState({
            assignExistingTask: "Yes",
          });
      }
 
}
  public render(): React.ReactElement<ITaskDelegationProps> {
    return (
      <div className={ styles.taskDelegation }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
                      
            <Label style={{textAlign:"center"}}>Task Delegation</Label>
              <PeoplePicker
                        context={this.props.context}
                        titleText="Delegated By"
                        personSelectionLimit={1}
                        groupName={""} // Leave this blank in case you want to filter from all users    
                        showtooltip={true}
                        required={false}
                        disabled={false}
                        ensureUser={true}
                        onChange={this._getDelegatedBy}
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.User]}
                        resolveDelay={1000} />
                         <div style={{display:"flex" }}>
                        <DatePicker label="From Date"
                            style={{ width: '200px' }}
                            value={this.state.fromDate}
                            onSelectDate={this._onFromDatePickerChange}
                            placeholder="Select a date..."
                            ariaLabel="Select a date"
                        />
                        <DatePicker label="To Date"
                            style={{ width: '216px' ,marginLeft:'14px'}}
                            value={this.state.toDate}
                            onSelectDate={this._onToDatePickerChange}
                            placeholder="Select a date..."
                            ariaLabel="Select a date"
                        />
                        </div>
                        <PeoplePicker
                        context={this.props.context}
                        titleText="Delegated For"
                        personSelectionLimit={1}
                        groupName={""} // Leave this blank in case you want to filter from all users    
                        showtooltip={true}
                        required={false}
                        disabled={false}
                        ensureUser={true}
                        onChange={this._getDelegatedFor}
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.User]}
                        resolveDelay={1000} />
                        <PeoplePicker
                        context={this.props.context}
                        titleText="Delegated To"
                        personSelectionLimit={1}
                        groupName={""} // Leave this blank in case you want to filter from all users    
                        showtooltip={true}
                        required={false}
                        disabled={false}
                        ensureUser={true}
                        onChange={this._getDelegatedTo}
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.User]}
                        resolveDelay={1000} />
                        <div style={{ marginTop:"10px" }}>
                        <Checkbox label=" Assign existing task? " boxSide="end" onChange={this._onAssignExistingTaskChecked} />
                        </div>
                        <DialogFooter>
                        <table style={{ float: "right" }}>
                            <tr>
                                <div>
                                    {/* <td style={{ display: "flex" }}>
                                        <Label style={{ color: "red", fontSize: "23px" }}>*</Label>
                                        <label style={{color: "black", fontStyle: "italic", fontSize: "12px" }}>fields are mandatory </label>
                                    </td> */}
                                    <DefaultButton style={{ float: "right", borderRadius: "10px", border: "1px solid gray" }} text="Cancel"></DefaultButton >
                                    <DefaultButton style={{ float: "right", marginRight: "10px", borderRadius: "10px", border: "1px solid gray" }} text="Submit" />

                                </div>
                            </tr>

                        </table>
                    </DialogFooter>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
