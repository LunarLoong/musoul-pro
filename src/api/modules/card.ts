import { http } from '../index';

export default {
	getCardList(): Promise<any> {
		return http.post('/card/cardList');
	},
	addCard(params: object): Promise<any> {
		return http.post('/card/add', params);
	},
	editCard(params: object): Promise<any> {
		return http.post('/card/edit', params);
	},
	deleteCard(params: object): Promise<any> {
		return http.post('/card/delete', params);
	},
};
