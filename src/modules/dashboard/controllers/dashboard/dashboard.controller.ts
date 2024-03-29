import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiOkResponseCustom } from '../../../../common/decorators/api-ok-response-type';
import { PageableQueryRequest } from '../../../../common/pagination/pagination';
import { CreateDashboardDto } from '../../dto/request/create-dashboard/create-dashboard.dto';
import { UpdateDashboardDto } from '../../dto/request/update-dashboard.dto';
import { DashboardDto } from '../../dto/response/dashboard/dashboard.dto';
import { DashboardFrequencyUpdate } from '../../enums/dashboard-frequency-update.enum';
import { DashboardPolarity } from '../../enums/dashboard-polarity.enum';
import { DashboardTechnology } from '../../enums/dashboard-technology.enum';
import { DashboardService } from '../../services/dashboard.service';

@ApiBearerAuth()
@ApiTags('dashboards')
@Controller('dashboards')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new dashboard',
    description: `<h3>Available technologys (Enum)</h3>
    <ul>
      ${Object.values(DashboardTechnology)
        .map((technology) => `<li>${technology}</li>`)
        .join('')}
    </ul>  
    <h3>Available Polarities (Enum)</h3>
    <ul>
      ${Object.values(DashboardPolarity)
        .map((polarity) => `<li>${polarity}</li>`)
        .join('')}
    </ul>   
    <h3>Available update frequencies (Enum)</h3>
    <ul>
      ${Object.values(DashboardFrequencyUpdate)
        .map((frequency) => `<li>${frequency}</li>`)
        .join('')}
    </ul>   
  `,
  })
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @Get()
  @ApiOkResponseCustom(DashboardDto)
  findAll(@Query() filters: PageableQueryRequest) {
    return this.dashboardService.findAll(filters);
  }

  @Get(':id')
  @ApiResponse({
    type: DashboardDto,
  })
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(id);
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
