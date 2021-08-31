import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'NotificationPreferanceWebPartStrings';
import NotificationPreferance from './components/NotificationPreferance';
import { INotificationPreferanceProps } from './components/INotificationPreferanceProps';

export interface INotificationPreferanceWebPartProps {
  description: string;
}

export default class NotificationPreferanceWebPart extends BaseClientSideWebPart<INotificationPreferanceProps> {

  public render(): void {
    const element: React.ReactElement<INotificationPreferanceProps> = React.createElement(
      NotificationPreferance,
      {
        description: this.properties.description,
        noNotification:this.properties.noNotification,
        notiForCriticalDoc:this.properties.notiForCriticalDoc,
        NotificationForAll:this.properties.NotificationForAll,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('noNotification', {
                  label: "No Notication"
                }),
                PropertyPaneTextField('notiForCriticalDoc', {
                  label: "Notication for critical document"
                }),
                PropertyPaneTextField('NotificationForAll', {
                  label: "Notication for all"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
