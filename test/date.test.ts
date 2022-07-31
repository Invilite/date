import "../src/date.extensions";

describe('diffFrom', () => {
  test('should accept date in parameter as a string (and return 0)', () => {
    const date = new Date("04-18-2022 14:30:00 GMT");
    expect(date.diffFrom("04-18-2022 14:30:00 GMT")).toBe(0);
  });

  test('should return zero if date in parameter is same date', () => {
    const date = new Date("04-18-2022 14:30:00 GMT");
    expect(date.diffFrom(date)).toBe(0);
  });

  test('should return 3600 if date in parameter is one hour earlier', () => {
    const date = new Date("04-18-2022 14:30:00 GMT");
    const laterDate = new Date("04-18-2022 13:30:00 GMT");
    expect(date.diffFrom(laterDate)).toBe(3600);
  });

  test('should return -3600 if date in parameter is one timezone earlier', () => {
    const date = new Date("04-18-2022 14:30:00 +02:00");
    const laterDate = new Date("04-18-2022 14:30:00 +01:00");
    expect(date.diffFrom(laterDate)).toBe(-3600);
  });

  test('should return 1 if date in parameter is one second earlier', () => {
    const date = new Date("04-18-2022 14:30:00 +02:00");
    const laterDate = new Date("04-18-2022 14:29:59 +02:00");
    expect(date.diffFrom(laterDate)).toBe(1);
  });

  test('should return -1 if date in parameter is one second later', () => {
    const date = new Date("04-18-2022 14:30:00 +02:00");
    const laterDate = new Date("04-18-2022 14:30:01 +02:00");
    expect(date.diffFrom(laterDate)).toBe(-1);
  });
});

describe('addSeconds', () => {
  test('should add 1 second to date when param is 1', () => {
    const date = new Date("1970-01-01T00:00:00.000Z");
    expect(date.addSeconds(1).toISOString()).toBe("1970-01-01T00:00:01.000Z");
  });

  test('should add 1 hour to date when param is 3600', () => {
    const date = new Date("1970-01-01T00:00:00.000Z");
    expect(date.addSeconds(3600).toISOString()).toBe("1970-01-01T01:00:00.000Z");
  });

  test('should subtract 1 hour from date when param is -3600', () => {
    const date = new Date("1970-01-01T01:00:00.000Z");
    expect(date.addSeconds(-3600).toISOString()).toBe("1970-01-01T00:00:00.000Z");
  });
});

describe('toUnixTimestamp', () => {
  test('should return 0 for January 1st, 1970', () => {
    const date = new Date("01-01-1970 00:00:00.000 UTC");
    expect(date.toUnixTimestamp()).toBe(0);
  });

  test('should return 1650292200 for Monday, 18 April 2022 12:30:00 +02:00', () => {
    const date = new Date("2022-04-18 14:30:00 +02:00");
    expect(date.toUnixTimestamp()).toBe(1650285000);
  });
});

describe('format', () => {
  test('should return formatted date for "YY-MM-DD HH:mm:ss" string', () => {
    const date = new Date("04-18-2022 14:30:00");
    expect(date.format("YY-MM-DD HH:mm:ss")).toBe("2022-04-18 14:30:00");
  });

  test('should return formatted date for "Y-M-D H:m:s" string', () => {
    const date = new Date("04-18-2022 04:03:00");
    expect(date.format("Y-M-D H:m:s")).toBe("22-4-18 4:3:0");
  });

  test('should return formatted date for "YY-MM-D HH:mm:ss.S" string', () => {
    const date = new Date("04-08-2022 14:30:00");
    expect(date.format("YY-MM-D HH:mm:ss.S")).toBe("2022-04-8 14:30:00.0");
  });

  test('should return formatted date for "YY-MM-D HH:mm:ss.SS" string', () => {
    const date = new Date("04-08-2022 14:30:00");
    expect(date.format("YY-MM-D HH:mm:ss.SS")).toBe("2022-04-8 14:30:00.000");
  });

  test('should return formatted date for "YYMMDDHHmmss" string', () => {
    const date = new Date("04-18-2022 14:30:00");
    expect(date.format("YYMMDDHHmmss")).toBe("20220418143000");
  });

  test('should return formatted date for "YY-MMMM-DDD HH:mm:ss" string', () => {
    const date = new Date("04-8-2022 14:30:00");
    expect(date.format("YY-MMMM-DDD HH:mm:ss")).toBe("2022-0404-088 14:30:00");
  });

  test('should return formatted date for "YY-MM-DD HH:mm:ss z" string', () => {
    const date = new Date("04-18-2022 14:30:00");
    date.getTimezoneOffset = () => 360;    // Mock local timezone
    expect(date.format("YY-MM-DD HH:mm:ss z")).toBe("2022-04-18 14:30:00 360");
  });

  test('should return formatted date for "YY-MM-DD HH:mm:ss z" string', () => {
    const date = new Date("04-18-2022 14:30:00");
    date.getTimezoneOffset = () => 360;    // Mock local timezone
    expect(date.format("YY-MM-DD HH:mm:ss Z")).toBe("2022-04-18 14:30:00 -06:00");
  });

  test('should return formatted date for "YY-MM-DD HH:mm:ss z" string', () => {
    const date = new Date("2022-04-18 14:30:00");
    date.getTimezoneOffset = () => 360;    // Mock local timezone
    expect(date.format("YY-MM-DD HH:mm:ss Z")).toBe("2022-04-18 14:30:00 -06:00");
  });

  test('should return formatted date for "YY-MM-DD HH:mm:ss z" string and positive timezone', () => {
    const date = new Date("2022-04-18 14:30:00");
    date.getTimezoneOffset = () => -600;    // Mock local timezone
    expect(date.format("YY-MM-DD HH:mm:ss Z")).toBe("2022-04-18 14:30:00 +10:00");
  });

  test('should return formatted date for "YY-MM-DD HH:mm:ss z" string and negative timezone', () => {
    const date = new Date("2022-04-18 14:30:00");
    date.getTimezoneOffset = () => 600;    // Mock local timezone
    expect(date.format("YY-MM-DD HH:mm:ss Z")).toBe("2022-04-18 14:30:00 -10:00");
  });

  test('should return formatted date for "YY-MM-DD aaHH:mm:ss z" string', () => {
    const date = new Date("2022-04-18 14:30:00");
    date.getTimezoneOffset = () => 240;    // Mock local timezone
    expect(date.format("YY-MM-DD aaHH:mm:ss Z")).toBe("2022-04-18 14:30:00 -04:00");
  });

  test('should return formatted date for "YY-MM-DD h:mm:ss a" string for post meridiem', () => {
    const date = new Date("2022-04-18 14:30:00");
    date.getTimezoneOffset = () => 240;    // Mock local timezone
    expect(date.format("YY-MM-DD h:mm:ss a")).toBe("2022-04-18 2:30:00 pm");
  });

  test('should return formatted date for "YY-MM-DD hh:mm:ss A" string for post meridiem', () => {
    const date = new Date("2022-04-18 14:30:00");
    date.getTimezoneOffset = () => 240;    // Mock local timezone
    expect(date.format("YY-MM-DD hh:mm:ss A")).toBe("2022-04-18 02:30:00 PM");
  });

  test('should return formatted date for "YY-MM-DD h:mm:ss a" string for ante meridiem', () => {
    const date = new Date("2022-04-18 03:10:00");
    date.getTimezoneOffset = () => 240;    // Mock local timezone
    expect(date.format("YY-MM-DD h:mm:ss a")).toBe("2022-04-18 3:10:00 am");
  });

  test('should return formatted date for "YY-MM-DD hh:mm:ss A" string for ante meridiem', () => {
    const date = new Date("2022-04-18 03:10:00");
    date.getTimezoneOffset = () => 240;    // Mock local timezone
    expect(date.format("YY-MM-DD hh:mm:ss A")).toBe("2022-04-18 03:10:00 AM");
  });

  test('should return short formatted month name for "b" string', () => {
    const date = new Date("2022-04-18 18:30:00");
    expect(date.format("b", "en-US")).toBe('Apr');
  });

  test('should return short formatted month name for "B" string', () => {
    const date = new Date("2022-04-18 18:30:00");
    expect(date.format("B", "en-US")).toBe('April');
  });

  test('should return "30" for "w" string and date 31.07.2022', () => {
    const date = new Date("2022-07-31 18:30:00");
    expect(date.format("w")).toBe('30');
  });

  test('should return "31" for "w" string and date 1.08.2022', () => {
    const date = new Date("2022-08-1 18:30:00");
    expect(date.format("w")).toBe('31');
  });
});

describe('textDiffFrom', () => {
  test('should return "now" when both date are same', () => {
    const date = new Date("2022-04-18 14:30:00");
    expect(date.textDiffFrom(date)).toBe('now');
  });

  test('should return "1 second" when second date is one second in the past', () => {
    const date = new Date("2022-04-18 14:30:01");
    const futureDate = new Date("2022-04-18 14:30:00");
    expect(date.textDiffFrom(futureDate)).toBe('1 second');
  });

  test('should return "10 seconds" when second date is one second in the past', () => {
    const date = new Date("2022-04-18 14:30:10");
    const futureDate = new Date("2022-04-18 14:30:00");
    expect(date.textDiffFrom(futureDate)).toBe('10 seconds');
  });

  test('should return "1 minute" when second date is one minute in the past', () => {
    const date = new Date("2022-04-18 14:31:00");
    const futureDate = new Date("2022-04-18 14:30:00");
    expect(date.textDiffFrom(futureDate)).toBe('1 minute');
  });

  test('should return "10 minutes" when second date is ten minutes in the past', () => {
    const date = new Date("2022-04-18 14:40:00");
    const futureDate = new Date("2022-04-18 14:30:00");
    expect(date.textDiffFrom(futureDate)).toBe('10 minutes');
  });

  test('should return "1 hour" when second date is one hour in the past', () => {
    const date = new Date("2022-04-18 15:30:00");
    const futureDate = new Date("2022-04-18 14:30:00");
    expect(date.textDiffFrom(futureDate)).toBe('1 hour');
  });

  test('should return "10 hours" when second date is ten hours in the past', () => {
    const date = new Date("2022-04-18 14:30:00");
    const futureDate = new Date("2022-04-18 4:30:00");
    expect(date.textDiffFrom(futureDate)).toBe('10 hours');
  });

  test('should return "1 hour, 20 minutes" when second date is one hour and 20 minutes in the past', () => {
    const date = new Date("2022-04-18 15:50:00");
    const futureDate = new Date("2022-04-18 14:30:00");
    expect(date.textDiffFrom(futureDate)).toBe('1 hour, 20 minutes');
  });

  test('should return "1 day" when second date is one day in the past', () => {
    const date = new Date("2022-04-18 14:30:00");
    const futureDate = new Date("2022-04-17 14:30:00");
    expect(date.textDiffFrom(futureDate)).toBe('1 day');
  });

  test('should return "10 days" when second date is ten days in the past', () => {
    const date = new Date("2022-04-18 14:30:00");
    const futureDate = new Date("2022-04-08 14:30:00");
    expect(date.textDiffFrom(futureDate)).toBe('10 days');
  });

  test('second part should be rounded down', () => {
    const now = new Date();
    const value = now.textDiffFrom((new Date()).addSeconds(-6005.1));
    expect(value).toBe('1 hour, 40 minutes, 5 seconds');
  });

  test('second part should be rounded up', () => {
    const now = new Date();
    const value = now.textDiffFrom((new Date()).addSeconds(-6005.9));
    expect(value).toBe('1 hour, 40 minutes, 6 seconds');
  });
});