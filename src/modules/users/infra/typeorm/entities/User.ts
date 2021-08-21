import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';


@Entity('USER')
class User {
  @PrimaryColumn({
    name: "USER_ID"
  })
  id: string;

  @Column({
    name: "USER_NAME"
  })
  name: string;

  @Column({
    name: "USER_EMAIL"
  })
  email: string;

  @Column({
    name: "USER_PASSWORD"
  })
  password: string;

  @Column({
    name: "USER_ACTIVE"
  })
  active: boolean;

  @Column({
    name: "USER_DELETED"
  })
  deleted: boolean;

  @Column({
    name: "USER_CREATED_AT"
  })
  createdAt: Date;

  @Column({
    name: "USER_UPDATE_AT"
  })
  updatedAt: Date;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }

}

export { User };