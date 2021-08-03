import * as React from 'react';
import styles from './VerticalTimeLineNew.module.scss';
import { IVerticalTimeLineNewProps } from './IVerticalTimeLineNewProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';
import { ColorPicker, Dialog, DialogType, FontWeights, getTheme, Icon, IconButton, IIconProps, ITooltipHostStyles, mergeStyleSets, Modal, TooltipHost } from '@fluentui/react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IFrameDialog } from "@pnp/spfx-controls-react/lib/IFrameDialog";

export interface IVerticalTimeLineNewState{
iframeModalclose:boolean;
tableShow:string;
tableinTimeLine:string;
showModal: boolean;
reviewed:string;
showReviewModal:boolean;
}
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
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
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
export default class VerticalTimeLineNew extends React.Component<IVerticalTimeLineNewProps,IVerticalTimeLineNewState, {}> {

  constructor(props: IVerticalTimeLineNewProps) {
    super(props);
    this.state={
      iframeModalclose : true,
      tableShow:"none",
tableinTimeLine:"none",
      showModal: false,
      reviewed:"none",
      showReviewModal:false,
    };
    this._versionHistory=this._versionHistory.bind(this);
    this._reviewedHistory=this._reviewedHistory.bind(this);
  }

  public async componentDidMount() {
    if(this.props.tableWithTimeLine){
      this.setState({
        tableinTimeLine:"",
      });
    }
  }

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
    this.setState({ iframeModalclose: false,showModal:false,showReviewModal:false });
  }
  private loadLink = () => {

    return (
      window.open(this.props.siteUrl + "/_layouts/15/Versions.aspx?list=%7Bda53146b-3f5c-4321-926e-c3c2adbff323%7D&ID=1&IsDlg=0")
    );
  }
  
  public render(): React.ReactElement<IVerticalTimeLineNewProps> {
    return (
      <div className={ styles.verticalTimeLineNew }>  
          
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
        <Timeline lineColor={'#76bb7f'}>
          <div  style={{display:this.state.tableinTimeLine}}>
        <TimelineItem
                  key="001"
                  dateText="24 Jul 2021"
                  style={{ color: '#e86971' }}
                  lineColor={"#76bb7f"} 
                >
                  <div>
                  <table >
                            <tr>
                              <th>Reviewer</th>
                              <th>DueDate</th> 
                              <th>Status</th>
                              <th>Reminder</th>
                              <th>Cancel</th>
                              <th>Delegate</th>
                            </tr>
                            <tr>
                              <td>Jill</td>
                              <td style={{color: "red"}}>24 Jul 2021</td>
                              <td>Pending</td>
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
                              <td>Eve</td>
                              <td>24 Jul 2021</td>
                              <td>Returned with comments</td>
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
                              <td>John</td>
                              <td>24 Jul 2021</td>
                              <td>Under Review</td>
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
                              <td>Smith</td>
                              <td>24 Jul 2021</td>
                              <td>Reviewed</td>
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
                              <td>Sam</td>
                              <td>24 Jul 2021</td>
                              <td>Reviewed</td>
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
                          </table> 
                          </div>
                </TimelineItem>
                </div>
                
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
                                                    Approved By :  Sunil John
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
                  style={{ color: '#e86971' }}
                  lineColor={"#76bb7f"} 
                >
                  <h3>Published</h3>
                  <h4>NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
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
                </TimelineItem>
                <TimelineItem
                  key="001"
                  dateText="23 Jul 2021"
                  style={{ color: '#e86971' }}
                  lineColor={"#76bb7f"} 
                >
                          <h3>Reviewed</h3>
                          <h4>NOT/SHML/INT-PRC/AM-00009 Migration Policy.docx</h4>
                          <p style={{fontSize:'12px'}}>
                                                  Requestor: Subha Raveendran
                                                  <div style={{ display: 'flex', margin: "0px 0px 0px 0px" }}>
                                                    Verified By : Subha Raveendran
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
                                                    <div>Verifier : Subha Raveendran</div>  
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
            </div>
          </div>
        </div>
        <div style={{display:this.state.tableShow}} >
      <Modal
        isOpen={this.state.showModal}
        onDismiss={this._closeModal}
        containerClassName={contentStyles.container}
      >

        <div className={contentStyles.header}>
          <span>WorkFlow Status</span>
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
                              <th>Reminder</th>
                              <th>Cancel</th>
                              <th>Delegate</th>
                            </tr>
                            <tr>
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
                              <IconButton iconProps={Share} title=" " ariaLabel=" " />
                            </TooltipHost></td>
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

        <div className={contentStyles.header}>
          <span>Review Details</span>
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
    );
  }
  
}
