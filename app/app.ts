import { ExponentialBackoff } from './src/components/exp-backoff';

async function fetchData(): Promise<string> {
  const randomValue = Math.random();

  if (randomValue < 0.5) {
    throw new Error('Fetching data failed');
  }

  return 'Data fetched successfully';
}

(async function main() {
  const retryPolicy = new ExponentialBackoff({
    maxRetries: 3,
    delayBase: 10000
  }); // Maximum 3 retries with a base delay of 1 second
  try {
    const result = await retryPolicy.retry(fetchData);
    console.log(result);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
