export interface LogActivity {
    month: number;
    year: number;
    count: number;
  }
  
  export interface LogData {
    total: number;
    activities: LogActivity[];
  }
  
  export interface DataLog {
    viewYourCompanyLogs: number | undefined;
    saveYourCompanyLogs: number | undefined;
    type: 'Normal';
    viewPostLogs: LogData;
    applyLogs: LogData;
    savePostLogs: LogData;
    viewProfileLogs: number;
    searchLogs: number;
    countPostBookmark:number;
    saveYourProfileLogs: number;
    saveCommunityLogs: number;
    createCommunityLogs: number;
  }
  
  export interface DataLogRecuiter {
    type: 'Recuiter';
    saveCandidateLogs: LogData;
    applyLogs: LogData;
    viewCandidateLogs: LogData;
    saveCommunityLogs: number;
    createCommunityLogs: number;
    saveYourCompanyLogs: number;
    viewYourCompanyLogs: number;
  }
  
  export interface ResultData {
    status: number;
    data: DataLog;
  }