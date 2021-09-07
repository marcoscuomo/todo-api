import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { User } from '@modules/users/infra/typeorm/entities/User'

@Entity('USERS_TOKEN')
class UserTokens {
  @PrimaryColumn({ name: 'USTO_ID' })
  id: string;

  @Column({ name: 'USTO_REFRESH_TOKEN' })
  refreshToken: string;

  @Column({ name: 'USTO_USER_ID' })
  // eslint-disable-next-line camelcase
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'USTO_USER_ID' })
  user: User

  @Column({ name: 'USTO_EXPIRES_DATE' })
  expiresDate: Date;

  @Column({ name: 'USTO_CREATED_AT' })
  createdAt: Date;

  constructor () {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { UserTokens }
