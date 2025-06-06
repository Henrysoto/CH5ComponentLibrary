import { Ch5CoreIntersectionObserver } from "../ch5-core-intersection-observer";
export function subscribeInViewPortChange(el, callback) {
    Ch5CoreIntersectionObserver.getInstance().observe(el, callback);
}
export function unSubscribeInViewPortChange(el) {
    if (Ch5CoreIntersectionObserver.getInstance() instanceof Ch5CoreIntersectionObserver) {
        Ch5CoreIntersectionObserver.getInstance().unobserve(el);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlLWluLXZpZXctcG9ydC1jaGFuZ2UuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29yZS91dGlsaXR5LWZ1bmN0aW9ucy9zdWJzY3JpYmUtaW4tdmlldy1wb3J0LWNoYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUloRixNQUFNLFVBQVUseUJBQXlCLENBQUMsRUFBZSxFQUFFLFFBQTJDO0lBTWxHLDJCQUEyQixDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0UsQ0FBQztBQUVELE1BQU0sVUFBVSwyQkFBMkIsQ0FBQyxFQUFlO0lBTXZELElBQUksMkJBQTJCLENBQUMsV0FBVyxFQUFFLFlBQVksMkJBQTJCLEVBQUU7UUFDbEYsMkJBQTJCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQWEsQ0FBQyxDQUFDO0tBQ3RFO0FBQ0wsQ0FBQyJ9