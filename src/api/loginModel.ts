import { BasicPageParams, BasicFetchResult } from '@/api/baseModel'

export interface LoginParams {
  username: string;
  password: string;
  remember_me?: boolean;
  captcha: string;
}
export interface GetSmsCaptchaParams {
  mobile: string;
}

/**
 * @description: Request list interface parameters
 */
// export type DemoParams = BasicPageParams;

export interface DemoListItem {
  id: string;
  beginTime: string;
  endTime: string;
  address: string;
  name: string;
  no: number;
  status: number;
}

/**
 * @description: Request list return value
 */
export type DemoListGetResultModel = BasicFetchResult<DemoListItem>

export interface StepCode {
  stepCode: string;
}

export type Get2StepResultModel = BasicFetchResult<StepCode>
