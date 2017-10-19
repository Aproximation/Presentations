declare interface ISdaWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ResultSourceIDFieldLabel: string;
  ListNameFieldLabel: string;  
}

declare module 'SdaWebPartStrings' {
  const strings: ISdaWebPartStrings;
  export = strings;
}
