const requiredInProduction = ["DATABASE_URL", "DIRECT_URL", "AUTH_SECRET", "NEXT_PUBLIC_APP_URL"];
const optionalProviders = ["PAYMENT_PROVIDER", "SMS_PROVIDER", "MAP_PROVIDER", "UPLOAD_PROVIDER"];

const missing = requiredInProduction.filter((key) => !process.env[key]);

console.log("Environment check");
console.log({
  nodeEnv: process.env.NODE_ENV || "development",
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE || "true",
  databaseConfigured: Boolean(process.env.DATABASE_URL),
  missingRequiredForProduction: missing,
  optionalProviders: Object.fromEntries(optionalProviders.map((key) => [key, process.env[key] || "mock/empty"]))
});

if (process.env.NODE_ENV === "production" && missing.length > 0) {
  console.error(`Missing production env: ${missing.join(", ")}`);
  process.exit(1);
}
