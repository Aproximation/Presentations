import { SPHttpClient } from '@microsoft/sp-http';
export interface ISdaProps {
  description: string;
  resultSourceId: string;
  listName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
}
