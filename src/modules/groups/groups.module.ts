import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Group } from '@shared/entities';
import { GroupRepository } from '@shared/repositories';

import { CreateGroupController } from './contexts/createGroup/createGroup.controller';
import { CreateGroupService } from './contexts/createGroup/createGroup.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [CreateGroupController],
  providers: [CreateGroupService, GroupRepository],
})
export class GroupsModule {}
