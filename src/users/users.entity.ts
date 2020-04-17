import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude, classToPlain } from 'class-transformer';
import { TasksEntity } from '../tasks/tasks.entity';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  salt: string;

  @Exclude()
  @Column({ default: 0 })
  tokenVersion: number;

  @Exclude()
  @Column()
  password: string;
  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.salt = salt;
  }

  @Column({ type: 'datetime', default: () => "datetime('now','localtime')" })
  dateRegistered: string;

  async comparePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  toJSON() {
    return classToPlain(this);
  }

  @OneToMany(
    () => TasksEntity,
    task => task.user,
  )
  tasks: TasksEntity[];
}
