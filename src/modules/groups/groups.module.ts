import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Group } from '@shared/entities';
import { GroupRepository } from '@shared/repositories';

import { CreateGroupController } from './contexts/createGroup/createGroup.controller';
import { CreateGroupService } from './contexts/createGroup/createGroup.service';
import { DeleteGroupController } from './contexts/deleteGroup/deleteGroup.controller';
import { DeleteGroupService } from './contexts/deleteGroup/deleteGroup.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [CreateGroupController, DeleteGroupController],
  providers: [CreateGroupService, DeleteGroupService, GroupRepository],
})
export class GroupsModule {}
