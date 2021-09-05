/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable camelcase */
/* eslint-disable no-tabs */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { User } from '@modules/users/infra/typeorm/entities/User'

@Entity('TODO')
class Todo {
	@PrimaryColumn({ name: 'TODO_ID' })
	id: string;

	@Column({ name: 'TODO_TITLE' })
	title: string;

	@Column({ name: 'TODO_COMPLETED' })
	completed: boolean;

	@Column({ name: 'TODO_ACTIVE' })
	active: boolean;

	@Column({ name: 'TODO_DELETED' })
	deleted: boolean;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'TODO_USER_CREATE' })
	user: User

	@Column({ name: 'TODO_USER_CREATE' })
	user_id: string;

	@Column({ name: 'TODO_USER_UPDATE' })
	userUpdate: string;

	@Column({ name: 'TODO_CREATED_AT' })
	createdAt: Date;

	@Column({ name: 'TODO_UPDATE_AT' })
	updatedAt: Date;

	constructor () {
	  if (!this.id) {
	    this.id = uuid()
	    this.completed = false
	  }
	}
}

export { Todo }
