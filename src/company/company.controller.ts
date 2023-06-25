import { Controller, UseGuards, Get, Param, Post, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@ApiTags('companies')
@Controller('companies')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  protectedRoute() {
    // This route is protected and requires a valid JWT token
    return 'Protected Route';
  }

  @ApiOperation({ summary: 'Create a new company' })
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        ceo: { type: 'string' },
        address: { type: 'string' },
        inceptionDate: { type: 'string', format: 'date' },
      },
      required: ['name', 'ceo', 'address', 'inceptionDate', 'teams'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Company created successfully',
    type: Company,
  })
  @Post()
  createCompany(@Body() companyData: Partial<Company>): Promise<Company> {
    return this.companyService.createCompany(companyData);
  }

  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiResponse({ status: 200, description: 'Company found', type: Company })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @Get(':id')
  getCompanyById(@Param('id') id: string): Promise<Company | undefined> {
    return this.companyService.getCompanyById(id);
  }

  @ApiOperation({ summary: 'Search companies by name' })
  @ApiResponse({ status: 200, description: 'Companies found', type: [Company] })
  @Get('search/:name')
  searchCompanyByName(@Param('name') name: string): Promise<Company[]> {
    return this.companyService.searchCompanyByName(name);
  }

  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Companies found', type: [Company] })
  @Get()
  getAllCompanies(): Promise<Company[]> {
    return this.companyService.getAllCompanies();
  }
}
