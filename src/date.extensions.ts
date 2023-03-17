export {};

declare global {
    interface Date {
        diffFrom: (date: Date | string) => number;
        textDiffFrom: (date: Date) => string;
        addSeconds: (seconds: number) => Date;
        toUnixTimestamp: () => number;
        format: (format: string, locales?: string | string[], timezoneName?: string) => string;
        getTimezoneOffsetFrom: (timezoneName: string) => number;
    }
}

const SYSTEM_TZ: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

function getTimezoneOffsetString(date: Date, timezoneName: string): string {
  const offset = date.getTimezoneOffsetFrom(timezoneName);
  const hours = Math.floor(Math.abs(offset / 60)).toString().padStart(2, "0");
  const minutes = Math.floor(Math.abs(offset % 60)).toString().padStart(2, "0");

  return `${(offset <= 0 ? '+' : '-')}${hours}:${minutes}`;
}

function getWeekNumber (date: Date){
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
}

Date.prototype.diffFrom = function(date: Date | string): number {
  return (this.getTime() - (new Date(date)).getTime()) / 1e3;
};

Date.prototype.textDiffFrom = function(date: Date): string {
  let delta: number = this.diffFrom(date);
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  const hours = Math.floor(delta / 60 / 60);
  delta -= hours * 60 * 60;
  const minutes = Math.floor(delta / 60);
  delta -= minutes * 60;
  const seconds = Math.round(delta);
  const validValues = [];

  if (days > 0) {
    validValues.push(days > 1 ? `${days} days` : `${days} day`);
  }

  if (hours > 0) {
    validValues.push(hours > 1 ? `${hours} hours` : `${hours} hour`);
  }

  if (minutes > 0) {
    validValues.push(minutes > 1 ? `${minutes} minutes` : `${minutes} minute`);
  }

  if (seconds === 0 && validValues.length === 0) {
    validValues.push('now');
  } else if (seconds > 0 || validValues.length === 0) {
    validValues.push(seconds > 1 ? `${seconds} seconds` : `${seconds} second`);
  }

  return validValues.join(', ');
};

Date.prototype.addSeconds = function(seconds: number): Date {
  this.setTime(this.getTime() + (seconds * 1e3));

  return this;
};

Date.prototype.toUnixTimestamp = function(): number {
  return (this.getTime()) / 1e3;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore:
Date.prototype.format = function (format: string, locales: string | string[] = 'default', timezoneName: string = SYSTEM_TZ): string {
  // Create time to specific timezone
  const date: Date = new Date(this.toLocaleString('en-US', {
    timeZone: timezoneName,
  }));

  return format.replace(/[A-Za-z]{1,2}/g, (part: any) => {
    switch (part) {
    case 'Y': return date.getFullYear().toString().slice(-2);

    case 'YY': return date.getFullYear();

    case 'M': return (1 + date.getMonth());

    case 'MM': return `0${1 + date.getMonth()}`.slice(-2);

    case 'b': return date.toLocaleString(locales, { month: 'short' });

    case 'B': return date.toLocaleString(locales, { month: 'long' });

    case 'D': return date.getDate();

    case 'DD': return `0${date.getDate()}`.slice(-2);

    case 'w': return date.getDay();

    case 'W': return getWeekNumber(date);

    case 'H': return date.getHours();

    case 'HH': return `0${date.getHours()}`.slice(-2);

    case 'h': return (date.getHours() % 12) ? date.getHours() % 12 : 12;

    case 'hh': return `0${(date.getHours() % 12) ? date.getHours() % 12 : 12}`.slice(-2);

    case 'a': return date.getHours() >= 12 ? 'pm' : 'am';

    case 'A': return date.getHours() >= 12 ? 'PM' : 'AM';

    case 'm': return date.getMinutes();

    case 'mm': return `0${date.getMinutes()}`.slice(-2);

    case 's': return date.getSeconds();

    case 'ss': return `0${date.getSeconds()}`.slice(-2);

    case 'S': return date.getMilliseconds();

    case 'SS': return `00${date.getSeconds()}`.slice(-3);

    case 'z': return date.getTimezoneOffsetFrom(timezoneName);

    case 'Z': return getTimezoneOffsetString(date, timezoneName);

    case 'X': return Math.floor(date.getTime() / 1000);

    default: return part.slice (part.length); // unknown code, remove
    }
  });
};

// @TODO: This should be "getUTCOffsetFrom"
Date.prototype.getTimezoneOffsetFrom = function (timezoneName: string): number {
  // Create time in UTC timezone
  const utcDate = new Date(this.toLocaleString('en-US', {
    timeZone: 'UTC',
  }));

  // Create time to specific timezone
  const date: Date = new Date(this.toLocaleString('en-US', {
    timeZone: timezoneName,
  }));

  return (utcDate.getTime() - date.getTime()) / (60 * 1000);
};
