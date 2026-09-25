import { SnapshotService } from './snapshot.service';
export declare class SnapshotController {
    private readonly snapshotService;
    constructor(snapshotService: SnapshotService);
    getSnapshots(traderId: string, brokerId: string): Promise<{
        traderId: string;
        brokerId: string;
        balance: number;
        createdAt: Date;
    }[]>;
}
