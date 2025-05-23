import { expect } from 'chai';
import * as fs from 'fs-extra';
import { describe } from 'mocha';
import { fail } from "assert";
import { Ch5Emulator } from './index';
import { Ch5SignalFactory } from "../ch5-core";
import * as delayFunction from "./mocha.async.delay";
describe('Ch5Emulator#scenario 006', () => {
    describe('scenario006#cue(type=boolean,trigger=change)->action(b:link,set,toggle,pulse;n:link,set,increment,decrement,rcb;s:set:link)', () => {
        const emScenario = JSON.parse(fs.readFileSync(__dirname + '/../../../src/ch5-emulator/emulator.spec.testdata.scenario006.json', 'utf8'));
        const em = Ch5Emulator.getInstance();
        const sf = Ch5SignalFactory.getInstance();
        const sigCue = sf.getBooleanSignal('s006_c1');
        const sigAction1 = sf.getBooleanSignal('s006_a1_b_set');
        const sigAction2 = sf.getBooleanSignal('s006_a2_b_link');
        const sigAction3 = sf.getBooleanSignal('s006_a3_b_toggle');
        const sigAction4 = sf.getBooleanSignal('s006_a4_b_pulse');
        const sigAction5 = sf.getNumberSignal('s006_a5_n_set');
        const sigAction6 = sf.getNumberSignal('s006_a6_n_link');
        const sigAction7 = sf.getNumberSignal('s006_a7_n_increment');
        const sigAction8 = sf.getNumberSignal('s006_a8_n_increment_offset');
        const sigAction9 = sf.getNumberSignal('s006_a9_n_decrement');
        const sigAction10 = sf.getNumberSignal('s006_a10_n_decrement_offset');
        const sigAction11 = sf.getNumberSignal('s006_a11_n_rcb');
        const sigAction12 = sf.getStringSignal('s006_a12_s_set');
        const sigAction13 = sf.getStringSignal('s006_a13_s_link');
        it('preload checks', () => {
            if (null !== sigAction1) {
                expect(sigAction1.value, 's006_a1_b_set is false before the scenario loads').to.be.equal(false);
            }
            else {
                fail('signal: s006_a1_b_set not found');
                return;
            }
            if (null !== sigAction2) {
                expect(sigAction2.value, 's006_a2_b_link is false before the scenario loads').to.be.equal(false);
            }
            else {
                fail('signal: s006_a2_b_link not found');
                return;
            }
            if (null !== sigAction3) {
                expect(sigAction3.value, 's006_a3_b_toggle is false before the scenario loads').to.be.equal(false);
            }
            else {
                fail('signal: s006_a3_b_toggle not found');
                return;
            }
            if (null !== sigAction4) {
                expect(sigAction4.value, 's006_a4_b_pulse is false before the scenario loads').to.be.equal(false);
            }
            else {
                fail('signal: s006_a4_b_pulse not found');
                return;
            }
            if (null !== sigAction5) {
                expect(sigAction5.value, 's006_a5_n_set is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s006_a5_n_set not found');
                return;
            }
            if (null !== sigAction6) {
                expect(sigAction6.value, 's006_a6_n_link is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s006_a6_n_link not found');
                return;
            }
            if (null !== sigAction7) {
                expect(sigAction7.value, 's006_a7_n_increment is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s006_a7_n_increment not found');
                return;
            }
            if (null !== sigAction8) {
                expect(sigAction8.value, 's006_a8_n_increment_offset is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s006_a8_n_increment_offset not found');
                return;
            }
            if (null !== sigAction9) {
                expect(sigAction9.value, 's006_a9_n_decrement is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s006_a9_n_decrement not found');
                return;
            }
            if (null !== sigAction10) {
                expect(sigAction10.value, 's006_a10_n_decrement_offset is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s006_a10_n_decrement_offset not found');
                return;
            }
            if (null !== sigAction11) {
                expect(sigAction11.value, 's006_a11_n_rcb is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s006_a11_n_rcb not found');
                return;
            }
            if (null !== sigAction12) {
                expect(sigAction12.value, 's006_a12_s_set is  ""').to.be.equal('');
            }
            else {
                fail('signal: s006_a12_s_set not found');
                return;
            }
            if (null !== sigAction13) {
                expect(sigAction13.value, 's006_a13_s_link is  ""').to.be.equal('');
            }
            else {
                fail('signal: s006_a13_s_link not found');
                return;
            }
        });
        it('scenario load, signal cue change', () => {
            em.loadScenario(emScenario);
            if (null !== sigCue) {
                expect(sigCue.value, 's006_c1 is false after loading the scenario').to.be.equal(false);
            }
            else {
                fail('signal: s006_c1 not found');
                return;
            }
            sigCue.publish(true);
        });
        it('s006_c1 is changed to true', () => {
            if (null !== sigCue) {
                expect(sigCue.value, 's006_c1').to.be.equal(true);
            }
        });
        it('s006_a1_b_set check', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction1) {
                    expect(sigAction1.value, 's006_a1_b_set').to.be.equal(true);
                }
            });
        });
        it('s006_a2_b_link check', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction2) {
                    expect(sigAction2.value, 's006_a2_b_link').to.be.equal(true);
                }
            });
        });
        it('s006_a3_b_toggle check', () => {
            if (null !== sigAction3) {
                expect(sigAction3.value, 's006_a3_b_toggle').to.be.equal(true);
            }
        });
        it('s006_a4_b_pulse check', () => {
            if (null !== sigAction4) {
                expect(sigAction4.value, 's006_a4_b_pulse').to.be.equal(false);
            }
        });
        it('s006_a5_n_set check', () => {
            if (null !== sigAction5) {
                expect(sigAction5.value, 's006_a5_n_set').to.be.equal(5);
            }
        });
        it('s006_a6_n_link check', () => {
            if (null !== sigAction6) {
                expect(sigAction6.value, 's006_a6_n_link').to.be.equal(0);
            }
        });
        it('s006_a7_n_increment check', () => {
            if (null !== sigAction7) {
                expect(sigAction7.value, 's006_a7_n_increment').to.be.equal(1);
            }
        });
        it('s006_a8_n_increment_offset check', () => {
            if (null !== sigAction8) {
                expect(sigAction8.value, 's006_a8_n_increment_offset').to.be.equal(10);
            }
        });
        it('s006_a9_n_decrement check', () => {
            if (null !== sigAction9) {
                expect(sigAction9.value, 's006_a9_n_decrement').to.be.equal(-1);
            }
        });
        it('s006_a10_n_decrement_offset check', () => {
            if (null !== sigAction10) {
                expect(sigAction10.value, 's006_a10_n_decrement_offset').to.be.equal(-11);
            }
        });
        it('s006_a11_n_rcb check after timeout', () => {
            if (null !== sigAction11) {
                setTimeout(() => {
                    expect(sigAction11.value, 's006_a11_n_rcb').to.be.equal(1234);
                }, 110);
            }
        });
        it('s006_a12_s_set check', () => {
            if (null !== sigAction12) {
                expect(sigAction12.value, 's006_a12_s_set').to.be.equal('Hello!');
            }
        });
        it('s006_a13_s_link check', () => {
            if (null !== sigAction13) {
                expect(sigAction13.value, 's006_a13_s_link').to.be.equal('true');
            }
        });
        it('cue changes again to false', () => {
            if (null !== sigCue) {
                sigCue.publish(false);
                expect(sigCue.value, 's006_c1 is changed to false').to.be.equal(false);
            }
        });
        it('s006_a3_b_toggle recheck', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction3) {
                    expect(sigAction3.value, 's006_a3_b_toggle').to.be.equal(false);
                }
            });
        });
        it('s006_a4_b_pulse recheck', () => {
            if (null !== sigAction4) {
                expect(sigAction4.value, 's006_a4_b_pulse').to.be.equal(false);
            }
        });
        it('s006_a7_n_increment recheck', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction7) {
                    expect(sigAction7.value, 's006_a7_n_increment').to.be.equal(2);
                }
            });
        });
        it('s006_a8_n_increment_offset recheck', () => {
            if (null !== sigAction8) {
                expect(sigAction8.value, 's006_a8_n_increment_offset').to.be.equal(20);
            }
        });
        it('s006_a9_n_decrement recheck', () => {
            if (null !== sigAction9) {
                expect(sigAction9.value, 's006_a9_n_decrement').to.be.equal(-2);
            }
        });
        it('s006_a10_n_decrement_offset recheck', () => {
            if (null !== sigAction10) {
                expect(sigAction10.value, 's006_a10_n_decrement_offset').to.be.equal(-22);
            }
        });
        it('cue changes again to true', () => {
            if (null !== sigCue) {
                sigCue.publish(true);
                expect(sigCue.value, 's006_c1 is changed to true').to.be.equal(true);
            }
        });
        it('s006_a3_b_toggle check 3', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction3) {
                    expect(sigAction3.value, 's006_a3_b_toggle').to.be.equal(true);
                }
            });
        });
        it('s006_a4_b_pulse check 3', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction4) {
                    expect(sigAction4.value, 's006_a4_b_pulse').to.be.equal(false);
                }
            });
        });
        it('s006_a7_n_increment check 3', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction7) {
                    expect(sigAction7.value, 's006_a7_n_increment').to.be.equal(3);
                }
            });
        });
        it('s006_a8_n_increment_offset check 3', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction8) {
                    expect(sigAction8.value, 's006_a8_n_increment_offset').to.be.equal(30);
                }
            });
        });
        it('s006_a9_n_decrement check 3', () => {
            if (null !== sigAction9) {
                expect(sigAction9.value, 's006_a9_n_decrement').to.be.equal(-3);
            }
        });
        it('s006_a10_n_decrement_offset check 3', () => {
            if (null !== sigAction10) {
                expect(sigAction10.value, 's006_a10_n_decrement_offset').to.be.equal(-33);
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWVtdWxhdG9yLnMwMDYuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1lbXVsYXRvci9jaDUtZW11bGF0b3IuczAwNi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUIsT0FBTyxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDL0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNqQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRTlCLE9BQU8sRUFBQyxXQUFXLEVBQW9CLE1BQU0sU0FBUyxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUM3QyxPQUFPLEtBQUssYUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBR3JELFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7SUFHbEMsUUFBUSxDQUFDLDZIQUE2SCxFQUFFLEdBQUcsRUFBRTtRQUN6SSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLG9FQUFvRSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEksTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sRUFBRSxHQUFHLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU5QyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDeEQsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDM0QsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFMUQsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2RCxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDeEQsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzdELE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUNwRSxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDN0QsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUV6RCxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTFELEVBQUUsQ0FBQyxnQkFBZ0IsRUFBQyxHQUFHLEVBQUU7WUFDckIsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFO2dCQUNyQixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBQyxrREFBa0QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xHO2lCQUFNO2dCQUNILElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2dCQUN4QyxPQUFPO2FBQ1Y7WUFDRCxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUU7Z0JBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFDLG1EQUFtRCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkc7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7Z0JBQ3pDLE9BQU87YUFDVjtZQUNELElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRTtnQkFDckIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUMscURBQXFELENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyRztpQkFBTTtnQkFDSCxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQztnQkFDM0MsT0FBTzthQUNWO1lBQ0QsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFO2dCQUNyQixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBQyxvREFBb0QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BHO2lCQUFNO2dCQUNILElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO2dCQUMxQyxPQUFPO2FBQ1Y7WUFHRCxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUU7Z0JBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFDLDhDQUE4QyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUY7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7Z0JBQ3hDLE9BQU87YUFDVjtZQUNELElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRTtnQkFDckIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUMsK0NBQStDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzRjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQztnQkFDekMsT0FBTzthQUNWO1lBQ0QsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFO2dCQUNyQixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBQyxvREFBb0QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hHO2lCQUFNO2dCQUNILElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO2dCQUM5QyxPQUFPO2FBQ1Y7WUFDRCxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUU7Z0JBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFDLDJEQUEyRCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkc7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLDhDQUE4QyxDQUFDLENBQUM7Z0JBQ3JELE9BQU87YUFDVjtZQUNELElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRTtnQkFDckIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUMsb0RBQW9ELENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoRztpQkFBTTtnQkFDSCxJQUFJLENBQUMsdUNBQXVDLENBQUMsQ0FBQztnQkFDOUMsT0FBTzthQUNWO1lBQ0QsSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFO2dCQUN0QixNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBQyw0REFBNEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3pHO2lCQUFNO2dCQUNILElBQUksQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO2dCQUN0RCxPQUFPO2FBQ1Y7WUFDRCxJQUFJLElBQUksS0FBSyxXQUFXLEVBQUU7Z0JBQ3RCLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFDLCtDQUErQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUY7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7Z0JBQ3pDLE9BQU87YUFDVjtZQUlELElBQUksSUFBSSxLQUFLLFdBQVcsRUFBRTtnQkFDdEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUMsdUJBQXVCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNyRTtpQkFBTTtnQkFDSCxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQztnQkFDekMsT0FBTzthQUNWO1lBQ0QsSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFO2dCQUN0QixNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBQyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3RFO2lCQUFNO2dCQUNILElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO2dCQUMxQyxPQUFPO2FBQ1Y7UUFFTCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxrQ0FBa0MsRUFBQyxHQUFHLEVBQUU7WUFDdkMsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU1QixJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7Z0JBQ2pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLDZDQUE2QyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekY7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQ2xDLE9BQU87YUFDVjtZQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsNEJBQTRCLEVBQUMsR0FBRyxFQUFFO1lBQ2pDLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDakIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEQ7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQy9CLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUN4QyxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUU7b0JBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMvRDtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNoQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDeEMsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFO29CQUNyQixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNoRTtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsd0JBQXdCLEVBQUMsR0FBRyxFQUFFO1lBQzdCLElBQUksSUFBSSxLQUFLLFVBQVUsRUFBQztnQkFDcEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqRTtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHVCQUF1QixFQUFDLEdBQUcsRUFBRTtZQUM1QixJQUFJLElBQUksS0FBSyxVQUFVLEVBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDakU7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxxQkFBcUIsRUFBQyxHQUFHLEVBQUU7WUFDMUIsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFDO2dCQUNwQixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzRDtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHNCQUFzQixFQUFDLEdBQUcsRUFBRTtZQUMzQixJQUFJLElBQUksS0FBSyxVQUFVLEVBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUQ7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywyQkFBMkIsRUFBQyxHQUFHLEVBQUU7WUFDaEMsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFO2dCQUNyQixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pFO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsa0NBQWtDLEVBQUMsR0FBRyxFQUFFO1lBQ3ZDLElBQUksSUFBSSxLQUFLLFVBQVUsRUFBQztnQkFDcEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUMsNEJBQTRCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN6RTtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDJCQUEyQixFQUFDLEdBQUcsRUFBRTtZQUNoQyxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFDLHFCQUFxQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsRTtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG1DQUFtQyxFQUFDLEdBQUcsRUFBRTtZQUN4QyxJQUFJLElBQUksS0FBSyxXQUFXLEVBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFDLDZCQUE2QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM1RTtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBTUgsRUFBRSxDQUFDLG9DQUFvQyxFQUFDLEdBQUcsRUFBRTtZQUN6QyxJQUFJLElBQUksS0FBSyxXQUFXLEVBQUM7Z0JBQ3JCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1osTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakUsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ1Y7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxzQkFBc0IsRUFBQyxHQUFHLEVBQUU7WUFDM0IsSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFDO2dCQUNyQixNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3BFO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsdUJBQXVCLEVBQUMsR0FBRyxFQUFFO1lBQzVCLElBQUksSUFBSSxLQUFLLFdBQVcsRUFBQztnQkFDckIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNuRTtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDRCQUE0QixFQUFDLEdBQUcsRUFBRTtZQUNqQyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7Z0JBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLDZCQUE2QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekU7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3BDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUN4QyxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUU7b0JBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ25FO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx5QkFBeUIsRUFBQyxHQUFHLEVBQUU7WUFDOUIsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFDO2dCQUNwQixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pFO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsNkJBQTZCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN2QyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDeEMsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFO29CQUNyQixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsRTtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsb0NBQW9DLEVBQUMsR0FBRyxFQUFFO1lBQ3pDLElBQUksSUFBSSxLQUFLLFVBQVUsRUFBQztnQkFDcEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUMsNEJBQTRCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN6RTtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDZCQUE2QixFQUFDLEdBQUcsRUFBRTtZQUNsQyxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFDLHFCQUFxQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsRTtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHFDQUFxQyxFQUFDLEdBQUcsRUFBRTtZQUMxQyxJQUFJLElBQUksS0FBSyxXQUFXLEVBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFDLDZCQUE2QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM1RTtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDJCQUEyQixFQUFDLEdBQUcsRUFBRTtZQUNoQyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7Z0JBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLDRCQUE0QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkU7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3BDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUN4QyxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUU7b0JBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2xFO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ25DLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUN4QyxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUU7b0JBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2xFO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3ZDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUN4QyxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUU7b0JBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLHFCQUFxQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2xFO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzlDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUN4QyxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUU7b0JBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLDRCQUE0QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQzFFO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw2QkFBNkIsRUFBQyxHQUFHLEVBQUU7WUFDbEMsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFDO2dCQUNwQixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEU7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxxQ0FBcUMsRUFBQyxHQUFHLEVBQUU7WUFDMUMsSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFDO2dCQUNyQixNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBQyw2QkFBNkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDNUU7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUMsQ0FBQyxDQUFDO0FBRVgsQ0FBQyxDQUFDLENBQUMifQ==