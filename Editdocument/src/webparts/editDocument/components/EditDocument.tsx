import * as React from 'react';
import styles from './EditDocument.module.scss';
import { IEditDocumentProps } from './IEditDocumentProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Checkbox, DatePicker, DefaultButton, DialogFooter, Dropdown, IDropdownOption, IPivotStyles, ITextFieldProps, ITextFieldStyleProps,  Label, PrimaryButton, TextField,  } from 'office-ui-fabric-react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { ColorPicker, Dialog, DialogType, FontWeights, getTheme, Icon, IconButton, IIconProps, ITooltipHostStyles, mergeStyleSets, MessageBar, MessageBarType, Modal, TooltipHost } from '@fluentui/react';

import { IFrameDialog } from "@pnp/spfx-controls-react/lib/IFrameDialog";
import { sp } from '@pnp/sp';
import "@pnp/sp/sites";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import StarIcon from '@material-ui/icons/Star';
import SimpleReactValidator from 'simple-react-validator';
import  * as $ from 'jquery';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';

const cancelIcon: IIconProps = { iconName: 'Cancel' };
const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',

  },
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      //borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 284px',
    },
  ],
  header1: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
     // borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 109px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});
const MyIcon = () => <Icon iconName="Cancel" />;
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };
const calloutProps = { gapSpace: 0 };
const Cancel: IIconProps = { iconName: 'Cancel' };
const ReminderTime: IIconProps = { iconName: 'ReminderTime' };
const Comment: IIconProps = { iconName: 'CommentActive' };
const Share: IIconProps = { iconName: 'Share' };
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Missing Subject',
  closeButtonAriaLabel: 'Close',
  subText: 'Do you want to send this message without a subject?',
};
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
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
  dcc:string;
  //for timelinr
  iframeModalclose:boolean;
tableShow:string;
tableinTimeLine:string;
showModal: boolean;
reviewed:string;
showReviewModal:boolean;
delegateUser:any;
delagatePeoplePicker:string;
}

const pivot : Partial<IPivotStyles> = { root:{width:"100%"}};

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
       dcc:"",
       //for time line
       iframeModalclose : true,
      tableShow:"none",
      tableinTimeLine:"none",
      showModal: false,
      reviewed:"none",
      showReviewModal:false,
      delegateUser:"",
      delagatePeoplePicker:"none",
    };
    this._versionHistory=this._versionHistory.bind(this);
    //for time line
    this._versionHistory=this._versionHistory.bind(this);
    this._reviewedHistory=this._reviewedHistory.bind(this);
    this._delegateClick=this._delegateClick.bind(this);
    this._delegateSubmit=this._delegateSubmit.bind(this);

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


//for veritacl time line
private _versionHistory(){
  this.setState({
    tableShow:"",
    showModal:true,
  });  
   
  
}
private _reviewedHistory(){
  this.setState({
    reviewed:"",
    showReviewModal:true,
  });  
   
  
}
private _closeModal = (): void => {
  this.setState({ iframeModalclose: false,showModal:false,showReviewModal:false,delagatePeoplePicker:"none" });
}
public _delegatePeoplePicker = (items: any[]) => {

  console.log(items);
  let getSelectedUsers = [];

  for (let item in items) {
      getSelectedUsers.push(items[item].id);
  }
  this.setState({ delegateUser: getSelectedUsers[0] });
  console.log(getSelectedUsers);
  

} 
  
public _delegateClick = () => {
this.setState({
delagatePeoplePicker:"",
});
}

public _delegateSubmit = () => {
this.setState({
  delagatePeoplePicker:"none",
});
}
  public render(): React.ReactElement<IEditDocumentProps> {
    const BusinessUnit: IDropdownOption[] = [

      { key: '1', text: 'BU1' },
      { key: '2', text: 'BU2' },
      { key: '3', text: 'BU3' },

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
          
         <Pivot aria-label="Links of Tab Style Pivot Example" linkFormat="tabs">
              <PivotItem headerText="Document Info" >
                <div style={{ marginLeft: "7%",marginRight:"auto",width:"30rem" }}>
                  {/* <div style={{fontSize:"18px",fontWeight:"bold",textAlign:"center"}}> Edit Document</div> */}
                  < TextField required id="t1"
                        label="Name"                       
                        onChange={this._titleChange}
                        //placeholder="Organization Details"                        
                        value={"Migration Policy"}>                          
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
                        <div  hidden={this.state.hideproject}>
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

                        </div>                  
                   
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
                        </PivotItem>
                       
               <PivotItem headerText="Version History">
                          {/* {this._versionHistory()}                        */}                      
                        

                        <div>                          
                        <iframe src={this.state.siteurl + "/_layouts/15/Versions.aspx?list=%7Bda53146b-3f5c-4321-926e-c3c2adbff323%7D&ID=1&IsDlg=0"} style={{overflow: "hidden",width:"100%",border:"white"}}></iframe>
                        </div>
                        </PivotItem>

      {/* vertical Timeline */}    

              <PivotItem headerText="Revision History">
              <div style={{ marginLeft: "7%",marginRight:"auto",width:"30rem" }}>                  
           <Timeline lineColor={'#76bb7f'}>       
                
                <TimelineItem
                  key="002"
                  dateText="24 Jul 2021 "
                  dateInnerStyle={{ background: '#61b8ff', color: '#000' }}
                  bodyContainerStyle={{
                    background: '#ddd',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <h3 style={{ color: '#61b8ff' }}>Under Review</h3>
                  <h4 style={{ color: '#61b8ff' }}>NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                  <p style={{fontSize:'12px'}}>
                                          <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                                            Approved  :  Sunil John
                                          </div>
                                          <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                                          Revision : 1
                                          </div>
                                          <br></br>
                                          <PrimaryButton text="Details" onClick={this._versionHistory}></PrimaryButton>
                                        </p>
                </TimelineItem>
                <TimelineItem
                  key="001"
                  dateText="23 Jul 2021"
                  //style={{ color: '#e86971' }}
                  dateInnerStyle={{ background: '#76bb7f' }}
                  lineColor={"#76bb7f"} 
                >
                  <h3>Published</h3>
                  <h4>NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                  <p style={{fontSize:'12px'}}>
                                      Reviewer  : Subha Raveendran
                                      <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                                        Approved  : Sunil John
                                      </div>
                                      <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                                        Revision : 1
                                      </div>
                                      <br></br>
                                  </p>
        </TimelineItem>
                <TimelineItem
                  key="001"
                  dateText="23 Jul 2021"
                // style={{ color: '#e86971' }}
                  dateInnerStyle={{ background: '#76bb7f' }}
                  lineColor={"#76bb7f"} 
                >
                          <h3>Reviewed</h3>
                          <h4>NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                          <p style={{fontSize:'12px'}}>
                                                  Requestor: Subha Raveendran
                                                  <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>                                                  
                                                  </div>
                                                  <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                                                    Revision : 0
                                                  </div>
                                                  <br></br>
                                                  <PrimaryButton text="Details" onClick={this._reviewedHistory}></PrimaryButton>
                                                </p>
                        </TimelineItem>
                <TimelineItem
                  key="004"
                  dateText="21 Jul 2021"
                  dateInnerStyle={{ background: '#76bb7f' }}
                >
                  <h3>WorkFlow Started</h3>
                  <h4>NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                  <p style={{fontSize:'12px'}}>
                                          <div> Requestor : Subha Raveendran</div>
                                          <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                                             
                                            <div style={{ margin: "0px 0px 0px 22px" }}>
                                                Approver : Sunil John</div>
                                            </div>
                                                                        
                                          <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                                            Revision : 0
                                          </div>
                                          <br></br>
                                        </p>
                </TimelineItem>
                <TimelineItem
                  key="004"
                  dateText="21 Jul 2021"
                  dateInnerStyle={{ background: '#76bb7f' }}
                >
                  <h3>Document Created</h3>
                  <h4>NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                  <p style={{fontSize:'12px'}}>
                                    <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                                      Originator :Sunil John
                                    </div>
                                    <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>

                                    </div>
                                    <br></br>
                                    </p>
                </TimelineItem>
                </Timeline>
            <div style={{display:this.state.tableShow}} >
            <Modal
              isOpen={this.state.showModal}
              onDismiss={this._closeModal}
              containerClassName={contentStyles.container}
            >

              <div className={contentStyles.header}>
                <span style={{textAlign:"center",fontSize:"17px"}}></span>
                <IconButton
                  iconProps={cancelIcon}
                  ariaLabel="Close popup modal"
                  onClick={this._closeModal}
                  styles={iconButtonStyles}
                />
                </div>
                <div style={{padding: "0 25px 0px 29px"}}>
                <table  className={styles.tableModal}>
                                  <tr>
                                    <th>Reviewer</th>
                                    <th>DueDate</th> 
                                    <th>Status</th>
                                    <th>Comments</th>
                                    <th>Reminder</th>
                                    <th>Cancel</th>
                                    <th>Delegate</th>
                                  </tr>
                                  <tr  style={{border:"1px"}}>
                                    <td>Jill</td>
                                    <td style={{color: "red"}}>24 Jul 2021</td>
                                    <td>Under Review</td>
                                    <td><TooltipHost
                                    content="Comment"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={Comment} title=" " ariaLabel=" " />
                                  </TooltipHost></td>
                                    <td><TooltipHost
                                    content="ReminderTime"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={ReminderTime} title=" " ariaLabel=" " />
                                  </TooltipHost></td>
                                  <td><TooltipHost
                                    content="Cancel"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={Cancel} title=" " ariaLabel=" " />
                                  </TooltipHost></td>
                                    <td><TooltipHost
                                    content="Share"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={Share} title=" " ariaLabel=" "  onClick={this._delegateClick} />
                                  </TooltipHost>
                                    </td>
                                    <td> <div style={{display:this.state.delagatePeoplePicker}}>
                                <div style={{display:"flex"}}>
                                <PeoplePicker
                                context={this.props.context}
                                titleText="Delegate to "
                                personSelectionLimit={1}
                                groupName={""} // Leave this blank in case you want to filter from all users    
                                showtooltip={true}
                                disabled={false}
                                ensureUser={true}
                                onChange={this._delegatePeoplePicker}
                                // selectedItems={this._getVerifier}
                                //defaultSelectedUsers={[this.state.approver]}
                                showHiddenInUI={false}
                                required={false}
                                principalTypes={[PrincipalType.User]}
                                resolveDelay={1000}
                                />
                                <div style={{marginTop:"26px",marginLeft:"20px"}}>
                                <PrimaryButton text="Delegate" onClick={this._delegateSubmit}/>
                                </div>
                                </div>
                                  </div>
                      </td>
                                  </tr>
                                  <tr>
                                    <td>Eve Maria Thomas</td>
                                    <td>24 Jul 2021</td>
                                    <td>Returned with comments</td>
                                    <td><TooltipHost
                                    content="• Needs to improve the amount of time spent on lesson planning [or curriculum development or marking or insert type of task] • Capable of stronger performance in training delivery especially in [insert area of weakness] •"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={Comment} title=" " ariaLabel=" " />
                                  </TooltipHost></td>
                                    <td><TooltipHost
                                    content="Document is reviewed"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={ReminderTime} title=" " ariaLabel=" " />
                                  </TooltipHost></td>
                                  <td><TooltipHost
                                    content="Cancel"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={Cancel} title=" " ariaLabel=" " />
                                  </TooltipHost></td>
                                    <td><TooltipHost
                                    content="Share"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={Share} title=" " ariaLabel=" " />
                                  </TooltipHost></td>
                                  </tr>
                                  <tr>
                                    <td>John</td>
                                    <td style={{color: "red"}}>24 Jul 2021</td>
                                    <td>Under Review</td>
                                    <td><TooltipHost
                                    content="Comment"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={Comment} title=" " ariaLabel=" " />
                                  </TooltipHost></td>
                                    <td><TooltipHost
                                    content="ReminderTime"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={ReminderTime} title=" " ariaLabel=" " />
                                  </TooltipHost></td>
                                  <td><TooltipHost
                                    content="Cancel"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={Cancel} title=" " ariaLabel=" " />
                                  </TooltipHost></td>
                                    <td><TooltipHost
                                    content="Share"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={Share} title=" " ariaLabel=" " />
                                  </TooltipHost></td>
                                  </tr>
                                  <tr>
                                    <td>Smith Manuel Ebraham</td>
                                    <td>24 Jul 2021</td>
                                    <td>Reviewed</td>
                                    <td><TooltipHost
                                    content="The document is reviewed."
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={Comment} title=" " ariaLabel=" " />
                                  </TooltipHost></td>
                                    <td><TooltipHost
                                    content="ReminderTime"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={ReminderTime} title=" " ariaLabel=" " disabled />
                                  </TooltipHost></td>
                                  <td><TooltipHost
                                    content="Cancel"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={Cancel} title=" " ariaLabel=" " disabled/>
                                  </TooltipHost></td>
                                    <td><TooltipHost
                                    content="Share"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={Share} title=" " ariaLabel=" " disabled/>
                                  </TooltipHost></td>
                                  </tr>
                                  <tr>
                                    <td>Sam</td>
                                    <td>24 Jul 2021</td>
                                    <td>Reviewed</td>
                                    <td><TooltipHost
                                    content="The document is reviewed."
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={Comment} title=" " ariaLabel=" " />
                                  </TooltipHost></td>
                                    <td><TooltipHost
                                    content="ReminderTime"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={ReminderTime} title=" " ariaLabel=" " disabled />
                                  </TooltipHost></td>
                                  <td><TooltipHost
                                    content="Cancel"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={Cancel} title=" " ariaLabel=" " disabled/>
                                  </TooltipHost></td>
                                    <td><TooltipHost
                                    content="Share"
                                    // This id is used on the tooltip itself, not the host
                                    // (so an element with this id only exists when the tooltip is shown)                              
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                  >
                                    <IconButton iconProps={Share} title=" " ariaLabel=" " disabled/>
                                  </TooltipHost></td>
                                  </tr>
                                </table> 
              
                <br />
                <br />
              </div>
            </Modal>
              </div>
            <div style={{display:this.state.reviewed}}>
        <Modal
        isOpen={this.state.showReviewModal}
        onDismiss={this._closeModal}
        containerClassName={contentStyles.container}
      >

        <div className={contentStyles.header1}>
          <span style={{textAlign:"center",fontSize:"17px"}}>Review Details</span>
          <IconButton
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={this._closeModal}
            styles={iconButtonStyles}
          />
          </div>
          <div style={{padding: "0 25px 0px 29px"}}>
           <table >
                            <tr>
                              <th>Reviewer</th>
                              <th>DueDate</th> 
                              <th>Status</th>
                              <th>Comments</th>
                             
                            </tr>
                            <tr>
                              <td>Jill</td>
                              <td >24 Jul 2021</td>
                              <td>Reviewed</td>
                              <td><TooltipHost
                              content=""
                              // This id is used on the tooltip itself, not the host
                              // (so an element with this id only exists when the tooltip is shown)                              
                              calloutProps={calloutProps}
                              styles={hostStyles}
                            >
                              <IconButton iconProps={Comment} title=" " ariaLabel=" " />
                            </TooltipHost></td>
                            
                            </tr>
                            <tr>
                              <td>Robert Willam </td>
                              <td >24 Jul 2021</td>
                              <td>Reviewed</td>
                              <td><TooltipHost
                              content="This was an excellent document on very thorough research."
                              // This id is used on the tooltip itself, not the host
                              // (so an element with this id only exists when the tooltip is shown)                              
                              calloutProps={calloutProps}
                              styles={hostStyles}
                            >
                              <IconButton iconProps={Comment} title=" " ariaLabel=" " />
                            </TooltipHost></td>
                            
                            </tr>
                            </table>
                            </div>                            
                            </Modal>         
                                       
                        
                        
                        
                        
                        
                   
                   </div>
            </div>  
    </PivotItem>                                                                                                       
                        
        </Pivot>
    </div>
    );
  }
}
