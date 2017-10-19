import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SdaWebPartStrings';
import Sda from './components/Sda';
import { ISdaProps } from './Model/ISdaProps';
import { ISdaWebPartProps } from './Model/ISdaWebPartProps';

export default class SdaWebPart extends BaseClientSideWebPart<ISdaWebPartProps> {

//thanks to below webpart properties from property pane will be reloaded only when hitting "Apply" button
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  public render(): void {
    const element: React.ReactElement<ISdaProps > = React.createElement(
      Sda,
  // Below parameters comes from BaseClientSideWebPart which contains context for instance
      {
        description: this.properties.description,
        resultSourceId: this.properties.resultSourceId,
        listName: this.properties.listName,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
      }
    );

    ReactDom.render(element, this.domElement);
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
          // Below parameters comes from Property Pane visible in UI
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('resultSourceId', {
                  label: strings.ResultSourceIDFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
