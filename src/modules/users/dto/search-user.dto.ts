import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { SearchDto } from 'src/common/search.dto';

export class SearchUserDto extends PartialType(SearchDto) {
  @ApiProperty()
  address: string;
}
