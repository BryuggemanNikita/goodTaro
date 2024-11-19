import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.json()),
    transports: [
        // new transports.Console({ level: 'info' }),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/swarn.log', level: 'warn' }),
        new transports.File({ filename: 'logs/debug.log', level: 'debug' }),
        new transports.File({ filename: 'logs/combined.log' })
    ]
});
