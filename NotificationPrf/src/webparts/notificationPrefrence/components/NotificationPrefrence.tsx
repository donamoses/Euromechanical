import * as React from 'react';
import styles from './NotificationPrefrence.module.scss';
import { INotificationPrefrenceProps } from './INotificationPrefrenceProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupOptionStyles, Label } from 'office-ui-fabric-react';

export interface INotificationPrefrenceState{
  noNotification:string;
  notiForCriticalDoc:string;
  NotificationForAll:string;
  notifiPrefKey:string;
  notifiPrefText:string;
}
const searchBoxStyles: Partial<IChoiceGroupOptionStyles> = {
   root: {innerWidth:"20px" , innerHeight:"20px" }};

export default class NotificationPrefrence extends React.Component<INotificationPrefrenceProps,INotificationPrefrenceState, {}> {
  constructor(props: INotificationPrefrenceProps) {
    super(props);
    this.state = {
      noNotification:this.props.noNotification,
      notiForCriticalDoc:this.props.notiForCriticalDoc,
      NotificationForAll:this.props.NotificationForAll,
      notifiPrefKey:"sendIfCritical",
      notifiPrefText:this.props.notiForCriticalDoc,
        };

  
}
private notifiPrefSelect= (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
  this.setState({ notifiPrefKey: option.key, notifiPrefText: option.text });
  console.log(option.text );
}
  public render(): React.ReactElement<INotificationPrefrenceProps> {
    const options: IChoiceGroupOption[] = [
      { key: 'dontSend', text: this.props.noNotification, iconProps: { iconName: 'MailUndelivered' } ,title:this.props.noNotification},
      { key: 'sendIfCritical', text: this.props.notiForCriticalDoc, iconProps: { iconName: 'MailAlert' } ,title:this.props.notiForCriticalDoc},
      { key: 'sendAll', text: this.props.NotificationForAll, iconProps: { iconName: 'MailCheck' },title:this.props.NotificationForAll},
    ];
    return (
      <div className={ styles.notificationPrefrence }>
        
              <Label>Notification Preference </Label>
              <div style={{marginTop:"20px"}}  className={styles['labelWrapper-124']}>
              <ChoiceGroup  defaultSelectedKey="sendIfCritical"defaultValue={this.state.notifiPrefText} options={options} style={{marginLeft:"252px",marginTop:"12px"}} styles={searchBoxStyles}        onChange={this.notifiPrefSelect}/>
            </div>
            
            </div>
         
    );
  }
}
