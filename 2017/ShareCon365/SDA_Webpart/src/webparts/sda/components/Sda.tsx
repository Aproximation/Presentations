import * as React from 'react';
import styles from './Sda.module.scss';
import { ISdaProps } from '../Model/ISdaProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ISdaListItem from '../Model/ISdaListItem';
import { SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { ISearchResults, ICellValue } from '../Model/ISearchResults';
import { ListBasicExample } from './SdaList';

export default class Sda extends React.Component<ISdaProps, {}> {
  
  //preparing mock object for later use if app hosted locally
  private mockItems: ISdaListItem[] = [
    { Title: 'Mock List', Id: '1' , Path:'http://google.pl', CustomWeight: '1', Rank: '1'},
    { Title: 'Other Mock List 2', Id: '2' ,Path:'http://google.pl', CustomWeight: '1', Rank: '1'},
    { Title: 'Some Mock List 3', Id: '3' ,Path:'http://google.pl', CustomWeight: '1', Rank: '1'}
  ];

  //initial state
  state = {
    status: "Configure web part before first use",
    listItems: []
  }  

  public render(): React.ReactElement<ISdaProps> {
    return (
      <div className={styles.sda}>
        <div className={styles.container}>        
          {this.state.status}          
          <ListBasicExample items={this.state.listItems} />
        </div>
      </div>
    );
  }

  //using react life cycle components to make additional get http request if result source id has changed
  receivedProps = false;
  
  componentWillReceiveProps(){
    this.receivedProps = true;
  }

  componentDidUpdate(){
    if (this.receivedProps)
      {
        this.getItemsData();
        this.receivedProps = false;
      }
  }

  //Get items from result source
  private getItemsData(): void {
    if (Environment.type == EnvironmentType.SharePoint || 
              Environment.type == EnvironmentType.ClassicSharePoint) {
                  this.getItemsFromSharepoint();
    }
    else if (Environment.type == EnvironmentType.Local)
    {
      this.setState({  
        status: "Local env"  ,      
        listItems: this.mockItems
      });
    }    
  }

//Make get http requests to SP search in order to fetch items
  private getItemsFromSharepoint(): void {
    //let url = `/_api/search/query?querytext='* Path:"https://searchignitedemo.sharepoint.com/Lists/${this.props.listName}/"'&selectproperties='Path%2cTitle%2cCustomWeight'`;
    let url = `/_api/search/query?querytext='*'&selectproperties='Path%2cTitle%2cCustomWeight'&sourceid='${this.props.resultSourceId}'&rowlimit=500`;
    this.props.spHttpClient.get(`${this.props.siteUrl}${url}`,
      SPHttpClient.configurations.v1,
      {
        //below headers are required only when calling REST search endpoint. spHTTPClient add them automatically for any other endpoints
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }})
  //Normally we could map response value (results) to desired object class - as in Snippets/Sda.ts file
  //However REST search endpoint does not return anything in results rather than the response itself has desired structure so we need to map whole response
      .then((response: SPHttpClientResponse): Promise<ISearchResults> => {
        return response.json();
      })
      .then((response) => {
        var listItems = this.assembleListItem(response.PrimaryQueryResult.RelevantResults.Table.Rows);
        this.setState({ 
          status: 'Found ' + response.PrimaryQueryResult.RelevantResults.Table.Rows.length + ' items',        
          listItems: listItems
        });
      }, (error: any): void => {
        this.setState({  
          status: error  ,      
          listItems: this.mockItems
        });
      });
    }

    private assembleListItem(rows) :ISdaListItem[]
    {      
      var listItems: ISdaListItem[] = [];        
      rows.forEach((row) => {       
        var listItem = [];
        row.Cells.forEach((cell:ICellValue) => {
          if (["Rank","Title", "CustomWeight", "Path"].indexOf(cell.Key) > -1)
          {
            listItem[cell.Key] = cell.Value;
          }             
        })
        listItem["Id"] = listItem["Path"].indexOf("?ID=") > -1 ? listItem["Path"].split("?ID=")[1] : -1;
        listItems.push({
          Title: listItem["Title"], Id: listItem["Id"] , Path:listItem["Path"], CustomWeight: listItem["CustomWeight"], Rank: listItem["Rank"]
        });           
      })

      return listItems;
    }
}
