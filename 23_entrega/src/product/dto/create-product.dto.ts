import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  imageURL: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsBoolean()
  stock: boolean;

  @IsString()
  createdAt: string;
}
