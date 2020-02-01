import {TasksRecord} from "~/model/tasksRecord";

export function getInitialRecord(): TasksRecord {
  return {
    meta: {
      note: "",
      recordId: "",
      sectionTime: 0,
      timestamp: Math.round((new Date()).getTime() / 1000),
    },
    tasks: [{
      name: "初期化",
      ratio: 100,
      category: undefined,
      tags: undefined
    }]
  }
}
