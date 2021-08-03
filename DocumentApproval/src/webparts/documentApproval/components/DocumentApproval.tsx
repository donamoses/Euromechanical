import * as React from 'react';
import styles from './DocumentApproval.module.scss';
import { IDocumentApprovalProps } from './IDocumentApprovalProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DefaultButton, DialogFooter, Dropdown, IDropdownOption, Label, TextField } from 'office-ui-fabric-react';
import SimpleReactValidator from 'simple-react-validator';
export interface IDocumentApprovalState {
  requestor: any;
  LinkToDoc: any;
  requestorComments: any;
  dueDate: any;
  DCCComments: any;
  hideproject: boolean;
  publishOptionKey: string;
  publishOption: string;
  status:string;
  statusKey:string;
}
export default class DocumentApproval extends React.Component<IDocumentApprovalProps, IDocumentApprovalState, {}> {
  private validator: SimpleReactValidator;
  public constructor(props: IDocumentApprovalProps) {
    super(props);
    this.state = {
      publishOptionKey: "",
      requestor: "",
      LinkToDoc: "",
      requestorComments: "",
      dueDate: "",
      DCCComments: "",
      hideproject: true,
      publishOption: "",
      status:"",
      statusKey:"",
    };
  }
  public async componentDidMount() {
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
  public _drpdwnPublishFormat(option: { key: any; text: any }) {
    //console.log(option.key);
    this.setState({ publishOptionKey: option.key, publishOption: option.text });
  }
  public _status(option: { key: any; text: any }) {
    //console.log(option.key);
    this.setState({ statusKey: option.key, status: option.text });
  }
  public render(): React.ReactElement<IDocumentApprovalProps> {
    const Status: IDropdownOption[] = [

      { key: 'Approved', text: 'Approved' },
      { key: 'Rejected', text: 'Rejected' },
     
    ];
    const PublishOption: IDropdownOption[] = [

      { key: 'PDF', text: 'PDF' },
      { key: 'Native', text: 'Native' },
     
    ];
    return (
      <div className={styles.documentApproval}>
         <div style={{ marginLeft: "auto",marginRight:"auto",width:"50rem" }}>
        <div className={styles.alignCenter}> Approval form</div>
        <div >
         
          <Label >Document :  <a href={this.state.LinkToDoc}>NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</a></Label>
          <table>
            <tr>
              <td><Label >Revision : 0 </Label></td>
              <td hidden={this.state.hideproject}><Label>Revision Level : ABT </Label></td>
            </tr>
            <tr>
              <td><Label >Orginator : SUNIL JOHN </Label></td>
              <td><Label >Due Date : 21 JUL 2021 </Label></td>
            </tr>
            <tr>
              <td><Label>Requestor : SUBHA RAVEENDRAN </Label></td>
              <td><Label >Requested Date : 21 JUL 2021 </Label></td></tr></table><table>
              <tr>
              <td><Label> Requestor Comment:</Label>Requested to review the document </td>
            </tr></table><table>
            <tr hidden={this.state.hideproject} >
              <td><Label>DCC : SUBHA RAVEENDRAN </Label></td>
              <td><Label >DCC Date : 21 JUL 2021 </Label></td></tr></table><table><tr hidden={this.state.hideproject}>
              <td><Label> DCC Comment:</Label>Requested to dcc level review the document</td>
            </tr></table><table>
            <tr  >
              <td><Label>Reviewer : SUBHA RAVEENDRAN </Label></td>
              <td><Label >Review Date : 21 JUL 2021 </Label></td></tr></table><table><tr>
              <td><Label> Review Comment:</Label>Requested to approve the document</td>
            </tr>
          </table>

        </div>
        <div style={{ marginTop: '30px' }}>
        <Dropdown 
          placeholder="Select Option" 
          label="Publish Option"
          style={{ marginBottom: '10px', backgroundColor: "white" }}
          options={PublishOption}
          onChanged={this._drpdwnPublishFormat}
          selectedKey={this.state.publishOptionKey}
          required />
          <div style={{ color: "#dc3545" }}>{this.validator.message("subCategory", this.state.publishOptionKey, "required")}{" "}</div> 
          <Dropdown 
          placeholder="Select Status" 
          label="Status"
          style={{ marginBottom: '10px', backgroundColor: "white" }}
          options={Status}
          onChanged={this._status}
           selectedKey={this.state.statusKey}
          required />
          <div style={{ color: "#dc3545" }}>{this.validator.message("subCategory", this.state.statusKey, "required")}{" "}</div> 
        <TextField label="Comments" id="Comments" multiline autoAdjustHeight />
        <DialogFooter>
                        <table style={{ float: "right" }}>
                            <tr>
                                <div>
                                    <td style={{ display: "flex" ,padding:"0 0 0 33rem"}}>
                                        <Label style={{ color: "red", fontSize: "23px" }}>*</Label>
                                        <label style={{ fontStyle: "italic", fontSize: "12px" }}>fields are mandatory </label>
                                    </td>
                                    
                                    <DefaultButton id="b1" style={{ marginTop: '20px', float: "right", borderRadius: "10px", border: "1px solid gray" }}>Cancel</DefaultButton >
                                    <DefaultButton id="b2" style={{ marginTop: '20px', float: "right", marginRight: "10px", borderRadius: "10px", border: "1px solid gray" }}>Submit</DefaultButton >
                                    <DefaultButton id="b2" style={{ marginTop: '20px', float: "right", marginRight: "10px", borderRadius: "10px", border: "1px solid gray" }}>Save</DefaultButton >

                                </div>
                            </tr>

                        </table>2
                    </DialogFooter>           
          <br />
        </div>
        </div>
      </div>
    );
  }
}
