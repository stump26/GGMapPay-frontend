interface API_ResponeType {
  RegionMnyFacltStus: [
    {
      head: [
        {
          list_total_count: number;
        },
        {
          RESULT: {
            CODE: string;
            MESSAGE: string;
          };
        },
        {
          api_version: string;
        },
      ];
    },
    {
      row: Array<IStoreInfoType>;
    },
  ];
}
type IStoreInfoType = {
  SIGUN_NM: string;
  CMPNM_NM: string;
  REFINE_ROADNM_ADDR: string;
  REFINE_LOTNO_ADDR: string;
  TELNO: string;
  REGION_MNY_NM?: string | null;
  REFINE_ZIP_CD: Number;
  REFINE_WGS84_LAT: Number;
  REFINE_WGS84_LOGT: Number;
  DATA_STD_DE?: string | null;
};
