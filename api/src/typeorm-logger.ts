import { Logger } from 'typeorm';
import { appLog } from './context';

export class TypeORMLogger implements Logger {
  logQuery(query: string, parameters?: any[] | undefined) {
    appLog.debug('[TYPEORM-LOG]:', { query, parameters });
  }

  logQueryError(error: string | Error) {
    appLog.error('[TYPEORM-LOG]: executing query error', error);
  }

  logQuerySlow() {
    // Nothing to do
  }

  logSchemaBuild() {
    // Nothing to do
  }
  logMigration() {
    // Nothing to do
  }
  log() {
    // Nothing to do
  }
}
