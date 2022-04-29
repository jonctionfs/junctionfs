export enum ProvidersTypes {
  GoogleDrive = "GoogleDrive",
  S3 = "S3",
  SQL = "SQL"
}

export interface Provider {
  type: ProvidersTypes
  credentials: any
}