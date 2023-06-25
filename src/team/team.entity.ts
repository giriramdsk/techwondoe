import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Company } from '../company/company.entity';

@Entity()
@Unique(['teamLeadName', 'companyId'])
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  teamLeadName: string;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;

  @Column()
  companyId: string;
}
