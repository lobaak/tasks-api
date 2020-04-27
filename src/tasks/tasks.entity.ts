import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsersEntity } from 'src/users/users.entity';

@Entity()
export class TasksEntity {
	@PrimaryGeneratedColumn('uuid') id: string;

	@Column() name: string;

	@Column({ default: 0 })
	score: number;

	@Column({ type: 'datetime', default: () => "datetime('now','localtime')" })
	createdDate: string;

	@Column({ default: false })
	completed: boolean;

	@Column({ nullable: true })
	completedDate: string;

	@Column({ nullable: true })
	dueDate: string;

	@Column({ nullable: true })
	userId: string;
	@ManyToOne(() => UsersEntity, (user) => user.tasks)
	@JoinColumn({ name: 'userId' })
	user: UsersEntity;
}
