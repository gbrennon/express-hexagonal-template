import { DataSourceOptions } from "typeorm";
import { join } from "path";
import { globSync } from "glob";

export function getTypeOrmConfig(
  isTestEnvironment: boolean
): DataSourceOptions {
  const schemaFiles = globSync(
    join(__dirname, "../../schemas/**/index.ts")
  );

  const schemas = schemaFiles
    .map((file) => {
      const schemaModule = require(file);

      return schemaModule.default
    })
    .filter((schema) => schema);

  if (isTestEnvironment) {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      dropSchema: true,
      entities: schemas,
    };
  }

  return {
    type: "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT || "5432", 10),
    username: process.env.DATABASE_USERNAME || "postgres",
    password: process.env.DATABASE_PASSWORD || "password",
    database: process.env.DATABASE_NAME || "hexagonal_database",
    synchronize: true,
    logging: true,
    entities: schemas,
  };
}

