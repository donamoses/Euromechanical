import * as React from 'react';
import styles from './DocumentReview.module.scss';
import { IDocumentReviewProps } from './IDocumentReviewProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Checkbox, DatePicker, DefaultButton, DialogFooter, Dropdown, FontWeights, getTheme, IconButton, IDropdownOption, IIconProps, Label, mergeStyleSets, MessageBar, MessageBarType, TextField } from 'office-ui-fabric-react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
// import Moment from 'react-moment';
import SimpleReactValidator from 'simple-react-validator';
export interface IDocumentReviewState {
  // currentuser: any;
  // verifierId: any;
  // Reviewer: any;
  // approver: any;
  requestor:any;
  LinkToDoc: any;
  requestorComments:any;
  dueDate:any;
  // dcc: any;
  DCCComments:any;
  hideproject: boolean;
  reviewDocument:string;
  status:string;
  statuskey:string;
  comments:string;
  
}
export default class DocumentReview extends React.Component<IDocumentReviewProps,IDocumentReviewState, {}> {
  private validator: SimpleReactValidator;
  public constructor(props: IDocumentReviewProps) {
    super(props);
    this.state = {
      // currentuser: "",
      // verifierId: "",
      // Reviewer: "",
      // approver: "",
      requestor:"",
      LinkToDoc: "",
      requestorComments:"",
      dueDate:"",
      // dcc: "",
      DCCComments:"",
       hideproject: true,
       reviewDocument:"none",
       status:"",
       statuskey:"",
       comments:"",
    };
    this._docReview=this._docReview.bind(this);
    this._drpdwnStatus=this._drpdwnStatus.bind(this);
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
  private _docReview =()=>{
    if(this.validator.fieldValid("status") ){
      this.validator.hideMessages();
      this.setState({ reviewDocument: "" });
      setTimeout(() => this.setState({ reviewDocument: 'none' }), 1000);
    }
    else {
      this.validator.showMessages();
      this.forceUpdate();
    }
}
private _cancel =()=>{
  this.setState({
    statuskey:"",
    comments:"",
  });
}
public _drpdwnStatus(option: { key: any; text: any }) {
  //console.log(option.key);
  this.setState({ statuskey: option.key, status: option.text });
}
private _commentChange = (ev: React.FormEvent<HTMLInputElement>, Comment?: string) => {
  this.setState({ comments: Comment || '' });
}
  public render(): React.ReactElement<IDocumentReviewProps> {
    const Status: IDropdownOption[] = [

      { key: 'Reviewed', text: 'Reviewed' },
      { key: 'Cancelled', text: 'Cancelled' },
     
    ];
    return (
      <div className={ styles.documentReview }>
         <div style={{ marginLeft: "auto",marginRight:"auto",width:"50rem" }}>
          <div className={styles.alignCenter}> Review form</div>
          {/* <h1 className={styles.title} >Review form </h1> */}
          
        
        <div style={{marginTop:"17px"}}>
         
          <Label >Document :  <a href={this.state.LinkToDoc}>NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</a></Label>
          
          <table>
          <tr>
            <td><Label >Revision : 0 </Label></td>
            <td hidden ={this.state.hideproject}><Label>Revision Level : ABT </Label></td>
           </tr>
            <tr>
              <td><Label >Orginator : SUNIL JOHN </Label></td>
              <td><Label >Due Date : 21 JUL 2021 </Label></td>
            </tr>
            <tr>
              <td><Label>Requestor : SUBHA RAVEENDRAN </Label></td>
              <td><Label >Requested Date : 21 JUL 2021 </Label></td></tr> </table>
              <table> <tr><td><Label> Requestor Comment:</Label>Requested to review the document </td></tr></table>
              <table>
            <tr  hidden={this.state.hideproject}>
              <td><Label>DCC : SUBHA RAVEENDRAN </Label></td>
              <td><Label >DCC Date : 21 JUL 2021 </Label></td></tr> </table>
              <table> <tr hidden={this.state.hideproject}>
              <td><Label> DCC Comment:</Label>Requested to dcc level review the document</td>
            </tr>
            </table>         
          
          
          </div>
          <div style={{ marginTop: '30px' }}>
          <Dropdown 
          placeholder="Select Status" 
          label="Status"
          style={{ marginBottom: '10px', backgroundColor: "white" }}
          options={Status}
          onChanged={this._drpdwnStatus}
          selectedKey={this.state.statuskey}
          required />
          <div style={{ color: "#dc3545" }}>{this.validator.message("status", this.state.statuskey, "required")}{" "}</div> 
            <TextField label="Comments" id="Comments" value={this.state.comments} onChange={this._commentChange} multiline autoAdjustHeight />
            <br />
            <DialogFooter>
            <div style={{ display: this.state.reviewDocument }}>
                            <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>  Document Reviewed Successfully.</MessageBar>
            </div>
                        <table style={{ float: "right",rowGap:"0px" }}>
                            <tr>
                                
                                    <td style={{ display: "flex" ,padding:"0 0 0 33rem"}}>
                                        <Label style={{ color: "red", fontSize: "23px" }}>*</Label>
                                        <label style={{ fontStyle: "italic", fontSize: "12px" }}>fields are mandatory </label>
                                    </td>
                                    
                                    <DefaultButton id="b1" style={{ float: "right", borderRadius: "10px", border: "1px solid gray" }} onClick={this._cancel}>Cancel</DefaultButton >
                                    <DefaultButton id="b2" style={{  float: "right", marginRight: "10px", borderRadius: "10px", border: "1px solid gray" }}  onClick={this._docReview}>Submit</DefaultButton >
                                    <DefaultButton id="b2" style={{ float: "right", marginRight: "10px", borderRadius: "10px", border: "1px solid gray" }}>Save</DefaultButton >

                                
                            </tr>

                        </table>
                    </DialogFooter>   
          <br />
        </div>
        </div>
      </div>
    );
  }
}
