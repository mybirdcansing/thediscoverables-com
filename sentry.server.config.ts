// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://47c3ba4446bc6df561e54389a41bc4cc@o4507863364665344.ingest.us.sentry.io/4507863367024640',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Disable automatic session tracking to prevent cookie usage
  autoSessionTracking: false,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
})
