'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const getSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface VideoTestimonial {
  id: string;
  clientName: string;
  feedback: string;
  videoUrl: string;
  order: number;
}

interface Ctx {
  videos: VideoTestimonial[];
  addVideo: (v: Omit<VideoTestimonial, 'id' | 'order'>) => void;
  updateVideo: (v: VideoTestimonial) => void;
  deleteVideo: (id: string) => void;
  uploadVideoFile: (file: File) => Promise<string>;
}

const VideoTestimonialsContext = createContext<Ctx>({
  videos: [], addVideo: () => {}, updateVideo: () => {}, deleteVideo: () => {},
  uploadVideoFile: async () => '',
});

export function VideoTestimonialsProvider({ children }: { children: React.ReactNode }) {
  const [videos, setVideos] = useState<VideoTestimonial[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getSupabase().from('video_testimonials').select('*');
      if (data && data.length > 0) {
        const items = data.map((r: any) => ({ id: r.id, ...r.data })) as VideoTestimonial[];
        items.sort((a, b) => a.order - b.order);
        setVideos(items);
      }
    })();
  }, []);

  const save = async (items: VideoTestimonial[]) => {
    setVideos(items);
    for (const v of items) {
      const { id, ...data } = v;
      await getSupabase().from('video_testimonials').upsert({ id, data }, { onConflict: 'id' });
    }
  };

  const addVideo = (v: Omit<VideoTestimonial, 'id' | 'order'>) => {
    const newItem: VideoTestimonial = { ...v, id: crypto.randomUUID(), order: videos.length };
    save([...videos, newItem]);
  };

  const updateVideo = (v: VideoTestimonial) => {
    save(videos.map(x => x.id === v.id ? v : x));
  };

  const deleteVideo = (id: string) => {
    const updated = videos.filter(x => x.id !== id);
    setVideos(updated);
    getSupabase().from('video_testimonials').delete().eq('id', id);
  };

  const uploadVideoFile = async (file: File): Promise<string> => {
    const sb = getSupabase();
    const fileName = `${crypto.randomUUID()}-${file.name.replace(/\s+/g, '_')}`;
    const { error } = await sb.storage.from('videos').upload(fileName, file, { contentType: file.type });
    if (error) throw error;
    const { data } = sb.storage.from('videos').getPublicUrl(fileName);
    return data.publicUrl;
  };

  return (
    <VideoTestimonialsContext.Provider value={{ videos, addVideo, updateVideo, deleteVideo, uploadVideoFile }}>
      {children}
    </VideoTestimonialsContext.Provider>
  );
}

export const useVideoTestimonials = () => useContext(VideoTestimonialsContext);
