export enum StripeWebhookEventType {
  SUCCEEDED = "payment_intent.succeeded",
  FAILED = "payment_intent.payment_failed",
  CACNELED = "payment_intent.canceled",
}
