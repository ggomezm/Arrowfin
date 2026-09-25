import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SnapshotService {
  constructor(private prisma: PrismaService) {}

  async getSnapshots(traderId: string, brokerId: string) {
    return this.prisma.$queryRaw<
      Array<{ traderId: string; brokerId: string; balance: number; createdAt: Date }>
    >`
      SELECT t.id       AS "traderId",
             b.id       AS "brokerId",
             a.balance  AS "balance",
             NOW()      AS "createdAt"
      FROM "Trader" t
      JOIN "Broker" b   ON b.id = t."brokerId"
      JOIN "Account" a  ON a."traderId" = t.id
      WHERE t.id = ${traderId} AND b.id = ${brokerId};
    `;
  }
}
  
