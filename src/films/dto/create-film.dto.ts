import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { FilmGenre } from '../../film-genres/entities/film-genre.entity';
import { Review } from '../../reviews/entities/review.entity';

export class CreateFilmDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  release: string;

  @ApiProperty()
  @IsString()
  poster: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  reviews: Review[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  genres: FilmGenre[];
}
