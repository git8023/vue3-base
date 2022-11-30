import { App } from 'vue';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import '@hyong8023/tool-box/dist/style.css';
import { DataPool } from '@hyong8023/tool-box';
import axiosServe from '@/net-serve/axios-serve';
import vueGlobalProp from '@/plugins/vue-global-prop';

export default {
  install(app: App) {
    // element-plus
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
    app.use(ElementPlus);

    // axios
    DataPool.set('AXIOS_SERVICE', axiosServe);

    // global-properties
    app.use(vueGlobalProp);
  },
};
