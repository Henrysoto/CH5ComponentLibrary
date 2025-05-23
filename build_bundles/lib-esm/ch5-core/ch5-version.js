import { Ch5SignalFactory } from "./ch5-signal-factory";
import isUndefined from 'lodash/isUndefined';
export const version = !!process.env.BUILD_VERSION ? process.env.BUILD_VERSION : 'VERSION_NOT_SET';
export const buildDate = !!process.env.BUILD_DATE ? process.env.BUILD_DATE : 'BUILD_DATE_INVALID';
export const signalNameForLibraryVersion = 'Csig.library.ver';
export const signalNameForLibraryBuildDate = 'Csig.library.date';
class Ch5Version {
    static init() {
        Ch5Version.displayVersionMessage();
        Ch5Version.initVersionSignals();
    }
    static displayVersionMessage() {
        const message = `Crestron Component Library version ${version} build date ${buildDate}`;
        console.log(message);
    }
    static initVersionSignals() {
        const sigFactory = Ch5SignalFactory.getInstance();
        const sigVer = sigFactory.getStringSignal(signalNameForLibraryVersion);
        const sigBuildDate = sigFactory.getStringSignal(signalNameForLibraryBuildDate);
        if (null !== sigVer && !isUndefined(version)) {
            sigVer.publish(version);
        }
        else {
            console.log('Error: unable to create signal containing library version');
        }
        if (null !== sigBuildDate && !isUndefined(buildDate)) {
            sigBuildDate.publish(buildDate);
        }
        else {
            console.log('Error: unable to create signal containing library build date');
        }
    }
}
Ch5Version.init();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXZlcnNpb24uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29yZS9jaDUtdmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLFdBQVcsTUFBTSxvQkFBb0IsQ0FBQztBQUU3QyxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7QUFDbkcsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0FBRWxHLE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFXLGtCQUFrQixDQUFDO0FBQ3RFLE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFXLG1CQUFtQixDQUFDO0FBRXpFLE1BQU0sVUFBVTtJQUVSLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ25DLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFBO0lBQ2hDLENBQUM7SUFFTSxNQUFNLENBQUMscUJBQXFCO1FBQ2xDLE1BQU0sT0FBTyxHQUFHLHNDQUFzQyxPQUFPLGVBQWUsU0FBUyxFQUFFLENBQUM7UUFDeEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRU0sTUFBTSxDQUFDLGtCQUFrQjtRQUMvQixNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsRCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDdkUsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBRS9FLElBQUksSUFBSSxLQUFLLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3QyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hCO2FBQU07WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7U0FDekU7UUFFRCxJQUFJLElBQUksS0FBSyxZQUFZLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDckQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1NBQzVFO0lBQ0YsQ0FBQztDQUVEO0FBRUQsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDIn0=