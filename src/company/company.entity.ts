import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  ceo: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  address: string;

  @Column({ type: 'date' })
  @IsNotEmpty()
  @IsDate()
  inceptionDate: Date;
}
