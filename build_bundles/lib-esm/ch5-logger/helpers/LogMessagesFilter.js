import { LogLevelEnum } from '../enums';
import isNil from 'lodash/isNil';
import { Ch5Debug } from '../../ch5-core/ch5-debug';
export class LogMessagesFilter {
    static getDefaultLevel() {
        const defaultLevel = Ch5Debug.getConfigKeyValue(Ch5Debug.DEBUG_MESSAGE_FILTER_LEVEL_KEY);
        return defaultLevel ? defaultLevel : LogLevelEnum.warning;
    }
    constructor(level, source, regexStr) {
        this._regularExpression = '';
        this.source = Ch5Debug.getConfigKeyValue(Ch5Debug.DEBUG_MESSAGE_FILTER_SOURCE_KEY);
        this.level = !isNil(level) ? level : LogMessagesFilter.getDefaultLevel();
        this.regularExpression = regexStr ? regexStr : this._regularExpression;
        this.source = source ? source : this.source;
    }
    get regularExpression() {
        return this._regularExpression;
    }
    set regularExpression(value) {
        if (isNil(value)) {
            this._regularExpression = '';
            return;
        }
        if (value.charAt(0) === '/' && value.charAt(value.length - 1) === '/') {
            const lastSlashPos = value.lastIndexOf('/');
            this._regularExpression = value.substr(1).substring(0, lastSlashPos - 1);
            return;
        }
        this._regularExpression = value;
    }
    undateSourceFromConfig() {
        this.source = Ch5Debug.getConfigKeyValue(Ch5Debug.DEBUG_MESSAGE_FILTER_SOURCE_KEY);
    }
    clearFilter() {
        this.level = LogMessagesFilter.getDefaultLevel();
        this.regularExpression = '';
        this.source = '';
    }
    applyFilter(data) {
        const logLevelMatched = this.isMatchingFilterLevel(data.level);
        const logRegexMatched = this.isMatchingFilterRegex(data.message);
        const logSourceMatched = this.isMatchingFilterSource(data.source);
        const isFilterMatched = logLevelMatched && logRegexMatched && logSourceMatched;
        return isFilterMatched;
    }
    isMatchingFilterLevel(dataLevel) {
        const isMinimumLogLevel = dataLevel >= this.level;
        return isMinimumLogLevel;
    }
    isMatchingFilterRegex(message) {
        if (!this.regularExpression) {
            return true;
        }
        const regExp = new RegExp(this.regularExpression, "i");
        return !!regExp.test(message);
    }
    isMatchingFilterSource(dataSource) {
        if (!this.source) {
            return true;
        }
        return !isNil(dataSource) && dataSource.indexOf(this.source) > -1;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nTWVzc2FnZXNGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtbG9nZ2VyL2hlbHBlcnMvTG9nTWVzc2FnZXNGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN4QyxPQUFPLEtBQUssTUFBTSxjQUFjLENBQUM7QUFDakMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBS2xELE1BQU0sT0FBTyxpQkFBaUI7SUFXbkIsTUFBTSxDQUFDLGVBQWU7UUFDekIsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQ3pGLE9BQU8sWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUE0QixDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO0lBQzlFLENBQUM7SUFFRCxZQUFZLEtBQW9CLEVBQUUsTUFBZSxFQUFFLFFBQWlCO1FBZDVELHVCQUFrQixHQUFXLEVBQUUsQ0FBQztRQUdqQyxXQUFNLEdBQVcsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQywrQkFBK0IsQ0FBVyxDQUFDO1FBWW5HLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDdkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNoRCxDQUFDO0lBRUQsSUFBVyxpQkFBaUI7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