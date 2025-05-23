import { expect } from 'chai';
import * as fs from 'fs-extra';
import { describe } from 'mocha';
import { fail } from "assert";
import { Ch5Emulator } from './index';
import { Ch5SignalFactory } from "../ch5-core";
import * as delayFunction from "./mocha.async.delay";
describe('Ch5Emulator#scenario 001, 002, 003 ', () => {
    it('should return an instance of itself', () => {
        const em = Ch5Emulator.getInstance();
        expect(em).to.be.instanceOf(Ch5Emulator);
    });
    describe('scenario001#cue(type=boolean,trigger=true)->action(type=boolean,logic=set,value=true)', () => {
        const em = Ch5Emulator.getInstance();
        const sf = Ch5SignalFactory.getInstance();
        const emScenario = JSON.parse(fs.readFileSync(__dirname + '/../../../src/ch5-emulator/emulator.spec.testdata.scenario001.json', 'utf8'));
        const sigCue = sf.getBooleanSignal('hall_lights_tap');
        const sigAction = sf.getBooleanSignal('hall_lights_selected');
        it('preload checks', () => {
            if (null !== sigCue) {
                expect(sigCue.value, 'cue signal is initially false').to.be.equal(false);
            }
            else {
                fail('boolean signal: hall_lights_tap not found');
            }
            if (null !== sigAction) {
                expect(sigAction.value, 'action signal is initially false').to.be.equal(false);
            }
            else {
                fail('boolean signal: hall_lights_selected not found');
            }
        });
        it('load scenario and change cue signal value', (done) => {
            em.loadScenario(emScenario);
            if (null !== sigCue) {
                if (null !== sigAction) {
                    delayFunction.emulatorAsyncDelay(done, () => { expect(sigAction.value, 'action signal changes to true').to.be.equal(true); });
                }
                else {
                    fail('boolean signal: hall_lights_selected not found');
                }
                sigCue.publish(true);
                expect(sigCue.value, 'cue signal is true after publishing a true value on it').to.be.equal(true);
            }
            else {
                fail('boolean signal: hall_lights_tap not found');
            }
        });
    });
    describe('scenario002#cue(type=boolean,trigger=true)->action(type=number,logic=set,value=65535),action(type=string,logic=set,value="Raising Volume!")', () => {
        const em = Ch5Emulator.getInstance();
        const sf = Ch5SignalFactory.getInstance();
        const emScenario = JSON.parse(fs.readFileSync(__dirname + '/../../../src/ch5-emulator/emulator.spec.testdata.scenario002.json', 'utf8'));
        const sigCue = sf.getBooleanSignal('volume_up_press');
        const sigAction1 = sf.getNumberSignal('volume_level');
        const sigAction2 = sf.getStringSignal('volume_level_desc');
        it('preload checks', () => {
            if (null !== sigAction1) {
                expect(sigAction1.value, 'sigAction1(volume_level) is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('boolean signal: volume_level not found');
            }
            if (null !== sigAction2) {
                expect(sigAction2.value, 'sigAction2(volume_level_desc) is  ""').to.be.equal('');
            }
            else {
                fail('boolean signal: volume_level_desc not found');
            }
        });
        it('load scenario and change cue signal value', (done) => {
            em.loadScenario(emScenario);
            if (null !== sigCue && null !== sigAction1 && null !== sigAction2) {
                delayFunction.emulatorAsyncDelay(done, () => {
                    expect(sigAction1.value, 'sigAction1(volume_level) has changed to 65535').to.be.equal(65535);
                    expect(sigAction2.value, 'sigAction2(volume_level_desc) has changed to "Raising Volume!"').to.be.equal('Raising Volume!');
                });
                expect(sigCue.value, 'sigTrigger(volume_up_press) is false after loading the scenario').to.be.equal(false);
                sigCue.publish(true);
                expect(sigCue.value, 'sigTrigger(volume_up_press) is changed to true').to.be.equal(true);
            }
            else {
                if (null === sigCue) {
                    fail('boolean signal: volume_up_press not found');
                }
                if (null === sigAction1) {
                    fail('boolean signal: volume_level not found');
                }
                if (null === sigAction2) {
                    fail('boolean signal: volume_level_desc not found');
                }
            }
        });
    });
    describe('scenario003#cue(type=boolean,trigger=true)->action(b:link,set,toggle,pulse;n:link,set,increment,decrement,rcb;s:set:link)', () => {
        const emScenario = JSON.parse(fs.readFileSync(__dirname + '/../../../src/ch5-emulator/emulator.spec.testdata.scenario003.json', 'utf8'));
        const em = Ch5Emulator.getInstance();
        const sf = Ch5SignalFactory.getInstance();
        const sigCue = sf.getBooleanSignal('s003_c1');
        const sigAction1 = sf.getBooleanSignal('s003_a1_b_set');
        const sigAction2 = sf.getBooleanSignal('s003_a2_b_link');
        const sigAction3 = sf.getBooleanSignal('s003_a3_b_toggle');
        const sigAction4 = sf.getBooleanSignal('s003_a4_b_pulse');
        const sigAction5 = sf.getNumberSignal('s003_a5_n_set');
        const sigAction6 = sf.getNumberSignal('s003_a6_n_link');
        const sigAction7 = sf.getNumberSignal('s003_a7_n_increment');
        const sigAction8 = sf.getNumberSignal('s003_a8_n_increment_offset');
        const sigAction9 = sf.getNumberSignal('s003_a9_n_decrement');
        const sigAction10 = sf.getNumberSignal('s003_a10_n_decrement_offset');
        const sigAction11 = sf.getNumberSignal('s003_a11_n_rcb');
        const sigAction12 = sf.getStringSignal('s003_a12_s_set');
        const sigAction13 = sf.getStringSignal('s003_a13_s_link');
        it('preload checks', () => {
            if (null !== sigAction1) {
                expect(sigAction1.value, 's003_a1_b_set is false before the scenario loads').to.be.equal(false);
            }
            else {
                fail('signal: s003_a1_b_set not found');
                return;
            }
            if (null !== sigAction2) {
                expect(sigAction2.value, 's003_a2_b_link is false before the scenario loads').to.be.equal(false);
            }
            else {
                fail('signal: s003_a2_b_link not found');
                return;
            }
            if (null !== sigAction3) {
                expect(sigAction3.value, 's003_a3_b_toggle is false before the scenario loads').to.be.equal(false);
            }
            else {
                fail('signal: s003_a3_b_toggle not found');
                return;
            }
            if (null !== sigAction4) {
                expect(sigAction4.value, 's003_a4_b_pulse is false before the scenario loads').to.be.equal(false);
            }
            else {
                fail('signal: s003_a4_b_pulse not found');
                return;
            }
            if (null !== sigAction5) {
                expect(sigAction5.value, 's003_a5_n_set is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s003_a5_n_set not found');
                return;
            }
            if (null !== sigAction6) {
                expect(sigAction6.value, 's003_a6_n_link is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s003_a6_n_link not found');
                return;
            }
            if (null !== sigAction7) {
                expect(sigAction7.value, 's003_a7_n_increment is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s003_a7_n_increment not found');
                return;
            }
            if (null !== sigAction8) {
                expect(sigAction8.value, 's003_a8_n_increment_offset is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s003_a8_n_increment_offset not found');
                return;
            }
            if (null !== sigAction9) {
                expect(sigAction9.value, 's003_a9_n_decrement is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s003_a9_n_decrement not found');
                return;
            }
            if (null !== sigAction10) {
                expect(sigAction10.value, 's003_a10_n_decrement_offset is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s003_a10_n_decrement_offset not found');
                return;
            }
            if (null !== sigAction11) {
                expect(sigAction11.value, 's003_a11_n_rcb is 0 before the scenario loads').to.be.equal(0);
            }
            else {
                fail('signal: s003_a11_n_rcb not found');
                return;
            }
            if (null !== sigAction12) {
                expect(sigAction12.value, 's003_a12_s_set is  ""').to.be.equal('');
            }
            else {
                fail('signal: s003_a12_s_set not found');
                return;
            }
            if (null !== sigAction13) {
                expect(sigAction13.value, 's003_a13_s_link is  ""').to.be.equal('');
            }
            else {
                fail('signal: s003_a13_s_link not found');
                return;
            }
        });
        it('scenario load, signal cue change', () => {
            em.loadScenario(emScenario);
            if (null !== sigCue) {
                expect(sigCue.value, 's003_c1 is false after loading the scenario').to.be.equal(false);
            }
            else {
                fail('signal: s003_c1 not found');
                return;
            }
            sigCue.publish(true);
        });
        it('s003_c1 is changed to true', () => {
            if (null !== sigCue) {
                expect(sigCue.value, 's003_c1').to.be.equal(true);
            }
        });
        it('s003_a1_b_set check', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction1) {
                    expect(sigAction1.value, 's003_a1_b_set').to.be.equal(true);
                }
            });
        });
        it('s003_a2_b_link check', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction2) {
                    expect(sigAction2.value, 's003_a2_b_link').to.be.equal(true);
                }
            });
        });
        it('s003_a3_b_toggle check', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction3) {
                    expect(sigAction3.value, 's003_a3_b_toggle').to.be.equal(true);
                }
            });
        });
        it('s003_a4_b_pulse check', () => {
            if (null !== sigAction4) {
                expect(sigAction4.value, 's003_a4_b_pulse').to.be.equal(false);
            }
        });
        it('s003_a5_n_set check', () => {
            if (null !== sigAction5) {
                expect(sigAction5.value, 's003_a5_n_set').to.be.equal(5);
            }
        });
        it('s003_a6_n_link check', () => {
            if (null !== sigAction6) {
                expect(sigAction6.value, 's003_a6_n_link').to.be.equal(0);
            }
        });
        it('s003_a7_n_increment check', () => {
            if (null !== sigAction7) {
                expect(sigAction7.value, 's003_a7_n_increment').to.be.equal(1);
            }
        });
        it('s003_a8_n_increment_offset check', () => {
            if (null !== sigAction8) {
                expect(sigAction8.value, 's003_a8_n_increment_offset').to.be.equal(10);
            }
        });
        it('s003_a9_n_decrement check', () => {
            if (null !== sigAction9) {
                expect(sigAction9.value, 's003_a9_n_decrement').to.be.equal(-1);
            }
        });
        it('s003_a10_n_decrement_offset check', () => {
            if (null !== sigAction10) {
                expect(sigAction10.value, 's003_a10_n_decrement_offset').to.be.equal(-11);
            }
        });
        it('s003_a11_n_rcb check after timeout', () => {
            if (null !== sigAction11) {
                setTimeout(() => {
                    expect(sigAction11.value, 's003_a11_n_rcb').to.be.equal(1234);
                }, 110);
            }
        });
        it('s003_a12_s_set check', () => {
            if (null !== sigAction12) {
                expect(sigAction12.value, 's003_a12_s_set').to.be.equal('Hello!');
            }
        });
        it('s003_a13_s_link check', () => {
            if (null !== sigAction13) {
                expect(sigAction13.value, 's003_a13_s_link').to.be.equal('true');
            }
        });
        it('cue changes again to false then true', () => {
            if (null !== sigCue) {
                sigCue.publish(false);
                expect(sigCue.value, 's003_c1 is changed to false').to.be.equal(false);
                sigCue.publish(true);
                expect(sigCue.value, 's003_c1 is changed to true').to.be.equal(true);
            }
        });
        it('s003_a3_b_toggle recheck', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction3) {
                    expect(sigAction3.value, 's003_a3_b_toggle').to.be.equal(false);
                }
            });
        });
        it('s003_a4_b_pulse recheck', () => {
            if (null !== sigAction4) {
                expect(sigAction4.value, 's003_a4_b_pulse').to.be.equal(false);
            }
        });
        it('s003_a7_n_increment recheck', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction7) {
                    expect(sigAction7.value, 's003_a7_n_increment').to.be.equal(2);
                }
            });
        });
        it('s003_a8_n_increment_offset recheck', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction8) {
                    expect(sigAction8.value, 's003_a8_n_increment_offset').to.be.equal(20);
                }
            });
        });
        it('s003_a9_n_decrement recheck', (done) => {
            delayFunction.emulatorAsyncDelay(done, () => {
                if (null !== sigAction9) {
                    expect(sigAction9.value, 's003_a9_n_decrement').to.be.equal(-2);
                }
            });
        });
        it('s003_a10_n_decrement_offset recheck', () => {
            if (null !== sigAction10) {
                expect(sigAction10.value, 's003_a10_n_decrement_offset').to.be.equal(-22);
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWVtdWxhdG9yLnMwMDEtMDAzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtZW11bGF0b3IvY2g1LWVtdWxhdG9yLnMwMDEtMDAzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QixPQUFPLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMvQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFOUIsT0FBTyxFQUFDLFdBQVcsRUFBb0IsTUFBTSxTQUFTLENBQUM7QUFDdkQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQzdDLE9BQU8sS0FBSyxhQUFhLE1BQU0scUJBQXFCLENBQUM7QUFFckQsUUFBUSxDQUFDLHFDQUFxQyxFQUFFLEdBQUcsRUFBRTtJQUVqRCxFQUFFLENBQUMscUNBQXFDLEVBQUUsR0FBRyxFQUFFO1FBQzNDLE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVyQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFjQyxRQUFRLENBQUMsdUZBQXVGLEVBQUUsR0FBRyxFQUFFO1FBTW5HLE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxNQUFNLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLG9FQUFvRSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEksTUFBTSxN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