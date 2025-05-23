export class CH5KeypadUtils {
}
CH5KeypadUtils.KEYPAD_BUTTON_KEY = [
    "button1",
    "button2",
    "button3",
    "button4",
    "button5",
    "button6",
    "button7",
    "button8",
    "button9",
    "buttonstar",
    "button0",
    "buttonhash",
    "buttonextra",
];
CH5KeypadUtils.CONTRACT_SEND_EVENT_ON_CLICK = [
    'Press1',
    'Press2',
    'Press3',
    'Press4',
    'Press5',
    'Press6',
    'Press7',
    'Press8',
    'Press9',
    'PressStar',
    'Press0',
    'PressHash',
    'PressExtraButton'
];
CH5KeypadUtils.KEYPAD_DEFAULT_VALUES = [
    {
        key: "button1",
        iconClass: "",
        labelMajor: "1",
        labelMinor: "&nbsp;",
        pressed: false,
        index: 0,
        defaultClasses: ['number-btn'],
        sendEventOnClick: ""
    },
    {
        key: "button2",
        iconClass: "",
        labelMajor: "2",
        labelMinor: "ABC",
        pressed: false,
        index: 1,
        defaultClasses: ['number-btn'],
        sendEventOnClick: ""
    },
    {
        key: "button3",
        iconClass: "",
        labelMajor: "3",
        labelMinor: "DEF",
        pressed: false,
        index: 2,
        defaultClasses: ['number-btn'],
        sendEventOnClick: ""
    },
    {
        key: "button4",
        iconClass: "",
        labelMajor: "4",
        labelMinor: "GHI",
        pressed: false,
        index: 3,
        defaultClasses: ['number-btn'],
        sendEventOnClick: ""
    },
    {
        key: "button5",
        iconClass: "",
        labelMajor: "5",
        labelMinor: "JKL",
        pressed: false,
        index: 4,
        defaultClasses: ['number-btn'],
        sendEventOnClick: ""
    },
    {
        key: "button6",
        iconClass: "",
        labelMajor: "6",
        labelMinor: "MNO",
        pressed: false,
        index: 5,
        defaultClasses: ['number-btn'],
        sendEventOnClick: ""
    },
    {
        key: "button7",
        iconClass: "",
        labelMajor: "7",
        labelMinor: "PQRS",
        pressed: false,
        index: 6,
        defaultClasses: ['number-btn'],
        sendEventOnClick: ""
    },
    {
        key: "button8",
        iconClass: "",
        labelMajor: "8",
        labelMinor: "TUV",
        pressed: false,
        index: 7,
        defaultClasses: ['number-btn'],
        sendEventOnClick: ""
    },
    {
        key: "button9",
        iconClass: "",
        labelMajor: "9",
        labelMinor: "WXYZ",
        pressed: false,
        index: 8,
        defaultClasses: ['number-btn'],
        sendEventOnClick: ""
    },
    {
        key: "buttonstar",
        iconClass: "",
        labelMajor: "*",
        labelMinor: "",
        pressed: false,
        index: 9,
        defaultClasses: ['misc-btn', 'misc-btn-one'],
        sendEventOnClick: ""
    },
    {
        key: "button0",
        iconClass: "",
        labelMajor: "0",
        labelMinor: "+",
        pressed: false,
        index: 10,
        defaultClasses: ['number-btn'],
        sendEventOnClick: ""
    },
    {
        key: "buttonhash",
        iconClass: "",
        labelMajor: "#",
        labelMinor: "",
        pressed: false,
        index: 11,
        defaultClasses: ['misc-btn', 'misc-btn-two'],
        sendEventOnClick: ""
    },
    {
        key: "buttonextra",
        iconClass: "fas fa-phone",
        labelMajor: "",
        labelMinor: "",
        pressed: false,
        index: 12,
        defaultClasses: ['extra-btn'],
        sendEventOnClick: ""
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWtleXBhZC11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1rZXlwYWQvY2g1LWtleXBhZC11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sY0FBYzs7QUFFRixnQ0FBaUIsR0FBRztJQUN6QyxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxZQUFZO0lBQ1osU0FBUztJQUNULFlBQVk7SUFDWixhQUFhO0NBQ2QsQ0FBQztBQUVxQiwyQ0FBNEIsR0FBRztJQUNwRCxRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixXQUFXO0lBQ1gsUUFBUTtJQUNSLFdBQVc7SUFDWCxrQkFBa0I7Q0FDbkIsQ0FBQztBQUVxQixvQ0FBcUIsR0FBRztJQUM3QztRQUNFLEdBQUcsRUFBRSxTQUFTO1FBQ2QsU0FBUyxFQUFFLEVBQUU7UUFDYixVQUFVLEVBQUUsR0FBRztRQUNmLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLENBQUM7UUFDUixjQUFjLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDOUIsZ0JBQWdCLEVBQUUsRUFBRTtLQUNyQjtJQUNEO1FBQ0UsR0FBRyxFQUFFLFNBQVM7UUFDZCxTQUFTLEVBQUUsRUFBRTtRQUNiLFVBQVUsRUFBRSxHQUFHO1FBQ2YsVUFBVSxFQUFFLEtBQUs7UUFDakIsT0FBTyxFQUFFLEtBQUs7UUFDZCxLQUFLLEVBQUUsQ0FBQztRQUNSLGNBQWMsRUFBRSxDQUFDLFlBQVksQ0FBQztRQUM5QixnQkFBZ0IsRUFBRSxFQUFFO0tBQ3JCO0lBQ0Q7UUFDRSxHQUFHLEVBQUUsU0FBUztRQUNkLFNBQVMsRUFB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