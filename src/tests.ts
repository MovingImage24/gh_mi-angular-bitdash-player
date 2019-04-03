import 'angular';
import 'angular-mocks';
import 'core-js/stable';

declare const require: any;

const context = require.context('.', true, /\.spec\.ts$/);
context.keys().forEach(context);