import { BaseCache } from '@service/redis/base.cache';
import Logger from 'bunyan';
import { config } from "@root/config";
import { ServerError } from '@global/helpers/error-handler';
import { ISavePostToCache } from '@post/interfaces/post.interface';


const log: Logger = config.createLogger('postCache');

export class PostCache extends BaseCache {
  constructor(){
    super('postCache');
  }

  public async savePostToCache(data: ISavePostToCache): Promise<void> {
    const { key, currentUserId, uId, createdPost } = data;
    const {
      _id,
      userId,
      username,
      email,
      avatarColor,
      profilePicture,
      post,
      bgColor,
      feelings,
      privacy,
      gifUrl,
      commentsCount,
      imgVersion,
      imgId,
      videoId,
      videoVersion,
      reactions,
      createdAt
    } = createdPost;

    const dataToSave = {
      '_id': `${_id}`,
      'userId': `${userId}`,
      'username': `${username}`,
      'email': `${email}`,
      'avatarColor': `${avatarColor}`,
      'profilePicture': `${profilePicture}`,
      'post': `${post}`,
      'bgColor': `${bgColor}`,
      'feelings': `${feelings}`,
      'privacy': `${privacy}`,
      'gifUrl': `${gifUrl}`,
      'commentsCount': `${commentsCount}`,
      'reactions': JSON.stringify(reactions),
      'imgVersion': `${imgVersion}`,
      'imgId': `${imgId}`,
      'videoId': `${videoId}`,
      'videoVersion': `${videoVersion}`,
      'createdAt': `${createdAt}`
    };

    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }

      const postCount: string[] = await this.client.HMGET(`users:${currentUserId}`, 'postsCount');
      const multi: ReturnType<typeof this.client.multi> = this.client.multi();
      await this.client.ZADD('post', { score: parseInt(uId, 10), value: `${key}` });
      for(const [itemKey, itemValue] of Object.entries(dataToSave)) {
        multi.HSET(`posts:${key}`, `${itemKey}`, `${itemValue}`);
      }
      const count: number = parseInt(postCount[0], 10) + 1;
      multi.HSET(`users:${currentUserId}`, 'postsCount', count);
      multi.exec();
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

}



