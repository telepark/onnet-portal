import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { AccountMedia } from '../services/kazoo-telephony';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    refreshAccountState: Effect;
  };
  reducers: {
    update: Reducer<{}>;
    flush: Reducer<{}>;
  };
}

const Model: ModelType = {
  namespace: 'kazoo_account_media',

  state: {
    data: [],
  },

  effects: {
    *refresh({ payload }, { call, put }) {
      const response = yield call(AccountMedia, { ...payload, method: 'GET' });
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *flush(_, { put }) {
      yield put({
        type: 'update',
        payload: {},
      });
    },
  },

  reducers: {
    update(state, { payload }) {
      return { ...payload };
    },
  },
};

export default Model;
