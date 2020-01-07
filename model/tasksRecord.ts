import {RecordMeta} from "./recordMeta"
import {Task} from "./task";

export interface TasksRecord {
  meta: RecordMeta
  tasks: Array<Task>
}
