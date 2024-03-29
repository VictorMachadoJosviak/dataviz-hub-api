import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageableQueryRequest } from '../../../../common/pagination/pagination';
import { CreateDashboardDto } from '../../dto/request/create-dashboard/create-dashboard.dto';
import { UpdateDashboardDto } from '../../dto/request/update-dashboard.dto';
import { DashboardDto } from '../../dto/response/dashboard/dashboard.dto';
import { DashboardService } from '../../services/dashboard.service';

@ApiBearerAuth()
@ApiTags('dashboards')
@Controller('dashboards')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List all dashboards',
    type: DashboardDto,
  })
  findAll(@Query() filters: PageableQueryRequest) {
    return this.dashboardService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
}
