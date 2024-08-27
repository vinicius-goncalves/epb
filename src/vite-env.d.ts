/// <reference types="vite/client" />

//this fix import errors in crxjs plugin
declare module '*?script';
declare module '*?script&module';
