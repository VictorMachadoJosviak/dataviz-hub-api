import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ApiOkResponseCustom } from '../../../../common/decorators/api-ok-response-type';
import { PageableQueryRequest } from '../../../../common/pagination/pagination';
import { CreateDashboardFeedbackDto } from '../../dto/request/create-dashboard-feedback/create-dashboard-feedback.dto';
import { DashboardFeedbackResponseDto } from '../../dto/response/dashboard-feedback/dashboard-feedback.dto';
import { DashboardService } from '../../services/dashboard.service';

@ApiBearerAuth()
@ApiTags('dashboards')
@Controller('dashboards')
export class DashboardFeedbackController {
  constructor(
    private readonly dashboardService: DashboardService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  @Post(':dashboardId/feedbacks')
  createFeeback(
    @Param('dashboardId', new ParseUUIDPipe()) dashboardId: string,
    @Body() feedback: CreateDashboardFeedbackDto,
  ) {
    return this.dashboardService.createFeedback(
      dashboardId,
      this.request.user.id,
      feedback,
    );
  }

  @Get(':dashboardId/feedbacks')
  @ApiOkResponseCustom(DashboardFeedbackResponseDto)
  listFeedbacks(
    @Param('dashboardId', new ParseUUIDPipe()) dashboardId: string,
    @Query() filters: PageableQueryRequest,
  ) {
    return this.dashboardService.listFeedbacks(dashboardId, filters);
  }

  @Delete('feedbacks/:feedbackId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFeedback(@Param('feedbackId', new ParseUUIDPipe()) feedbackId: string) {
    return this.dashboardService.deleteFeedback(feedbackId);
  }
}
