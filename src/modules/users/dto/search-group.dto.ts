import { ApiProperty } from '@nestjs/swagger';
import { SearchDto } from 'src/common/search.dto';

export class SearchGroupDto extends SearchDto {
  @ApiProperty({ required: false })
  fromDate: Date;

  @ApiProperty({ required: false })
  toDate: Date;
}
