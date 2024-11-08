import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard'
import { CreateJobInput, UpdateJobInput } from 'src/inputs/job.input'
import { JobService } from './job.service'

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/')
  getAll() {
    return this.jobService.getAll();
  }

  @UseGuards(AccessTokenGuard)
  @Post('/')
  create(@Body() body: CreateJobInput) {
    return this.jobService.create(body);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  updateOne(@Param('id') id: string, @Body() body: UpdateJobInput) {
    return this.jobService.updateOne(id, body);
  }

  @UseGuards(AccessTokenGuard)
  @Post("/init")
  init() {
    return this.jobService
  }
}
