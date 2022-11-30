import axios, { AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import qs from 'qs';
import { Jsons, Logs, vo } from '@hyong8023/tool-box';
import user from '@/store/mod/user';
import { enums } from '@/type/enums';
import { broadcast } from '@/plugins/vue-global-prop/broadcast';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

// 请求拦截
service.interceptors.request.use((req) => {
  req.params = Jsons.compact(req.params);
  const httpMethod = req.method?.toUpperCase();
  Logs.info('[>>]', httpMethod, req.url, req.params, req.data);

  // 添加请求头
  req.headers!.authorization = user.state.token;

  if (httpMethod === 'GET') {
    req.paramsSerializer = {
      serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    };
  }

  return req;
}, (err) => {
  Logs.error('Request Error', err);
});

let notLoginDialog = false;
// 响应拦截
service.interceptors.response.use((resp: AxiosResponse<vo.R>) => {
  Logs.info('[<<]', resp.config.method!.toUpperCase(), resp.config.url, resp.data);

  const { data } = resp;
  if (data.code === enums.RCode.OK) return resp;

  // 登录已过期或未登录
  switch (data.code as enums.RCode) {
    // 登录跳转错误
    case enums.RCode.LOGIN_EXPIRED:
    case enums.RCode.NON_LOGIN: {
      const msg = data.message || '用户未登录或状态已过期';
      Logs.warn(msg, data);
      if (!notLoginDialog) {
        notLoginDialog = true;

        ElMessageBox.confirm(msg, '登录提示', {
          type: 'warning',
          confirmButtonText: '重新登录',
          cancelButtonText: '关闭',
          showClose: false,
          showCancelButton: false,
        })
          .then(() => broadcast.emit('REDO_LOGIN'))
          .catch(() => Logs.debug('保持当前页面'))
          .finally(() => notLoginDialog = false);
      }
      break;
    }

    // 提示性错误
    default:
      // 其他错误
      ElMessage({
        type: 'error',
        message: data.message,
      });
  }

  return Promise.reject(Error(`数据状态不是 enums.RCode.OK[${enums.RCode.OK}]`));
}, (err) => {
  // 超时
  const isTimeout = err.message.includes('timeout');
  if (isTimeout) {
    const message = '服务器响应超时';
    Logs.error(message);
    ElMessage.error({
      message,
      grouping: true,
    });
    return Promise.reject();
  }

  // 404
  const status = err.response && err.response.status;
  if (status === 404) {
    Logs.error('404: 请求接口不存在', err);
    ElMessage.error({
      message: '服务器忙, 请稍候再试',
      grouping: true,
    });
    return Promise.reject();
  }

  ElMessage.error({
    message: '服务器忙, 请稍候再试',
    grouping: true,
  });
  Logs.error('Response Error:', err.message, err);
  return Promise.reject();
});

export default service;
