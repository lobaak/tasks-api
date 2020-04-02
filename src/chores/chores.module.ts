import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChoresService } from './chores.service';
import { ChoresController } from './chores.controller';
import { ChoresEntity } from './chores.entity';

@Module({
	imports: [ TypeOrmModule.forFeature([ ChoresEntity ]) ],
	controllers: [ ChoresController ],
	providers: [ ChoresService ]
})
export class ChoresModule {}
