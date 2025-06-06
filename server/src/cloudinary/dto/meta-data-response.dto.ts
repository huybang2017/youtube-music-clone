export class Picture {
  format: string;
  data: Buffer | string;
}

export class MetadataResponse {
  title?: string;
  artist?: string;
  album?: string;
  year?: number;
  duration?: number;
  genre?: string[];
  picture?: Picture | null;
}
