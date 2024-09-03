import { BaseQueue } from '@service/queues/base.queue';

class ImageQueue extends BaseQueue {
  constructor() {
    super('images');

  }

  public addImageJob(name: string, data: any): void {
    this.addJob(name, data);
  }
}

export const imageQueue: ImageQueue = new ImageQueue();
