import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SendEmailUsingSpfxWebPartStrings';
import SendEmailUsingSpfx from './components/SendEmailUsingSpfx';
import { ISendEmailUsingSpfxProps } from './components/ISendEmailUsingSpfxProps';
import { sp } from "@pnp/sp/presets/all";
export interface ISendEmailUsingSpfxWebPartProps {
  description: string;
}

export default class SendEmailUsingSpfxWebPart extends BaseClientSideWebPart<ISendEmailUsingSpfxProps> {
  
  
  
  public render(): void {
    const element: React.ReactElement<ISendEmailUsingSpfxProps> = React.createElement(
      SendEmailUsingSpfx,
      {
        description: this.properties.description,
        Context:this.context,
        msGraphClientFactory:this.properties.msGraphClientFactory,

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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
