import * as React from 'react';
import styles from './DetailList.module.scss';
import { IDetailListProps } from './IDetailListProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Item, Items, ITermSetInfo, sp } from "@pnp/sp/presets/all";
import { DefaultButton, DetailsList, DetailsListLayoutMode, DetailsRow, getTheme, IColumn, Icon,  IconButton,  IDetailsListProps, IDetailsRowStyles, IIconProps, ImageFit, IObjectWithKey, ISelection, Link, mergeStyles, SearchBox, Selection } from 'office-ui-fabric-react';
import { useRef } from 'react';
import * as _ from 'lodash';
export interface IDetailListState {
  docRepositoryItems: any[];
  selectionDetails: string;
  items: any[];
}
const theme = getTheme();
const edit : IIconProps = { iconName: 'Edit' };
const SendRequest : IIconProps = { iconName: 'Send' };
const RevisionHistory : IIconProps = { iconName: 'FullHistory' };
let sortedArray = [];
export default class DetailList extends React.Component<IDetailListProps, IDetailListState, {}> {
  private _columns: IColumn[];
  private _selection: Selection;
  constructor(props: IDetailListProps) {
    super(props);
    this.state = {
      docRepositoryItems: [],
      selectionDetails: "",
      items: [],
    };
    this._columns = [
      { key: 'Edit', name: 'Edit', fieldName: 'Title', minWidth:25,maxWidth:25, isResizable: true },
      //{ key: 'DocumentName', name: 'Document Name', fieldName: 'DocumentName', minWidth: 100, maxWidth: 200, isResizable: true },  
      { key: 'LinkToDocument', name: 'Link To Document', fieldName: 'LinkToDocument', minWidth: 250, maxWidth: 300, isResizable: true },
      { key: 'WFStatus', name: 'Status', fieldName: 'WFStatus', minWidth: 20, maxWidth: 50, isResizable: true },
      // { key: 'Approver', name: 'Approver', fieldName: 'ApproverId', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'SendRequest', name: '', minWidth:23,maxWidth:23, isResizable: true },
      { key: 'RevisionHistory', name: '',  minWidth:23,maxWidth:23, isResizable: true },
      // { key: 'column5', name: 'Link To Document', fieldName: 'LinkToDocument', minWidth: 100, maxWidth: 200, isResizable: true },
      
    ];
    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() }),
    });
    this._onFilter=this._onFilter.bind(this);
    this._editDocument=this._editDocument.bind(this);
  }
  public async componentDidMount() {

    this.loadDocProfile();

  }
  private loadDocProfile = async () => {
    //getting list DocProfile u
    sp.web.getList(this.props.siteUrl + "/Lists/" + this.props.listName).items.get().then(docProfileItems => {
      sortedArray = _.orderBy(docProfileItems, 'DocumentName', ['asc']);
      this.setState({
        docRepositoryItems: sortedArray,
        items: docProfileItems,
      });
      console.log(this.state.docRepositoryItems);
    });

  }
 
  private _onItemInvoked = (item): void => {
    alert(`Item invoked: ${item.DocumentName}`);
  }
 
  private _getSelectionDetails(): any {
    let getSelectedUsers = [];
    const selectionCount = this._selection.getSelectedCount(); 
    const getItems = (this._selection.getSelection()[0]);   
    const getRowNo = this._selection.getSelectedIndices(); 
    getSelectedUsers.push(getItems);
    //console.log(getSelectedUsers[0].ID);
    // console.log(getRowNo) ;
     //console.log(getItems); 
     //alert((getSelectedUsers[0].ID));
    
  }
  private _onRenderRow: IDetailsListProps['onRenderRow'] = props => {
    const customStyles: Partial<IDetailsRowStyles> = {};
    if (props) {
      if (props.itemIndex % 2 === 0) {
        // Every other row renders with a different background color
        customStyles.root = { backgroundColor: theme.palette.themeLighterAlt };
      }

      return <DetailsRow {...props} styles={customStyles} />;
    }
    return null;
  }
  
  private onRenderItemColumn = (item :any, index: number, column: IColumn) =>{
    const fieldContent = item[column.fieldName as keyof DetailList] as string;
      
  switch (column.key) {      

    case 'DocumentName':
      return <div>{item.Title}  </div>;
        
    case 'Edit':
      return <IconButton iconProps={edit} title="Edit" ariaLabel="Emoji" onClick={()=>this._editDocument(item)} />;
      
    case 'LinkToDocument':
      return <Link onClick={()=>this._showDocument(item)}>{item.DocumentName}</Link>;

    case 'color':
      return (
        <span
          data-selection-disabled={true}
          className={mergeStyles({ color: fieldContent, height: '100%', display: 'block' })}
        >
          {item.WFStatus}
        </span>
      );
      case 'SendRequest':
    return  <IconButton iconProps={SendRequest} title="Start WorkFlow" ariaLabel="Send Request" onClick={()=>this._sendRequest(item)} />;
     case 'RevisionHistory':
    return  <IconButton iconProps={RevisionHistory} title="Revision History" ariaLabel="Revision History"  onClick={()=>this._revisionHistory(item)}  />;
    default:
      return <span>{fieldContent}       
        </span>;
  }
   }

   private _editDocument = (item)=>{
      //console.log(item.LinkToDocument.Description);
    window.open("https://ccsdev01.sharepoint.com/sites/TrialTest/SitePages/EditDocument.aspx");
  }
  private _sendRequest = (item)=>{
      
    window.open("https://ccsdev01.sharepoint.com/sites/TrialTest/SitePages/SendRequest.aspx");
  }
  private _revisionHistory = (item)=>{
    console.log(item);
    window.open("https://ccsdev01.sharepoint.com/sites/DMS/SitePages/FlowHistory.aspx?DRID="+ item['ID']);
  }

  private _showDocument = (item)=>{
    //console.log(item.LinkToDocument.Description);
  window.open(item.LinkToDocument.Url);
  }

   private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {  
    this.setState({
      items: text ? this.state.docRepositoryItems.filter(i => i.Title.toLowerCase().indexOf(text.toString().toLowerCase()) > -1) : this.state.docRepositoryItems,      
    });
  }


  public render(): React.ReactElement<IDetailListProps> {
    return (
      <div className={styles.detailList} style={{width:"80%"}}>
      <SearchBox placeholder="Search Documents" className={styles['ms-SearchBox']}  onSearch={newValue => console.log('value is ' + newValue)} onChange={this._onFilter} />
        
        <DetailsList
          items={this.state.items}
          columns={this._columns}
          layoutMode={DetailsListLayoutMode.justified}
          selection={this._selection}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"          
          checkButtonAriaLabel="select row"
          onRenderRow={this._onRenderRow}
          setKey="set"
          //onItemInvoked={item => this._onItemInvoked(item)}
          onRenderItemColumn={this.onRenderItemColumn}
        />
      </div>
    );
  }
}
