import { IsNumber, IsString } from 'class-validator';

export class todoDTO {

  @IsNumber()
  id:Number

  @IsString()
  user:string

  @IsString()
  Mission: string;

  @IsString()
  Date: string;

  @IsString()
  Description:string;
}