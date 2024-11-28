import axios, { AxiosInstance } from 'axios';

export class Http {
  static async axios(baseUrl?: string): Promise<AxiosInstance> {
    return new Promise((resolve) => {
      const instance = axios.create({
        baseURL: baseUrl || 'http://localhost:8080',
      });

      return resolve(instance);
    });
  }
}
