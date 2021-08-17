import * as React from 'react';
import styles from './TransmittaLInBound.module.scss';
import { ITransmittaLInBoundProps } from './ITransmittaLInBoundProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DatePicker, DefaultButton, Dropdown, IDropdownOption, IDropdownStyles, Label, TextField } from 'office-ui-fabric-react';
import { peoplePicker } from 'office-ui-fabric-react/lib/components/FloatingPicker/PeoplePicker/PeoplePicker.scss';
const options: IDropdownOption[] = [
  
  { key: 'For Review', text: 'For Review' },
  { key: 'For Approval', text: 'For Approval' },
  
];
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};
export default class TransmittaLInBound extends React.Component<ITransmittaLInBoundProps, {}> {
  public handleChange = (date: any) => {  
    alert(date);  
    this.setState({ date: date });  
 } 
  public render(): React.ReactElement<ITransmittaLInBoundProps> {
    return (
      <div className={ styles.transmittaLInBound }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
            <table >
          <tr>
            <td>
              <Label>Project No:</Label></td>
            <td>  <TextField value="1234"  disabled /></td>
            <td> <Label>Customer</Label></td>
            <td>   
             </td>
          </tr>
          <tr>
            <td>    <Label>Notes:</Label></td>
            <td>     <TextField multiline rows={3} /></td>
          </tr>
          <tr>
            <td>   <Label>Project Documents:</Label></td>

            <td>  
            <input
  accept="image/*"
  //className={styles.hello}
  //style={{ display: 'none' }}
  id="raised-button-file"
  multiple
  type="file"
/>
<label htmlFor="raised-button-file">
  <DefaultButton  className={styles.button}>
    Upload
  </DefaultButton>
</label> 

            </td>

          </tr>
        </table>
        <table >
          <thead>
            <tr>
              <th style={{ width: '50px'}} >Doc Id </th>
              <th style={{ width: '70px'}}>Doc Name</th>
              <th style={{ width: '5px'}}>Revision No:</th>
              <th style={{ width: '50px'}}>Transmit for</th>
              <th style={{ width: '70px'}}>Due date</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ENG-DRW-002</td>
              <td>ENG-DRW-002 Drawing1</td>
              <td>2
              </td>
              <td><Dropdown
        placeholder="Select an option"
        options={options}
        styles={dropdownStyles}
      /></td>
              <td>
              <DatePicker
        
        id="dateFrom"
        
        onSelectDate={this.handleChange}
        
      />
              </td>
              <td>  <TextField multiline rows={3} /></td>
            </tr>
            <tr>
              <td>ENG-DRW-002</td>
              <td>ENG-DRW-002 Drawing1</td>
              <td>2
              </td>
              <td><Dropdown
        placeholder="Select an option"
        options={options}
        
      /></td>
              <td>
              <DatePicker
        
        id="dateFrom"
        
        onSelectDate={this.handleChange}
        
      />



              </td>
              <td>  <TextField multiline rows={3} /></td>
            </tr>
            <tr>
              <td>ENG-DRW-002</td>
              <td>ENG-DRW-002 Drawing1</td>
              <td>2
              </td>
              <td><Dropdown
        placeholder="Select an option"
        options={options}
        styles={dropdownStyles}
      /></td>
              <td>
              <DatePicker
        
        id="dateFrom"
        
        onSelectDate={this.handleChange}
        
      />



              </td>
              <td>  <TextField multiline rows={3} /></td>
            </tr>
            
          </tbody>
        </table>

        <table>
          <tr>
            <td>   <Label>External Documents:</Label></td>

                      </tr>  
                      </table>
                      <table>
                             
            <th>

              <td>Doc Name</td>
            </th>
   
          <tbody>
            <tr>
              <td>ENG-DRW-001 Drawing1</td>


            </tr>
            <tr>
              <td>ENG-DRW-002 Drawing2</td>
            </tr>
            <tr>
              <td>ENG-DRW-003 Drawing3</td>
            </tr>
          </tbody>
        </table>
        <DefaultButton text="Save as draft"  allowDisabledFocus  style={{ marginTop: '20px', float: "right", borderRadius: "10px", border: "1px solid gray" }}/>
        <DefaultButton text="Preview"  allowDisabledFocus  style={{ marginTop: '20px', float: "right", borderRadius: "10px", border: "1px solid gray" }}/>
        <DefaultButton text="Confirm and Send"allowDisabledFocus style={{ marginTop: '20px', float: "right", borderRadius: "10px", border: "1px solid gray"} }/>
        <DefaultButton text="Cancel"  allowDisabledFocus style={{ marginTop: '20px', float: "right", borderRadius: "10px", border: "1px solid gray" }} />
      </div>
    
    
           </div>
          </div>
        </div>
        );
    
     }
    
}
