export {};

declare global {
    interface Date {
        diffFrom: (date: Date | string) => number;
        textDiffFrom: (date: Date) => string;
        addSeconds: (seconds: number) => Date;
        toUnixTimestamp: () => number;
        format: (format: string, locales?: string | string[]) => string;
    }
}

function getTimezoneOffsetString(date: Date): string {
  const offset = date.getTimezoneOffset();
  const hours = Math.floor(Math.abs(offset / 60)).toString().padStart(2, "0");
  const minutes = Math.floor(Math.abs(offset % 60)).toString().padStart(2, "0");

  return `${(offset <= 0 ? '+' : '-')}${hours}:${minutes}`;
}

Date.prototype.diffFrom = function(date: Date | string = new Date()): number {
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

Date.prototype.format = function (format: string, locales: string | string[] = 'default'): string {
  return format.replace(/[A-Za-z]{1,2}/g, (part: any) => {
    switch (part) {
    case 'Y': return this.getFullYear().toString().slice(-2);

    case 'YY': return this.getFullYear();

    case 'M': return (1 + this.getMonth());

    case 'MM': return `0${1 + this.getMonth()}`.slice(-2);

    case 'b': return this.toLocaleString(locales, { month: 'short' });

    case 'B': return this.toLocaleString(locales, { month: 'long' });

    case 'D': return this.getDate();

    case 'DD': return `0${this.getDate()}`.slice(-2);

    case 'H': return this.getHours();

    case 'HH': return `0${this.getHours()}`.slice(-2);

    case 'h': return (this.getHours() % 12) ? this.getHours() % 12 : 12;

    case 'hh': return `0${(this.getHours() % 12) ? this.getHours() % 12 : 12}`.slice(-2);

    case 'a': return this.getHours() >= 12 ? 'pm' : 'am';

    case 'A': return this.getHours() >= 12 ? 'PM' : 'AM';

    case 'm': return this.getMinutes();

    case 'mm': return `0${this.getMinutes()}`.slice(-2);

    case 's': return this.getSeconds();

    case 'ss': return `0${this.getSeconds()}`.slice(-2);

    case 'S': return this.getMilliseconds();

    case 'SS': return `00${this.getSeconds()}`.slice(-3);

    case 'z': return this.getTimezoneOffset();

    case 'Z': return getTimezoneOffsetString(this);

    default: return part.slice (part.length); // unknown code, remove
    }
  });
};
