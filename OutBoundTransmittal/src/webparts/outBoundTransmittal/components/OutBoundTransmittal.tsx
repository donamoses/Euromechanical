import * as React from 'react';
import styles from './OutBoundTransmittal.module.scss';
import { IOutBoundTransmittalProps } from './IOutBoundTransmittalProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Callout, Checkbox, ChoiceGroup, DatePicker, Dialog, DialogType, Dropdown, DropdownMenuItemType, ICheckbox, IChoiceGroupOption, IconButton, IDropdownOption, IDropdownStyles, IIconProps, IModalProps, ITextFieldStyleProps, ITextFieldStyles, ITooltipHostStyles, keyframes, PrimaryButton, SearchBox, TextField, TooltipHost } from 'office-ui-fabric-react';
import { style } from '@material-ui/system';


export interface IOutBoundTransmittalState{
  transmitToKey:string;
  transmitTo:string;
  hideCustomer:string;
  hideVendor:string;
  selectedKeys:string;
  isCalloutVisible: boolean;
  customerContChBx:any[];
  toggleMultiline:boolean;
  commentMultiline:boolean;
  showGrid:boolean;
  showExternalGrid:boolean;
  transmitForKey:string;
  transmitFor:string;
  hideUnlockButton:string;
  
}
const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 200 } };
const dragOptions: Partial<IModalProps> = { dragOptions : undefined, };
const cancelIcon: IIconProps = { iconName: 'ProfileSearch' };
const AddIcon: IIconProps = { iconName: 'CircleAdditionSolid' };
const DeleteIcon: IIconProps = { iconName: 'Delete' };
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };
const calloutProps = { gapSpace: 0 };

const DropdownControlledMultiExampleOptions = [
  //{ key: '1', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key:' 1', text: 'Send as shared folder' },
  { key:' 2', text: 'Receive in shared folder' },
  { key: '3', text: 'Send as multiple emails' },
 
  
];
const options: IChoiceGroupOption[] = [
  { key:' 1', text: 'Send as shared folder' },
  { key:' 2', text: 'Receive in shared folder' },
  { key: '3', text: 'Send as multiple emails' },
];
const customerContacts:any[]=[
  { key:' 1', text: 'Sunil John' },
  { key:' 2', text: 'Satheesh Vijayan' },
  { key: '3', text: 'Subha Raveendran' },
  { key: '4', text: 'Dona Bijo' },
  { key: '5', text: 'Dona Mariyam' },
  { key: '6', text: 'Sreemol Vishnu' },
];
const TransmitFor: IDropdownOption[] = [

  { key: '1', text: 'For review' },
  { key: '2', text: 'For Information' },
  { key: '3', text: 'For Construction' },

];
const multiline :Partial<ITextFieldStyles>={ root:{height:"50px"}};
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Select Customer Contacts',
  closeButtonAriaLabel: 'Close',
  //subText: 'Do you want to send this message without a subject?',
};
export default class OutBoundTransmittal extends React.Component<IOutBoundTransmittalProps,IOutBoundTransmittalState, {}> {
 
  
  constructor(props:IOutBoundTransmittalProps){
    super(props);
    this.state={
      transmitToKey:"",
      transmitTo:"",
      hideCustomer:"none",
      hideVendor:"none",
      selectedKeys:"",
      isCalloutVisible: true,
      customerContChBx:[],
      toggleMultiline:false,
      commentMultiline:false,
      showGrid:true,
      showExternalGrid:true,
      transmitForKey:"",
       transmitFor:"",
       hideUnlockButton:"none",
    };
    this._drpdwnTransmitTo=this._drpdwnTransmitTo.bind(this);
    this._drpdwnTransmitFor=this._drpdwnTransmitFor.bind(this);
    this.onIconButtonClick=this.onIconButtonClick.bind(this);
    this.onContactClick=this.onContactClick.bind(this);
    this._showGrid=this._showGrid.bind(this);
    this._showExternalGrid=this._showExternalGrid.bind(this);
    this._hideGrid=this._hideGrid.bind(this);
    this._confirmAndSendBtnClick=this._confirmAndSendBtnClick.bind(this);
  }
  public async componentDidMount() {
   
  }
  public _drpdwnTransmitTo(option: { key: any; text: any }) {
    //console.log(option.key);
    this.setState({ transmitToKey: option.key, transmitTo: option.text });
    if(option.text=="Customer"){
      this.setState({
        hideCustomer:"",
        hideVendor:"none",
      });
    }
    else if (option.text=="Sub-Contractor"){
      this.setState({
        hideVendor:"",
        hideCustomer:"none",
      });
    }
}
public _drpdwnTransmitFor(option: { key: any; text: any }) {
  //console.log(option.key);
  this.setState({ transmitForKey: option.key, transmitFor: option.text });  
}
private onContactClick (event) {
//  alert("hiii");
  const target = event.target;
//  var value = target.value;
  console.log(target['aria-label']);
// console.log(value);
//  if(target.checked){
//      this.state.customerContChBx[value] = value;   
//  }else{
//      this.state.customerContChBx.splice(value, 1);
//  }


}
private _onChoiceChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
  console.dir(option);
}

private onIconButtonClick=()=>{
  this.setState({
    isCalloutVisible:false,
  });
}
private _onCloseDialog=()=>{
  this.setState({
    isCalloutVisible:true,
  });
}
private handleSelectName=(option)=>{
  console.log(option);
}
private _showGrid(){
  this.setState({
showGrid:false,
  });
 
}
private _showExternalGrid(){
  this.setState({
    showExternalGrid:false,
  });
 
}
private _hideGrid(){
  this.setState({
    showExternalGrid:true,
    showGrid:true,
  });
 
}
private _confirmAndSendBtnClick(){
  this.setState({
    hideUnlockButton:"",
  });
 
}


private onCommentChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string): void => {
  const newMultiline = newText.length > 50;
  if (newMultiline !== this.state.toggleMultiline) {
    this.setState({
      toggleMultiline:true,
    });
  }
}

  public render(): React.ReactElement<IOutBoundTransmittalProps> {
    
    const iconButtonId: any = document.getElementById('iconButton');
    const TransmitTo: IDropdownOption[] = [

      { key: '1', text: 'Customer' },
      { key: '2', text: 'Sub-Contractor' },
  
  ];

    return (
      <div className={ styles.outBoundTransmittal }>
        {/* <div className={ styles.container }> */}
        <div style={{ marginLeft: "auto", marginRight: "auto", width: "50rem" }}>
          <Label className={styles.align}>{this.props.description}</Label>
          <div style={{marginLeft:"522px"}}>
            <Label>Purchase Order : PO -34523491-00001</Label>
          </div>
              <div style={{display:"flex",margin:"6px"}}>
              <Label >Transmittal No :  TRM-CBO-34523491-00001	</Label>
              <Label style={{padding: "0 0 0 194px"}}>Project :   34523491- ADNOC Engeering projects</Label>
              </div>
              <div  className={ styles.border}>
                  <div className={styles.row}>
                    <div style={{display:"flex"}}>
                        {/* <Label >Transmit To : </Label> */}
                        <Dropdown id="t3"                         
                        selectedKey={this.state.transmitToKey}
                        placeholder="Select an option"
                        options={TransmitTo}
                        onChanged={this._drpdwnTransmitTo} style={{marginLeft:"10px",width:"248px"}} label="Transmit To"/>
                        <div style={{display:this.state.hideCustomer}}>
                          <div style={{marginLeft:"123px",display:"flex",marginTop:"22px"}}> 
                            <Label>Customer : </Label>
                            <Label>Euro Mechaical</Label>
                          </div>
                       </div>
                       <div style={{display:this.state.hideVendor}}>
                          <div  style={{display:"flex",marginLeft:"123px",marginTop:"22px"}}> 
                            <Label>Sub-Contractor : </Label>
                            <Label>QQQQ</Label>
                          </div> 
                        </div>
                    </div>

                    <div style={{display:"flex"}}>
                        {/* <Label > To : </Label> */}
                        <span className={styles.span}></span>
                        <TextField label="To :" style={{marginLeft:"34px",width:"290px"}} id="To" multiline autoAdjustHeight  styles={multiline}></TextField>
                        <TooltipHost
                              content="Search Contacts"                                                            
                              calloutProps={calloutProps}
                              styles={hostStyles}
                            >
                            <IconButton iconProps={cancelIcon} title=" Search Contacts" ariaLabel=" "id={iconButtonId}   onClick={this.onIconButtonClick} style={{padding:"39px 0 0 0"}}/>
                        </TooltipHost>
                        <Dialog
                          hidden={this.state.isCalloutVisible}
                          onDismiss={this._onCloseDialog}
                          dialogContentProps={dialogContentProps}
                          modalProps={dragOptions}
                        
                        >
                        {customerContacts.map((contacts,key)=>{
                        return(
                              <div style={{padding: "0px 0px 7px 0"}}><Checkbox label={contacts.text} value={this.state.customerContChBx} onChange={this.onContactClick}/></div>
                             
                            );
                        })

                        }
                           <div><PrimaryButton text="Add" ></PrimaryButton></div>
                        </Dialog>                       
                        {/* <Label style={{marginLeft:"9px"}}> CC : </Label> */}
                        <span className={styles.span}></span>
                        <TextField  label="CC :"style={{marginLeft:"10px",width:"290px"}} id="To" multiline autoAdjustHeight />
                        <TooltipHost
                              content="Search Contacts"                                                            
                              calloutProps={calloutProps}
                              styles={hostStyles}
                              >
                            <IconButton iconProps={cancelIcon} title=" "  onClick={this.onIconButtonClick} ariaLabel=" " id={iconButtonId} style={{padding:"39px 0 0 0"}}/>
                        </TooltipHost> 
                      
                    </div>
                    <div style={{display:"flex",padding:"0 0 12px 12px"}}>                                         
                      <TextField label="Notes"  multiline placeholder="" style={{marginLeft:"13px",width:"290px"}}/>
                      <div    style={{marginLeft:"91px",marginTop:"31px"}}>
                      <Checkbox label="Send as shared folder" style={{padding: "0 0 6px 0"}} />
                      <Checkbox label="Receive in shared folder" style={{padding: "0 0 6px 0"}}  checked={true}/>
                      <Checkbox label="Send as multiple emails" style={{padding: "0 0 6px 0"}} />
                      </div>
                    </div>
                    <hr/>
                          <div style={{padding:"12px 0 12px 12px"}}>
                            <Label>Project Documents</Label>
                            <SearchBox placeholder="Document Search" title="Project Documents"  onSearch={newValue => console.log('value is ' + newValue)}  className={styles['ms-SearchBox']}/> 
                            </div>  
                          <div style={{display:"flex"}}>
                            <div style={{display:"flex",padding:"8px 0px 0 11px"}}>                                 
                            <Dropdown id="t3"                         
                              selectedKey={this.state.transmitForKey}
                              placeholder="Select an option"
                              options={TransmitFor}
                              onChanged={this._drpdwnTransmitFor} style={{width:"273px",marginRight:"8px"}} label="Transmit For"/>
                            <DatePicker label="Due Date"
                              style={{ width: '200px',marginRight:"8px" }}
                              //value={this.state.approvalDate}
                              //onSelectDate={this._onApprovalDatePickerChange}
                              placeholder="Select a date..."
                              ariaLabel="Select a date"
                              />                        
                            <TextField label="Comments"  multiline={this.state.toggleMultiline} placeholder="" style={{width:"218px",marginRight:"8px"}} onChange={this.onCommentChange}/>
                            <i className={styles['icon-145']} aria-hidden="true"> <IconButton iconProps={AddIcon} title="Add" ariaLabel="Delete" onClick={this._showGrid}  style={{padding: "43px 0px 0px 10px"}}/></i>
                            </div> 
                          </div>
                        
                          <table  style={{ border: '1px solid #ddd', width: '100%', borderCollapse: 'collapse',marginTop: "17px",marginLeft:"12px",textAlign:"center"}} hidden={this.state.showGrid} >
                                <tr>
                                  <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Slno</th>
                                  <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Doc Id</th>
                                  <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Document Name</th>
                                  <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Revision No</th>
                                  <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Size (in MB)</th>
                                  <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Transmit For</th>
                                  <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Due Date</th>
                                  <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Comments</th>             
                                  <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Delete</th>
                                </tr>
                                <tr>
                                  <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>1</td>
                                  <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>ENG-DRW-001 </td>
                                  <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>ENG-DRW-001 Drawing1</td>
                                  <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>2</td>
                                  <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>2</td>
                                  <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>For Review</td>
                                  <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>20 AUG 2021</td>             
                                  <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>For re-review</td>       
                                  <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}><IconButton iconProps={DeleteIcon} title="Delete" ariaLabel="Delete" /></td>
                                </tr>
                          </table>
                          <hr  style={{marginTop:"20px"}}/>
                    <Label style={{padding:"12px 0 10px 12px"}}>External Documents:</Label>                   
                    <div style={{display:"flex"}}>
                    <input  type="file" id="myfile" style={{marginRight:"-13px",marginLeft:"12px"}} ></input>
                    <IconButton iconProps={AddIcon} title="Add External Documents" ariaLabel="Add" onClick={this._showExternalGrid} style={{marginTop:"-4px"}}/>
                    </div>
                    <div>
                    <table style={{ border: '1px solid #ddd', width: '100%', borderCollapse: 'collapse',marginTop: "17px",marginLeft:"12px",textAlign:"center" }} hidden={this.state.showExternalGrid} >
                          <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Slno</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Document Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Size (in MB)</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Comments</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Delete</th>
                            </tr>
                          <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>1</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>CheckList1</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>1</td>
                            <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}><TextField  multiline={this.state.commentMultiline} placeholder="" style={{width:"235px",marginRight:"8px"}} onChange={this.onCommentChange}/></th>
                            <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}><IconButton iconProps={DeleteIcon} title="Delete" ariaLabel="Delete" /></td>
                          </tr>
                          </table>
                    </div>
                    </div>
                    <div style={{display:"flex",padding:"33px 26px 12px 2px"}}>
                   
                      <PrimaryButton text="Save as draft" style={{marginLeft:"auto"}}/>
                      <PrimaryButton text="Preview" style={{marginLeft:"auto"}}/>
                      <PrimaryButton text="Confirm & Send" style={{marginLeft:"auto"}} onClick={this._confirmAndSendBtnClick}/>
                      <PrimaryButton text="Unlock" style={{marginLeft:"auto",display:this.state.hideUnlockButton}}/>
                      <PrimaryButton text="Cancel"style={{marginLeft:"auto"}} onClick={this._hideGrid}/>
                    
                    
                    </div>

                  </div>
              <div>

             
            </div>
          </div> 
        </div>
      
    );
  }
}



