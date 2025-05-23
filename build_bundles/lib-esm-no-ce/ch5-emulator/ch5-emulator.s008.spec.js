import { expect } from 'chai';
import * as fs from 'fs-extra';
import { describe } from 'mocha';
import { Ch5Emulator } from './index';
import { Ch5SignalFactory } from "../ch5-core";
import * as delayFunction from "./mocha.async.delay";
describe('Ch5Emulator#scenario 008', () => {
    describe('scenario008#onStart', () => {
        const emScenario = JSON.parse(fs.readFileSync(__dirname + '/../../../src/ch5-emulator/emulator.spec.testdata.scenario008.json', 'utf8'));
        const em = Ch5Emulator.getInstance();
        const sf = Ch5SignalFactory.getInstance();
        const sigs = {};
        const sigNames = [
            's008_sig1_b',
            's008_sig2_o',
            's008_sig3_o',
            's008_sig4_n',
            's008_sig5_o',
            's008_sig6_o',
            's008_sig7_s',
            's008_sig8_o',
            's008_sig9_o',
            's008_sig10_o',
            's008_sig11_b',
            's008_sig12_n',
            's008_sig13_o',
            's008_sig14_n',
            's008_sig15_o',
            's008_sig16_n',
        ];
        const signalCheck = (sigName, expectedValue) => {
            it(sigName + ' is ' + expectedValue, (done) => {
                delayFunction.emulatorAsyncDelay(done, () => {
                    if (typeof sigName !== "undefined") {
                        const sig = sigs[sigName];
                        if (typeof sig !== "undefined" && null !== sig) {
                            const sigType = sigName.substr(sigName.length - 1);
                            if ('o' === sigType) {
                                expect(sig.value, sigName).to.deep.equal(expectedValue);
                            }
                            else {
                                expect(sig.value, sigName).to.be.equal(expectedValue);
                            }
                        }
                        else {
                            done(new Error(sigName + " not found"));
                        }
                    }
                    else {
                        done(new Error(sigName + " not found"));
                    }
                });
            });
        };
        it('preload checks', (done) => {
            sigNames.forEach((sigName, index) => {
                const sigType = sigName.substr(sigName.length - 1);
                let sig;
                switch (sigType) {
                    case 'b':
                        sig = sf.getBooleanSignal(sigName);
                        sigs[sigName] = sig;
                        if (null !== sig) {
                            expect(sig.value, sigName + ' is false before the scenario loads').to.be.equal(false);
                        }
                        else {
                            done(new Error(sigName + ' not found'));
                        }
                        break;
                    case 'n':
                        sig = sf.getNumberSignal(sigName);
                        sigs[sigName] = sig;
                        if (null !== sig) {
                            expect(sig.value, sigName + ' is false before the scenario loads').to.be.equal(0);
                        }
                        else {
                            done(new Error(sigName + ' not found'));
                        }
                        break;
                    case 's':
                        sig = sf.getStringSignal(sigName);
                        sigs[sigName] = sig;
                        if (null !== sig) {
                            expect(sig.value, sigName + ' is false before the scenario loads').to.be.equal('');
                        }
                        else {
                            done(new Error(sigName + ' not found'));
                        }
                        break;
                    case 'o':
                        sig = sf.getObjectSignal(sigName);
                        sigs[sigName] = sig;
                        if (null !== sig) {
                            expect(sig.value, sigName + ' is empty before the scenario loads').to.deep.equal({});
                        }
                        else {
                            done(new Error(sigName + ' not found'));
                        }
                        break;
                }
            });
            done();
        });
        it('scenario load, scenario run', () => {
            em.loadScenario(emScenario);
            em.run();
        });
        signalCheck('s008_sig1_b', true);
        signalCheck('s008_sig2_o', true);
        signalCheck('s008_sig3_o', { "s1": "value1", "n1": 101, "b1": true });
        signalCheck('s008_sig4_n', 100);
        signalCheck('s008_sig5_o', {});
        signalCheck('s008_sig6_o', { "s2": "value2" });
        signalCheck('s008_sig7_s', 'hello');
        signalCheck('s008_sig8_o', 'hello');
        signalCheck('s008_sig9_o', { "s3": "value3" });
        signalCheck('s008_sig10_o', {});
        signalCheck('s008_sig11_b', false);
        signalCheck('s008_sig12_n', 0);
        signalCheck('s008_sig13_o', {});
        signalCheck('s008_sig14_n', 0);
        signalCheck('s008_sig15_o', { "nKey": 3 });
        signalCheck('s008_sig16_n', 3);
        it('change s008_sig10_o to trigger value', (done) => {
            const sigName = 's008_sig10_o';
            const sig = sf.getObjectSignal(sigName);
            if (null !== sig) {
                const trigVal = { "s1": "value1", "n1": 11 };
                sig.publish(trigVal);
                expect(sig.value, sigName + ' changed to trigger value').to.deep.equal(trigVal);
            }
            else {
                done(new Error(sigName + ' not found'));
            }
            done();
        });
        signalCheck('s008_sig10_o', { "s1": "value1", "n1": 11 });
        signalCheck('s008_sig11_b', true);
        signalCheck('s008_sig12_n', 7);
        it('change s008_sig13_o', (done) => {
            const sigName = 's008_sig13_o';
            const sig = sf.getObjectSignal(sigName);
            if (null !== sig) {
                const trigVal = { "s1": "value1" };
                sig.publish(trigVal);
                expect(sig.value, sigName + ' changed ').to.deep.equal(trigVal);
            }
            else {
                done(new Error(sigName + ' not found'));
            }
            done();
        });
        signalCheck('s008_sig14_n', 10);
        it('change s008_sig15_o', (done) => {
            const sigName = 's008_sig15_o';
            const sig = sf.getObjectSignal(sigName);
            if (null !== sig) {
                const trigVal = { "a1": "v1" };
                sig.publish(trigVal);
                expect(sig.value, sigName + ' changed ').to.deep.equal(trigVal);
            }
            else {
                done(new Error(sigName + ' not found'));
            }
            done();
        });
        signalCheck('s008_sig16_n', 6);
        it('change s008_sig13_o again', (done) => {
            const sigName = 's008_sig13_o';
            const sig = sf.getObjectSignal(sigName);
            if (null !== sig) {
                const trigVal = { "n1": 12, "k2": "v2" };
                sig.publish(trigVal);
                expect(sig.value, sigName + ' changed ').to.deep.equal(trigVal);
            }
            else {
                done(new Error(sigName + ' not found'));
            }
            done();
        });
        signalCheck('s008_sig14_n', 20);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWVtdWxhdG9yLnMwMDguc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1lbXVsYXRvci9jaDUtZW11bGF0b3IuczAwOC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUIsT0FBTyxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDL0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUdqQyxPQUFPLEVBQUUsV0FBVyxFQUFxQixNQUFNLFNBQVMsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHL0MsT0FBTyxLQUFLLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRCxRQUFRLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO0lBR3pDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7UUFDcEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxvRUFBb0UsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBRXpJLE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxNQUFNLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUUxQyxNQUFNLElBQUksR0FBd0IsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sUUFBUSxHQUFHO1lBQ2hCLGFBQWE7WUFDYixhQUFhO1lBQ2IsYUFBYTtZQUNiLGFBQWE7WUFDYixhQUFhO1lBQ2IsYUFBYTtZQUNiLGFBQWE7WUFDYixhQUFhO1lBQ2IsYUFBYTtZQUNiLGNBQWM7WUFDZCxjQUFjO1lBQ2QsY0FBYztZQUNkLGNBQWM7WUFDZCxjQUFjO1lBQ2QsY0FBYztZQUNkLGNBQWM7U0FDZCxDQUFDO1FBRUYsTUFBTSxXQUFXLEdB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