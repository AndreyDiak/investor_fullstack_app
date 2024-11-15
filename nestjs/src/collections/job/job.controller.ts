import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateJobInput, UpdateJobInput } from 'src/inputs/job.input';
import { JobService } from './job.service';

@Controller({
  path: 'jobs',
  version: '1',
})
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('/')
  getAll() {
    return this.jobService.getAll();
  }

  @Post('/')
  create(@Body() body: CreateJobInput) {
    return this.jobService.create(body);
  }

  @Put('/:id')
  updateOne(@Param('id') id: string, @Body() body: UpdateJobInput) {
    return this.jobService.updateOne(id, body);
  }

  @Post('/init')
  init() {
    return this.jobService.init();
  }
}
