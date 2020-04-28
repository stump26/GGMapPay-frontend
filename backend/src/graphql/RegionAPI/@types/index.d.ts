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
  SIGUN_CD?: Number | null;
  SIGUN_NM: string;
  CMPNM_NM: string;
  INDUTYPE_CD?: string | null;
  BIZCOND_NM?: string | null;
  INDUTYPE_NM?: string | null;
  REFINE_ROADNM_ADDR: string;
  REFINE_LOTNO_ADDR: string;
  TELNO: string;
  REGION_MNY_NM?: string | null;
  BRNHSTRM_MNY_USE_POSBL_YN?: string | null;
  CARD_MNY_USE_POSBL_YN?: string | null;
  MOBILE_MNY_USE_POSBL_YN?: string | null;
  REFINE_ZIP_CD: Number;
  REFINE_WGS84_LAT?: Number | null;
  REFINE_WGS84_LOGT?: Number | null;
  DATA_STD_DE?: string | null;
};
