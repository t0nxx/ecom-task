import {
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsNumber,
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
  @IsNumber()
  interval_in_minutes: number = 0;

  @IsOptional()
  @IsISO8601({ strict: true })
  scheduleDate: Date;
}
