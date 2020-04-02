import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChoresEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column() name: string;

	@Column() score: number;

	@Column({ type: 'datetime', default: () => "datetime('now','localtime')" })
	createDate: string;

	@Column({ default: false })
	completed: boolean;

	@Column({ nullable: true })
	completedDate: string;

	@Column({ nullable: true })
	dueDate: string;
}
