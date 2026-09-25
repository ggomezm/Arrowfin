import { PrismaService } from '../prisma/prisma.service';
export declare class SnapshotService {
    private prisma;
    constructor(prisma: PrismaService);
    getSnapshots(traderId: string, brokerId: string): Promise<{
        traderId: string;
        brokerId: string;
        balance: number;
        createdAt: Date;
    }[]>;
}
