import * as React from 'react';
import styles from './NotificationPreferance.module.scss';
import { INotificationPreferanceProps } from './INotificationPreferanceProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ChoiceGroup, DirectionalHint, IButtonProps, IChoiceGroupOption, IChoiceGroupOptionStyles, Label, ProgressIndicator, Spinner, SpinnerSize, TeachingBubble } from 'office-ui-fabric-react';
import { ClapSpinner, PushSpinner } from 'react-spinners-kit';



export interface INotificationPreferanceState{
  noNotification:string;
  notiForCriticalDoc:string;
  NotificationForAll:string;
  notifiPrefKey:string;
  notifiPrefText:string;
  showTeachingBubble:string;
  loading: boolean;
}
const searchBoxStyles: Partial<IChoiceGroupOptionStyles> = {
   root: {innerWidth:"20px" , innerHeight:"20px" }};

export default class NotificationPrefrence extends React.Component<INotificationPreferanceProps,INotificationPreferanceState, {}> {
  constructor(props: INotificationPreferanceProps) {
    super(props);
    this.state = {
      noNotification:this.props.noNotification,
      notiForCriticalDoc:this.props.notiForCriticalDoc,
      NotificationForAll:this.props.NotificationForAll,
      notifiPrefKey:"sendIfCritical",
      notifiPrefText:this.props.notiForCriticalDoc,
      showTeachingBubble:"none",
      loading: true,
        };
        this.closeTeachingBubble=this.closeTeachingBubble.bind(this);
  
}
private notifiPrefSelect= (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
  this.setState({ notifiPrefKey: option.key, notifiPrefText: option.text });
  console.log(option.text );
}
private closeTeachingBubble(){
  this.setState({ showTeachingBubble:"none",});
}
  public render(): React.ReactElement<INotificationPreferanceProps> {
   
    const options: IChoiceGroupOption[] = [
      { key: 'dontSend', text: escape(this.props.noNotification), iconProps: { iconName: 'MailUndelivered' } ,title:this.props.noNotification},
      { key: 'sendIfCritical', text: escape(this.props.notiForCriticalDoc), iconProps: { iconName: 'MailAlert' } ,title:this.props.notiForCriticalDoc},
      { key: 'sendAll', text: escape(this.props.NotificationForAll), iconProps: { iconName: 'MailCheck' },title:this.props.NotificationForAll},
    ];
    return (
      <div className={ styles.notificationPreferance }>
        
              <Label style={{textAlign:"center"}}>Notification Preference </Label>
              <div style={{marginTop:"20px"}}  className={styles['labelWrapper-124']}>
              <ChoiceGroup  defaultSelectedKey="sendIfCritical"defaultValue={this.state.notifiPrefText} options={options} style={{marginLeft:"252px",marginTop:"12px"}} styles={searchBoxStyles}  id={'targetChoice'}      onChange={this.notifiPrefSelect}/>
              <div >
              {/* <ClapSpinner size={30} backColor="#48d60e" loading={true} />
              <ProgressIndicator  description="Saving successfully...." />
              <Spinner size={SpinnerSize.large} label="loading....." labelPosition="right" /> */}
              {/* <TeachingBubble              
                target="#targetChoice"
                calloutProps={{ directionalHint: DirectionalHint.bottomCenter }}
                isWide={true}
                hasCloseButton={true}
                onDismiss={this.closeTeachingBubble}              
                headline="Discover what’s trending around you">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni
                harum non?
              </TeachingBubble> */}
              </div>
            </div>
            
            </div>
         
    );
  }
}
