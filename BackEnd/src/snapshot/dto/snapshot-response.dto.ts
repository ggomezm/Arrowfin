import { IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PositionDto {
  @IsString()
  instrument!: string;

  @IsNumber()
  qty!: number;

  @IsNumber()
  avgPrice!: number;

  @IsNumber()
  commission!: number;
}

export class SnapshotResponseDto {
  @IsString()
  accountId!: string;

  @IsNumber()
  balance!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PositionDto)
  positions!: PositionDto[];

  @IsNumber()
  pnl!: number;

  @IsNumber()
  risk!: number;
}