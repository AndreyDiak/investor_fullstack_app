import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobInput, UpdateJobInput } from 'src/inputs/job.input';
import { Job } from 'src/schemas/job.schema';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  async create(payload: CreateJobInput) {
    const createdJob = new this.jobModel(payload);
    return createdJob;
  }

  async updateOne(id: string, payload: UpdateJobInput) {
    await this.jobModel.findByIdAndUpdate(id, payload);
  }

  async getAll() {
    return this.jobModel.find();
  }

  async getById(id: string) {
    return this.jobModel.findById(id);
  }
}
