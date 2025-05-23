import { Ch5ListAbstractHelper } from "./ch5-list-abstract-helper";
;
export class Ch5ListBufferedItems extends Ch5ListAbstractHelper {
    bufferItems(skipForward, skipBackwards) {
        if (typeof skipForward !== 'boolean') {
            skipForward = false;
        }
        if (typeof skipBackwards !== 'boolean') {
            skipBackwards = false;
        }
        if (!this._list.bufferedItems.bufferActive) {
            return;
        }
        const size = Number(this._list.size);
        if (!skipForward && this._list.bufferedItems.bufferForwardStartIndex <= size &&
            this._list.bufferedItems.forwardBufferedItems.length === 0 &&
            this._list.bufferedItems.bufferForwardStartIndex <= this._list.bufferedItems.bufferBackwardsStartIndex + this._list.getFirstRenderVisibleItemsNr()) {
            this._bufferItemsForward();
        }
        if (this._list.endless) {
            if (!skipBackwards && this._list.bufferedItems.bufferBackwardsStartIndex > 0 &&
                this._list.bufferedItems.backwardsBufferedItems.length === 0 &&
                this._list.bufferedItems.bufferBackwardsStartIndex > this._list.bufferedItems.bufferForwardStartIndex) {
                this._bufferItemsBackwards();
            }
        }
        this._list.bufferedItems.bufferingComplete = this._list.bufferedItems.bufferForwardStartIndex > size ||
            this._list.bufferedItems.bufferForwardStartIndex - 1 === this._list.bufferedItems.bufferBackwardsStartIndex ||
            this._list.bufferedItems.bufferBackwardsStartIndex === 0;
    }
    _appendForwardBufferedItemsToList(currentScrollPos, verticalDir, itemSizeOffset) {
        if (this._list.bufferedItems.forwardBufferedItems.length > 0) {
            const bufferListFragment = document.createDocumentFragment();
            this._list.bufferedItems.forwardBufferedItems = this._list.bufferedItems.forwardBufferedItems.reverse();
            let item = this._list.bufferedItems.forwardBufferedItems.pop();
            while (typeof item !== 'undefined') {
                bufferListFragment.appendChild(item);
                item = this._list.bufferedItems.forwardBufferedItems.pop();
                this._list.appendPosition++;
            }
            this._list.divList.insertBefore(bufferListFragment, this._list.divList.children[this._list.appendPosition]);
            this.bufferItems(false, true);
            this._list.onResizeList();
        }
    }
    maybeAddBufferItems(newPosition) {
        if (this._list.bufferAmount !== null &&
            this._list.bufferAmount > 0) {
            const maxOffset = (this._list.items.length - this._list.getItemsPerPage()) * this._list.getItemSize();
            const isLtr = this._list.isLtr();
            if ((isLtr && newPosition < -maxOffset)
                || (!isLtr && newPosition < maxOffset)) {
                this._appendForwardBufferedItemsToList(newPosition, !this._list.isHorizontal, this._list.bufferAmount);
            }
        }
    }
    _bufferItemsForward() {
        const size = Number(this._list.size);
        const uid = this._list.divList.id;
        const listChildrenLength = this._list.divList.children.length;
        const bufferAmountValue = Number(this._list.bufferAmount);
        let lastBufferedIndex = listChildrenLength + bufferAmountValue;
        if (lastBufferedIndex > size) {
            lastBufferedIndex = size;
        }
        for (let index = listChildrenLength; index < lastBufferedIndex; index++) {
            const item = this._list.templateHelper.processTemplate(uid, index, this._list.templateVars);
            this._list.bufferedItems.forwardBufferedItems.push(item);
        }
        this._list.bufferedItems.bufferForwardStartIndex = lastBufferedIndex + 1;
    }
    _bufferItemsBackwards() {
        const uid = this._list.divList.id;
        let lastBufferedIndex = this._list.bufferedItems.bufferBackwardsStartIndex - Number(this._list.bufferAmount);
        if (lastBufferedIndex < this._list.bufferedItems.bufferForwardStartIndex) {
            lastBufferedIndex = this._list.bufferedItems.bufferForwardStartIndex - 1;
        }
        if (lastBufferedIndex < 0) {
            lastBufferedIndex = 0;
        }
        for (let index = this._list.bufferedItems.bufferBackwardsStartIndex; index > lastBufferedIndex; index--) {
            this._list.bufferedItems.backwardsBufferedItems.push(this._templateHelper.processTemplate(uid, index, this._list.templateVars));
        }
        this._list.bufferedItems.bufferBackwardsStartIndex = lastBufferedIndex;
    }
    _appendBackwardsBufferedItemsToList(currentScrollPos, verticalDir, itemSizeOffset) {
        if (this._list.bufferedItems.backwardsBufferedItems.length > 0) {
            const bufferListFragment = document.createDocumentFragment();
            let item = this._list.bufferedItems.backwardsBufferedItems.pop();
            while (typeof item !== 'undefined') {
                bufferListFragment.appendChild(item);
                item = this._list.bufferedItems.backwardsBufferedItems.pop();
                if (verticalDir) {
                    this._list.divList.scrollTop = itemSizeOffset + currentScrollPos;
                }
                else {
                    this._list.divList.scrollLeft = itemSizeOffset + currentScrollPos;
                }
            }
            this._list.divList.insertBefore(bufferListFragment, this._list.divList.children[this._list.appendPosition]);
            this.bufferItems(true, false);
            this._list.onResizeList();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWxpc3QtYnVmZmVyZWQtaXRlbXMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjaDUtbGlzdC9jaDUtbGlzdC1idWZmZXJlZC1pdGVtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQVNsRSxDQUFDO0FBRUYsTUFBTSxPQUFPLG9CQUFxQixTQUFRLHFCQUFxQjtJQUV2RCxXQUFXLENBQUMsV0FBcUIsRUFBRSxhQUF1QjtRQUNoRSxJQUFJLE9BQU8sV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUNyQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxPQUFPLGFBQWEsS0FBSyxTQUFTLEVBQUU7WUFDdkMsYUFBYSxHQUFHLEtBQUssQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUU7WUFDM0MsT0FBTztTQUNQO1FBQ0QsTUFBTSxJQUFJLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsSUFBSSxJQUFJO1lBQzNFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLHVCQUF1QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUUsRUFBRTtZQUVwSixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUMzQjtRQUdELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEs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