## sda-webpart

Simple webpart that works in Search Driven Architecture. In such architecture data fetching/aggregation id moved out of application and moved transfered to SharePoint Search. SPFx is focused only to display data received from Results Source to which it connects. 
Thanks to this it's an easy way to manage data filtering/sorting as long as data model won't change because you can do it directly from SharePoint without the need of getting solution, making changes and deploying it (which should be done by developer. Result Source can be editted by analytist or even power user).

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
