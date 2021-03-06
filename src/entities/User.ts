import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default User;
