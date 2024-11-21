import Produto from "./Produto"
import { EntityId } from "./entity-id"

class ItemPedidoProduto {
  public id: EntityId
  public quantidade: number
  public produto: Produto

  constructor(id: EntityId, idProduto: EntityId, descricao: string, quantidade: number) {
    this.id = id
    this.quantidade = quantidade
    this.produto = new Produto(idProduto, descricao)
  }
}

export default ItemPedidoProduto
