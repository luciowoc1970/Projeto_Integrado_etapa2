import { PedidoDeVenda } from "@/data/entities/pedidio-venda/PedidoDeVenda";
import { salesOrderService } from "@/services/salesOrderService";

export const createSalesOrderUseCase = async (salesOrder: PedidoDeVenda):Promise<boolean> => {
  // console.log('DEBUG salesOrder: ', JSON.stringify(salesOrder));
  return salesOrderService.create(salesOrder);
};