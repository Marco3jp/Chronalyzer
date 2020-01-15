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
        ratio: 75,
        category: {
          name: "創作活動",
          id: "a281b554-d705-4bfe-ba99-6af2e59187a1"
        },
        tags: [{
          name: "ソフトウェア開発",
          id: "59f2aaa1-7106-4bd3-9b3c-53eedc57fac9"
        }, {
          name: "趣味",
          id: "bd688f87-0ef7-4ba9-b0c6-b0bb542ad6ce"
        }]
      }, {
        name: "Twitter",
        ratio: 10,
        category: {
          name: "Twitter",
          id: "b0d3f5a6-b705-4ae5-bbce-d6c506adfc9f"
        },
        tags: [{
          name: "要改善",
          id: "3db034cf-d6cc-41b1-8d4b-c211166b8c8d"
        }]
      }, {
        name: "ドキュメントチェック",
        ratio: 10,
        category: {
          name: "創作活動",
          id: "a281b554-d705-4bfe-ba99-6af2e59187a1"
        },
        tags: [{
          name: "ソフトウェア開発",
          id: "59f2aaa1-7106-4bd3-9b3c-53eedc57fac9"
        }, {
          name: "趣味",
          id: "bd688f87-0ef7-4ba9-b0c6-b0bb542ad6ce"
        }]
      }, {
        name: "不明",
        ratio: 5,
        category: {
          name: "不明",
          id: "e65e3fee-b27c-4987-8d3e-6ff2dbb7ad16"
        },
        tags: [{
          name: "要改善",
          id: "3db034cf-d6cc-41b1-8d4b-c211166b8c8d"
        }]
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
        ratio: 90,
        category: {
          name: "ゲーム",
          id: "a11ca3f6-f8ca-4ddd-84de-9736399fe4c5"
        },
        tags: [{
          name: "要改善",
          id: "3db034cf-d6cc-41b1-8d4b-c211166b8c8d"
        }]
      }, {
        name: "Twitter",
        ratio: 10,
        category: {
          name: "Twitter",
          id: "b0d3f5a6-b705-4ae5-bbce-d6c506adfc9f"
        },
        tags: [{
          name: "要改善",
          id: "3db034cf-d6cc-41b1-8d4b-c211166b8c8d"
        }]
      }]
    }
  ]
}
