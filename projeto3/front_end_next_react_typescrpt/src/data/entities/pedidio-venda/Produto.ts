import { EntityId } from "./entity-id"

class Produto {
  public id: number
  public descricao: string

  constructor(id: EntityId, descricao: string,) {
    this.id = id
    this.descricao = descricao
  }
}

export default Produto