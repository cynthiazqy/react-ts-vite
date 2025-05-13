import { Http } from './http';
import type { HomeItem, User } from './types';

export async function getUserInfo(): Promise<User> {
  try {
    const { data } = await Http.get('/api/mapp/api/user/info');
    return data || {};
  } catch (e) {
    return {} as User;
  }
}

export async function getHomeList(): Promise<HomeItem[]> {
  // const { data } = await Http.get('/api/xxx'); // TODO url
  return [
    {
      id: 1,
      title: 'step1: try',
      subTitle: 'subTitle step1: trysubTitle step1: try',
    },
    {
      id: 2,
      title: 'step2: try',
      subTitle: 'subTitle step2: trysubTitle step2: try',
    },
    {
      id: 3,
      title: 'step3: try',
      subTitle: 'subTitle step3: trysubTitle step3: try',
    },
  ] as HomeItem[];
}
