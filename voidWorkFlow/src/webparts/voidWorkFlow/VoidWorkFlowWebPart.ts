import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'VoidWorkFlowWebPartStrings';
import VoidWorkFlow from './components/VoidWorkFlow';
import { IVoidWorkFlowProps } from './components/IVoidWorkFlowProps';
import { sp } from "@pnp/sp/presets/all";

export interface IVoidWorkFlowWebPartProps {
  description: string;
}

export default class VoidWorkFlowWebPart extends BaseClientSideWebPart<IVoidWorkFlowProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }
  public render(): void {
    const element: React.ReactElement<IVoidWorkFlowProps> = React.createElement(
      VoidWorkFlow,
      {
        description: this.properties.description,
        context: this.context,
        DueDateDefault:this.properties.DueDateDefault,
        RetentionPeriod:this.properties.RetentionPeriod,
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
                PropertyPaneTextField('DueDateDefault', {
                  label: "Due Date Default In Days"
                }),
                PropertyPaneTextField('RetentionPeriod', {
                  label: "Retention Period"
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
