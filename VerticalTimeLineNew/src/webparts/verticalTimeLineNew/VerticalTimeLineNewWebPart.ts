import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneTextField, IPropertyPaneCheckboxProps

} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'VerticalTimeLineNewWebPartStrings';
import VerticalTimeLineNew from './components/VerticalTimeLineNew';
import { IVerticalTimeLineNewProps } from './components/IVerticalTimeLineNewProps';
import {sp} from '@pnp/sp';

export interface IVerticalTimeLineNewWebPartProps {
  description: string;
}

export default class VerticalTimeLineNewWebPart extends BaseClientSideWebPart<IVerticalTimeLineNewProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }
  public render(): void {
    const element: React.ReactElement<IVerticalTimeLineNewProps> = React.createElement(
      VerticalTimeLineNew,
      {
        description: this.properties.description,
        siteUrl: this.context.pageContext.web.serverRelativeUrl,
        listName: this.properties.listName,
        tableWithTimeLine:this.properties.tableWithTimeLine,
        context:this.context,
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
                PropertyPaneCheckbox('tableWithTimeLine', {
                  text: "TableWithTimeLine"
                }),             
              ]
            }
          ]
        }
      ]
    };
  }
}
