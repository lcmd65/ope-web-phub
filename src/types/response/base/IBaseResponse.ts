interface IImageResponse {
  id: string;
  data: {
    id: string;
    attributes: {
      name: string;
      hash: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      size: number;
      formats: {
        thumnail: IImageAttributeResponse;
        small: IImageAttributeResponse;
        medium: IImageAttributeResponse;
        large: IImageAttributeResponse;
      };
      url: string;
    };
  };
}

interface IListImageResponse {
  data: {
    id: number;
    attributes: {
      name: string;
      hash: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      size: number;
      formats: {
        thumnail: IImageAttributeResponse;
        small: IImageAttributeResponse;
        medium: IImageAttributeResponse;
        large: IImageAttributeResponse;
      };
      url: string;
    };
  }[];
}

interface IImageAttributeResponse {
  name: string;
  hash: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface ISeo {
  id?: string;
  url: string;
  type?: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  metaRobots?: string;
  structuredData?: string;
  metaImage: IImageResponse;
}

interface IBaseResponse<T = any> {
  data: T;
  paging: IPagination | null;
  msg: string;
  error: boolean;
  accessToken: string;
}

interface IPagination {
  page: number;
  limit: number;
  pageCount: number;
  total: number;
}

interface IReturnData<T = any> {
  error: boolean;
  data: T;
  accessToken: string;
  msg: string;
  pagination: IPagination | null;
}

export default IBaseResponse;
export type { IImageAttributeResponse, IImageResponse, IListImageResponse, IReturnData, ISeo };
