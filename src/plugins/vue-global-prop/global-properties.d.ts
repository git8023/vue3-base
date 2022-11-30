import { fns } from '@hyong8023/tool-box';
import { Pipe } from '@/plugins/vue-global-prop/pipe';
import { broadcast } from '@/plugins/vue-global-prop/broadcast';
import { Config } from '@/plugins/vue-global-prop/config';
import { Vmx } from '@/plugins/vue-global-prop/vmx';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    /**
     * 管道
     */
    pipe$: fns.Handler<any | funcs.IProducer<any>, Pipe>,

    /**
     * 配置
     */
    config$: typeof Config,

    /**
     *  全局广播
     */
    broadcast$: broadcast,

    /**
     * vm增强
     */
    vmx$: fns.Handler<any, Vmx>,

  }
}
