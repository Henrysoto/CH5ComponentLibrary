import { expect } from 'chai';
import { describe } from 'mocha';
import { fail } from "assert";
import { Ch5SignalFactory } from "../ch5-core";
describe('Ch5SignalFactory', () => {
    describe("#init", () => {
        it('boolean signal is false by default', () => {
            const sig = Ch5SignalFactory.getInstance().getBooleanSignal('sig1');
            if (null !== sig) {
                expect(sig.value).to.be.equal(false);
            }
            else {
                fail('null signal');
            }
        });
        it('number signal is 0 by default', () => {
            const sig = Ch5SignalFactory.getInstance().getNumberSignal('sig2');
            if (null !== sig) {
                expect(sig.value).to.be.equal(0);
            }
            else {
                fail('null signal');
            }
        });
        it('string signal is "" by default', () => {
            const sig = Ch5SignalFactory.getInstance().getStringSignal('sig3');
            if (null !== sig) {
                expect(sig.value).to.be.equal('');
            }
            else {
                fail('null signal');
            }
        });
        it('object signal is {} by default', () => {
            const sig = Ch5SignalFactory.getInstance().getObjectSignal('sig4');
            if (null !== sig) {
                expect(sig.value).to.be.an('object').that.is.empty;
            }
            else {
                fail('null signal');
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNpZ25hbC1mYWN0b3J5LnNwZWMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29yZS9jaDUtc2lnbmFsLWZhY3Rvcnkuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDakMsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDN0MsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtJQUU5QixRQUFRLENBQUMsT0FBTyxFQUFDLEdBQUcsRUFBRTtRQUNsQixFQUFFLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxFQUFFO1lBQzFDLE1BQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBFLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBQztnQkFDYixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hDO2lCQUFJO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUN2QjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtZQUNyQyxNQUFNLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFbkUsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFDO2dCQUNiLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEM7aUJBQUk7Z0JBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3ZCO1FBRUwsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxFQUFFO1lBQ3RDLE1BQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVuRSxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUM7Z0JBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNyQztpQkFBSTtnQkFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDdkI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUU7WUFDdEMsTUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRW5FLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBQztnQkFDYixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2FBQ3REO2lCQUFJO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUN2QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9