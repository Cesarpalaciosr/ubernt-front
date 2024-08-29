// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// import 'dotenv/config';

export const environment = {
  production: false,

  localURL  :   "http://localhost:7338", 
  server    :   "http://twitterservermoviles2-production.up.railway.app",
  token     :   "jwt_token",
  id        :   "id",
  role      :   "role",
  fullname  :   "fullname",
  username  :   "username"
  // appid: process.env.APP_ID
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
