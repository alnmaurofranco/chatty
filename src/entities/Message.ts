import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import User from './User';

@Entity('messages')
class Message {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  admin_id: string;

  @Column('text')
  text: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('uuid')
  user_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Message;
