import { http } from '../index';

export default {
	getOrderList(options: object): Promise<any> {
		return http.post('/order/orderList', options);
	},
	editOrder(params: object): Promise<any> {
		return http.post('/order/edit', params);
	},
	deleteOrder(params: object): Promise<any> {
		return http.post('/order/delete', params);
	},
	getCardNumber(): Promise<any> {
		return http.post('/order/cardNumber');
	},
	addOrder(params: object): Promise<any> {
		return http.post('/order/add', params);
	},
};
