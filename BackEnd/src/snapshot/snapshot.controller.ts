import { Controller, Get, Query } from '@nestjs/common';
import { SnapshotService } from './snapshot.service';

@Controller('snapshot')
export class SnapshotController {
  constructor(private readonly snapshotService: SnapshotService) {}

  @Get()
  async getSnapshots(
    @Query('traderId') traderId: string,
    @Query('brokerId') brokerId: string
  ) {
    return this.snapshotService.getSnapshots(traderId, brokerId);
  }
}
 
