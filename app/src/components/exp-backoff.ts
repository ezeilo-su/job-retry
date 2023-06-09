class ExponentialBackoff {
  private maxRetries: number;
  private delayBase: number;
  private currentAttempt: number;

  constructor({
    maxRetries,
    delayBase = 1000
  }: {
    maxRetries: number;
    delayBase?: number;
  }) {
    this.maxRetries = maxRetries;
    this.delayBase = delayBase;
    this.currentAttempt = 0;
  }

  async retry<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (this.currentAttempt < this.maxRetries) {
        const delay = this.getDelay();
        console.log(`Retrying in ${delay}ms...`);
        await this.sleep(delay);
        this.currentAttempt++;
        return this.retry(fn);
      }
      throw error;
    }
  }

  private getDelay(): number {
    return this.delayBase * Math.pow(2, this.currentAttempt);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export { ExponentialBackoff };
