import * as React from 'react';
import styles from './EditDocument.module.scss';
import { IEditDocumentProps } from './IEditDocumentProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Checkbox, DatePicker, DefaultButton, DialogFooter, Dropdown, IDropdownOption, ITextFieldProps, ITextFieldStyleProps, ITooltipHostStyles, Label, Pivot, PivotItem, TextField, TooltipHost } from 'office-ui-fabric-react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
const calloutProps = { gapSpace: 0 };
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };
import { Dialog, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { IFrameDialog } from "@pnp/spfx-controls-react/lib/IFrameDialog";
import { sp } from '@pnp/sp';
import "@pnp/sp/sites";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import StarIcon from '@material-ui/icons/Star';
import SimpleReactValidator from 'simple-react-validator';
import  * as $ from 'jquery';
export interface IEditDocumentState {

  docs: any[];
  hidecreate:boolean;
  hideedit:boolean;
  siteurl:any;
  title:string;
  hideproject:boolean;
  expiredate: any;
  currentUser:string;
  DocumentAdded: any;
  hideDirectPublish: string;
  approvalDate: any;
  hideaAppDatePic: string;
  ExpiryLeadPeriod: string;
  hideExpLeadPeriod: string;
  directPublihCheck: boolean;
  businessUnit: string;
  category: string;
  subCategory: string;
  bUkey: string;
  publishOptionKey: string;
  categoryKey: string;
  subCategoryKey: string;
  publishOption: string;
  tkey: any;
  hideIfDocAttached:string;
}

export default class EditDocument extends React.Component<IEditDocumentProps,IEditDocumentState, {}> {
  private validator: SimpleReactValidator;
  constructor(props: IEditDocumentProps) {
    super(props);
    this.state = {    
      tkey: "",   
       docs: [],
       title:"",
       hidecreate:false,
       hideedit:true,
       siteurl:"",
       hideproject:true,
       expiredate:"",
       currentUser:"",       
       hideDirectPublish: 'none',
       approvalDate: "",
       hideaAppDatePic: "none",
       ExpiryLeadPeriod: "",
       hideExpLeadPeriod: "none",
       directPublihCheck: false,
       businessUnit: "",
       category: "",
       subCategory: "",
       bUkey: "",
       publishOptionKey: "",
       categoryKey: "",
       subCategoryKey: "",
       publishOption: "",
       DocumentAdded: "none",
       hideIfDocAttached:"",
    };
    this._versionHistory=this._versionHistory.bind(this);

}
  public async componentDidMount() {
          console.log(this.props.project);
          const rootwebData = await sp.site.rootWeb();
          console.log(rootwebData);
          var webValue = rootwebData.ResourcePath.DecodedUrl;  //alert(webValue); 
          this.setState({
            siteurl: webValue
          });
          console.log(this.props.createdocument);
          if (this.props.createdocument) {
          this.setState({ hidecreate: true,hideedit:false,hideIfDocAttached:"none" });
          }
          if(this.props.project){
          this.setState({hideproject:false});
          }
          this.getVersionHistory();
          this._getCurrentUser();
          
  }
  public componentWillMount = () => {
    this.validator = new SimpleReactValidator({
        messages: {
            required: "Please enter mandatory fields"
        }
    });
  
  }
  private _getCurrentUser(){
    sp.web.currentUser.get().then(currentUser =>{
          this.setState({
              currentUser:currentUser.Title,
          });
    });

  }
  public getVersionHistory(){
  
}
private _titleChange = (ev: React.FormEvent<HTMLInputElement>, Title?: string) => {
  this.setState({ title: Title || '' });
}
private _onExpDatePickerChange = (date?: Date): void => {

  this.setState({ expiredate: date, hideExpLeadPeriod: "" });

}
private _onApprovalDatePickerChange = (date?: Date): void => {

  this.setState({ approvalDate: date, });

}
public _drpdwnPublishFormat(option: { key: any; text: any }) {
  //console.log(option.key);
  this.setState({ publishOptionKey: option.key, publishOption: option.text });
}
public templatechange(option: { key: any; }) {
  //console.log(option.key);
  this.setState({ tkey: option.key });
}
private _onCreateDocChecked = (ev: React.FormEvent<HTMLInputElement>, isChecked?: boolean) => {
  if (isChecked) { this.setState({ hideDirectPublish: "", }); }
  else if (!isChecked) {
      this.setState({ hideDirectPublish: "none", hideaAppDatePic: "none", });
      if (this.state.directPublihCheck == true) {
          this.setState({
              directPublihCheck: false,
          });
      }
  }
}
private _onDirectPublishChecked = (ev: React.FormEvent<HTMLInputElement>, isChecked?: boolean) => {
  if (isChecked) { this.setState({ hideaAppDatePic: "", directPublihCheck: true }); }
  else if (!isChecked) { this.setState({ hideaAppDatePic: "none", directPublihCheck: false }); }
}
private _onCreateDocument = () => {
  if (this.validator.fieldValid("Name") && this.validator.fieldValid("category") && this.validator.fieldValid("subCategory") && this.validator.fieldValid("businessUnit") && (this.state.directPublihCheck == false)) {

      this.validator.hideMessages();
      this.setState({ DocumentAdded: "" });
      setTimeout(() => this.setState({ DocumentAdded: 'none' }), 1000);


      // this._onCancel();
  }
  else if (this.validator.fieldValid("Name") && this.validator.fieldValid("category") && this.validator.fieldValid("subCategory") && this.validator.fieldValid("businessUnit") && (this.state.directPublihCheck == true) && this.validator.fieldValid("publishFormat")) {
      this.validator.hideMessages();
      this.setState({ DocumentAdded: "" });
      setTimeout(() => this.setState({ DocumentAdded: 'none' }), 1000);
  }
  else {
      this.validator.showMessages();
      this.forceUpdate();
  }

}
private _onCancel = () => {
  // window.location.href = this.props.RedirectUrl;
  this.setState({
      hideExpLeadPeriod: "none",
      title: "Organization Details",
      DocumentAdded: 'none',
      hideDirectPublish: 'none',
      approvalDate: "",
      hideaAppDatePic: "none",
      ExpiryLeadPeriod: "",
      directPublihCheck: false,
      businessUnit: "",
      category: "",
      subCategory: "",
      bUkey: "",
      publishOptionKey: "",
      categoryKey: "",
      subCategoryKey: "",
      publishOption: "",
      expiredate:"",
  });}
private _versionHistory = ()=>{
  return(
 
  <IFrameDialog
    url={this.state.siteurl + "/_layouts/15/Versions.aspx?list=%7Bda53146b-3f5c-4321-926e-c3c2adbff323%7D&ID=1&IsDlg=0"}                        
    title="Version History"
    hidden={false}
    // onDismiss={this.onCancel}
    modalProps={{
        isBlocking: true,
        styles: { main: { maxWidth: "700px !important", width: "600px !important", height: "800px !important" } }
    }}
    dialogContentProps={{
        type: DialogType.close,
        showCloseButton: true
    }}
    width={'800px'}
    height={'500px'}
/>);
          
}
  public render(): React.ReactElement<IEditDocumentProps> {
    const BusinessUnit: IDropdownOption[] = [

      { key: '1', text: 'BU1' },
      { key: '2', text: 'BU2' },

  ];
  const Category: IDropdownOption[] = [

      { key: '1', text: 'Cat1' },
      { key: '2', text: 'Cat2' },

  ];
  const SubCategory: IDropdownOption[] = [

      { key: '1', text: 'SubCat1' },
      { key: '2', text: 'SubCat2' },

  ];
  const publishFormat: IDropdownOption[] = [

      { key: '1', text: 'Native' },
      { key: '2', text: 'PDF' },

  ];
    return (
      <div className={ styles.editDocument }>
         <div>
          
            <Pivot aria-label="Large Link Size Pivot Example">
              <PivotItem headerText="Document Info">
                <div style={{ marginLeft: "auto",marginRight:"auto",width:"30rem" }}>
                  <div style={{fontSize:"18px",fontWeight:"bold",textAlign:"center"}}> Edit Document</div>
                  < TextField required id="t1"
                        label="Name"                       
                        onChange={this._titleChange}
                        //placeholder="Organization Details"                        
                        value={"Organization Details"}>                          
                  </TextField>
                    <div style={{ color: "#dc3545" }}>{this.validator.message("Name", this.state.title, "required|alpha_num_space")}{" "}</div>
                  <Dropdown id="t3" label="Business Unit"                        
                        selectedKey={this.state.bUkey}
                        placeholder="BU1"
                        options={BusinessUnit}    
                        disabled           
                  />
                    <div style={{ color: "#dc3545" }}>{this.validator.message("businessUnit", this.state.businessUnit, "required")}{" "}</div>
                  <Dropdown id="t2"  label="Category"
                        placeholder="Cat1"
                        selectedKey={this.state.categoryKey}  options={Category} disabled/>
                  <div style={{ color: "#dc3545" }}>{this.validator.message("category", this.state.category, "required")}{" "}</div>
                  <Dropdown id="t2" label="Sub Category"
                        placeholder="SubCat1"
                        selectedKey={this.state.subCategoryKey}
                        options={SubCategory} disabled/>
                  <div style={{ color: "#dc3545" }}>{this.validator.message("subCategory", this.state.subCategory, "required")}{" "}</div>                    
                    <PeoplePicker
                      context={this.props.context}
                      titleText="Originator"                     
                      personSelectionLimit={1}                      
                      groupName={""} // Leave this blank in case you want to filter from all users    
                      showtooltip={true}
                      required={false}
                      disabled={true}
                      ensureUser={true}
                      placeholder={"Sunil John"}
                      // onChange={this._getDocResponsible}
                      showHiddenInUI={false}
                      principalTypes={[PrincipalType.User]}
                      resolveDelay={1000} />                                     

                    <PeoplePicker
                      context={this.props.context}
                      titleText="Reviewer(s)"
                      personSelectionLimit={8}
                      groupName={""} // Leave this blank in case you want to filter from all users    
                      showtooltip={true}
                      required={false}
                      disabled={false}
                      ensureUser={true}
                      // onChange={this._Verifier}
                      showHiddenInUI={false}
                      principalTypes={[PrincipalType.User]}
                      // defaultSelectedUsers={[this.state.setverifier]}
                      resolveDelay={1000} />
                    <PeoplePicker
                      context={this.props.context}
                      titleText="Approver"
                      personSelectionLimit={3}
                      groupName={""} // Leave this blank in case you want to filter from all users    
                      showtooltip={true}
                      required={false}
                      disabled={false}
                      ensureUser={true}
                      // onChange={this._Approver}
                      showHiddenInUI={false}
                      // defaultSelectedUsers={[this.state.setapprover]}
                      principalTypes={[PrincipalType.User]}
                      resolveDelay={1000} />                       
                   
                   <div style={{ display: "flex" }}>
                        <div>
                            <DatePicker label="Expiry Date"
                                style={{ width: '200px' }}
                                value={this.state.expiredate}
                                onSelectDate={this._onExpDatePickerChange}
                                placeholder="Select a date..."
                                ariaLabel="Select a date"
                            />
                        </div>
                        <div style={{ padding: " 0 0 0 34px", display: this.state.hideExpLeadPeriod }}>
                            < TextField id="ExpiryLeadPeriod"
                                label="Expiry Lead  Period"                                
                                value={this.state.ExpiryLeadPeriod} >
                            </TextField>
                        </div>
                    </div>
                   <div style={{display:this.state.hideIfDocAttached}}>
                    <Label >Select a Template:</Label>  <Dropdown id="t7"
                        placeholder="Select an option"
                        options={this.state.docs} onChanged={this.templatechange}
                    />
                    <Label >Upload Document:</Label> <input type="file" id="myfile" ></input>
                    <div style={{ padding: "14px 0px 0 0" }} >
                        <TooltipHost
                            content="Check if the template or attachment is added"
                            //id={tooltipId}
                            calloutProps={calloutProps}
                            styles={hostStyles}>
                            <Checkbox label="Create Document ? " boxSide="end" onChange={this._onCreateDocChecked} />
                        </TooltipHost>
                    </div>
                    </div> 
                    <div style={{ display: this.state.hideDirectPublish, padding: "5px 0 0 14px" }}>
                        <table>
                            <tr>
                                <td>
                                    <TooltipHost
                                        content="The document to published library without sending it for review/approval"
                                        //id={tooltipId}
                                        calloutProps={calloutProps}
                                        styles={hostStyles}>
                                        <Checkbox label="Direct Publish ? " boxSide="end" onChange={this._onDirectPublishChecked} checked={this.state.directPublihCheck} />
                                    </TooltipHost>
                                </td>
                                <td style={{ display: this.state.hideaAppDatePic, padding: "0 0 24px 16px" }}>
                                    <div style={{ display: "flex", }}>
                                       <td> <DatePicker label="Approval Date"
                                            style={{ width: '158px' }}
                                            value={this.state.approvalDate}
                                            onSelectDate={this._onApprovalDatePickerChange}
                                            placeholder="Select a date..."
                                            ariaLabel="Select a date"
                                        />
                                        </td>
                                        <td>
                                        <Dropdown id="t2" required={true}
                                            label="Publish Option"
                                            selectedKey={this.state.publishOptionKey}
                                            placeholder="Select an option"
                                            options={publishFormat}
                                            onChanged={this._drpdwnPublishFormat} style={{ padding: " 0 0 0 15px" }} />
                                        <div style={{ color: "#dc3545" }}>{this.validator.message("publishFormat", this.state.publishOptionKey, "required")}{" "}</div>
                                        </td>
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </div>
                    <div style={{ padding: "9px 0 0 0" }}>
                        <TooltipHost
                            content="Is the document is Critical"
                            //id={tooltipId}
                            calloutProps={calloutProps}
                            styles={hostStyles}>
                            <Checkbox label="Critical Document ? " boxSide="end" />
                        </TooltipHost>
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
                                    <DefaultButton style={{ float: "right", marginRight: "10px", borderRadius: "10px", border: "1px solid gray" }} text="Submit" onClick={this._onCreateDocument} />

                                </div>
                            </tr>

                        </table>
                    </DialogFooter>                        
                        </div>    

    {/* //VersionHistroy                         */}
                        </PivotItem><PivotItem headerText="Version History">
                          {/* {this._versionHistory()}                        */}                      
                        

                        <div>                          
                        <iframe src={this.state.siteurl + "/_layouts/15/Versions.aspx?list=%7Bda53146b-3f5c-4321-926e-c3c2adbff323%7D&ID=1&IsDlg=0"} style={{overflow: "hidden",width:"100%",border:"white"}}></iframe>
                        </div>
                        </PivotItem>

      {/* vertical Timeline */}

    <PivotItem headerText="Revision History">
              <div style={{ width: "100%" }}>                       
                <div> 
                 <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'rgb(233 157 127)', color: 'rgb(19 18 18)',padding:" 1px 0 0 18pxs" }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(19 18 18)' }}
                        date="24 Jul 2021"
                        iconStyle={{ background: 'rgb(0, 120, 212)', color: '#fff' }}
                        icon={<WorkIcon />}
                    >
                    <h3 style={{ fontSize: "20px", color: "rgb(220,20,60)" }}>Published</h3>
                    <h4 className="vertical-timeline-element-subtitle">NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                    <p style={{fontSize:'12px'}}>
                        Verified By : Subha Raveendran
                        <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                          Approved By : Sunil John
                        </div>
                        <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                          Revision : 1
                        </div>
                        <br></br>
                    </p>
                   </VerticalTimelineElement>
                      <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'rgb(233 205 126)', color: 'rgb(19 18 18)' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(19 18 18)' }}
                        date="23 Jul 2021 "
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        icon={<WorkIcon />}
                      >
                        <h3 style={{ fontSize: "20px", color: "rgb(220,20,60)" }}>Approved</h3>
                        <h4 className="vertical-timeline-element-subtitle">NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                        <p style={{fontSize:'12px'}}>
                            <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                              Approved By :  Sunil John
                            </div>
                            <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                            Revision : 0
                            </div>
                            <br></br>
                          </p>
                      </VerticalTimelineElement>
                      <VerticalTimelineElement
                          className="vertical-timeline-element--work"
                          contentStyle={{ background: 'rgb(213 202 231)', color: 'rgb(19 18 18)' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(19 18 18)' }}
                            date="22 Jul 2021"
                            iconStyle={{ background: 'rgb(0, 120, 212)', color: '#fff' }}
                          icon={<WorkIcon />}
                      >
                        <h3 style={{ fontSize: "20px", color: "rgb(220,20,60)" }}>Verified</h3>
                        <h4 className="vertical-timeline-element-subtitle">NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                        <p style={{fontSize:'12px'}}>
                            Requestor: Subha Raveendran
                            <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                              Verified By : Subha Raveendran
                            </div>
                            <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                              Revision : 0
                            </div>
                            <br></br>
                          </p>
                      </VerticalTimelineElement>
                      <VerticalTimelineElement
                          className="vertical-timeline-element--work"
                          contentStyle={{ background: 'rgb(185 237 137)', color: 'rgb(19 18 18)' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(19 18 18)' }}
                            date="21 Jul 2021"
                            iconStyle={{ background: 'rgb(0, 120, 212)', color: '#fff' }}
                          icon={<WorkIcon />}
                      >
                        <h3 style={{ fontSize: "20px", color: "rgb(220,20,60)" }}>WorkFlow Started</h3>
                        <h4 className="vertical-timeline-element-subtitle">NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                        <p style={{fontSize:'12px'}}>
                            <div> Requestor : Subha Raveendran</div>
                            <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                              Verifier : Subha Raveendran  </div>
                                <div style={{ margin: "0px 0px 0px 22px" }}>
                                  Approver : Sunil John</div>

                          
                            <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                              Revision : 0
                            </div>
                            <br></br>
                          </p>
                      </VerticalTimelineElement>
                       <VerticalTimelineElement
                          className="vertical-timeline-element--education"
                          contentStyle={{ background: 'rgb(155 216 235 / 65%);', color: 'rgb(19 18 18)' }}
                          contentArrowStyle={{ borderRight: '7px solid  rgb(19 18 18)' }}
                          date="20 Jul 2021"
                          iconStyle={{ background: 'rgb(0, 120, 212)', color: '#fff' }}
                          icon={<SchoolIcon />}
                        >
                          <h3 style={{ fontSize: "20px", color: "rgb(220,20,60)" }}> Document Created </h3>
                          <h4 className="vertical-timeline-element-subtitle">NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                          <p style={{fontSize:'12px'}}>
                      <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                        Originator :Sunil John
                      </div>
                      <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>

                      </div>
                      <br></br>
                      </p>
                     </VerticalTimelineElement>                     
                     <VerticalTimelineElement
                          iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                          icon={<StarIcon />}
                        />
                    </VerticalTimeline>
                  </div>
                </div>
              </PivotItem>
                        
                        {/* <PivotItem headerText="Transmittal History" >
                        <div style={{ width: "80%" }}>
                        
                        <div> 
                  <VerticalTimeline>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(233 157 127)', color: 'rgb(19 18 18)' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(19 18 18)' }}
                    date="24 Jul 2021"
                    iconStyle={{ background: 'rgb(0, 120, 212)', color: '#fff' }}
                    icon={<WorkIcon />}
                  >
                    <h3 style={{ fontSize: "20px", color: "rgb(220,20,60)" }}>Published</h3>
                    <h4 className="vertical-timeline-element-subtitle">NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                    <p style={{fontSize:'12px'}}>
                        Verified By : Subha Raveendran
                        <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                          Approved By : Sunil John
                        </div>
                        <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                          Version : 1
                        </div>
                        <br></br>
                      </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(233 205 126)', color: 'rgb(19 18 18)' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(19 18 18)' }}
                    date="23 Jul 2021 "
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<WorkIcon />}
                  >
                    <h3 style={{ fontSize: "20px", color: "rgb(220,20,60)" }}>Approved</h3>
                    <h4 className="vertical-timeline-element-subtitle">NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                    <p style={{fontSize:'12px'}}>
                        <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                          Approved By :  Sunil John
                        </div>
                        <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                          Version : 0
                        </div>
                        <br></br>
                      </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(213 202 231)', color: 'rgb(19 18 18)' }}
                      contentArrowStyle={{ borderRight: '7px solid  rgb(19 18 18)' }}
                      date="22 Jul 2021"
                      iconStyle={{ background: 'rgb(0, 120, 212)', color: '#fff' }}
                    icon={<WorkIcon />}
                  >
                    <h3 style={{ fontSize: "20px", color: "rgb(220,20,60)" }}>Verified</h3>
                    <h4 className="vertical-timeline-element-subtitle">NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                    <p style={{fontSize:'12px'}}>
                        Requestor: Subha Raveendran
                        <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                          Verified By : Subha Raveendran
                        </div>
                        <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                          Revision : 0
                        </div>
                        <br></br>
                      </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(185 237 137)', color: 'rgb(19 18 18)' }}
                      contentArrowStyle={{ borderRight: '7px solid  rgb(19 18 18)' }}
                      date="21 Jul 2021"
                      iconStyle={{ background: 'rgb(0, 120, 212)', color: '#fff' }}
                    icon={<WorkIcon />}
                  >
                    <h3 style={{ fontSize: "20px", color: "rgb(220,20,60)" }}>WorkFlow Started</h3>
                    <h4 className="vertical-timeline-element-subtitle">NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                    <p style={{fontSize:'12px'}}>
                        <div> Requestor : Subha Raveendran</div>
                        <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                          Verifier : Subha Raveendran  </div>
                            <div style={{ margin: "0px 0px 0px 22px" }}>
                              Approver : Sunil John</div>
                
                       
                        <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                          Revision : 0
                        </div>
                        <br></br>
                      </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={{ background: 'rgb(155 216 235 / 65%);', color: 'rgb(19 18 18)' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(19 18 18)' }}
                    date="20 Jul 2021"
                    iconStyle={{ background: 'rgb(0, 120, 212)', color: '#fff' }}
                    icon={<SchoolIcon />}
                  >
                    <h3 style={{ fontSize: "20px", color: "rgb(220,20,60)" }}> Document Created </h3>
                    <h4 className="vertical-timeline-element-subtitle">NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                    <p style={{fontSize:'12px'}}>
                
                <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                  Originator :Sunil John
                </div>
                <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                
                </div>
                <br></br>
                </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                    icon={<StarIcon />}
                  />
                </VerticalTimeline>
                        </div>
                                          </div>
                        </PivotItem> */}
                        
                    </Pivot>
                </div>
      </div>
    );
  }
}
