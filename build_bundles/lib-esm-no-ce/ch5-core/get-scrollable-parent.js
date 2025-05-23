export function getScrollableParent(node) {
    const regex = /(auto|scroll)/;
    const parents = (_node, ps) => {
        if (_node.parentNode === null) {
            return ps;
        }
        return parents(_node.parentNode, ps.concat([_node]));
    };
    const style = (_node, prop) => getComputedStyle(_node, null).getPropertyValue(prop);
    const overflow = (_node) => style(_node, 'overflow') + style(_node, 'overflow-y') + style(_node, 'overflow-x');
    const scroll = (_node) => regex.test(overflow(_node));
    const scrollParent = (_node) => {
        if (!(_node instanceof HTMLElement || _node instanceof SVGElement)) {
            return;
        }
        const parentNodes = parents(_node.parentNode, []);
        for (const parent of parentNodes) {
            if (scroll(parent)) {
                return parent;
            }
        }
        return document.scrollingElement || document.documentElement;
    };
    return scrollParent(node);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXNjcm9sbGFibGUtcGFyZW50LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWNvcmUvZ2V0LXNjcm9sbGFibGUtcGFyZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVBLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxJQUFpQjtJQUNqRCxNQUFNLEtBQUssR0FBRyxlQUFlLENBQUM7SUFDOUIsTUFBTSxPQUFPLEdBQVEsQ0FBQyxLQUFrQixFQUFFLEVBQU8sRUFBRSxFQUFFO1FBQ2pELElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFBRSxPQUFPLEVBQUUsQ0FBQztTQUFFO1FBQzdDLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRyxDQUFDLEtBQWtCLEVBQUUsSUFBWSxFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekcsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFrQixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM1SCxNQUFNLE1BQU0sR0FBRyxDQUFDLEtBQWtCLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFHbkUsTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtRQUNoQyxJQUFJLENBQUMsQ0FBQyxLQUFLLFlBQVksV0FBVyxJQUFJLEtBQUssWUFBWSxVQUFVLENBQUMsRUFBRTtZQUNoRSxPQUFPO1NBQ1Y7UUFFRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVsRCxLQUFLLE1BQU0sTUFBTSxJQUFJLFdBQVcsRUFBRTtZQUM5QixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDaEIsT0FBTyxNQUFNLENBQUM7YUFDakI7U0FDSjtRQUVELE9BQU8sUUFBUSxDQUFDLGdCQUFnQixJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUM7SUFDakUsQ0FBQyxDQUFDO0lBRUYsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFOUIsQ0FBQyJ9