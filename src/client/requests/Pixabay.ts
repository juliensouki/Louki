import * as Responses from '../../shared/RoutesResponses';

export type PixabaySearchResponse = Responses.PixabaySearchResponse;
export type TestPixabayResponse = Responses.TestPixabayResponse;

export const PixabaySearch = async (searchText: string): Promise<PixabaySearchResponse> => {
  return fetch(`/api/v1/search-pixabay?search=${searchText}`).then(res => {
    return res.json();
  });
};

export const TestPixabay = (): Promise<TestPixabayResponse> => {
  return fetch(`/api/v1/test-pixabay`).then(res => {
    return res.json();
  });
};
