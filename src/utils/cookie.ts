export default class Cookie {
  public static Set(key: string, value: string, expires?: Date) {
    let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    if (expires) { cookie += `; expires=${expires.toUTCString()}`; }
    document.cookie = cookie;
  }

  public static Get(key: string): string {
    for (const cookie of document.cookie.split(';')) {
      const cookieKeyValue = cookie.split('=');
      if (decodeURIComponent(cookieKeyValue[0].trim()) === key && cookieKeyValue[1]) {
        return decodeURIComponent(cookieKeyValue[1].trim());
      }
    }
    return '';
  }

  public static Delete(key: string) {
    const date = new Date();
    date.setFullYear(1970);
    document.cookie = `${key}=; expires=${date.toUTCString()}`;
  }
}
