import type { IDirectMessageRoom, IRoom, IUser } from '@rocket.chat/core-typings';

declare module '@rocket.chat/rest-typings' {
	// eslint-disable-next-line @typescript-eslint/interface-name-prefix
	interface Endpoints {
		'/v1/engagement-dashboard/channels/list': {
			GET: (params: { start: Date; end: Date; offset: number; count: number }) => {
				channels: {
					room: {
						_id: IRoom['_id'];
						name: IRoom['name'] | IRoom['fname'];
						ts: IRoom['ts'];
						t: IRoom['t'];
						_updatedAt: IRoom['_updatedAt'];
						usernames?: IDirectMessageRoom['usernames'];
					};
					messages: number;
					lastWeekMessages: number;
					diffFromLastWeek: number;
				}[];
				count: number;
				offset: number;
				total: number;
			};
		};
		'/v1/engagement-dashboard/messages/origin': {
			GET: (params: { start: Date; end: Date }) => {
				origins: {
					t: IRoom['t'];
					messages: number;
				}[];
			};
		};
		'/v1/engagement-dashboard/messages/top-five-popular-channels': {
			GET: (params: { start: Date; end: Date }) => {
				channels: {
					t: IRoom['t'];
					messages: number;
					name: IRoom['name'] | IRoom['fname'];
					usernames?: IDirectMessageRoom['usernames'];
				}[];
			};
		};
		'/v1/engagement-dashboard/messages/messages-sent': {
			GET: (params: { start: Date; end: Date }) => {
				days: { day: Date; messages: number }[];
				period: {
					count: number;
					variation: number;
				};
				yesterday: {
					count: number;
					variation: number;
				};
			};
		};
		'/v1/engagement-dashboard/users/active-users': {
			GET: (params: { start: Date; end: Date }) => {
				month: {
					day: number;
					month: number;
					year: number;
					usersList: IUser['_id'][];
					users: number;
				}[];
			};
		};
		'/v1/engagement-dashboard/users/chat-busier/weekly-data': {
			GET: (params: { start: Date }) => {
				month: {
					users: number;
					day: number;
					month: number;
					year: number;
				}[];
			};
		};
		'/v1/engagement-dashboard/users/chat-busier/hourly-data': {
			GET: (params: { start: Date }) => {
				hours: {
					users: number;
					hour: number;
				}[];
			};
		};
		'/v1/engagement-dashboard/users/users-by-time-of-the-day-in-a-week': {
			GET: (params: { start: Date; end: Date }) => {
				week: {
					users: number;
					hour: number;
					day: number;
					month: number;
					year: number;
				}[];
			};
		};
		'/v1/engagement-dashboard/users/new-users': {
			GET: (params: { start: Date; end: Date }) => {
				days: { day: Date; users: number }[];
				period: {
					count: number;
					variation: number;
				};
				yesterday: {
					count: number;
					variation: number;
				};
			};
		};
	}
}