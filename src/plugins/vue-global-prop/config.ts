/** 配置属性 */
export class Config {
  /**
   * 项目版本
   */
  static get uiVersion() {
    return process.env.VUE_APP_VERSION;
  }
}
