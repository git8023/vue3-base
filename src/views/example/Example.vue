<template>
  <div class="root dc-box-padding-3x">
    <el-button type="primary" @click="setStore()">Set Token</el-button>
    <el-button type="primary" @click="emitBroadcast()">Emit Broadcast</el-button>
    <div>token: {{ token }}</div>
    <div>broadcast emitter: {{ broadcastData }}</div>
    <div>UI Version: {{ config$.uiVersion }}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mod } from '@/store/mod';
import { fns } from '@hyong8023/tool-box';
import { broadcast } from '@/plugins/vue-global-prop/broadcast';

@Options({
  components: {},
  emits: [],
})
export default class Example extends Vue {
  @mod.user.Getter('token') token!: string;
  @mod.user.Action('token') setToken!: fns.Consume<string>;

  broadcastData = 'waiting...';

  setStore() {
    this.setToken(`${(+this.token || 0) + 1}`);
  }

  mounted() {
    broadcast.on('TEST', this.broadcastTestHandler, true);
  }

  unmounted() {
    broadcast.off('TEST', this.broadcastTestHandler);
  }

  broadcastTestHandler(evt: number) {
    this.broadcastData = `event:data:${evt}`;
  }

  emitBroadcast() {
    broadcast.emit('TEST', new Date().getTime());
  }
}
</script>

<style scoped lang="scss">

</style>
