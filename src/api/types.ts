export type User = {
  userId: string;
  mobile: string;
  nickName: string | null;
  avatarUrl: string;
  companyName: string;
  qualificationStatus: boolean;
  icons: { icon: string; showImage: string; toUrl: string }[];
  xuserId: string;
};

export type HomeItem = {
  id: number;
  title: string;
  subTitle: string;
  className?: string;
};
