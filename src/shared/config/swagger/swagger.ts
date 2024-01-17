import { INestApplication } from "@nestjs/common";
import { OpenAPIObject, DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function createDocument(app: INestApplication): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setTitle("Fresh-API")
    .setDescription(
      "This is an example of how the APIs of an e-commerce app work but its still in development",
    )
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "Authorization",
    );
  // .addApiKey(
  //   { type: "apiKey", name: "x-api-key", in: "header" },
  //   "x-api-key",
  // );
  const options = builder.build();
  return SwaggerModule.createDocument(app, options);
}
