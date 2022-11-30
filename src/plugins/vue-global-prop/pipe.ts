import {
  Dates, fns, Functions, Jsons, Validation,
} from '@hyong8023/tool-box';

export class Pipe<R = any> {
  private val!: any;
  private isEnd = false;

  constructor(private readonly og: fns.OrGetter<R>) {
    this.val = Functions.execOrGetter(og);
  }

  static of<R>(og: fns.OrGetter<R>) {
    return new Pipe(og);
  }

  get value() {
    return this.val;
  }

  get isNil() {
    return Validation.isNullOrUndefined(this.val);
  }

  get isTruthy() {
    return Validation.notNullOrUndefined(this.val) && !!this.val;
  }

  get isFalsy() {
    return !this.isTruthy;
  }

  toString(): string {
    return `${this.val}`;
  }

  /**
   * 手动标记结束
   * @param fn 处理结束标记, 如果值为true则后续所有逻辑都将跳过
   */
  ifEnd(fn: fns.Handler<any, boolean>): Pipe {
    this.isEnd = fn(this.val);
    return this;
  }

  /**
   * 值为 null|undefined 处理结束, 设置为默认值
   * @param val 默认值
   * @see ezt.validators.isNullOrUndefined
   */
  ifNilEnd(val: any): Pipe {
    const { isNil } = this;
    return this.ifNil(val).ifEnd(() => isNil);
  }

  /**
   * 当前值为 null|undefined 设置为参数值
   * @param val 默认值
   */
  ifNil(val: any): Pipe {
    if (this.isEnd) return this;

    if (this.isNil) this.val = val;
    return this;
  }

  /**
   * 如果当前值为 null|undefined|''|[] 设置为参数值
   * @param val 默认值
   */
  ifEmpty(val: any): Pipe {
    if (this.isEnd) return this;
    if (Validation.isEmpty(this.val)) {
      this.val = val;
    }
    return this;
  }

  /**
   * 日期格式化
   * @param toFmt 目标格式
   * @param [srcFmt] 原数据格式
   */
  dateFmt(
    toFmt = 'yyyy-MM-dd HH:mm:ss',
    srcFmt: string | undefined = undefined,
  ): Pipe {
    if (this.isEnd) return this;

    if (srcFmt) {
      this.val = Dates.datePoF(this.val, srcFmt, toFmt);
    } else {
      this.val = Dates.dateFmt(this.val, toFmt);
    }
    return this;
  }

  /**
   * ognl表达式查找数据值
   * @param key 属性链
   * @param [defVal] 查找失败默认值
   */
  seek(
    key: (keyof R) | string | Pipe,
    defVal?: any,
  ): Pipe {
    if (this.isEnd) return this;
    if (Validation.isNullOrUndefined(key)) {
      this.val = undefined;
      return this;
    }
    this.val = Jsons.get(this.val, `${key}`) || defVal;
    return this;
  }

  /**
   * 状态中文映射
   * @param key 状态key
   * @param defVal 映射失败时默认值
   */
  status(
    key: string,
    defVal?: any,
  ): Pipe {
    return this.seek(key).ifNilEnd(defVal).seek('name');
  }

  /**
   * 返回自定义值
   * @param fn 自定义数据处理逻辑
   * @param [isBroken=true] 是否中断Pipe实例
   */
  tryBroken<R>(
    fn: fns.Handler<any, R>,
    isBroken = true,
  ): Pipe | R {
    const val = Functions.call(fn, this.val);
    if (isBroken) {
      this.isEnd = true;
      return this.val;
    }

    this.val = val;
    return this;
  }
}
