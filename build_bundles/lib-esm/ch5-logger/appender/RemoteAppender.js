import { AbstractAppender } from "./AbstractAppender";
import { RequestService } from "../services/index";
import { LogEndpointsEnum } from "../enums/index";
import { LogMessagesFilter } from "../helpers/index";
export class RemoteAppender extends AbstractAppender {
    static getInstance(sendLogTimeOffsetInMilliseconds, appenderConfig) {
        if (RemoteAppender._instance === undefined) {
            RemoteAppender._instance = new RemoteAppender(sendLogTimeOffsetInMilliseconds, appenderConfig);
        }
        return RemoteAppender._instance;
    }
    closeSocketConnection() {
        if (this.webSocket && this.webSocket.readyState && this.webSocket.readyState === 1) {
            this.webSocket.close();
        }
    }
    constructor(sendLogTimeOffsetInMilliseconds, appenderConfig) {
        super(sendLogTimeOffsetInMilliseconds);
        this.webSocket = {};
        this._requestService = {};
        this._address = '';
        if (appenderConfig.hostname && appenderConfig.port) {
            this.setIP(appenderConfig);
        }
    }
    log(data) {
        this.sendLogTimeOffset.subscribe(() => {
            this._requestService.post(LogEndpointsEnum.log, data);
        });
    }
    resetIP(hostname, port, secure = false) {
        const appenderConfig = { hostname, port, secure };
        this.setIP(appenderConfig);
    }
    setIP(appenderConfig) {
        if (appenderConfig.hostname === "" || appenderConfig.port === "") {
            return;
        }
        const protocol = appenderConfig.secure ? 'https' : 'http';
        const uri = `${protocol}://${appenderConfig.hostname}:${appenderConfig.port}`;
        this._address = `${appenderConfig.hostname}:${appenderConfig.port}`;
        this.initializeRequest(uri);
    }
    configObserver(helper, hasFilterConfig) {
        helper.subscribeDockerStatus.next("DOCKER_CONNECTING");
        if (!hasFilterConfig) {
            const responsePromise = this._requestService.get('configuration');
            if (responsePromise && responsePromise instanceof Promise) {
                responsePromise.then(response => {
                    const filter = response.data;
                    helper.logFilter = new LogMessagesFilter(filter.level, filter.source, filter.regularExpression);
                    this.isInitialized = true;
                    this.isInitializedSubject.next(this.isInitialized);
                    helper.subscribeDockerStatus.next("DOCKER_CONNECTED");
                });
            }
        }
        this.webSocket = new WebSocket(`ws://${this._address}`);
        this.webSocket.onopen = () => {
            this.webSocket.onmessage = (message) => {
                const data = JSON.parse(message.data);
                const filterObject = data.filter;
                helper.logFilter = new LogMessagesFilter(filterObject.level, filterObject.source, filterObject.regularExpression);
                helper.subscribeDockerStatus.next("DOCKER_CONNECTED");
            };
        };
        this.webSocket.onclose = (evt) => {
            let msg = "";
            if (evt.code === 3001 || evt.code === 1000) {
                msg = "DOCKER_DISCONNECTED";
                this.webSocket = {};
                helper.logFilter = new LogMessagesFilter();
                this.isInitialized = false;
                this.isInitializedSubject.next(this.isInitialized);
                helper.subscribeDockerStatus.next(msg);
            }
        };
        this.webSocket.onerror = (error) => {
            helper.subscribeDockerStatus.next("DOCKER_ERROR");
        };
    }
    initializeRequest(uri) {
        this._requestService = new RequestService(uri);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVtb3RlQXBwZW5kZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtbG9nZ2VyL2FwcGVuZGVyL1JlbW90ZUFwcGVuZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRCxPQUFPLEVBQWMsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUlqRSxNQUFNLE9BQU8sY0FBZSxTQUFRLGdCQUFnQjtJQU0zQyxNQUFNLENBQUMsV0FBVyxDQUFDLCtCQUF1QyxFQUFFLGNBQStCO1FBQ2hHLElBQUksY0FBYyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDMUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxJQUFJLGNBQWMsQ0FBQywrQkFBK0IsRUFBRSxjQUFjLENBQUMsQ0FBQztTQUNoRztRQUNELE9BQU8sY0FBYyxDQUFDLFNBQVMsQ0FBQztJQUNsQyxDQUFDO0lBS00scUJBQXFCO1FBQzFCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUU7WUFDbEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFRCxZQUFvQiwrQkFBdUMsRUFBRSxjQUErQjtRQUMxRixLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQXJCakMsY0FBUyxHQUFHLEVBQWUsQ0FBQztRQUM1QixvQkFBZSxHQUFtQixFQUFvQixDQUFDO1FBQ3ZELGFBQVEsR0FBVyxFQUFFLENBQUM7UUFvQjVCLElBQUksY0FBYyxDQUFDLFFBQVEsSUFBSSxjQUFjLENB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