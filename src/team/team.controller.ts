import {
  Controller,
  UseGuards,
  HttpException,
  HttpStatus,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TeamService } from './team.service';
import { Team } from './team.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QueryFailedError } from 'typeorm';
import { ConflictException } from '@nestjs/common';

@ApiTags('Team')
@Controller('team')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({ summary: 'Create a team' })
  @ApiBearerAuth()
  @ApiBody({ type: Team })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        teamLeadName: { type: 'string' },
        companyId: {
          type: 'string',
        },
      },
      required: ['teamLeadName', 'company'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Team created successfully',
    type: Team,
  })
  @Post()
  async create(@Body() team: Team): Promise<Team> {
    try {
      return await this.teamService.create(team);
    } catch (error) {
      console.log(error);
      if (error instanceof QueryFailedError) {
        throw new ConflictException('TeamLead already exists in this company');
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Get all teams' })
  @Get()
  async findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @ApiOperation({ summary: 'Get teams by companyId' })
  @ApiParam({ name: 'companyId', description: 'ID of the company' })
  @Get('company/:companyId')
  async findAllByCompanyId(
    @Param('companyId') companyId: string,
  ): Promise<Team[]> {
    return this.teamService.findAllByCompanyId(companyId);
  }
}
