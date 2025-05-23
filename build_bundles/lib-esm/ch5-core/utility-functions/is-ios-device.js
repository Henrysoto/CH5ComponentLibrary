export function isIosDevice() {
    if ((window.navigator.platform === 'iPad' || window.navigator.platform === 'iPhone') && navigator.maxTouchPoints >= 1) {
        if (/iPad|iPhone/.test(window.navigator.userAgent)) {
            return true;
        }
    }
    else if (window.navigator.platform === 'MacIntel') {
        if (/Macintosh/.test(window.navigator.userAgent)) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtaW9zLWRldmljZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb3JlL3V0aWxpdHktZnVuY3Rpb25zL2lzLWlvcy1kZXZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsTUFBTSxVQUFVLFdBQVc7SUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxLQUFLLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUMsY0FBYyxJQUFJLENBQUMsRUFBRTtRQUNySCxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNsRCxPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7U0FBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRTtRQUNuRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNoRCxPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMifQ==