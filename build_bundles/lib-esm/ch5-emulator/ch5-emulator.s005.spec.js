import { expect } from 'chai';
import * as fs from 'fs-extra';
import { describe } from 'mocha';
import { fail } from "assert";
import { Ch5Emulator } from './index';
import { Ch5SignalFactory } from "../ch5-core";
import * as delayFunction from "./mocha.async.delay";
describe('Ch5Emulator#scenario 005 single-string-signal-cue with specific trigger value and multiple actions', () => {
    describe('scenario005#cue(type=number,trigger=120)->action(b:link,set,toggle,pulse;n:link,set,increment,decrement,rcb;s:set:link)', () => {
        const emScenario = JSON.parse(fs.readFileSync(__dirname + '/../../../src/ch5-emulator/emulator.spec.testdata.scenario005.json', 'utf8'));
        const em = Ch5Emulator.getInstance();
        const sf = Ch5SignalFactory.getInstance();
        const sigCue = sf.getStringSignal('s005_c1');
        const sigAction1 = sf.getBooleanSignal('s005_a1_b_set');
        const sigAction2 = sf.getBooleanSignal('s005_a2_b_link');
        const sigAction3 = sf.getBooleanSignal('s005_a3_b_toggle');
        const sigAction4 = sf.getBooleanSignal('s005_a4_b_pulse');
        const sigAction5 = sf.getNumberSignal('s005_a5_n_set');
        const sigAction6 = sf.getNumberSignal('s005_a6_n_link');
        const sigAction7 = sf.getNumberSignal('s005_a7_n_increment');
        const sigAction8 = sf.getNumberSignal('s005_a8_n_increment_offset');
        const sigAction9 = sf.getNumberSignal('s005_a9_n_decrement');
        const sigAction10 = sf.getNumberSignal('s005_a10_n_decrement_offset');
        const sigAction11 = sf.getNumberSignal('s005_a11_n_rcb');
        const sigAction12 = sf.getStringSignal('s005_a12_s_set');
        const sigAction13 = sf.getStringSignal('s005_a13_s_link');
        it('preload checks', () => {
            if (null !== sigAction1) {
                expect(sigAction1.value, 's005_a1_b_set is false before the scenario loads').to.be.equal(false);
            }
            else {
                fail('signal: s005_a1_b_set not found');
                return;
            }
            if (null !== sigAction2) {
                expect(sigAction2.value, 's005_a2_b_link is false before the scenario loads').to.be.equal(false);
            }
            else {
                fail('signal: s005_a2_b_link not found');
                return;
            }
            if (null !== sigAction3) {
                expect(sigAction3.value, 's005_a3_b_toggle is false before the scenario loads').to.be.equal(false);
            }
            else {
                fail('signal: s005_a3_b_toggle not found');
                return;
            }
            if (null !== sigAction4) {
                expect(sigAction4.value, 's005_a4_b_pulse is false before the scenario loads').to.be.equal(false);
            }
            else {
                fail('signal: s005_a4_b_pulse not found');
                return;
            }
            if (null !== sigAction5) {
                expect(sigAction5.value, 's005_a5_n_set is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s005_a5_n_set not found');
                return;
            }
            if (null !== sigAction6) {
                expect(sigAction6.value, 's005_a6_n_link is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s005_a6_n_link not found');
                return;
            }
            if (null !== sigAction7) {
                expect(sigAction7.value, 's005_a7_n_increment is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s005_a7_n_increment not found');
                return;
            }
            if (null !== sigAction8) {
                expect(sigAction8.value, 's005_a8_n_increment_offset is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s005_a8_n_increment_offset not found');
                return;
            }
            if (null !== sigAction9) {
                expect(sigAction9.value, 's005_a9_n_decrement is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s005_a9_n_decrement not found');
                return;
            }
            if (null !== sigAction10) {
                expect(sigAction10.value, 's005_a10_n_decrement_offset is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s005_a10_n_decrement_offset not found');
                return;
            }
            if (null !== sigAction11) {
                expect(sigAction11.value, 's005_a11_n_rcb is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s005_a11_n_rcb not found');
                return;
            }
            if (null !== sigAction12) {
                expect(sigAction12.value, 's005_a12_s_set is  ""').to.be.equal('');
            }
            else {
                fail('signal: s005_a12_s_set not found');
                return;
            }
            if (null !== sigAction13) {
                expect(sigAction13.value, 's005_a13_s_link is  ""').to.be.equal('');
            }
            else {
                fail('signal: s005_a13_s_link not found');
                return;
            }
        });
        it('scenario load, signal cue change', () => {
            em.loadScenario(emScenario);
            if (null !== sigCue) {
                expect(sigCue.value, 's005_c1 is "" after loading the scenario').to.be.equal('');
            }
            else {
                fail('signal: s005_c1 not found');
                return;
            }
            sigCue.publish('up');
        });
        it('s005_c1 is changed to "up"', () => {
            if (null !== sigCue) {
                expect(sigCue.value, 's005_c1').to.be.equal('up');
            }
        });
        it('s005_a1_b_set check', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction1) {
                    expect(sigAction1.value, 's005_a1_b_set').to.be.equal(true);
                }
            });
        });
        it('s005_a2_b_link check', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction2) {
                    expect(sigAction2.value, 's005_a2_b_link').to.be.equal(true);
                }
            });
        });
        it('s005_a3_b_toggle check', () => {
            if (null !== sigAction3) {
                expect(sigAction3.value, 's005_a3_b_toggle').to.be.equal(true);
            }
        });
        it('s005_a4_b_pulse check', () => {
            if (null !== sigAction4) {
                expect(sigAction4.value, 's005_a4_b_pulse').to.be.equal(false);
            }
        });
        it('s005_a5_n_set check', () => {
            if (null !== sigAction5) {
                expect(sigAction5.value, 's005_a5_n_set').to.be.equal(5);
            }
        });
        it('s005_a6_n_link check', () => {
            if (null !== sigAction6) {
                expect(sigAction6.value, 's005_a6_n_link').to.be.equal(0);
            }
        });
        it('s005_a7_n_increment check', () => {
            if (null !== sigAction7) {
                expect(sigAction7.value, 's005_a7_n_increment').to.be.equal(1);
            }
        });
        it('s005_a8_n_increment_offset check', () => {
            if (null !== sigAction8) {
                expect(sigAction8.value, 's005_a8_n_increment_offset').to.be.equal(10);
            }
        });
        it('s005_a9_n_decrement check', () => {
            if (null !== sigAction9) {
                expect(sigAction9.value, 's005_a9_n_decrement').to.be.equal(-1);
            }
        });
        it('s005_a10_n_decrement_offset check', () => {
            if (null !== sigAction10) {
                expect(sigAction10.value, 's005_a10_n_decrement_offset').to.be.equal(-11);
            }
        });
        it('s005_a11_n_rcb check after timeout', () => {
            if (null !== sigAction11) {
                setTimeout(() => {
                    expect(sigAction11.value, 's005_a11_n_rcb').to.be.equal(1234);
                }, 110);
            }
        });
        it('s005_a12_s_set check', () => {
            if (null !== sigAction12) {
                expect(sigAction12.value, 's005_a12_s_set').to.be.equal('Hello!');
            }
        });
        it('s005_a13_s_link check', () => {
            if (null !== sigAction13) {
                expect(sigAction13.value, 's005_a13_s_link').to.be.equal('up');
            }
        });
        it('cue changes again to a non trigger value then to a trigger value', () => {
            if (null !== sigCue) {
                sigCue.publish('aSampleStringValue');
                expect(sigCue.value, 's005_c1 is changed to "aSampleStringValue"').to.be.equal('aSampleStringValue');
                sigCue.publish('up');
                expect(sigCue.value, 's005_c1 is changed to "up"').to.be.equal('up');
            }
        });
        it('s005_a3_b_toggle recheck', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction3) {
                    expect(sigAction3.value, 's005_a3_b_toggle').to.be.equal(false);
                }
            });
        });
        it('s005_a4_b_pulse recheck', () => {
            if (null !== sigAction4) {
                expect(sigAction4.value, 's005_a4_b_pulse').to.be.equal(false);
            }
        });
        it('s005_a7_n_increment recheck', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction7) {
                    expect(sigAction7.value, 's005_a7_n_increment').to.be.equal(2);
                }
            });
        });
        it('s005_a8_n_increment_offset recheck', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction8) {
                    expect(sigAction8.value, 's005_a8_n_increment_offset').to.be.equal(20);
                }
            });
        });
        it('s005_a9_n_decrement recheck', () => {
            if (null !== sigAction9) {
                expect(sigAction9.value, 's005_a9_n_decrement').to.be.equal(-2);
            }
        });
        it('s005_a10_n_decrement_offset recheck', () => {
            if (null !== sigAction10) {
                expect(sigAction10.value, 's005_a10_n_decrement_offset').to.be.equal(-22);
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWVtdWxhdG9yLnMwMDUuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1lbXVsYXRvci9jaDUtZW11bGF0b3IuczAwNS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUIsT0FBTyxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDL0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNqQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRTlCLE9BQU8sRUFBQyxXQUFXLEVBQW9CLE1BQU0sU0FBUyxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUM3QyxPQUFPLEtBQUssYUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBRXJELFFBQVEsQ0FBQyxvR0FBb0csRUFBRSxHQUFHLEVBQUU7SUFLaEgsUUFBUSxDQUFDLHlIQUF5SCxFQUFFLEdBQUcsRUFBRTtRQUNySSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLG9FQUFvRSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEksTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sRUFBRSxHQUFHLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0MsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sVUFBVSxHQUFHLEVBQUUs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