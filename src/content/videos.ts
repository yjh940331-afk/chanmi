import { channelCards, youtubeVideos } from './youtube';
import type { VideoItem } from '../types';

export const videoItems: VideoItem[] = [...channelCards, ...youtubeVideos];

export const latestVideos = youtubeVideos.slice(0, 12);

export const heroVideos = youtubeVideos.filter((item) => item.featured).slice(0, 8);

