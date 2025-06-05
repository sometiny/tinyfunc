export interface Token {
  accessToken: string;
  expires: number;
}

/**
 * storage封装
 * @param key
 * @param value
 */
export function storage(key: string, value: string | null | undefined = undefined): string | null {
  if (value === undefined) {
    return localStorage.getItem(key);
  }
  if (value === null) {
    localStorage.removeItem(key);
    return null;
  }
  localStorage.setItem(key, value);
  return null;
}

/**
 * access_token封装
 * @param name
 * @param token
 */
export function accessToken(name: string, token: Token | null | undefined = undefined): string | null | undefined {
  if (token === undefined) {
    const access_token = storage(name);
    const access_token_expires = parseInt(storage(name + '_expires') || '0');
    if (access_token && access_token_expires > +new Date()) {
      return access_token;
    }
    return null;
  }
  if (token === null) {
    storage(name, null);
    storage(name + '_expires', null);
    return;
  }
  storage(name, token.accessToken);
  storage(name + '_expires', ((token.expires - 60) * 1000).toString());
}

export function debounce(fn: Function, timeout: number) {
  let timer = 0;
  return function (this: any) {
    if (timer) window.clearTimeout(timer);
    const args = arguments,
      that = this;
    timer = window.setTimeout(function () {
      fn.apply(that, args);
    }, timeout);
  };
}
export function arrayColumn<T>(source: Array<any>, valueKey: string | null, indexKey?: string | Function | null): Record<string, T> | T[] {
  if (!indexKey) {
    if (!valueKey) throw new Error('must provide valueKey');
    return source.map(t => t[valueKey]);
  }
  if (typeof indexKey === 'string')
    indexKey = (k => {
      return (t: any) => t[k];
    })(indexKey);
  const result: Record<string, T> = {};

  source.forEach(t => {
    result[indexKey(t)] = valueKey ? t[valueKey] : t;
  });
  return result;
}

function findArrayOfContainer(container: any, keys: Array<any>) {
  const lastIndex = keys.length - 1;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (lastIndex === i) {
      if (!container[key]) container[key] = [];
      return container[key];
    }
    if (!container[key]) container[key] = {};
    container = container[key];
  }
}

export function arrayGroupBy<T>(
  source: Array<T>,
  indexKey: (t: T) => any,
  valueKey: (t: T) => any = (t: T) => t,
  valuesFilter: ((value: any, index: number, array: any[]) => void) | undefined = undefined
): Record<any, Array<any>> {
  const result: Record<any, Array<any>> = {};

  const valuesContainer: any[] = [];

  source.forEach(t => {
    const index = indexKey(t);
    const value = valueKey(t);

    if (!(index instanceof Array)) {
      if (!result[index]) {
        result[index] = [];
        if (!!valuesFilter) valuesContainer.push(result[index]);
      }
      result[index].push(value);
      return;
    }

    if (index.length === 0 || index.length > 2) throw new Error('最多支持二级分组');

    const container = findArrayOfContainer(result, index);
    if (!!valuesFilter && !valuesContainer.includes(container)) valuesContainer.push(container);

    container.push(value);
  });
  if (!!valuesFilter) valuesContainer.forEach(valuesFilter);
  return result;
}

export function deepClone<T>(source: T): T {
  if (!source || typeof source !== 'object') {
    return source;
  }
  const targetObj: any = Array.isArray(source) ? [] : {};
  Object.keys(source as object).forEach(key => {
    const value = (source as any)[key];
    if (value && typeof value === 'object') {
      targetObj[key] = deepClone(value);
    } else {
      targetObj[key] = value;
    }
  });
  return targetObj;
}

export function sleep(timeout: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve, timeout);
  });
}

const WEEK_NAMES = [
  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
];
const MONTH_NAMES = [
  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''],
];

const valueGetters: Record<string, (date: Date) => string | number> = {
  dddd: date => WEEK_NAMES[0][date.getDay()],
  ddd: date => WEEK_NAMES[1][date.getDay()],
  MMMM: date => MONTH_NAMES[0][date.getMonth()],
  MMM: date => MONTH_NAMES[1][date.getMonth()],
  yyyy: date => date.getFullYear(),
  M: date => date.getMonth() + 1,
  MM: date => ('0' + (date.getMonth() + 1)).slice(-2),
  d: date => date.getDate(),
  dd: date => ('0' + date.getDate()).slice(-2),
  HH: date => ('0' + date.getHours()).slice(-2),
  h: date => date.getHours(),
  m: date => date.getMinutes(),
  mm: date => ('0' + date.getMinutes()).slice(-2),
  s: date => date.getSeconds(),
  ss: date => ('0' + date.getSeconds()).slice(-2),
  tttt: date => date.getMilliseconds(),
};

export const formatDateTime = (format: string, dateTime: any = undefined) => {
  if (dateTime && !(dateTime instanceof Date)) return dateTime;
  const regexp = /(yyyy|mmmm|mmm|mm|dddd|ddd|dd|hh|ss|tttt|m|d|h|s)/gi;
  dateTime = dateTime || new Date();
  return format.replace(regexp, (diff: string) => (valueGetters[diff] || (date => diff))(dateTime).toString());
};
