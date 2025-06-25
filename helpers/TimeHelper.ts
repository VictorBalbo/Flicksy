export class TimeHelper {
  static formatMinutesToTime(minutes: number): string {
    if (minutes <= 0) return "0m";

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (remainingMinutes > 0) parts.push(`${remainingMinutes}m`);

    return parts.join(" ");
  }
}
