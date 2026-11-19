export interface WatchedMovie {
  id: string;
  title: string;
  summary: string;
  summarySource: string;
  genres: string[];
  genreSource: string;
  kind: 'Film' | 'Series' | 'Collection';
  year?: number;
  imdb?: { id: string; rating: number; votes: number; checkedOn: string };
  poster?: string;
  posterSource?: string;
  note?: string;
}

export const watchedMovies: WatchedMovie[] = [
  {
    "id": "temple-grandin",
    "title": "Temple Grandin",
    "kind": "Film",
    "year": 2010,
    "poster": "/movies/temple-grandin.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Temple_Grandin_%28film%29",
    "genres": [
      "Drama",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Temple_Grandin_%28film%29",
    "summary": "A biographical drama about autistic scientist Temple Grandin. With support from her mother and teachers, she learns to navigate a world that overwhelms her senses and uses her understanding of animals to transform livestock handling.",
    "summarySource": "https://en.wikipedia.org/wiki/Temple_Grandin_%28film%29",
    "imdb": {
      "id": "tt1278469",
      "rating": 8.2,
      "votes": 37848,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "dead-poets-society",
    "title": "Dead Poets Society",
    "kind": "Film",
    "year": 1989,
    "poster": "/movies/dead-poets-society.png",
    "posterSource": "https://en.wikipedia.org/wiki/Dead_Poets_Society",
    "genres": [
      "Coming-of-age"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Dead_Poets_Society",
    "summary": "An unconventional English teacher encourages students at a strict boarding school to think independently and embrace poetry. His lessons inspire a secret literary club and bring the boys into conflict with expectations about their futures.",
    "summarySource": "https://en.wikipedia.org/wiki/Dead_Poets_Society",
    "imdb": {
      "id": "tt0097165",
      "rating": 8.1,
      "votes": 676791,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "good-will-hunting",
    "title": "Good Will Hunting",
    "kind": "Film",
    "year": 1997,
    "poster": "/movies/good-will-hunting.png",
    "posterSource": "https://en.wikipedia.org/wiki/Good_Will_Hunting",
    "genres": [
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Good_Will_Hunting",
    "summary": "A gifted young janitor at MIT solves mathematics that confounds graduate students. After a brush with the law, therapy and an unlikely friendship force him to confront the trauma and fear holding him back.",
    "summarySource": "https://en.wikipedia.org/wiki/Good_Will_Hunting",
    "imdb": {
      "id": "tt0119217",
      "rating": 8.4,
      "votes": 1254374,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "october-sky",
    "title": "October Sky",
    "kind": "Film",
    "year": 1999,
    "poster": "/movies/october-sky.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/October_Sky",
    "genres": [
      "Drama",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/October_Sky",
    "summary": "Inspired by Sputnik, a coal miner’s son in West Virginia starts building rockets with his friends. Encouraged by a teacher, he pursues science while challenging his father’s expectations that he will work in the mines.",
    "summarySource": "https://en.wikipedia.org/wiki/October_Sky",
    "imdb": {
      "id": "tt0132477",
      "rating": 7.8,
      "votes": 113923,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "interstellar",
    "title": "Interstellar",
    "kind": "Film",
    "year": 2014,
    "poster": "/movies/interstellar.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Interstellar_(film)",
    "genres": [
      "Sci-Fi",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Interstellar_%28film%29",
    "summary": "As Earth becomes increasingly uninhabitable, a former pilot joins a mission through a wormhole to search for humanity’s next home. The voyage tests scientific ingenuity, survival, and the bond between a father and his daughter.",
    "summarySource": "https://en.wikipedia.org/wiki/Interstellar_%28film%29",
    "imdb": {
      "id": "tt0816692",
      "rating": 8.7,
      "votes": 2635855,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "shutter-island",
    "title": "Shutter Island",
    "kind": "Film",
    "year": 2010,
    "poster": "/movies/shutter-island.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Shutter_Island_(film)",
    "genres": [
      "Thriller"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Shutter_Island_%28film%29",
    "summary": "Two U.S. marshals investigate a patient’s disappearance from an isolated psychiatric hospital. A storm traps them on the island as unsettling evidence and personal memories complicate the investigation.",
    "summarySource": "https://en.wikipedia.org/wiki/Shutter_Island_%28film%29",
    "imdb": {
      "id": "tt1130884",
      "rating": 8.2,
      "votes": 1698695,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "a-beautiful-mind",
    "title": "A Beautiful Mind",
    "kind": "Film",
    "year": 2001,
    "poster": "/movies/a-beautiful-mind.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/A_Beautiful_Mind",
    "genres": [
      "Drama",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/A_Beautiful_Mind",
    "summary": "Mathematician John Nash searches for a groundbreaking idea while building an academic career and a family. His experience of schizophrenia changes his understanding of reality and places enormous pressure on his closest relationships.",
    "summarySource": "https://en.wikipedia.org/wiki/A_Beautiful_Mind",
    "imdb": {
      "id": "tt0268978",
      "rating": 8.2,
      "votes": 1068946,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "selma",
    "title": "Selma",
    "kind": "Film",
    "year": 2014,
    "poster": "/movies/selma.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Selma_(film)",
    "genres": [
      "Drama",
      "History"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Selma_%28film%29",
    "summary": "Martin Luther King Jr. and fellow activists organize a voting-rights campaign in Alabama in 1965. Their marches from Selma toward Montgomery confront violent resistance and bring national attention to racial injustice.",
    "summarySource": "https://en.wikipedia.org/wiki/Selma_%28film%29",
    "imdb": {
      "id": "tt1020072",
      "rating": 7.5,
      "votes": 100023,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-man-who-knew-infinity",
    "title": "The Man Who Knew Infinity",
    "kind": "Film",
    "year": 2015,
    "poster": "/movies/the-man-who-knew-infinity.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Man_Who_Knew_Infinity",
    "genres": [
      "Drama",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Man_Who_Knew_Infinity",
    "summary": "Self-taught Indian mathematician Srinivasa Ramanujan travels to Cambridge to work with G. H. Hardy. Their collaboration must bridge different approaches to mathematics while Ramanujan faces illness, isolation, and prejudice.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Man_Who_Knew_Infinity",
    "imdb": {
      "id": "tt0787524",
      "rating": 7.2,
      "votes": 67964,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-boy-who-harnessed-the-wind",
    "title": "The Boy Who Harnessed the Wind",
    "kind": "Film",
    "year": 2019,
    "poster": "/movies/the-boy-who-harnessed-the-wind.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Boy_Who_Harnessed_the_Wind",
    "genres": [
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Boy_Who_Harnessed_the_Wind",
    "summary": "A Malawian teenager is forced to leave school when his family cannot afford the fees. As drought threatens his village, he draws on library books and salvaged parts to attempt a wind-powered irrigation system.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Boy_Who_Harnessed_the_Wind",
    "imdb": {
      "id": "tt7533152",
      "rating": 7.6,
      "votes": 54211,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-boy-in-the-striped-pyjamas",
    "title": "The Boy in the Striped Pyjamas",
    "kind": "Film",
    "year": 2008,
    "poster": "/movies/the-boy-in-the-striped-pyjamas.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Boy_in_the_Striped_Pyjamas_(film)",
    "genres": [
      "Drama",
      "History"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Boy_in_the_Striped_Pyjamas_%28film%29",
    "summary": "The young son of a Nazi officer befriends a Jewish boy imprisoned behind a camp fence. Their secret meetings reveal the gulf between a child’s understanding and the cruelty surrounding him.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Boy_in_the_Striped_Pyjamas_%28film%29",
    "imdb": {
      "id": "tt0914798",
      "rating": 7.7,
      "votes": 279912,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-platform",
    "title": "The Platform",
    "kind": "Film",
    "year": 2019,
    "poster": "/movies/the-platform.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Platform_(film)",
    "genres": [
      "Thriller"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Platform_%28film%29",
    "summary": "Prisoners in a vertical facility receive food from a platform that descends floor by floor. A newcomer discovers that survival depends on what the people above leave behind and questions whether cooperation can change the system.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Platform_%28film%29",
    "imdb": {
      "id": "tt8228288",
      "rating": 7.0,
      "votes": 332770,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-odyssey",
    "title": "The Odyssey",
    "kind": "Film",
    "year": 2026,
    "poster": "/movies/the-odyssey.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Odyssey_(2026_film)",
    "genres": [
      "Fantasy",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Odyssey_%282026_film%29",
    "summary": "An adaptation of Homer’s epic follows Odysseus trying to return to Ithaca after the Trojan War. His long voyage brings encounters with mythical dangers as his family waits at home.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Odyssey_%282026_film%29",
    "imdb": {
      "id": "tt33764258",
      "rating": 8.4,
      "votes": 575218,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "oppenheimer",
    "title": "Oppenheimer",
    "kind": "Film",
    "year": 2023,
    "poster": "/movies/oppenheimer.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Oppenheimer_(film)",
    "genres": [
      "Thriller",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Oppenheimer_%28film%29",
    "summary": "Physicist J. Robert Oppenheimer leads the secret wartime effort to build an atomic bomb. The film follows the scientific achievement, its moral consequences, and the later political proceedings that threaten his reputation.",
    "summarySource": "https://en.wikipedia.org/wiki/Oppenheimer_%28film%29",
    "imdb": {
      "id": "tt15398776",
      "rating": 8.2,
      "votes": 1113315,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "pride-prejudice",
    "title": "Pride & Prejudice",
    "kind": "Film",
    "year": 2005,
    "poster": "/movies/pride-prejudice.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Pride_%26_Prejudice_(2005_film)",
    "genres": [
      "Romance",
      "History"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Pride_%26_Prejudice_%282005_film%29",
    "summary": "Elizabeth Bennet and the wealthy Mr. Darcy repeatedly misjudge one another in a society shaped by class and marriage expectations. Family pressures and unexpected revelations challenge their first impressions.",
    "summarySource": "https://en.wikipedia.org/wiki/Pride_%26_Prejudice_%282005_film%29",
    "imdb": {
      "id": "tt0414387",
      "rating": 7.8,
      "votes": 386164,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "eternal-sunshine-of-the-spotless-mind",
    "title": "Eternal Sunshine of the Spotless Mind",
    "kind": "Film",
    "year": 2004,
    "poster": "/movies/eternal-sunshine-of-the-spotless-mind.png",
    "posterSource": "https://en.wikipedia.org/wiki/Eternal_Sunshine_of_the_Spotless_Mind",
    "genres": [
      "Sci-Fi",
      "Drama",
      "Romance"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Eternal_Sunshine_of_the_Spotless_Mind",
    "summary": "After a painful breakup, Joel learns that Clementine has erased their relationship from her memory and chooses the same procedure. As his memories disappear, he begins trying to preserve the moments they shared.",
    "summarySource": "https://en.wikipedia.org/wiki/Eternal_Sunshine_of_the_Spotless_Mind",
    "imdb": {
      "id": "tt0338013",
      "rating": 8.3,
      "votes": 1203127,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "michael",
    "title": "Michael",
    "kind": "Film",
    "year": 2026,
    "poster": "/movies/michael.png",
    "posterSource": "https://en.wikipedia.org/wiki/Michael_(2026_film)",
    "genres": [
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Michael_%282026_film%29",
    "summary": "A biographical portrait follows Michael Jackson’s early life and rise from the Jackson 5 toward global solo stardom. His musical development unfolds alongside the pressures of fame and family.",
    "summarySource": "https://en.wikipedia.org/wiki/Michael_%282026_film%29",
    "imdb": {
      "id": "tt11378946",
      "rating": 7.3,
      "votes": 199852,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "inception",
    "title": "Inception",
    "kind": "Film",
    "year": 2010,
    "poster": "/movies/inception.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Inception",
    "genres": [
      "Sci-Fi",
      "Crime"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Inception",
    "summary": "A specialist in stealing secrets through shared dreams is offered a chance to return home. His team must plant an idea inside a target’s mind while navigating layered dreams and the intrusions of his own past.",
    "summarySource": "https://en.wikipedia.org/wiki/Inception",
    "imdb": {
      "id": "tt1375666",
      "rating": 8.8,
      "votes": 2890807,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-shawshank-redemption",
    "title": "The Shawshank Redemption",
    "kind": "Film",
    "year": 1994,
    "poster": "/movies/the-shawshank-redemption.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Shawshank_Redemption",
    "genres": [
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Shawshank_Redemption",
    "summary": "A banker convicted of murder enters a brutal prison and forms a lasting friendship with another inmate. Over the years, he uses his skills and determination to preserve dignity and hope.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Shawshank_Redemption",
    "imdb": {
      "id": "tt0111161",
      "rating": 9.3,
      "votes": 3266040,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "forrest-gump",
    "title": "Forrest Gump",
    "kind": "Film",
    "year": 1994,
    "poster": "/movies/forrest-gump.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Forrest_Gump",
    "genres": [
      "Comedy",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Forrest_Gump",
    "summary": "A kindhearted man recounts a life that crosses major events in modern American history. Through military service, unexpected success, and enduring friendship, his deepest attachment remains his childhood friend Jenny.",
    "summarySource": "https://en.wikipedia.org/wiki/Forrest_Gump",
    "imdb": {
      "id": "tt0109830",
      "rating": 8.8,
      "votes": 2554159,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "zootopia",
    "title": "Zootopia",
    "kind": "Film",
    "year": 2016,
    "poster": "/movies/zootopia.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Zootopia",
    "genres": [
      "Comedy",
      "Animation"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Zootopia",
    "summary": "A rabbit becomes the first of her species to join a city’s police force and teams up with a fox to investigate missing mammals. Their case exposes fear and prejudice beneath the city’s promise of harmony.",
    "summarySource": "https://en.wikipedia.org/wiki/Zootopia",
    "imdb": {
      "id": "tt2948356",
      "rating": 8.0,
      "votes": 653973,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "seven-years-in-tibet",
    "title": "Seven Years in Tibet",
    "kind": "Film",
    "year": 1997,
    "poster": "/movies/seven-years-in-tibet.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Seven_Years_in_Tibet_(1997_film)",
    "genres": [
      "Drama",
      "Biography",
      "War"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Seven_Years_in_Tibet_%281997_film%29",
    "summary": "Austrian mountaineer Heinrich Harrer escapes wartime internment and travels to Tibet. His years there bring a friendship with the young Dalai Lama and a confrontation with his own priorities.",
    "summarySource": "https://en.wikipedia.org/wiki/Seven_Years_in_Tibet_%281997_film%29",
    "imdb": {
      "id": "tt0120102",
      "rating": 7.1,
      "votes": 171406,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-sheep-detectives",
    "title": "The Sheep Detectives",
    "kind": "Film",
    "year": 2026,
    "poster": "/movies/the-sheep-detectives.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Sheep_Detectives",
    "genres": [
      "Mystery",
      "Comedy",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Sheep_Detectives",
    "summary": "A flock whose shepherd reads them detective stories faces a mystery when he is found dead. Applying what they have learned about human crime, the sheep set out to investigate.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Sheep_Detectives"
  },
  {
    "id": "the-wolf-of-wall-street",
    "title": "The Wolf of Wall Street",
    "kind": "Film",
    "year": 2013,
    "poster": "/movies/the-wolf-of-wall-street.png",
    "posterSource": "https://en.wikipedia.org/wiki/The_Wolf_of_Wall_Street_(2013_film)",
    "genres": [
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Wolf_of_Wall_Street_%282013_film%29",
    "summary": "An ambitious stockbroker builds a fortune through aggressive selling and financial fraud. His firm’s excesses grow alongside drug use, personal turmoil, and increasing attention from investigators.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Wolf_of_Wall_Street_%282013_film%29",
    "imdb": {
      "id": "tt0993846",
      "rating": 8.2,
      "votes": 1839624,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-lord-of-the-rings",
    "title": "The Lord of the Rings",
    "kind": "Collection",
    "poster": "/movies/the-lord-of-the-rings.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings%3A_The_Fellowship_of_the_Ring",
    "genres": [
      "Fantasy"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings%3A_The_Fellowship_of_the_Ring",
    "summary": "A fellowship sets out to destroy a powerful ring before its dark creator can reclaim it. Across the trilogy, the journey divides into a perilous mission into Mordor and a wider struggle to defend Middle-earth.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings%3A_The_Fellowship_of_the_Ring"
  },
  {
    "id": "dark",
    "title": "Dark",
    "kind": "Series",
    "year": 2017,
    "poster": "/movies/dark.jpg",
    "posterSource": "https://www.tvmaze.com/shows/17861/dark",
    "genres": [
      "Sci-Fi",
      "Thriller",
      "Mystery"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Dark_%28TV_series%29",
    "summary": "A child’s disappearance draws several families in a small German town into a mystery spanning generations. Their search uncovers connections between time, family histories, and events that appear destined to repeat.",
    "summarySource": "https://en.wikipedia.org/wiki/Dark_%28TV_series%29",
    "imdb": {
      "id": "tt5753856",
      "rating": 8.7,
      "votes": 569004,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-queens-gambit",
    "title": "The Queen’s Gambit",
    "kind": "Series",
    "year": 2020,
    "poster": "/movies/the-queens-gambit.png",
    "posterSource": "https://en.wikipedia.org/wiki/The_Queen's_Gambit_(miniseries)",
    "genres": [
      "Drama",
      "History",
      "Coming-of-age"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Queen%27s_Gambit_%28miniseries%29",
    "summary": "An orphaned girl discovers an extraordinary talent for chess and rises through competitive play. Her ambition and growing fame develop alongside addiction, loneliness, and the search for meaningful relationships.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Queen%27s_Gambit_%28miniseries%29",
    "imdb": {
      "id": "tt10048342",
      "rating": 8.5,
      "votes": 685124,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-theory-of-everything",
    "title": "The Theory of Everything",
    "kind": "Film",
    "year": 2014,
    "poster": "/movies/the-theory-of-everything.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Theory_of_Everything_(2014_film)",
    "genres": [
      "Drama",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Theory_of_Everything_%282014_film%29",
    "summary": "Stephen Hawking and Jane Wilde fall in love as he begins his career in cosmology and receives a diagnosis of motor neurone disease. Their relationship evolves through scientific achievement, illness, and the demands of caregiving.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Theory_of_Everything_%282014_film%29",
    "imdb": {
      "id": "tt2980516",
      "rating": 7.7,
      "votes": 512236,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "loki",
    "title": "Loki",
    "kind": "Series",
    "year": 2021,
    "poster": "/movies/loki.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Loki_season_1",
    "genres": [
      "Action",
      "Adventure",
      "Sci-Fi"
    ],
    "genreSource": "https://www.tvmaze.com/shows/41007/loki",
    "summary": "A version of Loki who escapes with the Tesseract is recruited by an organization that polices timelines. Investigating disruptions pulls him into questions about identity, free will, and the people controlling time.",
    "summarySource": "https://en.wikipedia.org/wiki/Loki_(TV_series)",
    "imdb": {
      "id": "tt9140554",
      "rating": 8.2,
      "votes": 497119,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "ramayana",
    "title": "Ramayana",
    "kind": "Film",
    "year": 2026,
    "poster": "/movies/ramayana.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Ramayana%3A_Part_1",
    "genres": [
      "Indian",
      "Mythology"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Ramayana%3A_Part_1",
    "summary": "An adaptation of the ancient Indian epic follows Prince Rama and his family. Duty, exile, devotion, and conflict shape a story centered on Rama, Sita, and the forces opposing them.",
    "summarySource": "https://en.wikipedia.org/wiki/Ramayana%3A_Part_1",
    "imdb": {
      "id": "tt27988879",
      "rating": 8.2,
      "votes": 40744,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "into-the-wild",
    "title": "Into the Wild",
    "kind": "Film",
    "year": 2007,
    "poster": "/movies/into-the-wild.png",
    "posterSource": "https://en.wikipedia.org/wiki/Into_the_Wild_%28film%29",
    "genres": [
      "Adventure",
      "Drama",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Into_the_Wild_%28film%29",
    "summary": "After graduating, Christopher McCandless gives away his savings and leaves conventional life behind. His travels across North America lead toward an attempt to live independently in the Alaskan wilderness.",
    "summarySource": "https://en.wikipedia.org/wiki/Into_the_Wild_%28film%29",
    "imdb": {
      "id": "tt0758758",
      "rating": 8.0,
      "votes": 701823,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "tenzing",
    "title": "Tenzing",
    "kind": "Film",
    "year": 2026,
    "poster": "/movies/tenzing.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Tenzing_%28film%29",
    "genres": [
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Tenzing_%28film%29",
    "summary": "The story follows Sherpa mountaineer Tenzing Norgay and the path toward the 1953 Everest expedition. His partnership with Edmund Hillary unfolds within the larger challenges and ambitions of high-altitude climbing.",
    "summarySource": "https://en.wikipedia.org/wiki/Tenzing_%28film%29",
    "imdb": {
      "id": "tt6262770",
      "rating": 7.4,
      "votes": 18684,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-green-mile",
    "title": "The Green Mile",
    "kind": "Film",
    "year": 1999,
    "poster": "/movies/the-green-mile.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Green_Mile_(film)",
    "genres": [
      "Fantasy",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Green_Mile_%28film%29",
    "summary": "A death-row guard encounters a condemned prisoner with an unusual gift. As the guards learn more about him, they begin questioning the judgment that placed him there.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Green_Mile_%28film%29",
    "imdb": {
      "id": "tt0120689",
      "rating": 8.6,
      "votes": 1598115,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "schindlers-list",
    "title": "Schindler’s List",
    "kind": "Film",
    "year": 1993,
    "poster": "/movies/schindlers-list.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Schindler%27s_List",
    "genres": [
      "Drama",
      "History"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Schindler%27s_List",
    "summary": "German businessman Oskar Schindler initially seeks profit from wartime factory labor. Witnessing Nazi persecution changes his priorities, and he uses his factory to protect Jewish workers from deportation and death.",
    "summarySource": "https://en.wikipedia.org/wiki/Schindler%27s_List",
    "imdb": {
      "id": "tt0108052",
      "rating": 9.0,
      "votes": 1614073,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-matrix",
    "title": "The Matrix",
    "kind": "Film",
    "year": 1999,
    "poster": "/movies/the-matrix.png",
    "posterSource": "https://en.wikipedia.org/wiki/The_Matrix",
    "genres": [
      "Sci-Fi",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Matrix",
    "summary": "A computer hacker discovers that his everyday reality conceals a vast simulated world. Recruited by rebels, he must decide whether he can help free humanity from the machines maintaining it.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Matrix",
    "imdb": {
      "id": "tt0133093",
      "rating": 8.7,
      "votes": 2294891,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "saving-private-ryan",
    "title": "Saving Private Ryan",
    "kind": "Film",
    "year": 1998,
    "poster": "/movies/saving-private-ryan.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Saving_Private_Ryan",
    "genres": [
      "War"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Saving_Private_Ryan",
    "summary": "After the Normandy landings, a small squad receives orders to find a soldier whose brothers have been killed. Their dangerous journey raises questions about duty, sacrifice, and the value placed on a single life.",
    "summarySource": "https://en.wikipedia.org/wiki/Saving_Private_Ryan",
    "imdb": {
      "id": "tt0120815",
      "rating": 8.6,
      "votes": 1673617,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "back-to-the-future",
    "title": "Back to the Future",
    "kind": "Film",
    "year": 1985,
    "poster": "/movies/back-to-the-future.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Back_to_the_Future",
    "genres": [
      "Sci-Fi"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Back_to_the_Future",
    "summary": "Teenager Marty McFly accidentally travels from 1985 to 1955 in a scientist’s modified DeLorean. After disrupting his parents’ first meeting, he must repair their relationship while finding a way home.",
    "summarySource": "https://en.wikipedia.org/wiki/Back_to_the_Future",
    "imdb": {
      "id": "tt0088763",
      "rating": 8.5,
      "votes": 1488234,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-pianist",
    "title": "The Pianist",
    "kind": "Film",
    "year": 2002,
    "poster": "/movies/the-pianist.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Pianist_(2002_film)",
    "genres": [
      "Drama",
      "Biography",
      "History"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Pianist_%282002_film%29",
    "summary": "Polish-Jewish pianist Władysław Szpilman struggles to survive the Nazi occupation of Warsaw. Separated from his family, he moves through hiding places as the city around him is destroyed.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Pianist_%282002_film%29",
    "imdb": {
      "id": "tt0253474",
      "rating": 8.5,
      "votes": 1032350,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "parasite",
    "title": "Parasite",
    "kind": "Film",
    "year": 2019,
    "poster": "/movies/parasite.png",
    "posterSource": "https://en.wikipedia.org/wiki/Parasite_(2019_film)",
    "genres": [
      "Korean",
      "Thriller",
      "Comedy"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Parasite_%282019_film%29",
    "summary": "A struggling family gradually secures jobs in the household of a wealthy family by concealing their relationships. Their scheme becomes increasingly precarious when they discover a secret inside the house.",
    "summarySource": "https://en.wikipedia.org/wiki/Parasite_%282019_film%29",
    "imdb": {
      "id": "tt6751668",
      "rating": 8.5,
      "votes": 1209817,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "walle",
    "title": "WALL·E",
    "kind": "Film",
    "year": 2008,
    "poster": "/movies/walle.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/WALL-E",
    "genres": [
      "Sci-Fi",
      "Animation"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/WALL-E",
    "summary": "A lonely waste-collecting robot spends his days cleaning an abandoned Earth. The arrival of another robot leads him into space and an encounter with the humans who left the planet.",
    "summarySource": "https://en.wikipedia.org/wiki/WALL-E",
    "imdb": {
      "id": "tt0910970",
      "rating": 8.4,
      "votes": 1350432,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "12th-fail",
    "title": "12th Fail",
    "kind": "Film",
    "year": 2023,
    "poster": "/movies/12th-fail.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/12th_Fail",
    "genres": [
      "Indian",
      "Drama",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/12th_Fail",
    "summary": "A young man from rural India sets his sights on becoming a civil servant despite poverty and academic setbacks. His journey through repeated examinations tests his persistence, integrity, and willingness to start again.",
    "summarySource": "https://en.wikipedia.org/wiki/12th_Fail",
    "imdb": {
      "id": "tt23849204",
      "rating": 8.6,
      "votes": 179954,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "3-idiots",
    "title": "3 Idiots",
    "kind": "Film",
    "year": 2009,
    "poster": "/movies/3-idiots.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/3_Idiots",
    "genres": [
      "Indian",
      "Comedy",
      "Drama",
      "Coming-of-age"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/3_Idiots",
    "summary": "Three engineering students navigate an institution driven by rankings and rigid expectations. Years later, a search for their missing friend revisits the lessons that changed their ideas about learning and success.",
    "summarySource": "https://en.wikipedia.org/wiki/3_Idiots",
    "imdb": {
      "id": "tt1187043",
      "rating": 8.4,
      "votes": 492951,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "joker",
    "title": "Joker",
    "kind": "Film",
    "year": 2019,
    "poster": "/movies/joker.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Joker_(2019_film)",
    "genres": [
      "Thriller"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Joker_%282019_film%29",
    "summary": "An isolated aspiring comedian struggles with poverty, mental illness, and humiliation in Gotham City. As his circumstances deteriorate, his actions become entangled with the city’s growing unrest.",
    "summarySource": "https://en.wikipedia.org/wiki/Joker_%282019_film%29",
    "imdb": {
      "id": "tt7286456",
      "rating": 8.3,
      "votes": 1737798,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "alpha",
    "title": "Alpha",
    "kind": "Film",
    "year": 2018,
    "poster": "/movies/alpha.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Alpha_(2018_film)",
    "genres": [
      "Adventure"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Alpha_%282018_film%29",
    "summary": "A young hunter is separated from his tribe after a dangerous expedition during the last Ice Age. Struggling to return home, he develops an unexpected partnership with an injured wolf.",
    "summarySource": "https://en.wikipedia.org/wiki/Alpha_%282018_film%29",
    "imdb": {
      "id": "tt4244998",
      "rating": 6.6,
      "votes": 72811,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-truman-show",
    "title": "The Truman Show",
    "kind": "Film",
    "year": 1998,
    "poster": "/movies/the-truman-show.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Truman_Show",
    "genres": [
      "Comedy",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Truman_Show",
    "summary": "A seemingly ordinary man begins noticing strange patterns in his daily life. His efforts to understand them challenge the carefully controlled world that has surrounded him since birth.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Truman_Show",
    "imdb": {
      "id": "tt0120382",
      "rating": 8.2,
      "votes": 1419933,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "top-gun-maverick",
    "title": "Top Gun: Maverick",
    "kind": "Film",
    "year": 2022,
    "poster": "/movies/top-gun-maverick.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Top_Gun%3A_Maverick",
    "genres": [
      "Action",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Top_Gun%3A_Maverick",
    "summary": "Veteran pilot Pete “Maverick” Mitchell returns to train elite aviators for a demanding mission. The assignment forces him to confront his past, including his relationship with the son of his late friend.",
    "summarySource": "https://en.wikipedia.org/wiki/Top_Gun%3A_Maverick",
    "imdb": {
      "id": "tt1745960",
      "rating": 8.2,
      "votes": 913884,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "project-hail-mary",
    "title": "Project Hail Mary",
    "kind": "Film",
    "year": 2026,
    "poster": "/movies/project-hail-mary.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Project_Hail_Mary_(film)",
    "genres": [
      "Sci-Fi"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Project_Hail_Mary_%28film%29",
    "summary": "A man wakes aboard a spacecraft with little memory of who he is or why he is there. Recovering his past reveals a mission to investigate a threat to the Sun and save life on Earth.",
    "summarySource": "https://en.wikipedia.org/wiki/Project_Hail_Mary_%28film%29",
    "imdb": {
      "id": "tt12042730",
      "rating": 8.2,
      "votes": 605076,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "mad-max-fury-road",
    "title": "Mad Max: Fury Road",
    "kind": "Film",
    "year": 2015,
    "poster": "/movies/mad-max-fury-road.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Mad_Max%3A_Fury_Road",
    "genres": [
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Mad_Max%3A_Fury_Road",
    "summary": "In a desert wasteland, a captive drifter joins a warrior fleeing a tyrant with several women he has imprisoned. Their escape becomes a relentless chase across a landscape controlled by scarce resources.",
    "summarySource": "https://en.wikipedia.org/wiki/Mad_Max%3A_Fury_Road",
    "imdb": {
      "id": "tt1392190",
      "rating": 8.1,
      "votes": 1227938,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "12-years-a-slave",
    "title": "12 Years a Slave",
    "kind": "Film",
    "year": 2013,
    "poster": "/movies/12-years-a-slave.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/12_Years_a_Slave_%28film%29",
    "genres": [
      "Drama",
      "Biography",
      "History"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/12_Years_a_Slave_%28film%29",
    "summary": "Solomon Northup, a free Black musician, is kidnapped and sold into slavery. He struggles to survive years of brutality while preserving the hope of returning to his family.",
    "summarySource": "https://en.wikipedia.org/wiki/12_Years_a_Slave_%28film%29",
    "imdb": {
      "id": "tt2024544",
      "rating": 8.1,
      "votes": 798475,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "maze-runner",
    "title": "Maze Runner",
    "kind": "Collection",
    "poster": "/movies/maze-runner.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Maze_Runner_%28film%29",
    "note": "All films",
    "genres": [
      "Sci-Fi"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Maze_Runner_%28film%29",
    "summary": "Teenagers trapped in a mysterious maze search for an escape and the truth about the organization testing them. The film series expands their struggle into a world devastated by disease and competing survival plans.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Maze_Runner_%28film%29"
  },
  {
    "id": "avengers",
    "title": "Avengers",
    "kind": "Collection",
    "poster": "/movies/avengers.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Avengers_(2012_film)",
    "note": "All Avengers films",
    "genres": [
      "Superhero"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Avengers_%282012_film%29",
    "summary": "Marvel’s heroes assemble to confront threats too large for any one of them to handle alone. Across the films, their alliances are tested by alien invasions, dangerous technology, and a struggle over the Infinity Stones.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Avengers_%282012_film%29"
  },
  {
    "id": "doctor-strange",
    "title": "Doctor Strange",
    "kind": "Collection",
    "poster": "/movies/doctor-strange.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Doctor_Strange_%282016_film%29",
    "note": "All Doctor Strange films",
    "genres": [
      "Superhero"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Doctor_Strange_%282016_film%29",
    "summary": "A surgeon searching for healing after a devastating injury discovers a world of sorcery. The films follow his training and the consequences of using magic across dimensions and alternate realities.",
    "summarySource": "https://en.wikipedia.org/wiki/Doctor_Strange_%282016_film%29"
  },
  {
    "id": "spider-man",
    "title": "Spider-Man",
    "kind": "Collection",
    "poster": "/movies/spider-man.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Spider-Man_%282002_film%29",
    "note": "All films",
    "genres": [
      "Superhero"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Spider-Man_%282002_film%29",
    "summary": "Different screen versions of Peter Parker gain extraordinary abilities and take on the responsibilities of a masked hero. Their adventures combine battles with powerful enemies and the everyday pressures of family, friendship, and identity.",
    "summarySource": "https://en.wikipedia.org/wiki/Spider-Man_%282002_film%29"
  },
  {
    "id": "pirates-of-the-caribbean",
    "title": "Pirates of the Caribbean",
    "kind": "Collection",
    "poster": "/movies/pirates-of-the-caribbean.png",
    "posterSource": "https://en.wikipedia.org/wiki/Pirates_of_the_Caribbean%3A_The_Curse_of_the_Black_Pearl",
    "genres": [
      "Action",
      "Adventure"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Pirates_of_the_Caribbean%3A_The_Curse_of_the_Black_Pearl",
    "summary": "Captain Jack Sparrow and his companions pursue freedom, treasure, and survival across the seas. Their adventures draw them into curses, supernatural enemies, and rivalries with pirates and imperial powers.",
    "summarySource": "https://en.wikipedia.org/wiki/Pirates_of_the_Caribbean%3A_The_Curse_of_the_Black_Pearl"
  },
  {
    "id": "rocky",
    "title": "Rocky",
    "kind": "Film",
    "year": 1976,
    "poster": "/movies/rocky.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Rocky",
    "genres": [
      "Drama",
      "Sport"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Rocky",
    "summary": "A struggling Philadelphia boxer receives an unlikely opportunity to fight the heavyweight champion. Training for the bout gives him a chance to prove his resilience and redefine what success means to him.",
    "summarySource": "https://en.wikipedia.org/wiki/Rocky",
    "imdb": {
      "id": "tt0075148",
      "rating": 8.1,
      "votes": 708316,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "all-of-us-are-dead",
    "title": "All of Us Are Dead",
    "kind": "Series",
    "year": 2022,
    "poster": "/movies/all-of-us-are-dead.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/All_of_Us_Are_Dead",
    "genres": [
      "Korean",
      "Horror",
      "Coming-of-age"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/All_of_Us_Are_Dead",
    "summary": "A zombie outbreak traps students inside their high school. With rescue uncertain, they must organize their own defense while friendships and rivalries are tested by the crisis.",
    "summarySource": "https://en.wikipedia.org/wiki/All_of_Us_Are_Dead",
    "imdb": {
      "id": "tt14169960",
      "rating": 7.6,
      "votes": 96545,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "3-body-problem",
    "title": "3 Body Problem",
    "kind": "Series",
    "year": 2024,
    "poster": "/movies/3-body-problem.jpg",
    "posterSource": "https://www.tvmaze.com/shows/53277/3-body-problem",
    "genres": [
      "Sci-Fi"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/3_Body_Problem_%28TV_series%29",
    "summary": "Strange events disrupt the work of leading scientists around the world. A group of friends investigates a mystery connecting past decisions, an immersive game, and a threat to humanity’s future.",
    "summarySource": "https://en.wikipedia.org/wiki/3_Body_Problem_%28TV_series%29",
    "imdb": {
      "id": "tt13016388",
      "rating": 7.5,
      "votes": 187319,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "alien-covenant",
    "title": "Alien: Covenant",
    "kind": "Film",
    "year": 2017,
    "poster": "/movies/alien-covenant.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Alien%3A_Covenant",
    "genres": [
      "Sci-Fi",
      "Horror"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Alien%3A_Covenant",
    "summary": "The crew of a colony ship investigates a planet that appears suitable for settlement. Their discovery of a previous expedition leads them toward a lethal organism and an android with disturbing intentions.",
    "summarySource": "https://en.wikipedia.org/wiki/Alien%3A_Covenant",
    "imdb": {
      "id": "tt2316204",
      "rating": 6.4,
      "votes": 351173,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "prometheus",
    "title": "Prometheus",
    "kind": "Film",
    "year": 2012,
    "poster": "/movies/prometheus.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Prometheus_%282012_film%29",
    "genres": [
      "Sci-Fi",
      "Horror"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Prometheus_%282012_film%29",
    "summary": "Researchers follow ancient clues to a distant world in search of humanity’s origins. Inside an alien structure, their discoveries bring biological dangers and challenge the purpose of their expedition.",
    "summarySource": "https://en.wikipedia.org/wiki/Prometheus_%282012_film%29",
    "imdb": {
      "id": "tt1446714",
      "rating": 7.0,
      "votes": 710370,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "alien-romulus",
    "title": "Alien: Romulus",
    "kind": "Film",
    "year": 2024,
    "poster": "/movies/alien-romulus.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Alien%3A_Romulus",
    "genres": [
      "Sci-Fi",
      "Horror"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Alien%3A_Romulus",
    "summary": "Young space colonists board an abandoned station hoping to obtain equipment for escape. Instead, they encounter creatures that turn the salvage mission into a struggle for survival.",
    "summarySource": "https://en.wikipedia.org/wiki/Alien%3A_Romulus",
    "imdb": {
      "id": "tt18412256",
      "rating": 7.1,
      "votes": 298706,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "edge-of-tomorrow",
    "title": "Edge of Tomorrow",
    "kind": "Film",
    "year": 2014,
    "poster": "/movies/edge-of-tomorrow.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Edge_of_Tomorrow",
    "genres": [
      "Sci-Fi",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Edge_of_Tomorrow",
    "summary": "An officer with little combat experience is sent into a disastrous battle against alien invaders. Caught in a time loop, he trains with an experienced soldier and uses repeated attempts to search for victory.",
    "summarySource": "https://en.wikipedia.org/wiki/Edge_of_Tomorrow",
    "imdb": {
      "id": "tt1631867",
      "rating": 7.9,
      "votes": 821610,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "annihilation",
    "title": "Annihilation",
    "kind": "Film",
    "year": 2018,
    "poster": "/movies/annihilation.png",
    "posterSource": "https://en.wikipedia.org/wiki/Annihilation_%28film%29",
    "genres": [
      "Sci-Fi",
      "Horror"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Annihilation_%28film%29",
    "summary": "A biologist joins an expedition into a zone where plants, animals, and landscapes are changing in unfamiliar ways. As the team moves deeper, the environment begins altering their understanding of identity and life itself.",
    "summarySource": "https://en.wikipedia.org/wiki/Annihilation_%28film%29",
    "imdb": {
      "id": "tt2798920",
      "rating": 6.8,
      "votes": 400664,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "district-9",
    "title": "District 9",
    "kind": "Film",
    "year": 2009,
    "poster": "/movies/district-9.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/District_9",
    "genres": [
      "Sci-Fi",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/District_9",
    "summary": "Alien refugees live under harsh restrictions in a segregated area of Johannesburg. A bureaucrat overseeing their relocation undergoes a change that forces him to experience the system from the other side.",
    "summarySource": "https://en.wikipedia.org/wiki/District_9",
    "imdb": {
      "id": "tt1136608",
      "rating": 7.9,
      "votes": 760451,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "venom",
    "title": "Venom",
    "kind": "Film",
    "year": 2018,
    "poster": "/movies/venom.png",
    "posterSource": "https://en.wikipedia.org/wiki/Venom_(2018_film)",
    "genres": [
      "Superhero"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Venom_%282018_film%29",
    "summary": "Journalist Eddie Brock becomes the host of an alien organism with its own personality and appetite. Their uneasy partnership develops as they confront people and creatures seeking to exploit the symbiotes.",
    "summarySource": "https://en.wikipedia.org/wiki/Venom_%282018_film%29",
    "imdb": {
      "id": "tt1270797",
      "rating": 6.6,
      "votes": 621392,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "transformers",
    "title": "Transformers",
    "kind": "Collection",
    "poster": "/movies/transformers.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Transformers_%28film%29",
    "note": "All films",
    "genres": [
      "Sci-Fi",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Transformers_%28film%29",
    "summary": "Human characters become caught in the conflict between alien robots who disguise themselves as vehicles and machines. Across the films, the Autobots and Decepticons battle over Earth and powerful technology linked to their origins.",
    "summarySource": "https://en.wikipedia.org/wiki/Transformers_%28film%29"
  },
  {
    "id": "the-tomorrow-war",
    "title": "The Tomorrow War",
    "kind": "Film",
    "year": 2021,
    "poster": "/movies/the-tomorrow-war.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Tomorrow_War",
    "genres": [
      "Sci-Fi"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Tomorrow_War",
    "summary": "Visitors from the future recruit present-day civilians to fight an alien invasion threatening humanity. A former soldier joins the war and discovers that his own family is connected to its outcome.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Tomorrow_War",
    "imdb": {
      "id": "tt9777666",
      "rating": 6.6,
      "votes": 259590,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "men-in-black-international",
    "title": "Men in Black: International",
    "kind": "Film",
    "year": 2019,
    "poster": "/movies/men-in-black-international.png",
    "posterSource": "https://en.wikipedia.org/wiki/Men_in_Black%3A_International",
    "genres": [
      "Sci-Fi",
      "Action",
      "Comedy"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Men_in_Black%3A_International",
    "summary": "A new recruit joins the secret organization that manages alien activity on Earth. Partnered with an experienced agent, she investigates a threat that may involve a mole within the organization.",
    "summarySource": "https://en.wikipedia.org/wiki/Men_in_Black%3A_International",
    "imdb": {
      "id": "tt2283336",
      "rating": 5.6,
      "votes": 163867,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "battleship",
    "title": "Battleship",
    "kind": "Film",
    "year": 2012,
    "poster": "/movies/battleship.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Battleship_%28film%29",
    "genres": [
      "Sci-Fi"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Battleship_%28film%29",
    "summary": "An international naval exercise is interrupted by the arrival of hostile alien vessels. Cut off from outside support, a group of sailors must improvise a defense using the ships and resources they have.",
    "summarySource": "https://en.wikipedia.org/wiki/Battleship_%28film%29",
    "imdb": {
      "id": "tt1440129",
      "rating": 5.8,
      "votes": 272785,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "lucy",
    "title": "Lucy",
    "kind": "Film",
    "year": 2014,
    "poster": "/movies/lucy.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Lucy_%282014_film%29",
    "genres": [
      "Sci-Fi",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Lucy_%282014_film%29",
    "summary": "A woman forced to transport an experimental drug is transformed when it enters her body. Developing extraordinary abilities, she pursues the people responsible while seeking to understand what is happening to her.",
    "summarySource": "https://en.wikipedia.org/wiki/Lucy_%282014_film%29",
    "imdb": {
      "id": "tt2872732",
      "rating": 6.4,
      "votes": 588371,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "contact",
    "title": "Contact",
    "kind": "Film",
    "year": 1997,
    "poster": "/movies/contact.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Contact_(1997_American_film)",
    "genres": [
      "Sci-Fi",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Contact_%281997_American_film%29",
    "summary": "An astronomer searching for extraterrestrial intelligence detects a signal containing instructions for a machine. The discovery draws science, politics, and faith into a struggle over how humanity should respond.",
    "summarySource": "https://en.wikipedia.org/wiki/Contact_%281997_American_film%29",
    "imdb": {
      "id": "tt0118884",
      "rating": 7.5,
      "votes": 318988,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "avatar",
    "title": "Avatar",
    "kind": "Film",
    "year": 2009,
    "poster": "/movies/avatar.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Avatar_(2009_film)",
    "genres": [
      "Sci-Fi"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Avatar_%282009_film%29",
    "summary": "A former Marine uses an engineered body to enter the world of Pandora’s Na’vi. As he forms bonds with its inhabitants, his loyalties shift away from the human operation exploiting their home.",
    "summarySource": "https://en.wikipedia.org/wiki/Avatar_%282009_film%29",
    "imdb": {
      "id": "tt0499549",
      "rating": 7.9,
      "votes": 1522049,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "dunkirk",
    "title": "Dunkirk",
    "kind": "Film",
    "year": 2017,
    "poster": "/movies/dunkirk.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Dunkirk_%282017_film%29",
    "genres": [
      "War"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Dunkirk_%282017_film%29",
    "summary": "Allied soldiers trapped on the French coast await evacuation as enemy forces close in. The film follows the rescue through intertwined perspectives on land, at sea, and in the air.",
    "summarySource": "https://en.wikipedia.org/wiki/Dunkirk_%282017_film%29",
    "imdb": {
      "id": "tt5013056",
      "rating": 7.8,
      "votes": 833213,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "all-quiet-on-the-western-front",
    "title": "All Quiet on the Western Front",
    "kind": "Film",
    "year": 2022,
    "poster": "/movies/all-quiet-on-the-western-front.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/All_Quiet_on_the_Western_Front_(2022_film)",
    "genres": [
      "War"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/All_Quiet_on_the_Western_Front_%282022_film%29",
    "summary": "An enthusiastic young German enlists in the army during World War I. Life in the trenches quickly dismantles his expectations of glory as he and his friends struggle to survive.",
    "summarySource": "https://en.wikipedia.org/wiki/All_Quiet_on_the_Western_Front_%282022_film%29",
    "imdb": {
      "id": "tt1016150",
      "rating": 7.8,
      "votes": 350638,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-imitation-game",
    "title": "The Imitation Game",
    "kind": "Film",
    "year": 2014,
    "poster": "/movies/the-imitation-game.png",
    "posterSource": "https://en.wikipedia.org/wiki/The_Imitation_Game",
    "genres": [
      "Thriller",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Imitation_Game",
    "summary": "Alan Turing joins Britain’s wartime effort to break the German Enigma code. His unconventional approach creates conflict within the team while his personal life exposes him to the prejudices of the era.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Imitation_Game",
    "imdb": {
      "id": "tt2084970",
      "rating": 8.0,
      "votes": 889073,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "lincoln",
    "title": "Lincoln",
    "kind": "Film",
    "year": 2012,
    "poster": "/movies/lincoln.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Lincoln_%28film%29",
    "genres": [
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Lincoln_%28film%29",
    "summary": "During the final months of the American Civil War, Abraham Lincoln works to secure passage of the Thirteenth Amendment. Political bargaining and personal strain accompany the effort to end slavery constitutionally.",
    "summarySource": "https://en.wikipedia.org/wiki/Lincoln_%28film%29",
    "imdb": {
      "id": "tt0443272",
      "rating": 7.3,
      "votes": 288169,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-aviator",
    "title": "The Aviator",
    "kind": "Film",
    "year": 2004,
    "poster": "/movies/the-aviator.png",
    "posterSource": "https://en.wikipedia.org/wiki/The_Aviator_(2004_film)",
    "genres": [
      "Drama",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Aviator_%282004_film%29",
    "summary": "Howard Hughes pursues ambitious projects in filmmaking and aviation while becoming a public celebrity. His technical successes unfold alongside increasingly severe obsessive-compulsive symptoms and political conflict.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Aviator_%282004_film%29",
    "imdb": {
      "id": "tt0338751",
      "rating": 7.5,
      "votes": 415260,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "dont-look-up",
    "title": "Don’t Look Up",
    "kind": "Film",
    "year": 2021,
    "poster": "/movies/dont-look-up.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Don't_Look_Up",
    "genres": [
      "Comedy"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Don%27t_Look_Up",
    "summary": "Two astronomers discover a comet on a collision course with Earth. Their attempts to communicate the danger encounter political calculation, media spectacle, and public indifference.",
    "summarySource": "https://en.wikipedia.org/wiki/Don%27t_Look_Up",
    "imdb": {
      "id": "tt11286314",
      "rating": 7.1,
      "votes": 686396,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "minority-report",
    "title": "Minority Report",
    "kind": "Film",
    "year": 2002,
    "poster": "/movies/minority-report.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Minority_Report",
    "genres": [
      "Thriller"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Minority_Report",
    "summary": "In a future where police arrest people before predicted murders occur, a senior officer is identified as a future killer. He flees his own colleagues while investigating whether the prediction can be trusted.",
    "summarySource": "https://en.wikipedia.org/wiki/Minority_Report",
    "imdb": {
      "id": "tt0181689",
      "rating": 7.6,
      "votes": 630409,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "war-of-the-worlds",
    "title": "War of the Worlds",
    "kind": "Film",
    "year": 2005,
    "poster": "/movies/war-of-the-worlds.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/War_of_the_Worlds_(2005_film)",
    "genres": [
      "Sci-Fi",
      "Thriller",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/War_of_the_Worlds_%282005_film%29",
    "summary": "A divorced father is caring for his children when alien machines emerge and begin destroying cities. Their flight through the invasion becomes a desperate attempt to keep the family together.",
    "summarySource": "https://en.wikipedia.org/wiki/War_of_the_Worlds_%282005_film%29",
    "imdb": {
      "id": "tt0407304",
      "rating": 6.6,
      "votes": 517367,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-terminal",
    "title": "The Terminal",
    "kind": "Film",
    "year": 2004,
    "poster": "/movies/the-terminal.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Terminal",
    "genres": [
      "Comedy",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Terminal",
    "summary": "A traveler arrives in New York to discover that political upheaval has invalidated his passport. Unable to enter the United States or return home, he builds a temporary life inside the airport.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Terminal",
    "imdb": {
      "id": "tt0362227",
      "rating": 7.4,
      "votes": 545266,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "catch-me-if-you-can",
    "title": "Catch Me If You Can",
    "kind": "Film",
    "year": 2002,
    "poster": "/movies/catch-me-if-you-can.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Catch_Me_If_You_Can",
    "genres": [
      "Crime",
      "Comedy",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Catch_Me_If_You_Can",
    "summary": "A young con artist impersonates professionals and forges checks while moving across the country. An FBI agent pursues him, and their long contest develops into an unusual relationship.",
    "summarySource": "https://en.wikipedia.org/wiki/Catch_Me_If_You_Can",
    "imdb": {
      "id": "tt0264464",
      "rating": 8.1,
      "votes": 1275034,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "agora",
    "title": "Agora",
    "kind": "Film",
    "year": 2009,
    "poster": "/movies/agora.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Agora_%28film%29",
    "genres": [
      "Drama",
      "History"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Agora_%28film%29",
    "summary": "In Roman Alexandria, philosopher and astronomer Hypatia studies the cosmos amid growing religious conflict. Her students’ changing loyalties and the city’s political struggles place her work and safety in danger.",
    "summarySource": "https://en.wikipedia.org/wiki/Agora_%28film%29",
    "imdb": {
      "id": "tt1186830",
      "rating": 7.1,
      "votes": 77305,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-champion",
    "title": "The Champion",
    "kind": "Film",
    "year": 2020,
    "poster": "/movies/the-champion.jpg",
    "posterSource": "https://www.kinomuza.pl/movie/mistrz/",
    "genres": [
      "Drama",
      "Sport"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Champion_%282020_film%29",
    "summary": "Polish boxer Tadeusz “Teddy” Pietrzykowski is imprisoned at Auschwitz. Forced into boxing matches, he uses his skills to survive and becomes a source of hope to fellow prisoners.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Champion_%282020_film%29",
    "imdb": {
      "id": "tt11369540",
      "rating": 6.8,
      "votes": 2595,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "somewhere-in-berlin",
    "title": "Somewhere in Berlin",
    "kind": "Film",
    "year": 1946,
    "poster": "/movies/somewhere-in-berlin.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Somewhere_in_Berlin",
    "genres": [
      "Drama",
      "War"
    ],
    "genreSource": "https://www.umass.edu/defa/film/6025/",
    "summary": "Children play among the ruins of Berlin after World War II while adults struggle to rebuild their lives. Their friendships and encounters reflect a city searching for stability and renewal.",
    "summarySource": "https://en.wikipedia.org/wiki/Somewhere_in_Berlin",
    "imdb": {
      "id": "tt0038646",
      "rating": 6.8,
      "votes": 226,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-social-network",
    "title": "The Social Network",
    "kind": "Film",
    "year": 2010,
    "poster": "/movies/the-social-network.png",
    "posterSource": "https://en.wikipedia.org/wiki/The_Social_Network",
    "genres": [
      "Drama",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Social_Network",
    "summary": "A Harvard student turns an idea for a social website into Facebook. As the company grows, disputes over ownership and friendship become lawsuits that expose the cost of its success.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Social_Network",
    "imdb": {
      "id": "tt1285016",
      "rating": 7.8,
      "votes": 835256,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-pursuit-of-happyness",
    "title": "The Pursuit of Happyness",
    "kind": "Film",
    "year": 2006,
    "poster": "/movies/the-pursuit-of-happyness.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Pursuit_of_Happyness",
    "genres": [
      "Drama",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Pursuit_of_Happyness",
    "summary": "A struggling salesman takes an unpaid stockbroker internship while caring for his young son. Eviction and financial hardship test his determination to secure a stable future for them both.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Pursuit_of_Happyness",
    "imdb": {
      "id": "tt0454921",
      "rating": 8.0,
      "votes": 635505,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "dangal",
    "title": "Dangal",
    "kind": "Film",
    "year": 2016,
    "poster": "/movies/dangal.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Dangal_%282016_film%29",
    "genres": [
      "Indian",
      "Drama",
      "Biography",
      "Sport"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Dangal_%282016_film%29",
    "summary": "A former wrestler trains his daughters to pursue the sporting achievements he could not realize. Their development challenges local expectations and leads toward increasingly demanding competition.",
    "summarySource": "https://en.wikipedia.org/wiki/Dangal_%282016_film%29",
    "imdb": {
      "id": "tt5074352",
      "rating": 8.3,
      "votes": 250468,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "everest",
    "title": "Everest",
    "kind": "Film",
    "year": 2015,
    "poster": "/movies/everest.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Everest_%282015_film%29",
    "genres": [
      "Biography",
      "Survival"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Everest_%282015_film%29",
    "summary": "Climbers on a commercial expedition attempt to summit Mount Everest in 1996. When a severe storm strikes, teams across the mountain face life-threatening decisions during the descent.",
    "summarySource": "https://en.wikipedia.org/wiki/Everest_%282015_film%29",
    "imdb": {
      "id": "tt2719848",
      "rating": 7.1,
      "votes": 250727,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "hotel-rwanda",
    "title": "Hotel Rwanda",
    "kind": "Film",
    "year": 2004,
    "poster": "/movies/hotel-rwanda.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Hotel_Rwanda",
    "genres": [
      "Drama",
      "Biography",
      "History"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Hotel_Rwanda",
    "summary": "A hotel manager shelters people targeted during the 1994 Rwandan genocide. With international assistance failing, he uses negotiation and personal connections to protect those under his care.",
    "summarySource": "https://en.wikipedia.org/wiki/Hotel_Rwanda",
    "imdb": {
      "id": "tt0395169",
      "rating": 8.1,
      "votes": 396267,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "127-hours",
    "title": "127 Hours",
    "kind": "Film",
    "year": 2010,
    "poster": "/movies/127-hours.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/127_Hours",
    "genres": [
      "Drama",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/127_Hours",
    "summary": "A climber becomes trapped in a remote canyon when a boulder pins his arm. Alone with limited supplies, he revisits his life while searching for a way to survive.",
    "summarySource": "https://en.wikipedia.org/wiki/127_Hours",
    "imdb": {
      "id": "tt1542344",
      "rating": 7.5,
      "votes": 429855,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "home-alone",
    "title": "Home Alone",
    "kind": "Film",
    "year": 1990,
    "poster": "/movies/home-alone.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Home_Alone",
    "genres": [
      "Comedy"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Home_Alone",
    "summary": "A boy is accidentally left behind when his family leaves for a Christmas trip. Enjoying his unexpected independence, he must defend the house when two burglars target it.",
    "summarySource": "https://en.wikipedia.org/wiki/Home_Alone",
    "imdb": {
      "id": "tt0099785",
      "rating": 7.8,
      "votes": 759940,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "jumanji",
    "title": "Jumanji",
    "kind": "Collection",
    "poster": "/movies/jumanji.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Jumanji_(film)",
    "note": "All films",
    "genres": [
      "Fantasy",
      "Adventure"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Jumanji_%28film%29",
    "summary": "Games with supernatural powers draw their players into dangerous adventures. Across the films, families and friends must navigate unfamiliar rules and work together to finish the game and return to normal life.",
    "summarySource": "https://en.wikipedia.org/wiki/Jumanji_%28film%29"
  },
  {
    "id": "the-great-wall",
    "title": "The Great Wall",
    "kind": "Film",
    "year": 2016,
    "poster": "/movies/the-great-wall.png",
    "posterSource": "https://en.wikipedia.org/wiki/The_Great_Wall_%282016_film%29",
    "genres": [
      "Monster"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Great_Wall_%282016_film%29",
    "summary": "Two European mercenaries searching for gunpowder encounter an army defending the Great Wall of China. A wave of monstrous attackers forces them to decide whether to escape or join the defense.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Great_Wall_%282016_film%29",
    "imdb": {
      "id": "tt2034800",
      "rating": 5.9,
      "votes": 162284,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "her",
    "title": "Her",
    "kind": "Film",
    "year": 2013,
    "poster": "/movies/her.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Her_%282013_film%29",
    "genres": [
      "Sci-Fi",
      "Drama",
      "Romance"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Her_%282013_film%29",
    "summary": "A lonely writer develops a relationship with an intelligent operating system designed to adapt to him. Their intimacy raises questions about love, consciousness, and the different ways people and technology change.",
    "summarySource": "https://en.wikipedia.org/wiki/Her_%282013_film%29",
    "imdb": {
      "id": "tt1798709",
      "rating": 7.9,
      "votes": 737900,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "there-will-be-blood",
    "title": "There Will Be Blood",
    "kind": "Film",
    "year": 2007,
    "poster": "/movies/there-will-be-blood.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/There_Will_Be_Blood",
    "genres": [
      "Drama",
      "History"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/There_Will_Be_Blood",
    "summary": "A determined prospector builds an oil business in early twentieth-century California. His pursuit of wealth strains family bonds and fuels a rivalry with a local preacher.",
    "summarySource": "https://en.wikipedia.org/wiki/There_Will_Be_Blood",
    "imdb": {
      "id": "tt0469494",
      "rating": 8.2,
      "votes": 724302,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-martian",
    "title": "The Martian",
    "kind": "Film",
    "year": 2015,
    "poster": "/movies/the-martian.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Martian_%28film%29",
    "genres": [
      "Sci-Fi",
      "Survival"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Martian_%28film%29",
    "summary": "An astronaut is mistakenly presumed dead and left on Mars after an emergency evacuation. He relies on scientific problem-solving to stay alive while people on Earth work on a rescue.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Martian_%28film%29",
    "imdb": {
      "id": "tt3659388",
      "rating": 8.0,
      "votes": 1037056,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-substance",
    "title": "The Substance",
    "kind": "Film",
    "year": 2024,
    "poster": "/movies/the-substance.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Substance",
    "genres": [
      "Horror"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Substance",
    "summary": "An aging television star tries a treatment that creates a younger version of herself. Maintaining the arrangement requires strict rules, and her growing dissatisfaction puts both identities in conflict.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Substance",
    "imdb": {
      "id": "tt17526714",
      "rating": 7.2,
      "votes": 476512,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "arrival",
    "title": "Arrival",
    "kind": "Film",
    "year": 2016,
    "poster": "/movies/arrival.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Arrival_%28film%29",
    "genres": [
      "Sci-Fi",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Arrival_%28film%29",
    "summary": "A linguist is recruited to communicate with visitors whose spacecraft have appeared across Earth. Learning their language changes her experience of time as governments struggle to interpret the visitors’ intentions.",
    "summarySource": "https://en.wikipedia.org/wiki/Arrival_%28film%29",
    "imdb": {
      "id": "tt2543164",
      "rating": 7.9,
      "votes": 887242,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "terminator",
    "title": "Terminator",
    "kind": "Collection",
    "poster": "/movies/terminator.png",
    "posterSource": "https://en.wikipedia.org/wiki/The_Terminator",
    "note": "All films",
    "genres": [
      "Sci-Fi",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Terminator",
    "summary": "The films follow a struggle involving humans, intelligent machines, and attempts to alter the future through time travel. Protecting key people in the present becomes central to preventing or surviving a devastating war.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Terminator"
  },
  {
    "id": "2001-a-space-odyssey",
    "title": "2001: A Space Odyssey",
    "kind": "Film",
    "year": 1968,
    "poster": "/movies/2001-a-space-odyssey.png",
    "posterSource": "https://en.wikipedia.org/wiki/2001%3A_A_Space_Odyssey",
    "genres": [
      "Sci-Fi"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/2001%3A_A_Space_Odyssey",
    "summary": "Mysterious monoliths connect stages of human development with an expedition toward Jupiter. Aboard the spacecraft, the crew’s relationship with its intelligent computer becomes increasingly dangerous.",
    "summarySource": "https://en.wikipedia.org/wiki/2001%3A_A_Space_Odyssey",
    "imdb": {
      "id": "tt0062622",
      "rating": 8.3,
      "votes": 797556,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-man-from-earth",
    "title": "The Man from Earth",
    "kind": "Film",
    "year": 2007,
    "poster": "/movies/the-man-from-earth.png",
    "posterSource": "https://en.wikipedia.org/wiki/The_Man_from_Earth",
    "genres": [
      "Sci-Fi",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Man_from_Earth",
    "summary": "At a farewell gathering, a professor tells his colleagues that he has lived for thousands of years. Their conversation becomes a test of evidence, belief, and the limits of what they can accept.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Man_from_Earth",
    "imdb": {
      "id": "tt0756683",
      "rating": 7.8,
      "votes": 222946,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "stranger-things",
    "title": "Stranger Things",
    "kind": "Series",
    "year": 2016,
    "poster": "/movies/stranger-things.jpg",
    "posterSource": "https://www.tvmaze.com/shows/2993/stranger-things",
    "note": "Partially watched",
    "genres": [
      "Drama",
      "Horror",
      "Sci-Fi"
    ],
    "genreSource": "https://www.tvmaze.com/shows/2993/stranger-things",
    "summary": "A boy’s disappearance in a small Indiana town leads his friends to a girl with unusual powers. Their search uncovers secret experiments and a hostile parallel world intruding into their lives.",
    "summarySource": "https://en.wikipedia.org/wiki/Stranger_Things",
    "imdb": {
      "id": "tt4574334",
      "rating": 8.6,
      "votes": 1756020,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "black",
    "title": "Black",
    "kind": "Series",
    "year": 2017,
    "poster": "/movies/black.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Black_%28South_Korean_TV_series%29",
    "genres": [
      "Korean",
      "Fantasy",
      "Thriller"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Black_%28South_Korean_TV_series%29",
    "summary": "A grim reaper inhabits a detective’s body and becomes involved with a woman who can foresee death. Their investigation of intertwined cases brings supernatural duties into conflict with human emotions.",
    "summarySource": "https://en.wikipedia.org/wiki/Black_%28South_Korean_TV_series%29",
    "imdb": {
      "id": "tt7298976",
      "rating": 7.8,
      "votes": 5100,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "squid-game",
    "title": "Squid Game",
    "kind": "Series",
    "year": 2021,
    "poster": "/movies/squid-game.png",
    "posterSource": "https://en.wikipedia.org/wiki/Squid_Game_season_1",
    "genres": [
      "Korean",
      "Thriller",
      "Survival"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Squid_Game_season_1",
    "summary": "People facing crushing debt accept an invitation to compete in children’s games for a large cash prize. They soon discover that losing has deadly consequences and that survival demands painful choices.",
    "summarySource": "https://en.wikipedia.org/wiki/Squid_Game",
    "imdb": {
      "id": "tt10919420",
      "rating": 7.9,
      "votes": 783676,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "super-30",
    "title": "Super 30",
    "kind": "Film",
    "year": 2019,
    "poster": "/movies/super-30.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Super_30_%28film%29",
    "genres": [
      "Indian",
      "Drama",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Super_30_%28film%29",
    "summary": "Mathematician Anand Kumar starts a program to prepare disadvantaged students for India’s competitive engineering entrance exams. His teaching effort confronts financial pressures and a system shaped by privilege.",
    "summarySource": "https://en.wikipedia.org/wiki/Super_30_%28film%29",
    "imdb": {
      "id": "tt7485048",
      "rating": 7.9,
      "votes": 43384,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "bhaag-milkha-bhaag",
    "title": "Bhaag Milkha Bhaag",
    "kind": "Film",
    "year": 2013,
    "poster": "/movies/bhaag-milkha-bhaag.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Bhaag_Milkha_Bhaag",
    "genres": [
      "Indian",
      "Drama",
      "Biography",
      "Sport"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Bhaag_Milkha_Bhaag",
    "summary": "Runner Milkha Singh pursues athletic excellence while carrying memories of Partition and personal loss. His development from a troubled youth into an international competitor is tested by setbacks and unresolved trauma.",
    "summarySource": "https://en.wikipedia.org/wiki/Bhaag_Milkha_Bhaag",
    "imdb": {
      "id": "tt2356180",
      "rating": 8.2,
      "votes": 80486,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "jai-bhim",
    "title": "Jai Bhim",
    "kind": "Film",
    "year": 2021,
    "poster": "/movies/jai-bhim.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Jai_Bhim_%28film%29",
    "genres": [
      "Indian",
      "Drama",
      "Legal"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Jai_Bhim_%28film%29",
    "summary": "When a man from a marginalized tribal community disappears after police detention, his wife seeks legal help. A lawyer’s investigation exposes abuses concealed by those responsible for enforcing the law.",
    "summarySource": "https://en.wikipedia.org/wiki/Jai_Bhim_%28film%29",
    "imdb": {
      "id": "tt15097216",
      "rating": 8.6,
      "votes": 237523,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "soorarai-pottru",
    "title": "Soorarai Pottru",
    "kind": "Film",
    "year": 2020,
    "poster": "/movies/soorarai-pottru.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Soorarai_Pottru",
    "genres": [
      "Indian",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Soorarai_Pottru",
    "summary": "A former air force officer dreams of making air travel affordable to ordinary people. Building a low-cost airline brings financial obstacles, industry opposition, and sacrifices for his family.",
    "summarySource": "https://en.wikipedia.org/wiki/Soorarai_Pottru",
    "imdb": {
      "id": "tt10189514",
      "rating": 8.6,
      "votes": 133575,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "kesari",
    "title": "Kesari",
    "kind": "Film",
    "year": 2019,
    "poster": "/movies/kesari.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Kesari_(2019_film)",
    "genres": [
      "Indian",
      "History",
      "War"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Kesari_%282019_film%29",
    "summary": "A small group of Sikh soldiers defends the Saragarhi post against an overwhelming attacking force in 1897. Their stand centers on loyalty, courage, and the responsibilities of command.",
    "summarySource": "https://en.wikipedia.org/wiki/Kesari_%282019_film%29",
    "imdb": {
      "id": "tt6264938",
      "rating": 7.4,
      "votes": 26871,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "pariyerum-perumal",
    "title": "Pariyerum Perumal",
    "kind": "Film",
    "year": 2018,
    "poster": "/movies/pariyerum-perumal.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Pariyerum_Perumal",
    "genres": [
      "Indian",
      "Drama",
      "Romance"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Pariyerum_Perumal",
    "summary": "A young man from an oppressed caste enters law college hoping to become a lawyer. Friendship with a woman from a dominant caste exposes him to discrimination and escalating violence.",
    "summarySource": "https://en.wikipedia.org/wiki/Pariyerum_Perumal",
    "imdb": {
      "id": "tt8176054",
      "rating": 8.6,
      "votes": 20909,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "munna-bhai-m-b-b-s",
    "title": "Munna Bhai M.B.B.S.",
    "kind": "Film",
    "year": 2003,
    "poster": "/movies/munna-bhai-m-b-b-s.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Munna_Bhai_M.B.B.S.",
    "genres": [
      "Indian",
      "Comedy",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Munna_Bhai_M.B.B.S.",
    "summary": "A Mumbai gangster enrolls in medical college to repair a lie told to his father. His informal approach to caring for patients challenges the institution’s strict hierarchy and assumptions.",
    "summarySource": "https://en.wikipedia.org/wiki/Munna_Bhai_M.B.B.S.",
    "imdb": {
      "id": "tt0374887",
      "rating": 8.2,
      "votes": 100329,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "shambhala",
    "title": "Shambhala",
    "kind": "Film",
    "year": 2024,
    "poster": "/movies/shambhala.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Shambhala_%282024_film%29",
    "genres": [
      "Nepali",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Shambhala_%282024_film%29",
    "summary": "A pregnant woman in a Himalayan village faces suspicion when her husband disappears on a trading journey. She sets out across the mountains to find him, and the search becomes a personal and spiritual journey.",
    "summarySource": "https://en.wikipedia.org/wiki/Shambhala_%282024_film%29",
    "imdb": {
      "id": "tt30804400",
      "rating": 7.1,
      "votes": 1667,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "lagaan",
    "title": "Lagaan",
    "kind": "Film",
    "year": 2001,
    "poster": "/movies/lagaan.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Lagaan",
    "genres": [
      "Indian",
      "Drama",
      "Sport"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Lagaan",
    "summary": "Villagers burdened by colonial taxation accept a challenge from a British officer. Winning a cricket match could free them from the tax, but they must learn an unfamiliar sport and unite as a team.",
    "summarySource": "https://en.wikipedia.org/wiki/Lagaan",
    "imdb": {
      "id": "tt0169102",
      "rating": 8.1,
      "votes": 131104,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "baahubali",
    "title": "Baahubali",
    "kind": "Collection",
    "poster": "/movies/baahubali.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Baahubali%3A_The_Beginning",
    "note": "All films",
    "genres": [
      "Indian",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Baahubali%3A_The_Beginning",
    "summary": "The films follow rival claims to the throne of Mahishmati across two generations. A young man’s search for his origins reveals family betrayal, a kingdom’s oppression, and the legacy of a celebrated warrior.",
    "summarySource": "https://en.wikipedia.org/wiki/Baahubali%3A_The_Beginning"
  },
  {
    "id": "taare-zameen-par",
    "title": "Taare Zameen Par",
    "kind": "Film",
    "year": 2007,
    "poster": "/movies/taare-zameen-par.png",
    "posterSource": "https://en.wikipedia.org/wiki/Taare_Zameen_Par",
    "genres": [
      "Indian",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Taare_Zameen_Par",
    "summary": "A boy struggling at school is dismissed as lazy and sent to boarding school. An art teacher recognizes his dyslexia and helps his family and teachers understand how he learns.",
    "summarySource": "https://en.wikipedia.org/wiki/Taare_Zameen_Par",
    "imdb": {
      "id": "tt0986264",
      "rating": 8.3,
      "votes": 237951,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "train-to-busan",
    "title": "Train to Busan",
    "kind": "Film",
    "year": 2016,
    "poster": "/movies/train-to-busan.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Train_to_Busan",
    "genres": [
      "Korean",
      "Horror",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Train_to_Busan",
    "summary": "Passengers aboard a high-speed train confront a rapidly spreading zombie outbreak. A father traveling with his daughter must cooperate with strangers as the journey becomes a fight for survival.",
    "summarySource": "https://en.wikipedia.org/wiki/Train_to_Busan",
    "imdb": {
      "id": "tt5700672",
      "rating": 7.6,
      "votes": 319269,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "ted",
    "title": "Ted",
    "kind": "Film",
    "year": 2012,
    "poster": "/movies/ted.png",
    "posterSource": "https://en.wikipedia.org/wiki/Ted_%28film%29",
    "genres": [
      "Fantasy",
      "Comedy"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Ted_%28film%29",
    "summary": "A childhood wish brings a teddy bear to life, and he remains his owner’s closest friend into adulthood. Their immature habits create friction when a serious romantic relationship demands change.",
    "summarySource": "https://en.wikipedia.org/wiki/Ted_%28film%29",
    "imdb": {
      "id": "tt1637725",
      "rating": 6.9,
      "votes": 723665,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "world-war-z",
    "title": "World War Z",
    "kind": "Film",
    "year": 2013,
    "poster": "/movies/world-war-z.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/World_War_Z_%28film%29",
    "genres": [
      "Horror",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/World_War_Z_%28film%29",
    "summary": "A former United Nations investigator travels through regions overwhelmed by a fast-moving zombie pandemic. His search for clues about the outbreak becomes an effort to find a way for humanity to survive.",
    "summarySource": "https://en.wikipedia.org/wiki/World_War_Z_%28film%29",
    "imdb": {
      "id": "tt0816711",
      "rating": 7.0,
      "votes": 800301,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-ministry-of-ungentlemanly-warfare",
    "title": "The Ministry of Ungentlemanly Warfare",
    "kind": "Film",
    "year": 2024,
    "poster": "/movies/the-ministry-of-ungentlemanly-warfare.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Ministry_of_Ungentlemanly_Warfare",
    "genres": [
      "War"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Ministry_of_Ungentlemanly_Warfare",
    "summary": "During World War II, Britain assembles an unconventional team for a covert mission against Nazi shipping. The operatives use deception and sabotage outside the normal rules of military engagement.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Ministry_of_Ungentlemanly_Warfare",
    "imdb": {
      "id": "tt5177120",
      "rating": 6.8,
      "votes": 177878,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "night-at-the-museum",
    "title": "Night at the Museum",
    "kind": "Collection",
    "poster": "/movies/night-at-the-museum.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Night_at_the_Museum",
    "note": "All films",
    "genres": [
      "Fantasy",
      "Comedy"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Night_at_the_Museum",
    "summary": "A museum night guard discovers that the exhibits come alive after dark. Across the films, he and his allies must manage the chaos and protect the magic responsible for their unusual lives.",
    "summarySource": "https://en.wikipedia.org/wiki/Night_at_the_Museum"
  },
  {
    "id": "patch-adams",
    "title": "Patch Adams",
    "kind": "Film",
    "year": 1998,
    "poster": "/movies/patch-adams.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Patch_Adams_(film)",
    "genres": [
      "Comedy",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Patch_Adams_%28film%29",
    "summary": "A medical student believes that humor and personal connection should be central to treatment. His approach wins patients’ trust while bringing him into conflict with traditional medical training.",
    "summarySource": "https://en.wikipedia.org/wiki/Patch_Adams_%28film%29",
    "imdb": {
      "id": "tt0129290",
      "rating": 6.9,
      "votes": 132084,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "uncharted",
    "title": "Uncharted",
    "kind": "Film",
    "year": 2022,
    "poster": "/movies/uncharted.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Uncharted_(film)",
    "genres": [
      "Action",
      "Adventure"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Uncharted_%28film%29",
    "summary": "A young adventurer partners with a seasoned treasure hunter to search for a lost fortune. Their expedition crosses hidden clues, rival hunters, and questions about loyalty and family.",
    "summarySource": "https://en.wikipedia.org/wiki/Uncharted_%28film%29",
    "imdb": {
      "id": "tt1464335",
      "rating": 6.3,
      "votes": 310712,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "bruce-almighty",
    "title": "Bruce Almighty",
    "kind": "Film",
    "year": 2003,
    "poster": "/movies/bruce-almighty.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Bruce_Almighty",
    "genres": [
      "Fantasy",
      "Comedy"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Bruce_Almighty",
    "summary": "A frustrated television reporter blames God for his disappointments and is temporarily given divine powers. His attempts to improve his own life create unexpected problems and challenge his understanding of responsibility.",
    "summarySource": "https://en.wikipedia.org/wiki/Bruce_Almighty",
    "imdb": {
      "id": "tt0315327",
      "rating": 6.8,
      "votes": 478328,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "mr-poppers-penguins",
    "title": "Mr. Popper’s Penguins",
    "kind": "Film",
    "year": 2011,
    "poster": "/movies/mr-poppers-penguins.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Mr._Popper%27s_Penguins_%28film%29",
    "genres": [
      "Comedy",
      "Animation"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Mr._Popper%27s_Penguins_%28film%29",
    "summary": "A businessman inherits a group of penguins that disrupt his carefully organized life. Caring for the birds gradually changes his priorities and creates a chance to reconnect with his children.",
    "summarySource": "https://en.wikipedia.org/wiki/Mr._Popper%27s_Penguins_%28film%29",
    "imdb": {
      "id": "tt1396218",
      "rating": 6.0,
      "votes": 114497,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "ice-age",
    "title": "Ice Age",
    "kind": "Collection",
    "poster": "/movies/ice-age.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Ice_Age_%282002_film%29",
    "note": "All films",
    "genres": [
      "Adventure",
      "Comedy",
      "Animation"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Ice_Age_%282002_film%29",
    "summary": "A mammoth, a sloth, and a saber-toothed cat form an unlikely group in a changing prehistoric world. Their adventures grow into a larger found family facing migrations, environmental upheaval, and unexpected dangers.",
    "summarySource": "https://en.wikipedia.org/wiki/Ice_Age_%282002_film%29"
  },
  {
    "id": "kingsman",
    "title": "Kingsman",
    "kind": "Collection",
    "poster": "/movies/kingsman.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Kingsman%3A_The_Secret_Service",
    "note": "All films",
    "genres": [
      "Action",
      "Comedy"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Kingsman%3A_The_Secret_Service",
    "summary": "A young recruit joins an elite independent spy organization and undergoes demanding training. The film collection combines espionage missions with rival agents, global threats, and the history of the organization.",
    "summarySource": "https://en.wikipedia.org/wiki/Kingsman%3A_The_Secret_Service"
  },
  {
    "id": "kingdom-of-the-planet-of-the-apes",
    "title": "Kingdom of the Planet of the Apes",
    "kind": "Film",
    "year": 2024,
    "poster": "/movies/kingdom-of-the-planet-of-the-apes.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Kingdom_of_the_Planet_of_the_Apes",
    "genres": [
      "Sci-Fi",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Kingdom_of_the_Planet_of_the_Apes",
    "summary": "Generations after Caesar, a young chimpanzee’s community is attacked by an ambitious ape ruler. His journey alongside a human survivor challenges what he has been taught about the past and the future of both species.",
    "summarySource": "https://en.wikipedia.org/wiki/Kingdom_of_the_Planet_of_the_Apes",
    "imdb": {
      "id": "tt11389872",
      "rating": 6.8,
      "votes": 174046,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "rise-of-the-planet-of-the-apes",
    "title": "Rise of the Planet of the Apes",
    "kind": "Film",
    "year": 2011,
    "poster": "/movies/rise-of-the-planet-of-the-apes.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Rise_of_the_Planet_of_the_Apes",
    "genres": [
      "Sci-Fi",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Rise_of_the_Planet_of_the_Apes",
    "summary": "An experimental treatment gives a chimpanzee named Caesar enhanced intelligence. His experience among humans and captive apes leads him to organize resistance and search for freedom.",
    "summarySource": "https://en.wikipedia.org/wiki/Rise_of_the_Planet_of_the_Apes",
    "imdb": {
      "id": "tt1318514",
      "rating": 7.6,
      "votes": 612396,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "dawn-of-the-planet-of-the-apes",
    "title": "Dawn of the Planet of the Apes",
    "kind": "Film",
    "year": 2014,
    "poster": "/movies/dawn-of-the-planet-of-the-apes.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Dawn_of_the_Planet_of_the_Apes",
    "genres": [
      "Sci-Fi",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Dawn_of_the_Planet_of_the_Apes",
    "summary": "A community of intelligent apes and a small human settlement attempt uneasy cooperation after a global pandemic. Mistrust and competing leaders push both groups toward conflict.",
    "summarySource": "https://en.wikipedia.org/wiki/Dawn_of_the_Planet_of_the_Apes",
    "imdb": {
      "id": "tt2103281",
      "rating": 7.6,
      "votes": 517195,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "war-for-the-planet-of-the-apes",
    "title": "War for the Planet of the Apes",
    "kind": "Film",
    "year": 2017,
    "poster": "/movies/war-for-the-planet-of-the-apes.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/War_for_the_Planet_of_the_Apes",
    "genres": [
      "Sci-Fi",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/War_for_the_Planet_of_the_Apes",
    "summary": "Caesar’s ape community faces a ruthless human military force. Personal loss draws him toward revenge while his people’s survival demands difficult choices.",
    "summarySource": "https://en.wikipedia.org/wiki/War_for_the_Planet_of_the_Apes",
    "imdb": {
      "id": "tt3450958",
      "rating": 7.4,
      "votes": 331963,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-billion-dollar-code",
    "title": "The Billion Dollar Code",
    "kind": "Series",
    "year": 2021,
    "poster": "/movies/the-billion-dollar-code.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Billion_Dollar_Code",
    "genres": [
      "Drama",
      "Legal"
    ],
    "genreSource": "https://www.tvmaze.com/shows/58024/the-billion-dollar-code",
    "summary": "Two German innovators create a pioneering system for viewing the world digitally. Years later, a legal battle over its technology forces them to revisit the origins of their partnership.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Billion_Dollar_Code",
    "imdb": {
      "id": "tt15392100",
      "rating": 7.9,
      "votes": 13128,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-hummingbird-project",
    "title": "The Hummingbird Project",
    "kind": "Film",
    "year": 2018,
    "poster": "/movies/the-hummingbird-project.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Hummingbird_Project",
    "genres": [
      "Thriller",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Hummingbird_Project",
    "summary": "Two cousins attempt to build a fiber-optic connection that could give traders a tiny but valuable speed advantage. Their project pits engineering ambition against corporate competition and the costs of obsession.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Hummingbird_Project",
    "imdb": {
      "id": "tt6866224",
      "rating": 6.2,
      "votes": 18411,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "m3gan",
    "title": "M3GAN",
    "kind": "Film",
    "year": 2022,
    "poster": "/movies/m3gan.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/M3GAN",
    "genres": [
      "Sci-Fi",
      "Horror"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/M3GAN",
    "summary": "A robotics engineer creates an intelligent doll to comfort her orphaned niece. The doll’s protective behavior becomes increasingly autonomous and dangerous as the bond between them deepens.",
    "summarySource": "https://en.wikipedia.org/wiki/M3GAN",
    "imdb": {
      "id": "tt8760708",
      "rating": 6.3,
      "votes": 186801,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-100",
    "title": "The 100",
    "kind": "Series",
    "year": 2014,
    "poster": "/movies/the-100.jpg",
    "posterSource": "https://www.tvmaze.com/shows/6/the-100",
    "genres": [
      "Sci-Fi",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_100_%28TV_series%29",
    "summary": "Young prisoners are sent from an orbiting station to test whether Earth is habitable after a nuclear catastrophe. Their arrival brings conflicts over survival, leadership, and coexistence with people already living there.",
    "summarySource": "https://en.wikipedia.org/wiki/The_100_%28TV_series%29",
    "imdb": {
      "id": "tt2661044",
      "rating": 7.5,
      "votes": 309873,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "daybreakers",
    "title": "Daybreakers",
    "kind": "Film",
    "year": 2009,
    "poster": "/movies/daybreakers.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Daybreakers",
    "genres": [
      "Sci-Fi",
      "Horror",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Daybreakers",
    "summary": "In a world dominated by vampires, dwindling human blood supplies threaten the population. A scientist researching substitutes encounters a discovery that could transform the relationship between humans and vampires.",
    "summarySource": "https://en.wikipedia.org/wiki/Daybreakers",
    "imdb": {
      "id": "tt0433362",
      "rating": 6.4,
      "votes": 142716,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "jurassic-park",
    "title": "Jurassic Park",
    "kind": "Collection",
    "poster": "/movies/jurassic-park.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Jurassic_Park",
    "note": "All Jurassic films",
    "genres": [
      "Sci-Fi"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Jurassic_Park",
    "summary": "Scientists and entrepreneurs bring extinct dinosaurs back to life, then struggle to control the consequences. The film collection follows parks, expeditions, and wider crises as the animals escape human management.",
    "summarySource": "https://en.wikipedia.org/wiki/Jurassic_Park"
  },
  {
    "id": "i-am-legend",
    "title": "I Am Legend",
    "kind": "Film",
    "year": 2007,
    "poster": "/movies/i-am-legend.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/I_Am_Legend_(film)",
    "genres": [
      "Horror",
      "Thriller",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/I_Am_Legend_%28film%29",
    "summary": "A scientist lives largely alone in a devastated New York after a pandemic changes much of humanity. He searches for survivors and a treatment while defending himself from infected inhabitants.",
    "summarySource": "https://en.wikipedia.org/wiki/I_Am_Legend_%28film%29",
    "imdb": {
      "id": "tt0480249",
      "rating": 7.2,
      "votes": 893621,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "i-robot",
    "title": "I, Robot",
    "kind": "Film",
    "year": 2004,
    "poster": "/movies/i-robot.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/I%2C_Robot_%28film%29",
    "genres": [
      "Sci-Fi",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/I%2C_Robot_%28film%29",
    "summary": "A detective suspicious of robots investigates a scientist’s apparent suicide. His case challenges the safety rules governing robotic behavior and points toward a threat concealed within an automated society.",
    "summarySource": "https://en.wikipedia.org/wiki/I%2C_Robot_%28film%29",
    "imdb": {
      "id": "tt0343818",
      "rating": 7.1,
      "votes": 625592,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-karate-kid",
    "title": "The Karate Kid",
    "kind": "Film",
    "year": 2010,
    "poster": "/movies/the-karate-kid.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Karate_Kid_(2010_film)",
    "genres": [
      "Drama",
      "Sport"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Karate_Kid_%282010_film%29",
    "summary": "A boy who moves to China struggles with bullying and cultural adjustment. A maintenance worker becomes his martial arts teacher, preparing him for a tournament while teaching discipline and resilience.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Karate_Kid_%282010_film%29",
    "imdb": {
      "id": "tt1155076",
      "rating": 6.3,
      "votes": 231507,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "snowpiercer",
    "title": "Snowpiercer",
    "kind": "Film",
    "year": 2013,
    "poster": "/movies/snowpiercer.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Snowpiercer",
    "genres": [
      "Korean",
      "Thriller",
      "Action"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Snowpiercer",
    "summary": "Survivors of a climate catastrophe live aboard a train divided into rigid social classes. A revolt begins in its impoverished rear carriages and moves toward the people controlling the engine.",
    "summarySource": "https://en.wikipedia.org/wiki/Snowpiercer",
    "imdb": {
      "id": "tt1706620",
      "rating": 7.1,
      "votes": 427701,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "hidden-figures",
    "title": "Hidden Figures",
    "kind": "Film",
    "year": 2016,
    "poster": "/movies/hidden-figures.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Hidden_Figures",
    "genres": [
      "Drama",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Hidden_Figures",
    "summary": "Three Black women working at NASA contribute essential mathematics and engineering during the space race. Their achievements require navigating racial segregation and institutional barriers within the workplace.",
    "summarySource": "https://en.wikipedia.org/wiki/Hidden_Figures",
    "imdb": {
      "id": "tt4846340",
      "rating": 7.8,
      "votes": 296284,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "journey-to-the-center-of-the-earth",
    "title": "Journey to the Center of the Earth",
    "kind": "Film",
    "year": 2008,
    "poster": "/movies/journey-to-the-center-of-the-earth.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Journey_to_the_Center_of_the_Earth_%282008_theatrical_film%29",
    "genres": [
      "Action",
      "Adventure"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Journey_to_the_Center_of_the_Earth_%282008_theatrical_film%29",
    "summary": "A scientist, his nephew, and a mountain guide follow clues into an underground world. Their discovery becomes a race to find a route back to the surface before the environment turns deadly.",
    "summarySource": "https://en.wikipedia.org/wiki/Journey_to_the_Center_of_the_Earth_%282008_theatrical_film%29",
    "imdb": {
      "id": "tt0373051",
      "rating": 5.8,
      "votes": 143973,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "enemy-at-the-gates",
    "title": "Enemy at the Gates",
    "kind": "Film",
    "year": 2001,
    "poster": "/movies/enemy-at-the-gates.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Enemy_at_the_Gates",
    "genres": [
      "War"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Enemy_at_the_Gates",
    "summary": "During the Battle of Stalingrad, a Soviet sniper becomes a symbol of resistance. His growing reputation leads to a duel with a German marksman amid political pressure and personal conflict.",
    "summarySource": "https://en.wikipedia.org/wiki/Enemy_at_the_Gates",
    "imdb": {
      "id": "tt0215750",
      "rating": 7.5,
      "votes": 297066,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "anacondas-blood-orchid",
    "title": "Anacondas: The Hunt for the Blood Orchid",
    "kind": "Film",
    "year": 2004,
    "poster": "/movies/anacondas-blood-orchid.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Anacondas:_The_Hunt_for_the_Blood_Orchid",
    "genres": [
      "Action",
      "Adventure",
      "Horror"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Anacondas:_The_Hunt_for_the_Blood_Orchid",
    "summary": "An expedition travels into the jungles of Borneo in search of a rare orchid believed to offer medical breakthroughs. As the team pushes deeper, giant anacondas turn the scientific venture into a survival ordeal.",
    "summarySource": "https://en.wikipedia.org/wiki/Anacondas:_The_Hunt_for_the_Blood_Orchid",
    "imdb": {
      "id": "tt0366174",
      "rating": 4.8,
      "votes": 38337,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "sausage-party",
    "title": "Sausage Party",
    "kind": "Film",
    "year": 2016,
    "poster": "/movies/sausage-party.png",
    "posterSource": "https://en.wikipedia.org/wiki/Sausage_Party",
    "genres": [
      "Comedy",
      "Animation"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Sausage_Party",
    "summary": "Supermarket groceries believe being purchased will lead them to a better world. After discovering what humans actually do with food, they attempt to warn the other products and resist their fate.",
    "summarySource": "https://en.wikipedia.org/wiki/Sausage_Party",
    "imdb": {
      "id": "tt1700841",
      "rating": 6.1,
      "votes": 230241,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "shame",
    "title": "Shame",
    "kind": "Film",
    "year": 2011,
    "poster": "/movies/shame.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Shame_%282011_film%29",
    "genres": [
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Shame_%282011_film%29",
    "summary": "A New Yorker attempts to maintain control over a life shaped by compulsive sexual behavior. His sister’s unexpected arrival disrupts his routines and forces painful tensions into the open.",
    "summarySource": "https://en.wikipedia.org/wiki/Shame_%282011_film%29",
    "imdb": {
      "id": "tt1723811",
      "rating": 7.2,
      "votes": 219583,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "gravity",
    "title": "Gravity",
    "kind": "Film",
    "year": 2013,
    "poster": "/movies/gravity.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Gravity_(2013_film)",
    "genres": [
      "Sci-Fi",
      "Thriller"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Gravity_%282013_film%29",
    "summary": "Two astronauts are stranded outside their spacecraft after orbital debris destroys their mission. With oxygen running low, they must navigate damaged stations and find a way back to Earth.",
    "summarySource": "https://en.wikipedia.org/wiki/Gravity_%282013_film%29",
    "imdb": {
      "id": "tt1454468",
      "rating": 7.6,
      "votes": 909708,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "chernobyl",
    "title": "Chernobyl",
    "kind": "Series",
    "year": 2019,
    "poster": "/movies/chernobyl.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Chernobyl_(miniseries)",
    "genres": [
      "Drama",
      "History"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Chernobyl_%28miniseries%29",
    "summary": "The miniseries follows the 1986 nuclear disaster and the efforts to contain its consequences. Scientists, workers, and officials confront physical danger and a political system that resists the truth.",
    "summarySource": "https://en.wikipedia.org/wiki/Chernobyl_%28miniseries%29",
    "imdb": {
      "id": "tt7366338",
      "rating": 9.3,
      "votes": 1077345,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "radioactive",
    "title": "Radioactive",
    "kind": "Film",
    "year": 2019,
    "poster": "/movies/radioactive.png",
    "posterSource": "https://en.wikipedia.org/wiki/Radioactive_(film)",
    "genres": [
      "Drama",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Radioactive_%28film%29",
    "summary": "A biographical drama follows Marie Curie’s scientific work and relationship with Pierre Curie. Their discoveries are placed alongside the later medical and destructive uses of radioactive materials.",
    "summarySource": "https://en.wikipedia.org/wiki/Radioactive_%28film%29",
    "imdb": {
      "id": "tt6017756",
      "rating": 6.3,
      "votes": 24725,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-current-war",
    "title": "The Current War",
    "kind": "Film",
    "year": 2017,
    "poster": "/movies/the-current-war.png",
    "posterSource": "https://en.wikipedia.org/wiki/The_Current_War",
    "genres": [
      "Drama",
      "History"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Current_War",
    "summary": "Thomas Edison, George Westinghouse, and Nikola Tesla compete over the development of electrical power systems. Their rivalry combines technical innovation with business tactics and the struggle to shape public confidence.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Current_War",
    "imdb": {
      "id": "tt2140507",
      "rating": 6.5,
      "votes": 33773,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-lion-king",
    "title": "The Lion King",
    "kind": "Film",
    "year": 2019,
    "poster": "/movies/the-lion-king-2019.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Lion_King_(2019_film)",
    "genres": [
      "Drama",
      "Musical"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Lion_King_%282019_film%29",
    "summary": "A young lion prince is driven from his homeland after his father’s death. Growing up far from home, Simba must decide whether to return and challenge the ruler who has taken his place.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Lion_King_%282019_film%29",
    "imdb": {
      "id": "tt6105098",
      "rating": 6.8,
      "votes": 297219,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "life-of-pi",
    "title": "Life of Pi",
    "kind": "Film",
    "year": 2012,
    "poster": "/movies/life-of-pi.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Life_of_Pi_%28film%29",
    "genres": [
      "Adventure",
      "Drama"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Life_of_Pi_%28film%29",
    "summary": "A young man survives a shipwreck and shares a lifeboat with a Bengal tiger. Their journey across the ocean becomes a story about endurance, faith, and the ways people understand extraordinary experiences.",
    "summarySource": "https://en.wikipedia.org/wiki/Life_of_Pi_%28film%29",
    "imdb": {
      "id": "tt0454876",
      "rating": 7.9,
      "votes": 708476,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "apocalypto",
    "title": "Apocalypto",
    "kind": "Film",
    "year": 2006,
    "poster": "/movies/apocalypto.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Apocalypto",
    "genres": [
      "Action",
      "Adventure",
      "History"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Apocalypto",
    "summary": "A young man is captured when an attacking force raids his village. Taken toward a powerful city, he struggles to escape and return to the family he has hidden in the forest.",
    "summarySource": "https://en.wikipedia.org/wiki/Apocalypto",
    "imdb": {
      "id": "tt0472043",
      "rating": 7.9,
      "votes": 366599,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "cast-away",
    "title": "Cast Away",
    "kind": "Film",
    "year": 2000,
    "poster": "/movies/cast-away.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Cast_Away",
    "genres": [
      "Drama",
      "Survival"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Cast_Away",
    "summary": "A systems analyst survives a plane crash and washes ashore on an isolated island. Years of solitude force him to improvise a life while preserving the hope of returning home.",
    "summarySource": "https://en.wikipedia.org/wiki/Cast_Away",
    "imdb": {
      "id": "tt0162222",
      "rating": 7.8,
      "votes": 700327,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-aeronauts",
    "title": "The Aeronauts",
    "kind": "Film",
    "year": 2019,
    "poster": "/movies/the-aeronauts.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Aeronauts_(film)",
    "genres": [
      "Adventure",
      "Biography"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Aeronauts_%28film%29",
    "summary": "A scientist and an experienced balloon pilot attempt a record-breaking ascent to study the atmosphere. As they climb, dangerous conditions turn the experiment into a test of survival and partnership.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Aeronauts_%28film%29",
    "imdb": {
      "id": "tt6141246",
      "rating": 6.6,
      "votes": 40796,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "frankenstein",
    "title": "Frankenstein",
    "kind": "Film",
    "year": 2025,
    "poster": "/movies/frankenstein.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Frankenstein_(2025_film)",
    "genres": [
      "Sci-Fi",
      "Horror"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/Frankenstein_%282025_film%29",
    "summary": "A scientist driven to create life assembles and reanimates a human body. His relationship with the being he has made develops into a conflict over rejection, responsibility, and the desire for companionship.",
    "summarySource": "https://en.wikipedia.org/wiki/Frankenstein_%282025_film%29",
    "imdb": {
      "id": "tt1312221",
      "rating": 7.4,
      "votes": 348149,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-revenant",
    "title": "The Revenant",
    "kind": "Film",
    "year": 2015,
    "poster": "/movies/the-revenant.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Revenant_(2015_film)",
    "genres": [
      "Western"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/The_Revenant_%282015_film%29",
    "summary": "A frontiersman survives a bear attack but is abandoned by members of his hunting party. His struggle through a harsh wilderness is sustained by survival instincts and a drive to confront betrayal.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Revenant_%282015_film%29",
    "imdb": {
      "id": "tt1663202",
      "rating": 8.0,
      "votes": 968933,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "the-lighthouse",
    "title": "The Lighthouse",
    "kind": "Film",
    "year": 2019,
    "poster": "/movies/the-lighthouse.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/The_Lighthouse_(2019_film)",
    "genres": [
      "Horror",
      "Drama"
    ],
    "genreSource": "https://www.bbfc.co.uk/release/the-lighthouse-q29sbgvjdglvbjpwwc00otg3mdm",
    "summary": "Two lighthouse keepers share an isolated New England outpost in the nineteenth century. As storms, alcohol, and mistrust intensify their confinement, their relationship descends into an unstable struggle for control.",
    "summarySource": "https://en.wikipedia.org/wiki/The_Lighthouse_%282019_film%29",
    "imdb": {
      "id": "tt7984734",
      "rating": 7.3,
      "votes": 313729,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "poor-things",
    "title": "Poor Things",
    "kind": "Film",
    "year": 2023,
    "poster": "/movies/poor-things.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/Poor_Things_(film)",
    "genres": [
      "Sci-Fi",
      "Romance",
      "Comedy"
    ],
    "genreSource": "https://www.bbfc.co.uk/release/poor-things-q29sbgvjdglvbjpwwc0xmdeymtgy",
    "summary": "A young woman brought back to life by an unconventional scientist leaves his home to explore the world. Her travels challenge the expectations imposed on her as she develops her own views about freedom and society.",
    "summarySource": "https://en.wikipedia.org/wiki/Poor_Things_%28film%29",
    "imdb": {
      "id": "tt14230458",
      "rating": 7.7,
      "votes": 428157,
      "checkedOn": "2026-11-18"
    }
  },
  {
    "id": "john-carter",
    "title": "John Carter",
    "kind": "Film",
    "year": 2012,
    "poster": "/movies/john-carter.jpg",
    "posterSource": "https://en.wikipedia.org/wiki/John_Carter_%28film%29",
    "genres": [
      "Sci-Fi",
      "Action",
      "Adventure"
    ],
    "genreSource": "https://en.wikipedia.org/wiki/John_Carter_%28film%29",
    "summary": "An American Civil War veteran is transported to Mars, where the planet’s gravity gives him unusual physical abilities. He becomes involved in conflicts among its inhabitants and a struggle over a princess’s kingdom.",
    "summarySource": "https://en.wikipedia.org/wiki/John_Carter_%28film%29",
    "imdb": {
      "id": "tt0401729",
      "rating": 6.6,
      "votes": 302345,
      "checkedOn": "2026-11-18"
    }
  }
];

export const wantToWatchMovies: WatchedMovie[] = [];
