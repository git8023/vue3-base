import { Arrays, fns, Functions } from '@hyong8023/tool-box';

export class Channel {
  public static readonly $ = new Channel();

  /**
   * 测试
   */
  TEST = Symbol('TEST');

  /** 重新登录 */
  REDO_LOGIN = Symbol('REDO_LOGIN');
}

type BroadcastHandler = fns.Consume<any>;
type BroadcastHandlers = BroadcastHandler[];

export class Broadcast {
  /**
   * 订阅关系
   *
   * K - 频道
   *
   * V - 处理器
   */
  subscribers = new Map<Symbol, BroadcastHandlers>();

  /**
   * 发送事件
   * @param channel 频道
   * @param args 事件参数
   */
  emit(
    channel: keyof Channel,
    args?: any,
  ): Broadcast {
    const handlers = this.get(channel);
    Arrays.foreach(handlers, ({ item }) => {
      Functions.call(item, args);
    });
    return this;
  }

  /**
   * 监听
   * @param channel 频道
   * @param fn 处理函数
   * @param [immediate=false] 是否立即执行一次
   */
  on(
    channel: keyof Channel,
    fn: BroadcastHandler,
    immediate = false,
  ): Broadcast {
    this.get(channel).push(fn);
    if (immediate) {
      Functions.call(fn);
    }
    return this;
  }

  /**
   * 取消监听
   * @param channel 频道
   * @param fn 处理函数
   */
  off(
    channel: keyof Channel,
    fn: BroadcastHandler,
  ): Broadcast {
    const handlers = this.get(channel);
    Arrays.remove(handlers, fn);
    return this;
  }

  /**
   * 获取处理器数组
   * @param channel 频道
   * @private
   */
  private get(channel: keyof Channel): BroadcastHandlers {
    const key = Channel.$[channel];
    let handlers = this.subscribers.get(key);
    if (!handlers) this.subscribers.set(key, handlers = []);
    return handlers;
  }
}

export const broadcast = new Broadcast();
