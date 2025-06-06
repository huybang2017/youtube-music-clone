import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateHistoryDto) {
    const history = await this.prisma.history.create({
      data: {
        ...dto,
        listened_at: new Date(),
      },
    });

    return history;
  }

  async findAll() {
    return this.prisma.history.findMany({
      include: {
        user: true,
        song: true,
      },
      orderBy: {
        listened_at: 'desc',
      },
    });
  }

  async findByUser(user_id: string) {
    return this.prisma.history.findMany({
      where: { user_id },
      include: {
        song: true,
      },
      orderBy: {
        listened_at: 'desc',
      },
    });
  }

  async remove(id: string) {
    const history = await this.prisma.history.findUnique({ where: { id } });
    if (!history) throw new NotFoundException('History not found');

    return this.prisma.history.delete({ where: { id } });
  }
}
