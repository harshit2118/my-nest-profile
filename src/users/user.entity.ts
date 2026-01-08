import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  role: string;
  @CreateDateColumn()
  createdAt: Date;
}
