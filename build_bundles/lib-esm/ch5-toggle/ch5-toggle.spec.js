import { expect } from 'chai';
import 'jsdom-global/register';
import { describe } from 'mocha';
describe('Ch5Toggle', () => {
    let cb = document.createElement('ch5-toggle');
    before(() => {
    });
    beforeEach(() => {
        cb = document.createElement('ch5-toggle');
    });
    it('#create', () => {
        expect(typeof cb).to.be.equal('object');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXRvZ2dsZS5zcGVjLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LXRvZ2dsZS9jaDUtdG9nZ2xlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU5QixPQUFPLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFHakMsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7SUFFdkIsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUU5QyxNQUFNLENBQUMsR0FBRyxFQUFFO0lBRVosQ0FBQyxDQUFDLENBQUM7SUFFSCxVQUFVLENBQUMsR0FBRyxFQUFFO1FBRVosRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUNmLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0FBbUJQLENBQUMsQ0FBQyxDQUFDIn0=