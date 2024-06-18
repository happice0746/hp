export type PageConfig = {
  [key: string]: any;
};
export type AppConfig = {
  data: {
    [key: string]: any;
  };
  onLaunch: () => void;
  onReady: () => void;
};
