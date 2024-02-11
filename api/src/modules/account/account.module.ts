import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';

@Module({
  providers: [AccountService],
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  exports: [AccountService]
})
export class AccountModule {}
