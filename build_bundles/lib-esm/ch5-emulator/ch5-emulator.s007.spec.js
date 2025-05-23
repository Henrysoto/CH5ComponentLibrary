import { expect } from 'chai';
import * as fs from 'fs-extra';
import { describe } from 'mocha';
import { Ch5Emulator } from './index';
import { Ch5SignalFactory } from "../ch5-core";
import * as delayFunction from "./mocha.async.delay";
describe('Ch5Emulator#scenario 007', () => {
    describe('scenario007#onStart', () => {
        const emScenario = JSON.parse(fs.readFileSync(__dirname + '/../../../src/ch5-emulator/emulator.spec.testdata.scenario007.json', 'utf8'));
        const em = Ch5Emulator.getInstance();
        const sf = Ch5SignalFactory.getInstance();
        const sigs = {};
        const sigNames = [
            's007_sig1_b',
            's007_sig2_b',
            's007_sig3_b',
            's007_sig4_n',
            's007_sig5_n',
            's007_sig6_n',
            's007_sig7_s',
            's007_sig8_n',
            's007_sig9_b',
            's007_sig10_b',
            's007_sig11_n',
            's007_sig12_n',
            's007_sig13_n',
            's007_sig14_s',
            's007_sig15_s',
            's007_sig16_b',
            's007_sig17_b',
            's007_sig18_n',
            's007_sig19_n',
            's007_sig20_n',
            's007_sig21_s',
            's007_sig22_n',
            's007_sig23_n'
        ];
        const signalCheck = (sigName, expectedValue) => {
            it(sigName + ' is ' + expectedValue, (done) => {
                delayFunction.emulatorAsyncDelay(done, () => {
                    if (typeof sigName !== "undefined") {
                        const sig = sigs[sigName];
                        if (typeof sig !== "undefined" && null !== sig) {
                            expect(sig.value, sigName).to.be.equal(expectedValue);
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
                }
            });
            done();
        });
        it('scenario load, scenario run', () => {
            em.loadScenario(emScenario);
            em.run();
        });
        signalCheck('s007_sig1_b', true);
        signalCheck('s007_sig8_n', 100);
        signalCheck('s007_sig15_s', 'hello');
        signalCheck('s007_sig2_b', true);
        signalCheck('s007_sig3_b', true);
        signalCheck('s007_sig4_n', 0);
        signalCheck('s007_sig5_n', 10);
        signalCheck('s007_sig6_n', -11);
        signalCheck('s007_sig7_s', 'true');
        signalCheck('s007_sig9_b', true);
        signalCheck('s007_sig10_b', true);
        signalCheck('s007_sig11_n', 100);
        signalCheck('s007_sig12_n', 10);
        signalCheck('s007_sig13_n', -11);
        signalCheck('s007_sig14_s', '100');
        signalCheck('s007_sig16_b', true);
        signalCheck('s007_sig17_b', true);
        signalCheck('s007_sig18_n', 0);
        signalCheck('s007_sig19_n', 10);
        signalCheck('s007_sig20_n', -11);
        signalCheck('s007_sig21_s', 'hello');
        signalCheck('s007_sig22_n', 10);
        signalCheck('s007_sig23_n', 10);
        it('change s007_sig1_b to false', (done) => {
            const sigName = 's007_sig1_b';
            const sig = sf.getBooleanSignal(sigName);
            if (null !== sig) {
                sig.publish(false);
                expect(sig.value, sigName + ' changed to  false').to.be.equal(false);
            }
            else {
                done(new Error(sigName + ' not found'));
            }
            done();
        });
        signalCheck('s007_sig2_b', false);
        signalCheck('s007_sig3_b', false);
        signalCheck('s007_sig4_n', 0);
        signalCheck('s007_sig5_n', 20);
        signalCheck('s007_sig6_n', -22);
        signalCheck('s007_sig7_s', 'false');
        it('change s007_sig8_n to 101', (done) => {
            const sigName = 's007_sig8_n';
            const sig = sf.getNumberSignal(sigName);
            if (null !== sig) {
                sig.publish(101);
                expect(sig.value, sigName + ' changed to 101').to.be.equal(101);
            }
            else {
                done(new Error(sigName + ' not found'));
            }
            done();
        });
        signalCheck('s007_sig9_b', true);
        signalCheck('s007_sig10_b', false);
        signalCheck('s007_sig11_n', 101);
        signalCheck('s007_sig12_n', 20);
        signalCheck('s007_sig13_n', -22);
        signalCheck('s007_sig14_s', '101');
        signalCheck('s007_sig22_n', 20);
        signalCheck('s007_sig23_n', 20);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWVtdWxhdG9yLnMwMDcuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1lbXVsYXRvci9jaDUtZW11bGF0b3IuczAwNy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUIsT0FBTyxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDL0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUdqQyxPQUFPLEVBQUUsV0FBVyxFQUFxQixNQUFNLFNBQVMsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHL0MsT0FBTyxLQUFLLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRCxRQUFRLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO0lBR3pDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7UUFDcEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxvRUFBb0UsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3pJLE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxNQUFNLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQXdCMUMsTUFBTSxJQUFJLEdBQXdCLEVBQUUsQ0FBQztRQUNyQyxNQUFNLFFBQVEsR0FBRztZQUNoQixhQUFhO1lBQ2IsYUFBYTtZQUNiLGFBQWE7WUFDYixhQUFhO1lBQ2IsYUFBYTtZQUNiLGFBQWE7WUFDYixhQUFhO1lBQ2IsYUFBYTtZQUNiLGFBQWE7WUFDYixjQUFjO1lBQ2QsY0FBYztZQUNkLGNBQWM7WUFDZCxjQUFjO1lBQ2QsY0FBYztZQUNkLGNBQWM7WUFDZCxjQUFjO1lBQ2QsY0FBYztZQUNkLGNBQWM7WUFDZCxj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