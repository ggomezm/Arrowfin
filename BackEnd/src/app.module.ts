import { Module } from '@nestjs/common';
import { SnapshotModule } from './snapshot/snapshot.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SnapshotModule, AuthModule],
})
export class AppModule {}
 