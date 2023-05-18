export class LocalStorage {
  getItem<T>(key: string, init?: T): T | undefined {
    return Storage.getItem<T>(key, init)
  }

  setItem<T>(key: string, item: T): boolean {
    return Storage.setItem<T>(key, item)
  }

  remove(key: string): boolean {
    return Storage.remove(key)
  }

  clear(): boolean {
    return Storage.clear()
  }
}

export class Storage {
  static getItem<T>(key: string, init?: T): T | undefined {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : init;
    } catch (err) {
      console.log('error get item', err);
      return init;
    }
  }

  static setItem<T>(key: string, item: T): boolean {
    try {
      window.localStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (err) {
      console.log('error set item', err);
      return false;
    }
  }

  static remove(key: string): boolean {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.log('error remove item', err);
      return false;
    }
  }

  static clear(): boolean {
    try {
      window.localStorage.clear();
      return true;
    } catch (err) {
      console.log('error clear storage', err);
      return false;
    }
  }
}