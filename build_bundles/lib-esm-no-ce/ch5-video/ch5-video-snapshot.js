import _ from "lodash";
import { Ch5ImageUriModel } from "../ch5-image/ch5-image-uri-model";
import { Ch5SignalFactory } from "../ch5-core/index";
export class Ch5VideoSnapshot {
    constructor() {
        this.url = '';
        this.userId = '';
        this.password = '';
        this.refreshRate = 5;
        this.snapshotTimer = null;
        this.videoImage = new Image();
        this.sendEventSnapshotStatus = '';
        this.sendEventSnapshotLastUpdateTime = '';
        this.videoImage.alt = "Video Snapshot";
        this.videoImage.classList.add('hide');
    }
    startLoadingSnapshot() {
        if (this.url.trim() === "" || this.refreshRate === -1) {
            return;
        }
        if (this.canProcessUri() && !this.url.startsWith("ch5-img")) {
            this.processUri();
        }
        if (!!this.snapshotTimer) {
            window.clearInterval(this.snapshotTimer);
            this.snapshotTimer = null;
        }
        this.setSnapshot();
        this.videoImage.classList.remove('hide');
        if (this.refreshRate !== 0) {
            this.snapshotTimer = window.setInterval(() => {
                if (this.snapshotTimer) {
                    this.setSnapshot();
                }
            }, 1000 * this.refreshRate, 0);
        }
    }
    stopLoadingSnapshot() {
        this.videoImage.removeAttribute('src');
        window.clearInterval(this.snapshotTimer);
        this.snapshotTimer = null;
        this.videoImage.classList.add('hide');
    }
    splitUrl() {
        const credentials = this.url.split('@')[0].split('//')[1];
        if (credentials.includes(':') === false) {
            console.warn("Please use valid url format");
            return false;
        }
        const protocol = this.url.split('@')[0].split('//')[0];
        this.userId = credentials.split(':')[0];
        this.password = credentials.split(':')[1];
        this.url = protocol + '//' + this.url.split('@')[1];
        return true;
    }
    canProcessUri() {
        if (_.isEmpty(this.password) || _.isEmpty(this.userId) || _.isEmpty(this.url)) {
            if (this.url.includes('@')) {
                return this.splitUrl();
            }
            return false;
        }
        return true;
    }
    processUri() {
        const { http, https } = { "http": "ch5-img-auth", "https": "ch5-img-auths" };
        const protocols = { http, https };
        const uri = new Ch5ImageUriModel(protocols, this.userId, this.password, this.url);
        if (!uri.isValidAuthenticationUri()) {
            return;
        }
        this.url = uri.toString();
        return;
    }
    setSnapshot() {
        var _a;
        this.videoImage.onerror = () => {
            var _a;
            if (this.sendEventSnapshotStatus !== null && this.sendEventSnapshotStatus !== undefined && this.sendEventSnapshotStatus !== "") {
                (_a = Ch5SignalFactory.getInstance().getNumberSignal(this.sendEventSnapshotStatus)) === null || _a === void 0 ? void 0 : _a.publish(2);
            }
        };
        this.videoImage.onload = (ev) => {
            var _a;
            if (this.sendEventSnapshotStatus !== null && this.sendEventSnapshotStatus !== undefined && this.sendEventSnapshotStatus !== "") {
                (_a = Ch5SignalFactory.getInstance().getNumberSignal(this.sendEventSnapshotStatus)) === null || _a === void 0 ? void 0 : _a.publish(1);
            }
        };
        this.videoImage.src = this.url + '#' + (new Date().toISOString());
        if (this.sendEventSnapshotLastUpdateTime !== null && this.sendEventSnapshotLastUpdateTime !== undefined && this.sendEventSnapshotLastUpdateTime !== "") {
            (_a = Ch5SignalFactory.getInstance().getStringSignal(this.sendEventSnapshotLastUpdateTime)) === null || _a === void 0 ? void 0 : _a.publish(this.videoImage.src);
        }
    }
    getImage() {
        return this.videoImage;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXZpZGVvLXNuYXBzaG90LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LXZpZGVvL2NoNS12aWRlby1zbmFwc2hvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckQsTUFBTSxPQUFPLGdCQUFnQjtJQVc1QjtRQVRPLFFBQUcsR0FBVyxFQUFFLENBQUM7UUFDakIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUNwQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGtCQUFhLEdBQWtCLElBQUksQ0FBQztRQUNwQyxlQUFVLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUMxQiw0QkFBdUIsR0FBVyxFQUFFLENBQUM7UUFDckMsb0NBQStCLEdBQVcsRUFBRSxDQUFDO1FBR25ELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLGdCQUFnQixDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0sb0JBQW9CO1FBQzFCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN0RCxPQUFPO1NBQ1A7UUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzVELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNsQjtRQUNELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxh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