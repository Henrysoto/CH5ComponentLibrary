import { AppendersEnum } from '../enums/index';
import { RemoteAppender } from './RemoteAppender';
export class AppenderFactory {
    getAppender(appender, sendLogTimeOffset = 0, appenderConfig) {
        if (appender === AppendersEnum.remote) {
            return RemoteAppender.getInstance(sendLogTimeOffset, appenderConfig);
        }
        throw new Error('Appender type is invalid');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwZW5kZXJGYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWxvZ2dlci9hcHBlbmRlci9BcHBlbmRlckZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUdsRCxNQUFNLE9BQU8sZUFBZTtJQUVqQixXQUFXLENBQUMsUUFBdUIsRUFBRSxvQkFBNEIsQ0FBQyxFQUFFLGNBQStCO1FBRXRHLElBQUksUUFBUSxLQUFLLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDbkMsT0FBTyxjQUFjLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQ3hFO1FBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FDSiJ9