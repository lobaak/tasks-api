import { PrimaryGeneratedColumn, Column, Entity, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class UsersEntity {
	@PrimaryGeneratedColumn() id: string;

	@Column() name: string;

	@Column({ unique: true })
	email: string;

	@Column() password: string;
	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}

	@Column({ type: 'datetime', default: () => "datetime('now','localtime')" })
	dateRegistered: string;

	async comparePassword(attempt: string) {
		return await bcrypt.compare(attempt, this.password);
	}
}
