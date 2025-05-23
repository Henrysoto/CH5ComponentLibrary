import { Ch5SignalAttributeRegistry } from "../ch5-common/ch5-signal-attribute-registry";
export class Ch5ComponentLibrary {
    static registerComponent(customComponent) {
        Ch5SignalAttributeRegistry.instance.addElementAttributeEntries(customComponent.ELEMENT_NAME, customComponent.getSignalElementAttributeRegistryEntries(customComponent.COMPONENT_PROPERTIES));
        if (typeof window === "object"
            && typeof window.customElements === "object"
            && typeof window.customElements.define === "function"
            && window.customElements.get(customComponent.ELEMENT_NAME) === undefined) {
            window.customElements.define(customComponent.ELEMENT_NAME, customComponent);
        }
    }
}
Ch5ComponentLibrary.ROLES = {
    Ch5Animation: 'animation',
    Ch5Background: 'region',
    Ch5Button: 'button',
    Ch5ButtonLabel: 'label',
    Ch5ButtonMode: 'template',
    Ch5ButtonModeState: 'template',
    Ch5ButtonList: 'button-list',
    Ch5ButtonListMode: 'template',
    Ch5ButtonListModeState: 'template',
    Ch5ButtonListLabel: 'label',
    Ch5ButtonListIndividualButton: 'template',
    Ch5ColorChip: 'color-chip',
    Ch5ColorPicker: 'color-picker',
    Ch5Dpad: 'dpad',
    Ch5DateTime: 'datetime',
    Ch5DpadChild: 'dpad-child',
    Ch5Keypad: 'keypad',
    Ch5KeypadChild: 'keypad-child',
    Ch5Label: 'label',
    Ch5List: 'list',
    Ch5Form: 'form',
    Ch5Image: 'img',
    Ch5ImportHtmlSnippet: 'template',
    Ch5ModalDialog: 'dialog',
    Ch5OverlayPanel: 'dialog',
    Ch5QrCode: 'qrcode',
    Ch5SegmentedGauge: 'segmented-gauge',
    Ch5SignalLevelGauge: 'signal-level-gauge',
    Ch5Select: 'listbox',
    Ch5SelectOption: 'option',
    Ch5Slider: 'slider',
    Ch5SliderButton: 'slider-button',
    Ch5Spinner: 'listbox',
    Ch5SubpageReferenceList: 'subpage-reference-list',
    Ch5TabButton: 'tab-button',
    Ch5TabButtonIndividualButton: 'template',
    Ch5Template: 'template',
    Ch5Text: "label",
    Ch5TextInput: 'textbox',
    Ch5Toggle: 'switch',
    Ch5TriggerView: 'listbox',
    Ch5TriggerViewChild: 'listbox',
    Ch5Video: 'video',
    Ch5VideoSwitcher: 'video-switcher',
    Ch5VideoSwitcherScreen: 'video-switcher-screen',
    Ch5VideoSwitcherScreenLabel: 'video-switcher-screen-label',
    Ch5VideoSwitcherSource: 'video-switcher-source',
    Ch5VideoSwitcherSourceLabel: 'video-switcher-source-label',
    Ch5WifiSignalLevelGauge: 'wifi-signal-level-gauge'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb3JlL2NoNS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFekYsTUFBTSxPQUFPLG1CQUFtQjtJQWdFdkIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGVBQW9DO1FBQ2xFLDBCQUEwQixDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyx3Q0FBd0MsQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1FBQzdMLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtlQUN6QixPQUFPLE1BQU0sQ0FBQyxjQUFjLEtBQUssUUFBUTtlQUN6QyxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLFVBQVU7ZUFDbEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUMxRSxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLGVBQXNCLENBQUMsQ0FBQztTQUNwRjtJQUNILENBQUM7O0FBdEVzQix5QkFBSyxHQUFRO0lBQ2xDLFlBQVksRUFBRSxXQUFXO0lBQ3pCLGFBQWEsRUFBRSxRQUFRO0lBQ3ZCLFNBQVMsRUFBRSxRQUFRO0lBQ25CLGNBQWMsRUFBRSxPQUFPO0lBQ3ZCLGFBQWEsRUFBRSxVQUFVO0lBQ3pCLGtCQUFrQixFQUFFLFVBQVU7SUFDOUIsYUFBYSxFQUFFLGFBQWE7SUFDNUIsaUJBQWlCLEVBQUUsVUFBVTtJQUM3QixzQkFBc0IsRUFBRSxVQUFVO0lBQ2xDLGtCQUFrQixFQUFFLE9BQU87SUFDM0IsNkJBQTZCLEVBQUUsVUFBVTtJQUN6QyxZQUFZLEVBQUUsWUFBWTtJQUMxQixjQUFjLEVBQUUsY0FBYztJQUM5QixPQUFPLEVBQUUsTUFBTTtJQUNmLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLFlBQVksRUFBRSxZQUFZO0lBQzFCLFNBQVMsRUFBRSxRQUFRO0lBQ25CLGNBQWMsRUFBRSxjQUFjO0lBQzlCLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLE9BQU8sRUFBRSxNQUFNO0lBQ2YsT0FBTyxFQUFFLE1BQU07SUFDZixRQUFRLEVBQUUsS0FBSztJQUNmLG9CQUFvQixFQUFFLFVBQVU7SUFDaEMsY0FBYyxFQUFFLFFBQVE7SUFDeEIsZUFBZSxFQUFFLFFBQVE7SUFDekIsU0FBUyxFQUFFLFFBQVE7SUFDbkIsaUJBQWlCLEVBQUUsaUJBQWlCO0lBQ3BDLG1CQUFtQixFQUFFLG9CQUFvQjtJQUN6QyxTQUFTLEVBQUUsU0FBUztJQUNwQixlQUFlLEVBQUUsUUFBUTtJQUN6QixTQUFTLEVBQUUsUUFBUTtJQUNuQixlQUFlLEVBQUUsZUFBZTtJQUNoQyxVQUFVLEVBQUUsU0FBUztJQUNyQix1QkFBdUIsRUFBRSx3QkFBd0I7SUFDakQsWUFBWSxFQUFFLFlBQVk7SUFDMUIsNEJBQTRCLEVBQUUsVUFBVTtJQUN4QyxXQUFXLEVBQUUsVUFBVTtJQUN2QixPQUFPLEVBQUUsT0FBTztJQUNoQixZQUFZLEVBQUUsU0FBUztJQUN2QixTQUFTLEVBQUUsUUFBUTtJQUNuQixjQUFjLEVBQUUsU0FBUztJQUN6QixtQkFBbUIsRUFBRSxTQUFTO0lBQzlCLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLGdCQUFnQixFQUFFLGdCQUFnQjtJQUNsQyxzQkFBc0IsRUFBRSx1QkFBdUI7SUFDL0MsMkJBQTJCLEVBQUUsNkJBQTZCO0lBQzFELHNCQUFzQixFQUFFLHVCQUF1QjtJQUMvQywyQkFBMkIsRUFBRSw2QkFBNkI7SUFDMUQsdUJBQXVCLEVBQUUseUJBQXlCO0NBQ25ELENBQUMifQ==