import { http } from '../index';

export default {
	getMemberList(options: object): Promise<any> {
		return http.post('/member/memberList', options);
	},
	editMember(params: object): Promise<any> {
		return http.post('/member/edit', params);
	},
	deleteMember(params: object): Promise<any> {
		return http.post('/member/delete', params);
	},
	addMember(params: object): Promise<any> {
		return http.post('/member/add', params);
	},
	searchMember(params: object): Promise<any> {
		return http.post('/member/search', params);
	},
};
