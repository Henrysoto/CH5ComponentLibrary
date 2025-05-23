import { LogLevelEnum } from '../enums/index';
export class LogMessage {
    constructor(data, logFilter) {
        this.date = {};
        this.level = LogLevelEnum.info;
        this.message = '';
        this.source = '';
        const currentDate = new Date();
        this.date = currentDate;
        this.message = data.message;
        this.level = data.level;
        this.source = data.source;
    }
    getStringTime() {
        const hours = this.date.getHours();
        const minutes = this.date.getMinutes();
        const seconds = this.date.getSeconds();
        return `[${hours}:${minutes}:${seconds}]`;
    }
    toString() {
        return `[level ${this.level}][${this.source}] ${this.getStringTime()} - ${this.message}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1sb2dnZXIvaGVscGVycy9Mb2dNZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc5QyxNQUFNLE9BQU8sVUFBVTtJQVFuQixZQUFZLElBQWMsRUFBRSxTQUE0QjtRQU5qRCxTQUFJLEdBQVMsRUFBVSxDQUFDO1FBQ2YsVUFBSyxHQUFpQixZQUFZLENBQUMsSUFBSSxDQUFDO1FBQ3hDLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUtoQyxNQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzlCLENBQUM7SUFFUyxhQUFhO1FBQ25CLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN2QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXZDLE9BQU8sSUFBSSxLQUFLLElBQUksT0FBTyxJQUFJLE9BQU8sR0FBRyxDQUFDO0lBQzlDLENBQUM7SUFFTSxRQUFRO1FBQ1gsT0FBTyxVQUFVLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsYUFBYSxFQUFFLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdGLENBQUM7Q0FDSiJ9