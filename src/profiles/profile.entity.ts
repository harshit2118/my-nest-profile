import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('profiles')
export class Profile {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
}
