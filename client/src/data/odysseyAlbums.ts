export type OdysseyMedia = { id: string; kind: 'photo' | 'video'; src: string; thumbnail: string; title: string; width: number; height: number; duration?: number | null };
export type OdysseyAlbum = { id: string; title: string; location: string; category: 'Nature'; description: string; cover: string; coverAlt: string; tags: string[]; items: OdysseyMedia[] };

export const odysseyAlbums: OdysseyAlbum[] = [
  {
    "id": "langtang-trek",
    "title": "Langtang Trek",
    "location": "Langtang, Nepal",
    "category": "Nature",
    "description": "Mountain trails, prayer flags, snowy peaks, and moments from my trek through the Langtang valley.",
    "cover": "/odyssey/langtang/photos/05.webp",
    "coverAlt": "Prayer flags and a viewpoint sign above the Langtang valley",
    "tags": [
      "nature",
      "Nepal",
      "Langtang",
      "trekking",
      "mountains"
    ],
    "items": [
      {
        "id": "langtang-photo-1",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/01.webp",
        "thumbnail": "/odyssey/langtang/photos/01-thumb.webp",
        "title": "Prayer flags on the ridge",
        "width": 1350,
        "height": 1800
      },
      {
        "id": "langtang-photo-2",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/02.webp",
        "thumbnail": "/odyssey/langtang/photos/02-thumb.webp",
        "title": "A pause above the valley",
        "width": 1350,
        "height": 1800
      },
      {
        "id": "langtang-photo-3",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/03.webp",
        "thumbnail": "/odyssey/langtang/photos/03-thumb.webp",
        "title": "Mountain trail memories",
        "width": 1350,
        "height": 1800
      },
      {
        "id": "langtang-photo-4",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/04.webp",
        "thumbnail": "/odyssey/langtang/photos/04-thumb.webp",
        "title": "Among the prayer flags",
        "width": 778,
        "height": 1800
      },
      {
        "id": "langtang-photo-5",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/05.webp",
        "thumbnail": "/odyssey/langtang/photos/05-thumb.webp",
        "title": "Kyanjin Ri viewpoint",
        "width": 1800,
        "height": 1350
      },
      {
        "id": "langtang-photo-6",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/06.webp",
        "thumbnail": "/odyssey/langtang/photos/06-thumb.webp",
        "title": "A rest in the mountains",
        "width": 1350,
        "height": 1800
      },
      {
        "id": "langtang-photo-7",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/07.webp",
        "thumbnail": "/odyssey/langtang/photos/07-thumb.webp",
        "title": "Looking across the peaks",
        "width": 1350,
        "height": 1800
      },
      {
        "id": "langtang-photo-8",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/08.webp",
        "thumbnail": "/odyssey/langtang/photos/08-thumb.webp",
        "title": "A balcony in the Langtang valley",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-photo-9",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/09.webp",
        "thumbnail": "/odyssey/langtang/photos/09-thumb.webp",
        "title": "Snow-covered peaks",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-photo-10",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/10.webp",
        "thumbnail": "/odyssey/langtang/photos/10-thumb.webp",
        "title": "A moment on the trail",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-photo-11",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/11.webp",
        "thumbnail": "/odyssey/langtang/photos/11-thumb.webp",
        "title": "Open skies and mountain air",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-photo-12",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/12.webp",
        "thumbnail": "/odyssey/langtang/photos/12-thumb.webp",
        "title": "Above the village",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-photo-13",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/13.webp",
        "thumbnail": "/odyssey/langtang/photos/13-thumb.webp",
        "title": "Taking in the mountain views",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-photo-14",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/14.webp",
        "thumbnail": "/odyssey/langtang/photos/14-thumb.webp",
        "title": "A stop along the path",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-photo-15",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/15.webp",
        "thumbnail": "/odyssey/langtang/photos/15-thumb.webp",
        "title": "Village and mountain views",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-photo-16",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/16.webp",
        "thumbnail": "/odyssey/langtang/photos/16-thumb.webp",
        "title": "A quiet mountain moment",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-photo-17",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/17.webp",
        "thumbnail": "/odyssey/langtang/photos/17-thumb.webp",
        "title": "The valley below",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-photo-18",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/18.webp",
        "thumbnail": "/odyssey/langtang/photos/18-thumb.webp",
        "title": "Looking back across the valley",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-photo-19",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/19.webp",
        "thumbnail": "/odyssey/langtang/photos/19-thumb.webp",
        "title": "Resting beside the trail",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-photo-20",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/20.webp",
        "thumbnail": "/odyssey/langtang/photos/20-thumb.webp",
        "title": "Green slopes and open skies",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-photo-21",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/21.webp",
        "thumbnail": "/odyssey/langtang/photos/21-thumb.webp",
        "title": "Walking through the forest",
        "width": 1200,
        "height": 1600
      },
      {
        "id": "langtang-photo-22",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/22.webp",
        "thumbnail": "/odyssey/langtang/photos/22-thumb.webp",
        "title": "Beside the rushing water",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-photo-23",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/23.webp",
        "thumbnail": "/odyssey/langtang/photos/23-thumb.webp",
        "title": "Crossing the suspension bridge",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-photo-24",
        "kind": "photo",
        "src": "/odyssey/langtang/photos/24.webp",
        "thumbnail": "/odyssey/langtang/photos/24-thumb.webp",
        "title": "A pause beneath the trees",
        "width": 960,
        "height": 1280
      },
      {
        "id": "langtang-video-1",
        "kind": "video",
        "src": "/odyssey/langtang/videos/clip-01.mp4",
        "thumbnail": "/odyssey/langtang/posters/clip-01.webp",
        "title": "Resting on the mountain trail",
        "width": 405,
        "height": 720,
        "duration": 1.67
      },
      {
        "id": "langtang-video-2",
        "kind": "video",
        "src": "/odyssey/langtang/videos/clip-02.mp4",
        "thumbnail": "/odyssey/langtang/posters/clip-02.webp",
        "title": "A video from the Langtang valley",
        "width": 720,
        "height": 405,
        "duration": 6.48
      },
      {
        "id": "langtang-video-3",
        "kind": "video",
        "src": "/odyssey/langtang/videos/clip-03.mp4",
        "thumbnail": "/odyssey/langtang/posters/clip-03.webp",
        "title": "Taking in the mountain views",
        "width": 405,
        "height": 720,
        "duration": 3.97
      },
      {
        "id": "langtang-video-4",
        "kind": "video",
        "src": "/odyssey/langtang/videos/clip-04.mp4",
        "thumbnail": "/odyssey/langtang/posters/clip-04.webp",
        "title": "The river beside the trail",
        "width": 405,
        "height": 720,
        "duration": 3.28
      },
      {
        "id": "langtang-video-5",
        "kind": "video",
        "src": "/odyssey/langtang/videos/clip-05.mp4",
        "thumbnail": "/odyssey/langtang/posters/clip-05.webp",
        "title": "An evening with friends",
        "width": 720,
        "height": 405,
        "duration": 7.53
      },
      {
        "id": "langtang-video-6",
        "kind": "video",
        "src": "/odyssey/langtang/videos/clip-06.mp4",
        "thumbnail": "/odyssey/langtang/posters/clip-06.webp",
        "title": "On foot in the mountains",
        "width": 405,
        "height": 720,
        "duration": 16.1
      },
      {
        "id": "langtang-video-7",
        "kind": "video",
        "src": "/odyssey/langtang/videos/clip-07.mp4",
        "thumbnail": "/odyssey/langtang/posters/clip-07.webp",
        "title": "Snow over the village",
        "width": 720,
        "height": 402,
        "duration": 10.98
      },
      {
        "id": "langtang-video-8",
        "kind": "video",
        "src": "/odyssey/langtang/videos/clip-08.mp4",
        "thumbnail": "/odyssey/langtang/posters/clip-08.webp",
        "title": "Through a mountain village",
        "width": 402,
        "height": 720,
        "duration": 13.05
      },
      {
        "id": "langtang-video-9",
        "kind": "video",
        "src": "/odyssey/langtang/videos/clip-09.mp4",
        "thumbnail": "/odyssey/langtang/posters/clip-09.webp",
        "title": "The forest trail",
        "width": 402,
        "height": 720,
        "duration": 19.39
      },
      {
        "id": "langtang-video-10",
        "kind": "video",
        "src": "/odyssey/langtang/videos/clip-10.mp4",
        "thumbnail": "/odyssey/langtang/posters/clip-10.webp",
        "title": "Walking into the valley",
        "width": 720,
        "height": 402,
        "duration": 6.97
      },
      {
        "id": "langtang-video-11",
        "kind": "video",
        "src": "/odyssey/langtang/videos/clip-11.mp4",
        "thumbnail": "/odyssey/langtang/posters/clip-11.webp",
        "title": "Sunlight through the forest",
        "width": 402,
        "height": 720,
        "duration": 14.81
      },
      {
        "id": "langtang-video-12",
        "kind": "video",
        "src": "/odyssey/langtang/videos/clip-12.mp4",
        "thumbnail": "/odyssey/langtang/posters/clip-12.webp",
        "title": "Crossing mountain paths",
        "width": 402,
        "height": 720,
        "duration": 17.67
      }
    ]
  },
  {
    "id": "mustang-bike",
    "title": "Mustang by Bike",
    "location": "Mustang & the journey there, Nepal",
    "category": "Nature",
    "description": "A bike journey through Mustang, with landscapes and stops along the way in Pokhara, Baglung, Marpha, Muktinath, and Myagdi.",
    "cover": "/odyssey/mustang/photos/12.webp",
    "coverAlt": "Friends with bikes in front of the mountains in Mustang",
    "tags": [
      "nature",
      "Nepal",
      "Mustang",
      "bike",
      "travel",
      "mountains"
    ],
    "items": [
      {
        "id": "mustang-photo-1",
        "kind": "photo",
        "src": "/odyssey/mustang/photos/01.webp",
        "thumbnail": "/odyssey/mustang/photos/01-thumb.webp",
        "title": "A moment in Mustang",
        "width": 1350,
        "height": 1800
      },
      {
        "id": "mustang-photo-2",
        "kind": "photo",
        "src": "/odyssey/mustang/photos/02.webp",
        "thumbnail": "/odyssey/mustang/photos/02-thumb.webp",
        "title": "Forest light near Baglung",
        "width": 1800,
        "height": 1350
      },
      {
        "id": "mustang-photo-3",
        "kind": "photo",
        "src": "/odyssey/mustang/photos/03.webp",
        "thumbnail": "/odyssey/mustang/photos/03-thumb.webp",
        "title": "A waterfall on the Mustang journey",
        "width": 1350,
        "height": 1800
      },
      {
        "id": "mustang-photo-4",
        "kind": "photo",
        "src": "/odyssey/mustang/photos/04.webp",
        "thumbnail": "/odyssey/mustang/photos/04-thumb.webp",
        "title": "The streets of Marpha",
        "width": 1350,
        "height": 1800
      },
      {
        "id": "mustang-photo-5",
        "kind": "photo",
        "src": "/odyssey/mustang/photos/05.webp",
        "thumbnail": "/odyssey/mustang/photos/05-thumb.webp",
        "title": "With the mountains behind me",
        "width": 1800,
        "height": 1350
      },
      {
        "id": "mustang-photo-6",
        "kind": "photo",
        "src": "/odyssey/mustang/photos/06.webp",
        "thumbnail": "/odyssey/mustang/photos/06-thumb.webp",
        "title": "Mountain views from Pokhara",
        "width": 1800,
        "height": 1350
      },
      {
        "id": "mustang-photo-7",
        "kind": "photo",
        "src": "/odyssey/mustang/photos/07.webp",
        "thumbnail": "/odyssey/mustang/photos/07-thumb.webp",
        "title": "A village beneath the mountains",
        "width": 1800,
        "height": 1350
      },
      {
        "id": "mustang-photo-8",
        "kind": "photo",
        "src": "/odyssey/mustang/photos/08.webp",
        "thumbnail": "/odyssey/mustang/photos/08-thumb.webp",
        "title": "Mustang’s dry valleys",
        "width": 1350,
        "height": 1800
      },
      {
        "id": "mustang-photo-9",
        "kind": "photo",
        "src": "/odyssey/mustang/photos/09.webp",
        "thumbnail": "/odyssey/mustang/photos/09-thumb.webp",
        "title": "Wide skies over Mustang",
        "width": 1800,
        "height": 1350
      },
      {
        "id": "mustang-photo-10",
        "kind": "photo",
        "src": "/odyssey/mustang/photos/10.webp",
        "thumbnail": "/odyssey/mustang/photos/10-thumb.webp",
        "title": "The peaks of Mustang",
        "width": 1800,
        "height": 1350
      },
      {
        "id": "mustang-photo-11",
        "kind": "photo",
        "src": "/odyssey/mustang/photos/11.webp",
        "thumbnail": "/odyssey/mustang/photos/11-thumb.webp",
        "title": "Phewa Lake, Pokhara",
        "width": 1800,
        "height": 1350
      },
      {
        "id": "mustang-photo-12",
        "kind": "photo",
        "src": "/odyssey/mustang/photos/12.webp",
        "thumbnail": "/odyssey/mustang/photos/12-thumb.webp",
        "title": "Bikes, friends, and mountain views",
        "width": 1800,
        "height": 1350
      },
      {
        "id": "mustang-video-1",
        "kind": "video",
        "src": "/odyssey/mustang/videos/clip-01.mp4",
        "thumbnail": "/odyssey/mustang/posters/clip-01.webp",
        "title": "Walking through Marpha",
        "width": 405,
        "height": 720,
        "duration": 53.78
      },
      {
        "id": "mustang-video-2",
        "kind": "video",
        "src": "/odyssey/mustang/videos/clip-02.mp4",
        "thumbnail": "/odyssey/mustang/posters/clip-02.webp",
        "title": "Mountain views along the way",
        "width": 720,
        "height": 405,
        "duration": 3.44
      },
      {
        "id": "mustang-video-3",
        "kind": "video",
        "src": "/odyssey/mustang/videos/clip-03.mp4",
        "thumbnail": "/odyssey/mustang/posters/clip-03.webp",
        "title": "Views around Muktinath",
        "width": 405,
        "height": 720,
        "duration": 13.35
      },
      {
        "id": "mustang-video-4",
        "kind": "video",
        "src": "/odyssey/mustang/videos/clip-04.mp4",
        "thumbnail": "/odyssey/mustang/posters/clip-04.webp",
        "title": "Mustang’s desert landscape",
        "width": 720,
        "height": 405,
        "duration": 35.97
      },
      {
        "id": "mustang-video-5",
        "kind": "video",
        "src": "/odyssey/mustang/videos/clip-05.mp4",
        "thumbnail": "/odyssey/mustang/posters/clip-05.webp",
        "title": "A panorama of Mustang",
        "width": 720,
        "height": 405,
        "duration": 13.37
      },
      {
        "id": "mustang-video-6",
        "kind": "video",
        "src": "/odyssey/mustang/videos/clip-06.mp4",
        "thumbnail": "/odyssey/mustang/posters/clip-06.webp",
        "title": "Mustang from the bike",
        "width": 405,
        "height": 720,
        "duration": 48.2
      },
      {
        "id": "mustang-video-7",
        "kind": "video",
        "src": "/odyssey/mustang/videos/clip-07.mp4",
        "thumbnail": "/odyssey/mustang/posters/clip-07.webp",
        "title": "Exploring the mountain slopes",
        "width": 720,
        "height": 405,
        "duration": 38.78
      },
      {
        "id": "mustang-video-8",
        "kind": "video",
        "src": "/odyssey/mustang/videos/clip-08.mp4",
        "thumbnail": "/odyssey/mustang/posters/clip-08.webp",
        "title": "A waterfall in Myagdi",
        "width": 405,
        "height": 720,
        "duration": 8.87
      }
    ]
  }
];
