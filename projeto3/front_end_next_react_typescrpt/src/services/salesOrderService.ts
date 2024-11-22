import axios from "axios";

const API_URL = "http://localhost:8080/";

export const salesOrderService = {
  create: async (salesOrder: any): Promise<boolean> => {
    const response = await axios.post(`${API_URL}pedido-venda.php`, salesOrder);

    // console.log('response data: ', response.data)
    // console.log('response status: ', response.status)

    if (response.status !== 201) {
      return false;
    }

    return true;
  },
};
