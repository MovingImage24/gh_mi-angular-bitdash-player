import 'angular';
import 'angular-mocks';
import 'core-js/es6';

declare const require: any;

const context = require.context('.', true, /\.spec\.ts$/);
context.keys().forEach(context);