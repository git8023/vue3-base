import { App } from 'vue';
import { broadcast } from '@/plugins/vue-global-prop/broadcast';
import { Pipe } from '@/plugins/vue-global-prop/pipe';
import { Config } from '@/plugins/vue-global-prop/config';
import { Vmx } from '@/plugins/vue-global-prop/vmx';

export default {
  install(app: App, options: any) {
    app.config.globalProperties.pipe$ = Pipe.of;
    app.config.globalProperties.config$ = Config;
    app.config.globalProperties.broadcast$ = broadcast;
    app.config.globalProperties.vmx$ = Vmx.of;
  },
};
