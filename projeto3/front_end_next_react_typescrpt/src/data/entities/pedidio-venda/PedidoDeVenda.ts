import ItemPedidoProduto from "./ItemPedidoProduto";
import { EntityId } from "./entity-id";


export class ClientExterno {
  constructor(
    public nome: string
  ) {}
}

export class PedidoDeVenda {
  constructor(
    public idPedido: EntityId,
    public aprovado: boolean,
    public clientExterno: ClientExterno,
    public prazoEntrega: Date,
    public items: ItemPedidoProduto[]
  ) {}

  get Items(): ItemPedidoProduto[] {
    return this.items
  }
}