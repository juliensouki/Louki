import {
  PixabaySearch as PixabaySearchType,
  TestPixabay as TestPixabayType,
  APIResponse,
  buildResponse,
} from '../../shared/RoutesResponses';

export type PixabaySearchResponse = APIResponse<PixabaySearchType>;
export type TestPixabayResponse = APIResponse<TestPixabayType>;

export const PixabaySearch = async (searchText: string): Promise<PixabaySearchResponse> => {
  return fetch(`/api/v1/search-pixabay?search=${searchText}`).then(async res => {
    return buildResponse(res.status, await res.json());
  });
};

export const TestPixabay = (): Promise<TestPixabayResponse> => {
  return fetch(`/api/v1/test-pixabay`).then(async res => {
    return buildResponse(res.status, await res.json());
  });
};
