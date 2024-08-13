import {
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsJSON()
  @IsNotEmpty()
  data: object;

  @IsOptional()
  @IsString()
  queue: string = 'default';

  @IsOptional()
  @IsISO8601({ strict: true })
  scheduleDate: Date;
}
