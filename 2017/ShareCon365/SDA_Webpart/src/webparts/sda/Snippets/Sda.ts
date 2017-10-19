import {  SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

interface IOtherSdaListItem {
  Title: string;
  Id: number;
  Url: string;  
}
//
class Sda {
  
  listItems:IOtherSdaListItem[];

  private readItems(props): void {
    
      //let url = `/_api/web/lists/getbytitle('${props.listName}')/items?$select=Title,Id,Url`;
      let url = `/_api/search/query?querytext='*'&selectproperties='Path%2cTitle%2cCustomWeight'&sourceid='${props.resultSourceId}'&rowlimit=500`;
      props.spHttpClient.get(`${props.siteUrl}${url}`,
      props.SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse): Promise<{ value: IOtherSdaListItem[] }> => {
          return response.json();
        })
        .then((response: { value: IOtherSdaListItem[] }): void => {
          //TODO on success
          this.listItems = response.value;
        }, (error: any): void => {
          //TODO on failure
        });
    }
}

//{searchTerm} 
//XRANK(cb=1 stdb=1) (Title:{searchTerm})

////Using Result Source 
//let url = `/_api/search/query?querytext='*'&selectproperties='Path%2cTitle%2cCustomWeight'&sourceid='${this.props.resultSourceId}'&rowlimit=500`;
//09321df3-41db-42fe-bb5d-7fa6392fdaa9