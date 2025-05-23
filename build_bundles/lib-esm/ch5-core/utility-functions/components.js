export function countNumberOfCh5Components(parentElement) {
    const found = { 'parent': parentElement.tagName, 'total': 0 };
    const allElements = parentElement.getElementsByTagName('*');
    for (const element of allElements) {
        const elementTagName = element.tagName;
        if (elementTagName.startsWith('CH5-')) {
            found.total++;
            const priorFoundForTagName = found[elementTagName];
            priorFoundForTagName === undefined ? found[elementTagName] = 1 : found[elementTagName] = priorFoundForTagName + 1;
        }
        else {
            if (element.hasAttributes()) {
                const attrs = element.attributes;
                for (let idx = attrs.length - 1; idx >= 0; idx--) {
                    const attrName = attrs[idx].name;
                    if (attrName.startsWith('data-ch5') && attrName !== 'data-ch5-id'
                        && !attrName.endsWith('subs-key') && !attrName.endsWith('sub-key')) {
                        found.total++;
                        const priorFoundForAttrName = found[attrName];
                        priorFoundForAttrName === undefined ?
                            found[attrName] = 1 :
                            found[attrName] = priorFoundForAttrName + 1;
                    }
                }
            }
        }
    }
    return found;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50cy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb3JlL3V0aWxpdHktZnVuY3Rpb25zL2NvbXBvbmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVUEsTUFBTSxVQUFVLDBCQUEwQixDQUFDLGFBQWtCO0lBQzVELE1BQU0sS0FBSyxHQUFRLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ25FLE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU1RCxLQUFLLE1BQU0sT0FBTyxJQUFJLFdBQVcsRUFBRTtRQUNsQyxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLElBQUksY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN0QyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZCxNQUFNLG9CQUFvQixHQUFRLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN4RCxvQkFBb0IsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7U0FDbEg7YUFDSTtZQUNKLElBQUksT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUM1QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO2dCQUNqQyxLQUFLLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0JBQ2pELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ2pDLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxRQUFRLEtBQUssYUFBYTsyQkFDN0QsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFDcEUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNkLE1BQU0scUJBQXFCLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUM5QyxxQkFBcUIsS0FBSyxTQUFTLENBQUMsQ0FBQzs0QkFDcEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUNyQixLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcscUJBQXFCLEdBQUcsQ0FBQyxDQUFDO3FCQUM3QztpQkFDRDthQUNEO1NBQ0Q7S0FDRDtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2QsQ0FBQyJ9