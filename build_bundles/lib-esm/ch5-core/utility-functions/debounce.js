export const debounce = (debouncer, callback, debounceTime = 0) => {
    const now = Date.now();
    if (!debouncer.start) {
        debouncer.start = now;
    }
    const debounceTimePassed = now - debouncer.start > debounceTime;
    if (!debouncer.timeoutIdentifier || debounceTimePassed) {
        clearTimeout(debouncer.timeoutIdentifier);
        debouncer.timeoutIdentifier = setTimeout(() => callback(), debounceTime);
        debouncer.start = debounceTimePassed ? now : debouncer.start;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVib3VuY2UuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtY29yZS91dGlsaXR5LWZ1bmN0aW9ucy9kZWJvdW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrQkEsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLENBQUMsU0FBNEIsRUFDN0IsUUFBb0IsRUFDcEIsZUFBdUIsQ0FBQyxFQUFFLEVBQUU7SUFFbEQsTUFBTSxHQUFHLEdBQVcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFO1FBQ3BCLFNBQVMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0tBQ3ZCO0lBQ0QsTUFBTSxrQkFBa0IsR0FBWSxHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7SUFDekUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsSUFBSSxrQkFBa0IsRUFBRTtRQUV0RCxZQUFZLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDMUMsU0FBUyxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUV6RSxTQUFTLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7S0FDOUQ7QUFDSCxDQUFDLENBQUEifQ==