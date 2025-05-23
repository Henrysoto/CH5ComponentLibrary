export class Ch5SpinnerMutationObserver {
    constructor(element) {
        if (Ch5SpinnerMutationObserver._observer.constructor !== MutationObserver) {
            Ch5SpinnerMutationObserver._observer = new MutationObserver(this.mutationsCallback);
        }
        this.registerElement(element);
    }
    registerElement(element) {
        Ch5SpinnerMutationObserver._observer.observe(element, {
            childList: true,
            subtree: true,
            attributes: true
        });
    }
    mutationsCallback(mutations) {
    }
}
Ch5SpinnerMutationObserver._observer = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LXNwaW5uZXItbXV0YXRpb24tb2JzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtc3Bpbm5lci9jaDUtc3Bpbm5lci1tdXRhdGlvbi1vYnNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTQSxNQUFNLE9BQU8sMEJBQTBCO0lBSXJDLFlBQVksT0FBbUI7UUFDN0IsSUFBSSwwQkFBMEIsQ0FBQyxTQUFTLENBQUMsV0FBVyxLQUFLLGdCQUFnQixFQUFFO1lBQ3pFLDBCQUEwQixDQUFDLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3JGO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBVU8sZUFBZSxDQUFDLE9BQW9CO1FBQzFDLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3BELFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLElBQUk7WUFDYixVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBU08saUJBQWlCLENBQUMsU0FBMkI7SUFFckQsQ0FBQzs7QUFsQ2Esb0NBQVMsR0FBcUIsRUFBc0IsQ0FBQyJ9