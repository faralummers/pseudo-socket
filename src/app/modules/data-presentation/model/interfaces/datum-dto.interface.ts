export interface DatumDto {
  id: string;
  int: number;
  float: number;
  color: string;
  child: Pick<DatumDto, 'id' | 'color'>
}
