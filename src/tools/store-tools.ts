import { Module } from 'vuex';

export class StoreTools {
  static namespace<T extends Module<T, any>>(mod: T) {
  }
}
