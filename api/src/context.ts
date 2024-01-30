import { dirname, join } from 'path';
import { Configuration } from './configuration-types';
import { createAppLog } from './share/pino-app-log';
import { readConfigFileSync } from './share/read-configuration';

export const packageDir = dirname(__dirname);

export const appConf = readConfigFileSync<Configuration>({
  typeOnlyBundle: require(join(packageDir, 'dist', 'config.to.json')),
  typeName: 'Configuration',
  defaultFileName: 'config.json',
});

export const appLog = createAppLog(appConf.log);
export const publicSiteUrl = appConf.thisServer.siteUrl;
export const jwtConstants = appConf.jwtConstants;
