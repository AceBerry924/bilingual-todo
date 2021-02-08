# Bilingual Todo

Angular Multi language Todo sample
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.3.

## Tech Stack

- Angular 11.1.3
- Google firebase
  - Authentication
  - Could Firestore
- Angular Material 11.x
- Bootstrap 4.5 (Optional)
- TypeScript 4.x
- Sass or Scss
- Angular i18n ([https://angular.io/guide/i18n](https://angular.io/guide/i18n))
- RxJS
- NgRx (Optional)

## **Requirements**

- Website should be available in two languages
  - English
  - Arabic (Or another RTL language)
- Responsive design is required.
- Website should have a dark mode as well (last state should be saved on the browser’s local storage to be used for next visits)
- Required pages:
  - Login page
  - Sign up page
  - Dashboard page (Only for authorized users)
- User can change order of each task on the list.
- User can filter to-list using task title.
- User can logout.
- Be careful that none of the following commands encounter an error:
  - ng lint
  - ng test
  - ng serve
  - ng build --prod --localize

`ng serve -o --live-reload --configuration=en`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
