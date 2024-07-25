import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { School } from '@shared/entities';

@Injectable()
export class SchoolRepository {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}

  async save(school: School): Promise<School> {
    return this.schoolRepository.save(school);
  }

  async findByName(name: string): Promise<School | undefined> {
    return this.schoolRepository.findOne({ where: { name } });
  }
}
