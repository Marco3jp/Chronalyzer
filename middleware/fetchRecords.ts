import {Middleware} from '@nuxt/types'
import {fetchRecordsMock} from "~/scripts/fetch";

const fetchRecords: Middleware = ({store}) => {
  if (!store.state.isInitialized) {
    store.commit("record/unshift", fetchRecordsMock());
    store.commit("setInitialized");
  }
};

export default fetchRecords
