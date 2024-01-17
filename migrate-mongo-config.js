//TODO: Not tested
import dotenv from "dotenv";
dotenv.config();

export const config = {
  mongodb: {
    url: process.env.DATABASE_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    migrationsDir: "seedings/migrations",
    changelogCollectionName: "changelog",
    migrationFileExtension: ".js",
    useFileHash: false,
  },
};
