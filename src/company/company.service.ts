import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async createCompany(companyData: Partial<Company>): Promise<Company> {
    const company = this.companyRepository.create(companyData);
    return this.companyRepository.save(company);
  }

  async getCompanyById(id: string): Promise<Company | undefined> {
    return this.companyRepository.findOne({ where: { id } });
  }

  async searchCompanyByName(field: string): Promise<Company[]> {
    return this.companyRepository
      .createQueryBuilder('company')
      .where(
        'company.ceo = :field OR company.address = :field OR company.name LIKE :name',
        {
          field,
          name: `%${field}%`,
        },
      )
      .getMany();
  }

  async getAllCompanies(): Promise<Company[]> {
    return this.companyRepository.find();
  }
}
