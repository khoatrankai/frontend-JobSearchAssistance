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
  type: 'Normal';
  applyLogs: LogData;
  resultViewJob: LogData;
  resultSearchJob: LogData;
  viewYourCompanyLogs: number;
  saveYourCompanyLogs: number;
  countPostBookmark: number;
  createCommunityLogs: number;
  saveCommunityLogs: number;
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
