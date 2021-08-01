export interface loginResp{
  accessToken?:string;
  tokenType?:string;
  details?:string;
  isAuthentifcated:boolean
}
export interface resp {
    data: userOut;
    status: number;
    message: string;
  }
  
  export interface userOut {
    id: number;
    username: string;
    //password?: string;
  }
  
  export interface userInDb {
    id: number;
    username: string;
    password: string;
  }
  
  //oakAuthHelperOutput
  export interface userState{
    user: userOut;
    isAuth: boolean;
    message: string;
  }

  export enum nonAuthCases{
    emtyToken="empty token",
    invalidToken="invalid token",
    cantRetriveUser="can't retreive user"
  }


  