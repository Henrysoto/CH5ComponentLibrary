export class OrientationHelper {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    hasOrientationChanged() {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        const hasChanged = this.isPortrait(this.width, this.height) !== this.isPortrait(newWidth, newHeight);
        this.width = newWidth;
        this.height = newHeight;
        return hasChanged;
    }
    isPortrait(width, height) {
        return width < height;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JpZW50YXRpb24taGVscGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWNvbW1vbi91dGlscy9vcmllbnRhdGlvbi1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYUEsTUFBTSxPQUFPLGlCQUFpQjtJQUkxQixZQUFtQixLQUFhLEVBQUUsTUFBYztRQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBTU0scUJBQXFCO1FBQ3hCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDbkMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3JHLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBRXhCLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFPTyxVQUFVLENBQUMsS0FBYSxFQUFFLE1BQWM7UUFDNUMsT0FBTyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7Q0FDSiJ9