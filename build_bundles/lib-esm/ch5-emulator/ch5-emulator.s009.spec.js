import { expect } from 'chai';
import { describe } from 'mocha';
import { Ch5Emulator } from './index';
import { Ch5SignalFactory } from "../ch5-core";
describe('Ch5Emulator#scenario 009', () => {
    describe('tests for: loadScenario, onStart, run', () => {
        const action1 = { 'state': 's009_sig2_b', 'type': 'boolean', 'logic': 'toggle' };
        const cue1 = { 'event': 's009_sig1_b', 'type': 'boolean', 'trigger': '&change', 'actions': [action1] };
        const onStart = { 'state': 's009_sig2_b', 'type': 'boolean', 'value': true };
        const emScenario1 = { 'cues': [cue1] };
        const emScenario2 = { 'cues': [cue1], 'onStart': [onStart] };
        const em = Ch5Emulator.getInstance();
        const sf = Ch5SignalFactory.getInstance();
        const sigs = {};
        const sigNames = [
            's009_sig1_b',
            's009_sig2_b'
        ];
        const signalCheck = (sigName, expectedValue) => {
            return it(sigName + ' is ' + expectedValue, (done) => {
                const sig = sigs[sigName];
                if (typeof sigName !== "undefined") {
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
                done();
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
        it('loading a scenario with no cues throws an error', (done) => {
            try {
                em.loadScenario({});
                done(new Error('Error not thrown'));
            }
            catch (e) {
                done();
            }
        });
        it('emulator run without loading scenario throws Error', (done) => {
            try {
                em.run();
                done(new Error('Error not thown'));
            }
            catch (e) {
                done();
            }
        });
        it('emulator run on a scenario without onStart does not throw an Error', (done) => {
            em.loadScenario(emScenario1);
            em.run();
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWVtdWxhdG9yLnMwMDkuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1lbXVsYXRvci9jaDUtZW11bGF0b3IuczAwOS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUVqQyxPQUFPLEVBQUUsV0FBVyxFQUFzRSxNQUFNLFNBQVMsQ0FBQztBQUMxRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFJL0MsUUFBUSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtJQUN6QyxRQUFRLENBQUMsdUNBQXVDLEVBQUUsR0FBRyxFQUFFO1FBQ3RELE1BQU0sT0FBTyxHQUFvQixFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7UUFDbEcsTUFBTSxJQUFJLEdBQWlCLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNySCxNQUFNLE9BQU8sR0FBcUIsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO1FBRS9GLE1BQU0sV0FBVyxHQUFzQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDMUQsTUFBTSxXQUFXLEdBQXNCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUVoRixNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsTUFBTSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsTUFBTSxJQUFJLEdBQXdCLEVBQUUsQ0FBQztRQUNyQyxNQUFNLFFBQVEsR0FBRztZQUNoQixhQUFhO1lBQ2IsYUFBYTtTQUNiLENBQUM7UUFFRixNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQWUsRUFBRSxhQUF3RCxFQUFFLEVBQUU7WUFDakcsT0FBTyxFQUFFLENBQUMsT0FBTyxHQUFHLE1BQU0sR0FBRyxhQUFhLEVBQUUsQ0FBQyxJQUFlLEVBQUUsRUFBRTtnQkFDL0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxQixJQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsRUFBRTtvQkFDbkMsSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTt3QkFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7cUJBQ3REO3lCQUFNO3dCQUNOLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQztxQkFDeEM7aUJBQ0Q7cUJBQU07b0JBQ04sSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO2lCQUN4QztnQkFDRCxJQUFJLEVBQUUsQ0FBQztZQUNSLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBRUYsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBZSxFQUFFLEVBQUU7WUFDeEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDbkMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUVuRCxJQUFJLEdBQWUsQ0FBQztnQkFDcEIsUUFBUSxPQUFPLEVBQUU7b0JBQ2hCLEtBQUssR0FBRzt3QkFDUCxHQUFHLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDO3dCQUNwQixJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7NEJBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sR0FBRyxxQ0FBcUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUN0Rjs2QkFBTTs0QkFDTixJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7eUJBQ3hDO3dCQUNELE1BQU07b0JBQ1AsS0FBSyxHQUFHO3dCQUNQLEdBQUcsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDO3dCQUNwQixJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7NEJBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sR0FBRyxxQ0FBcUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNsRjs2QkFBTTs0QkFDTixJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7eUJBQ3hDO3dCQUNELE1BQU07b0JBQ1AsS0FBSyxHQUFHO3dCQUNQLEdBQUcsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDO3dCQUNwQixJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7NEJBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sR0FBRyxxQ0FBcUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3lCQUNuRjs2QkFBTTs0QkFDTixJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7eUJBQ3hDO3dCQUNELE1BQU07aUJBQ1A7WUFDRixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksRUFBRSxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsaURBQWlELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM5RCxJQUFJO2dCQUNILEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBdUIsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFBO2FBQ25DO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLENBQUM7YUFDUDtRQUVGLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDakUsSUFBSTtnQkFDSCxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQTthQUNsQztZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNYLElBQUksRUFBRSxDQUFDO2FBQ1A7UUFFRixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxvRUFBb0UsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2pGLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFN0IsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ1QsSUFBSSxFQUFFLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztJQVlKLENBQUMsQ0FBQyxDQUFDO0FBRUosQ0FBQyxDQUFDLENBQUMifQ==