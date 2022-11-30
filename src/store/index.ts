import { createStore } from 'vuex';
import user from '@/store/mod/user';

export default createStore({
  modules: {
    user,
  },
});
