import { IsString, IsNumber, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1, { message: 'score must be at least 1' })
  score: number;
}

export class UpdateTaskDto extends CreateTaskDto {
  @IsUUID()
  id: string;
}

export class DeleteTaskDto {
  @IsUUID()
  id: string;
}
