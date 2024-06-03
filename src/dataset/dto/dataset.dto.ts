// src/dataset/dto/dataset.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDatasetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  source: string;

  @ApiProperty({ description: 'Isi dari file CSV' }) // Keterangan tentang isi file CSV
  csv: string;

//   constructor(dto: CreateDatasetDto) {
//     this.title = dto.title;
//     this.slug = dto.slug;
//     this.description = dto.description;
//     this.source = dto.source;
//     this.csv = dto.csv.replace(/\n/g, '\\n'); // Melarikan karakter newline
//   }
}
