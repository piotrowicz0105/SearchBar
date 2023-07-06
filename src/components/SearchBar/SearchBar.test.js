import axios from 'axios';
import { fetchAutocompleteResults, fetchPopularCities } from './fetchFunctions';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe('fetchAutocompleteResults', () => {
  let consoleOutput = [];
  const originalError = console.error;

  beforeEach(() => {
    consoleOutput = [];
    console.error = (...output) => consoleOutput.push(...output);
  });

  afterEach(() => {
    console.error = originalError;
  });

  it('fetches results successfully', async () => {
    const mock = new MockAdapter(axios);
    const data = { results: 'test' };
    mock.onGet(`https://api.comparatrip.eu/cities/autocomplete/?q=test`).reply(200, data);

    const setResult = jest.fn();
    await fetchAutocompleteResults('test', setResult);
    expect(setResult).toHaveBeenCalledWith(data);
  });

  it('handles errors', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`https://api.comparatrip.eu/cities/autocomplete/?q=test`).reply(500);

    const setResult = jest.fn();
    await fetchAutocompleteResults('test', setResult);
    expect(consoleOutput).toEqual(
      expect.arrayContaining([expect.any(Error)])
    );
  });
});
