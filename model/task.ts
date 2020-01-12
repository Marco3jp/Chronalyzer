import {Tag} from "~/model/tag";

export interface Task {
  name: string
  ratio: number
  category?: Tag
  tags?: Array<Tag>
}
