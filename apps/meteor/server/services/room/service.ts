import type { IRoom, IUser, IMessage } from '@rocket.chat/core-typings';
import { Users, Rooms, Messages } from '@rocket.chat/models';

import { ServiceClassInternal } from '../../sdk/types/ServiceClass';
import { ICreateRoomParams, IRoomService } from '../../sdk/types/IRoomService';
import { Authorization } from '../../sdk';
import { createRoom } from '../../../app/lib/server/functions/createRoom'; // TODO remove this import

export class RoomService extends ServiceClassInternal implements IRoomService {
	protected name = 'room';

	async create(uid: string, params: ICreateRoomParams): Promise<IRoom> {
		const { type, name, members = [], readOnly, extraData, options } = params;

		const hasPermission = await Authorization.hasPermission(uid, `create-${type}`);
		if (!hasPermission) {
			throw new Error('no-permission');
		}

		const user = await Users.findOneById<Pick<IUser, 'username'>>(uid, {
			projection: { username: 1 },
		});
		if (!user || !user.username) {
			throw new Error('User not found');
		}

		// TODO convert `createRoom` function to "raw" and move to here
		return createRoom(type, name, user.username, members, readOnly, extraData, options) as unknown as IRoom;
	}

	async addMember(uid: string, rid: string): Promise<boolean> {
		const hasPermission = await Authorization.hasPermission(uid, 'add-user-to-joined-room', rid);
		if (!hasPermission) {
			throw new Error('no-permission');
		}

		return true;
	}

	async getAll(name?: string, options?: { limit: number }): Promise<IRoom[]> {
		const cursor = name ? Rooms.findByNameContaining(name) : Rooms.find();

		if (options?.limit) {
			cursor.limit(options.limit);
		}

		return cursor.toArray();
	}

	async getMessages(rid: string, options?: { limit: number }): Promise<IMessage[]> {
		const cursor = Messages.find({ rid });

		if (options?.limit) {
			cursor.limit(options.limit);
		}

		return cursor.toArray();
	}
}
