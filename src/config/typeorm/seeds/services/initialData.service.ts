import { Logger } from '@nestjs/common';
import { DataSource, EntityTarget, QueryRunner, Repository } from 'typeorm';

import { dataSource } from '@config/typeorm/dataSource';

import { Course, User } from '@shared/entities';

import { coursesData, userData } from '../data';

export class InitialDataSeed {
  private logger: Logger;
  private queryRunner: QueryRunner;
  private courseRepository: Repository<Course>;
  private userRepository: Repository<User>;

  public async execute(): Promise<void> {
    this.logger = new Logger(InitialDataSeed.name);
    await this.initializeRepositories(dataSource);

    try {
      await this.queryRunner.startTransaction();

      // Populate tables in sequence
      await this.populateTable(Course, this.courseRepository, coursesData);
      await this.populateTable(User, this.userRepository, userData);

      this.logger.log('Transaction committed successfully');
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      this.logger.error(
        'Transaction rolled back due to error: ',
        error.message,
      );
      throw error;
    } finally {
      await this.queryRunner.release();
    }
  }

  private async populateTable<T>(
    entityClass: EntityTarget<T>,
    repository: Repository<T>,
    entities: T[],
  ): Promise<void> {
    this.logger.log(`Populating ${entityClass} table`);
    for (const entity of entities) {
      try {
        await repository.save(entity);
      } catch (error) {
        throw error;
      }
    }
  }

  private async initializeRepositories(dataSource: DataSource) {
    this.logger.log(this.initializeRepositories.name);

    await dataSource.initialize();
    this.queryRunner = dataSource.createQueryRunner();

    this.courseRepository = this.queryRunner.manager.getRepository(Course);
    this.userRepository = this.queryRunner.manager.getRepository(User);
  }
}
