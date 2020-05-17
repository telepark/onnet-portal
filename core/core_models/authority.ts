import { isArrayEqual } from '../utils/subroutine';
import { Effect, Reducer, getDvaApp } from 'umi';

export interface AuthorityModelType {
  namespace: 'authority';
  state: {};
  effects: {
    refresh: Effect;
    flush: Effect;
  };
  reducers: {
    update: Reducer<{}>;
  };
}

const AuthorityModel: AuthorityModelType = {
  namespace: 'authority',

  state: { currentAuthority: [] },

  effects: {
    *refresh(_, { put }) {
      try {
        const redux_state = getDvaApp()._store.getState();
        const priv_level = redux_state.kz_user.data.priv_level
          ? [redux_state.kz_user.data.priv_level]
          : [];
        const reseller = redux_state.kz_account.data.is_reseller ? ['reseller'] : [];
        const login_as_master = redux_state.kz_login.data.is_master_account ? ['login_as_master'] : [];
        const superduper_admin = redux_state.kz_account.data.superduper_admin
          ? ['superduper_admin']
          : [];
        const child_account_selected = redux_state.child_account
          ? redux_state.child_account.data
            ? ['child_account_selected']
            : []
          : [];
        const brt_child_selected = redux_state.brt_child_account
          ? redux_state.brt_child_account.data
            ? ['brt_child_selected']
            : []
          : [];
        const lanbilling = redux_state.lb_account
          ? redux_state.lb_account.data
            ? ['lanbilling']
            : []
          : [];
        const telephony =
          redux_state.kz_account.data.is_reseller || redux_state.kz_account.data.superduper_admin
            ? []
            : ['telephony'];
        const account_id = redux_state.kz_account.data ? [redux_state.kz_account.data.id] : [];
        const authority = priv_level.concat(
          reseller,
          login_as_master,
          superduper_admin,
          child_account_selected,
          lanbilling,
          telephony,
          account_id,
          brt_child_selected,
        );
        if (!isArrayEqual(authority, redux_state.authority.currentAuthority)) {
          yield put({
            type: 'update',
            payload: { currentAuthority: authority },
          });
        }
      } catch (e) {
        yield put({
          type: 'update',
          payload: { currentAuthority: [] },
        });
      }
    },
    *flush(_, { put }) {
      yield put({
        type: 'update',
        payload: { currentAuthority: [] },
      });
    },
  },

  reducers: {
    update(state, { payload }) {
      return { ...payload };
    },
  },
};

export default AuthorityModel;
