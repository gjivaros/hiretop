export interface Configuration {
  thisServer: ThisServerConf;
  sqliteFiles: SqliteFiles;
  log: LogConf;
  production: boolean;
  jwtConstants: JwtConstants;
}

export interface ThisServerConf {
  port: number;
  hostName: string | null;
  siteUrl: string;
}

export interface SqliteFiles {
  primary: string;
}

export interface LogConf {
  level: 'silent' | 'error' | 'warn' | 'info' | 'debug' | 'trace';
  file?: string;
  prettyPrint?: boolean;
}

export interface JwtConstants {
  secret: string;
  expiresIn: string;
}
