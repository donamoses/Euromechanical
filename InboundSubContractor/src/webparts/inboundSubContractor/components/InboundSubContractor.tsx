import * as React from 'react';
import styles from './InboundSubContractor.module.scss';
import { IInboundSubContractorProps } from './IInboundSubContractorProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DatePicker, Dropdown, IconButton, IDropdownOption, IIconProps, Label, PrimaryButton, SearchBox, TextField } from 'office-ui-fabric-react';
export interface IInboundCustomerState {
  AddIndex:boolean;
  AddDoc:boolean;
  }
export default class InboundSubContractor extends React.Component<IInboundSubContractorProps,IInboundCustomerState, {}> {
  constructor(props: IInboundSubContractorProps) {
    super(props);
    this.state = {
      AddIndex:true,
      AddDoc:true
    };
    this.Addindex = this.Addindex.bind(this);
    this.AddDoc = this.AddDoc.bind(this);
    this._hideGrid = this._hideGrid.bind(this);
  }
  public DocIndex(option) {
    // alert(option.key);
    
  }
  public Addindex(){
   
    this.setState({ AddIndex: false });
  }
  public AddDoc(){
    this.setState({ AddDoc: false });
  }
  private _hideGrid(){
    this.setState({
      AddIndex:true,
      AddDoc:true,
    });
   
  }
  public render(): React.ReactElement<IInboundSubContractorProps> {
    const DeleteIcon: IIconProps = { iconName: 'Delete' };
    const AddIcon: IIconProps = { iconName: 'CircleAdditionSolid' };
    const DocumentIndex: IDropdownOption[] = [

      { key: 'ENG-DRW-001 Drawing1', text: 'ENG-DRW-001 Drawing1' },
      { key: 'ENG-DRW-002 Drawing2', text: 'ENG-DRW-002 Drawing2' },
      { key: 'ENG-DRW-003 Drawing3', text: 'ENG-DRW-003 Drawing3' },
    ];
    const TransmittalCode: IDropdownOption[] = [

      { key: 'APR', text: 'APR' },
      { key: 'NA', text: 'NA' },
      { key: 'RJ', text: 'RJ' },
      { key: 'RW', text: 'RW' },
      { key: 'NRW', text: 'NRW' },
    ];
    return (
      <div className={ styles.inboundSubContractor }>
         <div style={{ marginLeft: "auto",marginRight:"auto",width:"50rem" }}>
         <div style={{fontWeight:"bold",fontSize:"15px",textAlign:"center"}}> Inbound Transmittal from Euromechanical</div>
        <div className={styles.row}>
        
        <div style={{display:"flex",margin:"7px"}}>
        <Label >Transmittal ID : TRM-IB-0001 </Label>
        <Label style={{padding: "0 0 0 194px"}}>Purchase Order : PO-25412-874521</Label>
        </div>
        <div style={{display:"flex",margin:"7px"}}> 
        <Label>Transmittal Date : 16 Aug 2021</Label>
        <Label style={{padding: "0 0 0 185px"}}>Project : PM-45875-ADNOC Engineering Project</Label>
        </div> 
        <div style={{display:"flex",margin:"7px"}}>
        <Label style={{marginRight:"40px"}}>Sub-Contractor : </Label>
        <SearchBox placeholder="Search"
         title="Sub-Contractor" 
         onSearch={newValue => console.log('value is ' + newValue)}  
         className={styles['ms-SearchBox']}/>  
        </div>
        <hr  style={{marginTop:"20px"}}/>
        <div style={{display:"flex",margin:"7px"}}> 
          <Dropdown 
          style={{ width: '300px',marginRight:'76px' }}
          placeholder="Select Document Index" 
          label="Document Index"
          options={DocumentIndex}
          onChanged={this.DocIndex}
          />
          <TextField label="SubContractor Doc No" style={{ width: '300px' }}></TextField>
          </div>
          <div style={{display:"flex",margin:"7px"}}> 
          <DatePicker label="Recieved Date"
          style={{ width: '300px',marginRight:'76px' }}
          // value={this.state.expiredate}
          // onSelectDate={this._onExpDatePickerChange}
          placeholder="Select a date..."
          ariaLabel="Select a date"
          />
          <Dropdown 
          style={{ width: '300px' }}
          placeholder="Select Transmittal Code" 
          label="Transmittal Code"
          options={TransmittalCode}
          />
          </div>
          <div style={{display:"flex",margin:"7px"}}> 
          <TextField label="Comments"  multiline autoAdjustHeight style={{ width: '600px' }}/>
          <IconButton iconProps={AddIcon} title="Addindex" ariaLabel="Addindex" onClick={this.Addindex} style={{padding: "58px 0px 0px 45px"}} />
          </div>
          <table style={{ border: '1px solid #ddd', width: '685px', borderCollapse: 'collapse',marginLeft:"6px" }} hidden ={this.state.AddIndex}>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Slno</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Document index</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>SubContractor Doc No</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Received Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Originator</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Comments</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Transmittal Code</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Delete</th>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>1</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>ENG-DRW-001 Drawing1</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>CS-004</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>12 AUG 2021</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Sunil John</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Approved</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>APR</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>
                <IconButton iconProps={DeleteIcon} title="Delete" ariaLabel="Delete" /></td>
            </tr>
          </table>
          <hr  style={{marginTop:"20px"}}/>
          <Label>Additional Documents</Label>
          <div style={{display:"flex",margin:"7px"}}> 
          <Label >Upload Document:</Label> <input  type="file" id="myfile"  style={{marginLeft:"-105px",padding:"33px 0px 0px 0px"}}></input>
          {/* <FilePicker
             
            label={'Upload a Document'}
            buttonClassName={styles.button}
            buttonLabel={'Upload'}
            buttonIcon="FileImage"
            onSave={this._handleFileUpload}
            onChange={this._handleFileUpload} 
            context={this.props.context}
          /> */}
          <DatePicker label="Recieved Date"
          style={{ width: '300px' }}
          // value={this.state.expiredate}
          // onSelectDate={this._onExpDatePickerChange}
          placeholder="Select a date..."
          ariaLabel="Select a date"
          />
          </div>
          <div style={{display:"flex",margin:"7px"}}> 
          <TextField label="Comments"  multiline autoAdjustHeight style={{ width: '600px' }} />
          <IconButton iconProps={AddIcon} title="AddDoc" ariaLabel="AddDoc" onClick={this.AddDoc} style={{padding: "58px 0px 0px 45px"}} />
          </div>
          <table style={{ border: '1px solid #ddd', width: '685px', borderCollapse: 'collapse',marginLeft:"6px" }} hidden={this.state.AddDoc} >
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Slno</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Document Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Received Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Comments</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Delete</th>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>1</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>Manual 1</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>12 AUG 2021</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>For Review</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', borderCollapse: 'collapse' }}>
                <IconButton iconProps={DeleteIcon} title="Delete" ariaLabel="Delete" /></td>
            </tr>
          </table>
          <div style={{display:"flex",padding:"33px 26px 12px 2px"}}>
                   
                   <PrimaryButton text="Save as draft" style={{marginLeft:"300px"}}/>
                   <PrimaryButton text="Submit" style={{marginLeft:"10px"}}/>
                   <PrimaryButton text="Cancel"style={{marginLeft:"10px"}} onClick={this._hideGrid}/>
                 
                 
                 </div>
          </div>
        </div>
      </div>
    );
  }
}
