import { ApiProperty } from '@nestjs/swagger';

export class JoinGroupDto {
  @ApiProperty({ type: String, required: true })
  groupId: string;
}
