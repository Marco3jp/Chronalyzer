import {Middleware} from '@nuxt/types'
import {getInitialRecord} from "~/scripts/initialRecord";

const fetchRecords: Middleware = ({store, env}) => {
  if (!store.state.isInitialized) {
    const records = localStorage.getItem("records");
    if (records !== null) {
      store.commit("record/unshift", JSON.parse(records));
    } else {
      store.commit("record/unshift", getInitialRecord());
    }
    store.commit("setInitialized");
  }
};

export default fetchRecords
