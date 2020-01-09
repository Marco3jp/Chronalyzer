import {TasksRecord} from "~/model/tasksRecord";
import {RecordMeta} from "~/model/recordMeta";
import {Task} from "~/model/task";


export function fetchRecordsMock(): Array<TasksRecord> {
  return [
    {
      meta: <RecordMeta>{
        note: "作業して寝る前に記録取った",
        recordId: "a8abb041-d43f-4f63-b91a-091d95673049",
        sectionTime: 5400, // 1hour 30min
        timestamp: 1578157820 // 2020-01-05T02:10:20
      },
      tasks: <Array<Task>>[{
        name: "コーディング",
        ratio: 75
      }, {
        name: "Twitter",
        ratio: 10
      }, {
        name: "ドキュメントチェック",
        ratio: 10
      }, {
        name: "不明",
        ratio: 5
      }]
    },
    {
      meta: <RecordMeta>{
        note: "グラブルしてた",
        recordId: "ea65d1eb-0063-4dcd-b203-54499d77d845",
        sectionTime: 5400, // 1hour 30min
        timestamp: 1578152420 // 2020-01-05T00:40:20
      },
      tasks: <Array<Task>>[{
        name: "グラブル",
        ratio: 90
      }, {
        name: "Twitter",
        ratio: 10
      }]
    }
  ]
}
