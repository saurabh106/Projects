export interface Story {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  genre: string;
  likes: number;
  comments: number;
  readTime: string;
  bookmarked?: boolean;
  progress?: number;
}

export interface StoryNode {
  id: string;
  title: string;
  content: string;
  choices?: {
    text: string;
    nextNodeId: string;
  }[];
}

export const FEATURED_STORIES: Story[] = [
  {
    id: '1',
    title: 'The Forgotten Gate',
    author: 'Elena Rivers',
    coverImage: 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Fantasy',
    likes: 4253,
    comments: 287,
    readTime: '15 min',
  },
  {
    id: '2',
    title: 'Echoes of Tomorrow',
    author: 'Marcus Chen',
    coverImage: 'https://images.pexels.com/photos/6272240/pexels-photo-6272240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Sci-Fi',
    likes: 3128,
    comments: 189,
    readTime: '12 min',
  },
];

export const TRENDING_STORIES: Story[] = [
  {
    id: '3',
    title: 'The Midnight Detective',
    author: 'Samuel Wright',
    coverImage: 'https://images.pexels.com/photos/3709369/pexels-photo-3709369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Mystery',
    likes: 2987,
    comments: 201,
    readTime: '18 min',
  },
  {
    id: '4',
    title: 'Whispers in the Wind',
    author: 'Olivia Lang',
    coverImage: 'https://images.pexels.com/photos/3617557/pexels-photo-3617557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Romance',
    likes: 3562,
    comments: 312,
    readTime: '10 min',
  },
  {
    id: '5',
    title: 'The Haunted Manor',
    author: 'James Sullivan',
    coverImage: 'https://images.pexels.com/photos/775198/pexels-photo-775198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Horror',
    likes: 2105,
    comments: 178,
    readTime: '14 min',
  },
];

export const NEW_STORIES: Story[] = [
  {
    id: '6',
    title: 'Journey to the Abyss',
    author: 'Maya Johnson',
    coverImage: 'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Adventure',
    likes: 876,
    comments: 98,
    readTime: '20 min',
  },
  {
    id: '7',
    title: 'The Last Guardian',
    author: 'Ethan Brooks',
    coverImage: 'https://images.pexels.com/photos/1374295/pexels-photo-1374295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Fantasy',
    likes: 1243,
    comments: 143,
    readTime: '16 min',
  },
  {
    id: '8',
    title: 'Silent Witness',
    author: 'Lisa Martinez',
    coverImage: 'https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Thriller',
    likes: 954,
    comments: 87,
    readTime: '12 min',
  },
];

export const ALL_STORIES: Story[] = [
  ...FEATURED_STORIES,
  ...TRENDING_STORIES,
  ...NEW_STORIES,
];

export const MY_STORIES: Story[] = [
  {
    id: '9',
    title: 'Starlight Seeker',
    author: 'Alex Morgan',
    coverImage: 'https://images.pexels.com/photos/6272240/pexels-photo-6272240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Sci-Fi',
    likes: 1845,
    comments: 176,
    readTime: '22 min',
  },
  {
    id: '10',
    title: 'The Hidden Kingdom',
    author: 'Alex Morgan',
    coverImage: 'https://images.pexels.com/photos/4666750/pexels-photo-4666750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Fantasy',
    likes: 2367,
    comments: 198,
    readTime: '25 min',
  },
];

export const MY_READING_LIST: Story[] = [
  {
    id: '1',
    title: 'The Forgotten Gate',
    author: 'Elena Rivers',
    coverImage: 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Fantasy',
    likes: 4253,
    comments: 287,
    readTime: '15 min',
    progress: 75,
    bookmarked: true,
  },
  {
    id: '3',
    title: 'The Midnight Detective',
    author: 'Samuel Wright',
    coverImage: 'https://images.pexels.com/photos/3709369/pexels-photo-3709369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Mystery',
    likes: 2987,
    comments: 201,
    readTime: '18 min',
    progress: 30,
    bookmarked: false,
  },
  {
    id: '5',
    title: 'The Haunted Manor',
    author: 'James Sullivan',
    coverImage: 'https://images.pexels.com/photos/775198/pexels-photo-775198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Horror',
    likes: 2105,
    comments: 178,
    readTime: '14 min',
    progress: 50,
    bookmarked: true,
  },
];

export const STORY_NODES: StoryNode[] = [
  {
    id: 'start',
    title: 'The Forgotten Gate',
    content: `The morning mist curled around your ankles as you stood at the edge of the forest. Dew-covered grass soaked through your shoes, but you hardly noticed. Your attention was fixed on the strange stone archway before you—a structure that, according to the locals, hadn't been there yesterday.\n\nIts surface was covered in symbols you didn't recognize, glowing faintly with an inner blue light. A cool breeze seemed to emanate from the space within the arch, carrying the scent of something foreign and exotic.\n\nYour research into local folklore had mentioned nothing about a gateway in these woods. As an archaeologist specializing in unexplained phenomena, you knew you should document this, call your colleagues, set up proper equipment. But something about the archway called to you on a deeper level.\n\nThe rational part of your brain suggested caution. The curious part wondered what waited on the other side.`,
    choices: [
      {
        text: 'Step through the gateway',
        nextNodeId: 'through-gate',
      },
      {
        text: 'Examine the symbols on the archway',
        nextNodeId: 'examine-symbols',
      },
      {
        text: 'Call your research partner for backup',
        nextNodeId: 'call-partner',
      },
    ],
  },
  {
    id: 'through-gate',
    title: 'A Different World',
    content: `Taking a deep breath, you step through the archway. There's a moment of disorientation—a swirling sensation and a rush of sound like distant waves—and then stillness.\n\nYou're standing in a clearing similar to the one you just left, but everything is subtly different. The trees are taller, their bark a deep purple hue. The sky above is not the blue you're accustomed to, but a soft lavender dotted with two small moons despite it being daytime.\n\nThe air feels dense with unfamiliar scents—sweet and earthy. In the distance, you can see what appears to be a small settlement, with structures that seem to be grown rather than built, their forms twisting organically from the ground upward.\n\nA path leads toward the settlement, while another winds deeper into the strange forest. The archway still stands behind you, though it now appears more weathered, as if it's been here for centuries.\n\nFrom somewhere in the forest, you hear a melodic sound—possibly singing, in a language you don't recognize.`,
    choices: [
      {
        text: 'Head toward the settlement',
        nextNodeId: 'settlement',
      },
      {
        text: 'Follow the singing into the forest',
        nextNodeId: 'forest-singing',
      },
      {
        text: 'Return through the archway',
        nextNodeId: 'return-arch',
      },
    ],
  },
  {
    id: 'examine-symbols',
    title: 'Ancient Language',
    content: `You approach the archway cautiously, pulling out your phone to take photographs of the strange symbols. They seem to shift slightly as you focus on them, making your eyes water.\n\nDrawing on your archaeological training, you recognize elements that resemble early Proto-Elamite script, but intermixed with symbols you've never encountered in any Earthly language. The blue glow pulses gently as your fingers hover near—not quite touching—the stone surface.\n\nAs you study the markings, you begin to discern a pattern. Some symbols repeat in specific sequences, reminiscent of mathematical formulas rather than language. With growing excitement, you realize this might be some kind of instruction or warning.\n\nOne particular cluster of symbols near the base of the arch seems different from the rest—less weathered, almost as if added later. As you kneel to examine it more closely, the ground beneath you trembles slightly.`,
    choices: [
      {
        text: 'Touch the glowing symbols',
        nextNodeId: 'touch-symbols',
      },
      {
        text: 'Step back and document everything',
        nextNodeId: 'document-findings',
      },
      {
        text: 'Investigate the newer symbols',
        nextNodeId: 'newer-symbols',
      },
    ],
  },
  {
    id: 'call-partner',
    title: 'Professional Caution',
    content: `You step back from the archway and pull out your phone. No signal—strange, as you usually get at least one bar in this part of the forest. You walk further back, finally catching a weak signal near the treeline.\n\n"Maya? It's me. I've found something you need to see." You describe the archway to your research partner, who responds with appropriate academic skepticism.\n\n"Don't touch anything," she warns. "I'll be there in thirty minutes. And Alex? Document everything."\n\nAs you end the call, you notice something you missed before. Footprints in the soft earth around the archway—not your own, and not matching any standard hiking boot pattern you recognize. They lead both to and from the archway, suggesting someone—or something—has already passed through.\n\nThe mist around the area seems to be thickening, and you hear a faint whispering sound that seems to be coming from the gateway itself.`,
    choices: [
      {
        text: 'Wait for Maya to arrive',
        nextNodeId: 'wait-for-maya',
      },
      {
        text: 'Follow the mysterious footprints',
        nextNodeId: 'follow-prints',
      },
      {
        text: 'Document the footprints and the archway',
        nextNodeId: 'document-all',
      },
    ],
  },
  {
    id: 'settlement',
    title: 'The Living Village',
    content: `As you approach the settlement, details come into focus. What you thought were buildings appear to be massive, hollowed plants—some kind of enormous fungi or flora you've never seen before. They pulse gently, as if breathing.\n\nThe inhabitants notice your approach. They're humanoid but clearly not human—tall, willowy figures with iridescent skin in shades of green and blue. Their eyes are large, entirely black, and they regard you with what seems like cautious curiosity rather than hostility.\n\nOne steps forward—taller than the rest, wearing what appears to be a cloak made of shimmering leaves. They speak, and while you don't understand the words, the melodic quality reminds you of the singing you heard earlier.\n\nThe figure gestures to you, then to themselves, then to a larger structure in the center of the settlement. The meaning seems clear: you're being invited inside.`,
    choices: [
      {
        text: 'Accept the invitation',
        nextNodeId: 'accept-invitation',
      },
      {
        text: "Try to communicate that you are from another world",
        nextNodeId: 'try-communicate',
      },
      {
        text: 'Politely decline and explore the outskirts of the settlement',
        nextNodeId: 'decline-invitation',
      },
    ],
  },
  {
    id: 'forest-singing',
    title: 'The Singer in the Woods',
    content: `You follow the enchanting melody deeper into the purple-barked forest. The pathway winds between enormous trees whose canopies filter the light into dappled patterns on the ground. Occasionally, small creatures—something like a cross between squirrels and butterflies—dart across your path.\n\nThe singing grows louder, and you emerge into a small clearing dominated by a pool of water so clear it appears almost like liquid crystal. Seated on a stone beside this pool is the source of the music—a being similar to those you glimpsed in the settlement, but smaller, with skin that shifts colors like an octopus as they sing.\n\nThey stop abruptly when they notice you, eyes widening in surprise. After a moment of silence, they speak—a question, judging by the inflection. When you don't respond, they tilt their head, then slowly reach into a pouch at their side and remove a small, glowing orb.`,
    choices: [
      {
        text: 'Stay still and see what they do with the orb',
        nextNodeId: 'wait-for-orb',
      },
      {
        text: 'Back away slowly',
        nextNodeId: 'back-away-singer',
      },
      {
        text: 'Attempt to communicate through gestures',
        nextNodeId: 'gesture-communication',
      },
    ],
  },
  {
    id: 'return-arch',
    title: 'The Way Back',
    content: `You decide to return through the arch. Something about this place feels too alien, too overwhelming to process without preparation. As you approach the weathered gateway, you notice that the symbols are glowing more faintly than before.\n\nA flutter of uncertainty passes through you. Will it still work as a passage back? You take a deep breath and step through.\n\nThe familiar disorientation returns—the swirling sensation, the sound of waves—but this time, it lasts longer. Much longer. When it finally subsides, you find yourself back in the forest clearing, but something is wrong.\n\nThe morning mist has cleared, and the position of the sun suggests several hours have passed, though it felt like only minutes on the other side. Your phone now shows several missed calls from Maya, your research partner.\n\nBut more disturbing is the archway itself. The blue glow of the symbols has dimmed significantly, pulsing weakly like a fading heartbeat.`,
    choices: [
      {
        text: 'Call Maya immediately',
        nextNodeId: 'call-maya-return',
      },
      {
        text: 'Document the changes in the archway',
        nextNodeId: 'document-changes',
      },
      {
        text: 'Go through the arch again before it fades completely',
        nextNodeId: 'through-fading-arch',
      },
    ],
  },
];