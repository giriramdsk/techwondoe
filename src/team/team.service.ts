import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Team } from './team.entity';
import { Company } from '../company/company.entity';
import { validate as validateUuid } from 'uuid';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(team: Team): Promise<Team> {
    const companyId = team.companyId;
    console.log(team);
    try {
      if (!validateUuid(companyId)) {
        throw new BadRequestException('Invalid company ID');
      }

      const company = await this.companyRepository.findOne({
        where: { id: companyId },
      });
      if (!company) {
        throw new BadRequestException('Invalid company ID');
      }
      team.company = company;
      return this.teamRepository.save(team);
    } catch (error) {
      console.log(error);
      if (error instanceof QueryFailedError) {
        throw new ConflictException('TeamLead already exists in this company');
      }
      throw new InternalServerErrorException('An error occurred');
    }
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepository.find({ relations: ['company'] });
  }

  async findAllByCompanyId(companyId: string): Promise<Team[]> {
    return this.teamRepository.find({
      where: { company: { id: companyId } },
      relations: ['company'],
    });
  }
}
