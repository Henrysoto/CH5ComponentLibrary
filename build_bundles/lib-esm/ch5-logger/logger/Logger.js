import { AbstractAppender } from "../appender/AbstractAppender";
import { LogMessage } from "../helpers/index";
import isNil from 'lodash/isNil';
import { LogMessagesFilter } from "../helpers/LogMessagesFilter";
import { BehaviorSubject } from 'rxjs';
export class Logger {
    static getInstance(appender, logFilter) {
        if (Logger._instance === undefined) {
            Logger._instance = new Logger(appender, logFilter);
        }
        return Logger._instance;
    }
    disconnect() {
        console.log = this.originalConsole.log;
        console.error = this.originalConsole.error;
        console.info = this.originalConsole.info;
        console.warn = this.originalConsole.warn;
        this.appender.closeSocketConnection();
    }
    constructor(appender, logFilter) {
        this._subscribeDockerStatus = new BehaviorSubject("");
        this._appender = {};
        this._logFilter = new LogMessagesFilter();
        this._messagesQueue = [];
        if (!(appender instanceof AbstractAppender)) {
            throw Error('Appender is not defined');
        }
        this.originalConsole = { log: console.log, error: console.error, info: console.info, warn: console.warn };
        this.appender = appender;
        this.addWindowErrorListener();
        this.log = this.log.bind(this);
        this.info = this.info.bind(this);
        this.warn = this.warn.bind(this);
        this.error = this.error.bind(this);
        if (logFilter) {
            this.logFilter = logFilter;
        }
        this._appender.isInitializedSubject.subscribe((isInitialized) => {
            if (isInitialized) {
                this.checkAndAppendMessages();
            }
        });
    }
    get subscribeDockerStatus() {
        return this._subscribeDockerStatus;
    }
    set subscribeDockerStatus(value) {
        this._subscribeDockerStatus = value;
    }
    set logFilter(logFilter) {
        if (!isNil(logFilter)) {
            this._logFilter = new LogMessagesFilter(logFilter.level, logFilter.source, logFilter.regularExpression);
            return;
        }
        this._logFilter = new LogMessagesFilter();
    }
    get logFilter() {
        return this._logFilter;
    }
    log(...message) {
        const formattedMessage = this.formatMessage(0, message.join(' '));
        this.queueMessage(formattedMessage);
    }
    info(...message) {
        const formattedMessage = this.formatMessage(1, message.join(' '));
        this.queueMessage(formattedMessage);
    }
    warn(message) {
        const formattedMessage = this.formatMessage(2, message);
        this.queueMessage(formattedMessage);
    }
    error(message, line) {
        if (line) {
            message = message + String(line);
        }
        const formattedMessage = this.formatMessage(3, message);
        this.queueMessage(formattedMessage);
    }
    windowErrorListener(error) {
        if (error instanceof ErrorEvent) {
            this.error(error.message, error.lineno);
        }
        else if (error instanceof CustomEvent) {
            this.error(error.detail);
        }
    }
    restoreConsole() {
        console.log = this.originalConsole.log;
        console.error = this.originalConsole.error;
        console.info = this.originalConsole.info;
        console.warn = this.originalConsole.warn;
    }
    addWindowErrorListener() {
        window.addEventListener('error', (error) => {
            this.windowErrorListener(error);
        });
    }
    set appender(appender) {
        if (appender instanceof AbstractAppender) {
            this._appender = appender;
        }
    }
    get appender() {
        return this._appender;
    }
    formatMessage(level, message) {
        const sourceDelimiterIndex = message.indexOf(':');
        const source = sourceDelimiterIndex > -1 ? message.slice(0, sourceDelimiterIndex) : '';
        const extractedMessage = sourceDelimiterIndex > -1 ? message.slice(sourceDelimiterIndex) : message;
        const data = {
            level,
            message: extractedMessage,
            source,
        };
        const logMessage = new LogMessage(data, this.logFilter);
        return logMessage;
    }
    checkAndAppendMessages() {
        while (this._messagesQueue.length > 0) {
            if (!this._appender.isInitialized) {
                return;
            }
            const firstMessage = this._messagesQueue.shift();
            if (firstMessage && this.logFilter.applyFilter(firstMessage)) {
                this.appender.log(firstMessage);
            }
        }
    }
    queueMessage(logMessage) {
        this._messagesQueue.push(logMessage);
        this.checkAndAppendMessages();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWxvZ2dlci9sb2dnZXIvTG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWhFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU5QyxPQUFPLEtBQUssTUFBTSxjQUFjLENBQUM7QUFDakMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxNQUFNLE9BQU8sTUFBTTtJQVFSLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBMEIsRUFBRSxTQUE2QjtRQUMvRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1NBQ3JEO1FBQ0QsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQzVCLENBQUM7SUFFTyxVQUFVO1FBQ2QsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQztRQUN2QyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFDekMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELFlBQW9CLFFBQTBCLEVBQUUsU0FBNkI7UUFyQnJFLDJCQUFzQixHQUE0QixJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMs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