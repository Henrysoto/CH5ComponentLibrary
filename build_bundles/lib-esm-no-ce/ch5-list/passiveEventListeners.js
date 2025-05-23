let passiveEvtSupport;
function _passiveEvtListenersSupported() {
    if (typeof passiveEvtSupport === 'undefined') {
        passiveEvtSupport = false;
        try {
            const opts = Object.defineProperty({}, 'passive', {
                get: () => {
                    passiveEvtSupport = true;
                },
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    return passiveEvtSupport;
}
export function getEvtListenerOptions(isPassive) {
    return _passiveEvtListenersSupported() ? { passive: isPassive } : false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc2l2ZUV2ZW50TGlzdGVuZXJzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWxpc3QvcGFzc2l2ZUV2ZW50TGlzdGVuZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLElBQUksaUJBQXlCLENBQUM7QUFROUIsU0FBUyw2QkFBNkI7SUFDcEMsSUFBSSxPQUFPLGlCQUFpQixLQUFLLFdBQVcsRUFBRTtRQUM1QyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSTtZQUVGLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRTtnQkFDaEQsR0FBRyxFQUFFLEdBQUcsRUFBRTtvQkFDUixpQkFBaUIsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLENBQUM7YUFDRixDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUFDO0tBQzdCO0lBRUQsT0FBTyxpQkFBaUIsQ0FBQztBQUMzQixDQUFDO0FBUUQsTUFBTSxVQUFVLHFCQUFxQixDQUFDLFNBQWtCO0lBQ3RELE9BQU8sNkJBQTZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUN4RSxDQUFDIn0=