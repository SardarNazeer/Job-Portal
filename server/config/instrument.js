// ESM import (no require)
import * as Sentry from "@sentry/node"


Sentry.init({
  dsn: "https://2fcb02bffe3a426a187697d54e81b0f4@o4510081951137792.ingest.us.sentry.io/4510081958608896",
  // This option will send default PII data to Sentry
  
  integrations: [Sentry.mongooseIntegration()],
  sendDefaultPii: true,
});

export default Sentry;
