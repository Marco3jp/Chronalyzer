export interface Tag {
  id: string // uuid
  name: string
  parentTag?: Tag
}
