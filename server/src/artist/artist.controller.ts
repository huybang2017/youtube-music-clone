import { Controller, Get, Param } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Artists')
@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách nghệ sĩ' })
  @ApiResponse({ status: 200, description: 'Danh sách nghệ sĩ' })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy nghệ sĩ theo ID' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }
}
