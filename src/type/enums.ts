export namespace enums {

  /** 服务器响应码 */
  export enum RCode {
    // OK = 200,
    // NOT_LOGIN = 5001,
    // FAILED = 5002,

    /** 处理成功 */
    OK = 200,

    /** 参数错误 */
    INVALID_PARAM = 400,

    /** 未授权 */
    UNAUTHORIZED = 401,

    /** HTTP错误 */
    FORBIDDEN = 403,

    /**
     * 无数据
     */
    NOT_FOUND = 404,

    /**
     * 非法操作
     */
    INVALID_OPERATE = 406,

    /**
     * 未登录
     */
    LOGIN_INVALID = 482,

    /** 登录失效 */
    LOGIN_EXPIRED = 481,

    /** 用户未登录 */
    NON_LOGIN = 480,

    /** 系统错误 */
    SYS_ERROR = 500,

    /** 云端操作错误 */
    CLOUD_ERROR = 600,
  }
}
