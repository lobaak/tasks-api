import { IsString, IsNumber, IsNotEmpty, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsNumber()
  @Min(1, { message: 'score must be at least 1' })
  @ApiProperty({ type: Number })
  score: number;
}

export class UpdateTaskDto extends CreateTaskDto {
  @IsUUID()
  @ApiProperty({ type: String })
  id: string;
}

export class DeleteTaskDto {
  @IsUUID()
  @ApiProperty({ type: String })
  id: string;
}
