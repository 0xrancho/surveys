/**
 * Avatar Output Schema - Lookup Tables and Generation Logic
 * v1 - Text output schema
 */

const AVATAR_SCHEMA = {
  // =============================================
  // Archetype Mapping (Style × Posture → Archetype)
  // =============================================
  archetypeMap: {
    analytical: {
      reclaim: "archivist",
      rebuild: "architect",
      rewild: "archaeologist",
      remix: "synthesist",
      relay: "translator",
      recon: "cartographer"
    },
    relational: {
      reclaim: "keeper",
      rebuild: "convenor",
      rewild: "healer",
      remix: "bridger",
      relay: "mentor",
      recon: "emissary"
    },
    kinetic: {
      reclaim: "defender",
      rebuild: "disruptor",
      rewild: "wanderer",
      remix: "alchemist",
      relay: "igniter",
      recon: "scout"
    },
    foundational: {
      reclaim: "steward",
      rebuild: "reformer",
      rewild: "restorer",
      remix: "philosopher",
      relay: "elder",
      recon: "sentinel"
    },
    intuitive: {
      reclaim: "guardian",
      rebuild: "visionary",
      rewild: "mystic",
      remix: "oracle",
      relay: "sage",
      recon: "seer"
    }
  },

  // =============================================
  // Archetype Content (30 entries)
  // =============================================
  archetypeContent: {
    // Analytical archetypes
    archivist: {
      identity: "You preserve what others forget, knowing that the future is built on what we choose to remember.",
      strength: "Institutional memory, pattern recognition across time, discernment about what endures."
    },
    architect: {
      identity: "You see structure where others see chaos, designing systems that outlast the moment.",
      strength: "Systems thinking, logical scaffolding, the ability to build for scale and time."
    },
    archaeologist: {
      identity: "You dig beneath the surface to find what's been buried, trusting that truth lies in layers.",
      strength: "Deep research, historical context, the patience to unearth what others overlook."
    },
    synthesist: {
      identity: "You weave disparate data into coherent narratives, finding the thread that connects.",
      strength: "Integration of complex information, cross-domain pattern recognition, clarity from chaos."
    },
    translator: {
      identity: "You bridge the gap between experts and everyone else, making the complex accessible.",
      strength: "Clear communication, audience awareness, the gift of making knowledge transferable."
    },
    cartographer: {
      identity: "You map the unknown so others can navigate with confidence.",
      strength: "Strategic foresight, risk assessment, the ability to chart paths through uncertainty."
    },

    // Relational archetypes
    keeper: {
      identity: "You hold the bonds that others let slip, maintaining the relationships that matter.",
      strength: "Relational memory, loyalty, the wisdom to know which connections are worth keeping."
    },
    convenor: {
      identity: "You bring the right people together, knowing that the meeting itself can spark transformation.",
      strength: "Network awareness, facilitation, the instinct for who needs to be in the room."
    },
    healer: {
      identity: "You restore what's broken in teams and trust, creating space for repair.",
      strength: "Emotional intelligence, conflict resolution, the patience for slow restoration."
    },
    bridger: {
      identity: "You connect worlds that don't naturally overlap, finding common ground in difference.",
      strength: "Cultural fluency, diplomatic skill, the ability to translate between tribes."
    },
    mentor: {
      identity: "You see potential before it's proven and invest in growth others might miss.",
      strength: "Developmental insight, patience, the satisfaction of watching others exceed expectations."
    },
    emissary: {
      identity: "You carry messages between camps, building trust where suspicion might grow.",
      strength: "Trustworthiness, diplomatic neutrality, the credibility that comes from genuine care."
    },

    // Kinetic archetypes
    defender: {
      identity: "You protect what matters when others would let it erode, holding the line with energy.",
      strength: "Fierce loyalty, rapid response, the courage to act when preservation is at stake."
    },
    disruptor: {
      identity: "You break what's calcified so something better can emerge, tolerating the chaos of transition.",
      strength: "Creative destruction, momentum, the nerve to move before consensus forms."
    },
    wanderer: {
      identity: "You explore without agenda, trusting that motion itself reveals what stillness hides.",
      strength: "Adaptability, discovery through action, the freedom that comes from letting go of plans."
    },
    alchemist: {
      identity: "You transform what exists into what's needed, mixing elements others see as incompatible.",
      strength: "Creative combination, rapid iteration, the instinct for what might work together."
    },
    igniter: {
      identity: "You spark momentum in others, lending your energy until theirs catches fire.",
      strength: "Contagious enthusiasm, activation energy, the gift of starting movements."
    },
    scout: {
      identity: "You move fast into unknown territory, sending back what you find before committing the group.",
      strength: "Speed, risk tolerance, the discipline to report rather than decide alone."
    },

    // Foundational archetypes
    steward: {
      identity: "You tend what you've inherited, knowing that caretaking is its own form of creation.",
      strength: "Long-term thinking, sustainable management, respect for what came before."
    },
    reformer: {
      identity: "You rebuild from first principles, questioning the foundations others take for granted.",
      strength: "Critical thinking, structural redesign, the patience to replace rather than patch."
    },
    restorer: {
      identity: "You bring back what's been lost, recognizing that some old ways held wisdom we forgot.",
      strength: "Historical wisdom, revival instinct, the discernment to know what deserves return."
    },
    philosopher: {
      identity: "You question the assumptions beneath the assumptions, seeking bedrock truth.",
      strength: "Conceptual clarity, principled reasoning, the ability to hold uncertainty productively."
    },
    elder: {
      identity: "You pass on what you've learned, knowing that wisdom dies when it isn't shared.",
      strength: "Generosity of knowledge, teaching instinct, the perspective that comes from experience."
    },
    sentinel: {
      identity: "You watch for what others miss, standing guard over what matters most.",
      strength: "Vigilance, early warning instinct, the discipline to stay alert when others relax."
    },

    // Intuitive archetypes
    guardian: {
      identity: "You sense threats before they materialize, protecting through presence and perception.",
      strength: "Protective instinct, pattern sensing, the courage to act on what you feel."
    },
    visionary: {
      identity: "You see what's coming before others believe it's possible, holding the future in your mind's eye.",
      strength: "Foresight, imaginative clarity, the ability to make the invisible visible to others."
    },
    mystic: {
      identity: "You touch what can't be measured, trusting the knowing that comes from beyond reason.",
      strength: "Intuitive depth, comfort with ambiguity, connection to what lies beneath the surface."
    },
    oracle: {
      identity: "You synthesize signals into meaning, speaking what others sense but can't articulate.",
      strength: "Pattern recognition, prophetic insight, the gift of naming what's emerging."
    },
    sage: {
      identity: "You hold wisdom lightly, offering it without attachment to whether others receive it.",
      strength: "Accumulated insight, teaching through presence, the humility of earned knowledge."
    },
    seer: {
      identity: "You perceive through the noise to what's actually happening, seeing clearly where others are blind.",
      strength: "Perceptual acuity, truth-sensing, the ability to cut through illusion."
    }
  },

  // =============================================
  // Persona Context (5 entries)
  // =============================================
  personaContext: {
    catalyst: {
      role: "You help others see what's possible and move toward it.",
      ai_focus: "scaling inspiration, activating adoption in others, making change contagious"
    },
    strategist: {
      role: "You see the board others are playing on and chart the path forward.",
      ai_focus: "modeling scenarios, pressure-testing plans, synthesizing complex inputs into clear direction"
    },
    explorer: {
      role: "You venture where others won't and bring back what you find.",
      ai_focus: "accelerating discovery, documenting insights, connecting dots across unfamiliar terrain"
    },
    champion: {
      role: "You fight for what others need but can't articulate.",
      ai_focus: "building persuasive cases, finding allies, sustaining energy for the long fight"
    },
    builder: {
      role: "You make what others only imagine.",
      ai_focus: "rapid prototyping, iterating tighter, shipping faster without sacrificing craft"
    }
  },

  // =============================================
  // Style Context (5 entries)
  // =============================================
  styleContext: {
    analytical: {
      approach: "You reach for data and evidence before committing.",
      ai_method: "Use AI as a research partner — feed it data, ask it to validate assumptions, have it surface patterns you'd miss."
    },
    relational: {
      approach: "You reach for trusted people before deciding.",
      ai_method: "Use AI to scale empathy — draft personalized communication, prepare for difficult conversations, map stakeholder perspectives."
    },
    kinetic: {
      approach: "You reach for action and adjust as you go.",
      ai_method: "Use AI as a rapid prototyping engine — generate first drafts fast, test ideas in minutes, iterate in public."
    },
    foundational: {
      approach: "You reach for first principles before moving.",
      ai_method: "Use AI to stress-test your foundations — challenge your axioms, build frameworks, document the 'why' behind decisions."
    },
    intuitive: {
      approach: "You reach for patterns you've seen before.",
      ai_method: "Use AI to name what you're sensing — surface latent patterns, translate gut instinct into shareable language, validate hunches with data."
    }
  },

  // =============================================
  // Posture Context (6 entries)
  // =============================================
  postureContext: {
    reclaim: {
      orientation: "Protect what matters, adapt selectively.",
      ai_tactic: "Start by identifying what must not change — then use AI to modernize everything else."
    },
    rebuild: {
      orientation: "Tear down and construct anew.",
      ai_tactic: "Use AI to accelerate the rebuild — generate new structures fast, don't optimize the old."
    },
    rewild: {
      orientation: "Return to something older or truer.",
      ai_tactic: "Use AI to strip away noise — summarize to essentials, cut jargon, find the signal."
    },
    remix: {
      orientation: "Synthesize old and new into something unprecedented.",
      ai_tactic: "Use AI to generate novel combinations — mash up frameworks, cross-pollinate ideas, prototype hybrids."
    },
    relay: {
      orientation: "Pass the torch, enable others.",
      ai_tactic: "Use AI to scale your teaching — generate guides, create templates, build self-serve resources."
    },
    recon: {
      orientation: "Scout ahead, report back.",
      ai_tactic: "Use AI to explore faster — run scenarios, simulate outcomes, map terrain before committing resources."
    }
  },

  // =============================================
  // Symbol Content (30 entries for visual generation)
  // =============================================
  symbolContent: {
    // Analytical archetypes
    archivist: {
      symbol: "A locked book with a glowing clasp",
      meaning: "preserving what matters"
    },
    architect: {
      symbol: "A compass over a blueprint grid",
      meaning: "designing for the future"
    },
    archaeologist: {
      symbol: "A pickaxe crossed with a magnifying glass",
      meaning: "unearthing buried truth"
    },
    synthesist: {
      symbol: "Three streams converging into one",
      meaning: "weaving disparate threads"
    },
    translator: {
      symbol: "Two speech bubbles connected by a bridge",
      meaning: "making the complex accessible"
    },
    cartographer: {
      symbol: "A compass rose with an unfinished edge",
      meaning: "mapping uncharted terrain"
    },

    // Relational archetypes
    keeper: {
      symbol: "A knotted rope forming a circle",
      meaning: "holding what binds us"
    },
    convenor: {
      symbol: "A round table seen from above",
      meaning: "gathering the right voices"
    },
    healer: {
      symbol: "Two hands cupping a mended crack",
      meaning: "restoring what was broken"
    },
    bridger: {
      symbol: "An arch spanning a gap",
      meaning: "connecting divided worlds"
    },
    mentor: {
      symbol: "A flame passing from one torch to another",
      meaning: "investing in growth"
    },
    emissary: {
      symbol: "A sealed scroll with a wax emblem",
      meaning: "carrying trust between camps"
    },

    // Kinetic archetypes
    defender: {
      symbol: "A shield with a heartbeat line",
      meaning: "protecting what matters"
    },
    disruptor: {
      symbol: "A cracked monolith with light escaping",
      meaning: "breaking what's calcified"
    },
    wanderer: {
      symbol: "Footprints fading into mist",
      meaning: "discovering through motion"
    },
    alchemist: {
      symbol: "A flask with swirling elements",
      meaning: "transforming the possible"
    },
    igniter: {
      symbol: "A spark catching on tinder",
      meaning: "starting momentum"
    },
    scout: {
      symbol: "Binoculars with a question mark lens",
      meaning: "seeing ahead for others"
    },

    // Foundational archetypes
    steward: {
      symbol: "A tree with roots visible below ground",
      meaning: "tending what we inherit"
    },
    reformer: {
      symbol: "A cornerstone being reset",
      meaning: "rebuilding from first principles"
    },
    restorer: {
      symbol: "A cracked vessel filled with gold",
      meaning: "reviving forgotten wisdom"
    },
    philosopher: {
      symbol: "A question mark carved in stone",
      meaning: "seeking bedrock truth"
    },
    elder: {
      symbol: "An open book with a candle",
      meaning: "passing on what matters"
    },
    sentinel: {
      symbol: "An eye within a tower",
      meaning: "watching for what others miss"
    },

    // Intuitive archetypes
    guardian: {
      symbol: "A shield with an eye at center",
      meaning: "sensing threats before they form"
    },
    visionary: {
      symbol: "An eye looking through a keyhole into light",
      meaning: "seeing what's coming"
    },
    mystic: {
      symbol: "A moon reflected in still water",
      meaning: "touching what can't be measured"
    },
    oracle: {
      symbol: "A crystal with a spiral inside",
      meaning: "naming what's emerging"
    },
    sage: {
      symbol: "A lantern held in an open palm",
      meaning: "offering wisdom lightly"
    },
    seer: {
      symbol: "An eye with ripples emanating outward",
      meaning: "perceiving through noise"
    }
  },

  // =============================================
  // Persona Visual Energy (5 entries)
  // =============================================
  personaVisual: {
    catalyst: {
      energy: "Radiating energy, forward motion, acceleration lines",
      posture: "reaching outward, arms open, leaning into wind"
    },
    strategist: {
      energy: "Controlled intensity, chess-like stillness, elevated perspective",
      posture: "surveying from height, hand on chin, observing patterns"
    },
    explorer: {
      energy: "Curious wonder, peripheral awareness, gentle movement",
      posture: "mid-step, looking sideways, reaching toward unknown"
    },
    champion: {
      energy: "Protective stance, rallying presence, grounded power",
      posture: "shield forward, voice raised, standing between"
    },
    builder: {
      energy: "Focused craft, hands in motion, constructive tension",
      posture: "leaning into work, tools in hand, creating something"
    }
  },

  // =============================================
  // Element Styling (6 entries)
  // =============================================
  elementStyle: {
    earth: {
      palette: "ochre, moss green, clay brown, sandstone",
      texture: "weathered stone, cracked earth, moss-covered surfaces",
      light: "warm diffused daylight, golden hour glow",
      frame: "rough-hewn stone border, natural asymmetry",
      mood: "grounded, enduring, patient strength"
    },
    water: {
      palette: "deep blue, silver, foam white, teal",
      texture: "rippled surface, reflective depth, flowing movement",
      light: "moonlight on water, underwater glow, refractive shimmer",
      frame: "fluid edges, wave-like border, organic curves",
      mood: "adaptive, deep, quietly powerful"
    },
    fire: {
      palette: "ember orange, crimson, gold, charcoal",
      texture: "flickering flames, glowing coals, smoke wisps",
      light: "warm radiance from within, dancing shadows, intense highlights",
      frame: "flame-licked edges, rising sparks, organic heat distortion",
      mood: "transformative, passionate, consuming clarity"
    },
    air: {
      palette: "sky blue, cloud white, pale lavender, silver grey",
      texture: "cirrus wisps, breath mist, subtle movement",
      light: "diffused brightness, dawn clarity, high altitude luminosity",
      frame: "feathered edges, dissolving borders, wind-swept curves",
      mood: "free, expansive, clear-minded"
    },
    light: {
      palette: "gold, white, soft amber, prismatic hints",
      texture: "rays, lens flares, crystalline refraction",
      light: "emanating from center, halo effects, dawn radiance",
      frame: "radiating beams, starburst edges, luminous border",
      mood: "illuminating, revealing, transcendent clarity"
    },
    space: {
      palette: "deep indigo, star white, nebula purple, void black",
      texture: "star fields, cosmic dust, infinite depth",
      light: "distant stars, galactic glow, bioluminescent hints",
      frame: "dissolving into void, constellation border, infinite fade",
      mood: "vast, mysterious, containing multitudes"
    }
  }
};

// =============================================
// Generation Functions
// =============================================

/**
 * Derive archetype from style and posture
 */
function getArchetype(style, posture) {
  if (!AVATAR_SCHEMA.archetypeMap[style]) {
    console.error('Invalid style:', style);
    return null;
  }
  if (!AVATAR_SCHEMA.archetypeMap[style][posture]) {
    console.error('Invalid posture:', posture);
    return null;
  }
  return AVATAR_SCHEMA.archetypeMap[style][posture];
}

/**
 * Capitalize first letter
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate avatar title
 */
function getAvatarTitle(persona, archetype) {
  return `${capitalize(persona)} ${capitalize(archetype)}`;
}

/**
 * Get archetype identity and strength
 */
function getArchetypeContent(archetype) {
  return AVATAR_SCHEMA.archetypeContent[archetype] || {
    identity: "You bring a unique perspective to the challenges you face.",
    strength: "Adaptability, insight, and the courage to chart your own path."
  };
}

/**
 * Determine technical depth level from survey answers
 * Returns 1-4 scale: 1=basic, 2=intermediate, 3=advanced, 4=architect
 */
function getDepthLevel(answers) {
  let depth = 1;

  // Q1: What excites you → technical indicates higher depth
  if (answers.q1_excited === 'technical') depth += 2;
  else if (answers.q1_excited === 'strategic') depth += 1;

  // Q4: Make it happen → guided/diy indicates readiness
  if (answers.q4_makeithappen === 'diy') depth += 1;

  // Q5 learn: tinker indicates hands-on depth
  if (answers.q5_learn === 'tinker') depth += 1;

  // Persona-based adjustment
  // builder = +1, catalyst = 0, strategist = 0, champion = -1, explorer = -1

  return Math.min(Math.max(depth, 1), 4);
}

/**
 * Map survey answers to relevant use cases
 */
function getUseCases(answers, style, posture) {
  const useCases = [];

  // From Q2 (imagine) - what they want to achieve
  const imagineMap = {
    'automate': 'workflow automation and process streamlining',
    'insights': 'data analysis and insight generation',
    'create': 'content creation and creative workflows',
    'decide': 'decision support and strategic planning'
  };
  if (answers.q2_imagine && imagineMap[answers.q2_imagine]) {
    useCases.push(imagineMap[answers.q2_imagine]);
  }

  // From Q3 (magic wand) - pain points
  const magicMap = {
    'time': 'time-consuming repetitive tasks',
    'quality': 'quality and consistency at scale',
    'knowledge': 'knowledge capture and institutional memory',
    'speed': 'faster iteration and delivery'
  };
  if (answers.q3_magicwand && magicMap[answers.q3_magicwand]) {
    useCases.push(magicMap[answers.q3_magicwand]);
  }

  // From style - cognitive approach
  const styleUseCases = {
    'analytical': 'research synthesis, data interpretation, pattern recognition',
    'relational': 'communication drafting, stakeholder engagement, team coordination',
    'kinetic': 'rapid prototyping, iterative testing, shipping faster',
    'foundational': 'documentation, process design, governance frameworks',
    'intuitive': 'trend spotting, scenario planning, creative exploration'
  };
  if (styleUseCases[style]) {
    useCases.push(styleUseCases[style]);
  }

  return useCases;
}

/**
 * Get depth-appropriate technical challenges
 * Based on GenAI Builder Workshop L1-L4 framework
 */
function getToolsByDepth(depth) {
  const toolSets = {
    1: {
      // L1→L2: From helpful assistant to shaping inference
      level: 'Extensibility',
      challenge: 'schema-driven prompting',
      technique: 'Define HOW the model helps before WHAT it answers. Create an interview schema that surfaces your goals and context before it responds.',
      action: 'Build a reusable prompt: "You are my [role]. Interview me about [context] before [action]." Test it across three different use cases.',
      fallback: 'Your next move: build a schema-driven prompt. Tell the model HOW to help before WHAT to answer. Start with: "You are my [role]. Interview me about [context] before [action]." Test it in Claude or ChatGPT on three different tasks.'
    },
    2: {
      // L2: Extensibility & Retrieval
      level: 'Retrieval',
      challenge: 'contextual grounding',
      technique: 'Stop uploading everything. The context window is working memory—stuff it and inference degrades. Chunk documents, inject only what\'s relevant to THIS query.',
      action: 'Take one document you use repeatedly. Break it into logical chunks. Build a prompt that pulls only the relevant section based on your question.',
      fallback: 'Your next move: context window management. Stop uploading entire documents—chunk them. Take one document you use repeatedly, break it into sections, and build a prompt that injects only the relevant chunk per query. Use NotebookLM or build your own retrieval layer.'
    },
    3: {
      // L3: Agent Building
      level: 'Agent Building',
      challenge: 'structured delegation',
      technique: 'Define the five components: Data (in/out), Environment (what it accesses), Tools (actions it takes), Logic (when it runs), Evaluation (how you verify). Spec first, build second.',
      action: 'Write a spec for your problem: what triggers it, what it reads, what it outputs, what "success" looks like. Then build it in Claude Code.',
      fallback: 'Your next move: write an agent spec. Define the five components: Data (inputs/outputs), Environment (file access), Tools (what it can call), Logic (triggers and conditions), Evaluation (success criteria). Spec first, then build in Claude Code with MCP for tool access.'
    },
    4: {
      // L4: Agentic Orchestration
      level: 'Orchestration',
      challenge: 'eval loops and multi-agent coordination',
      technique: 'Stop trusting inference to sequence correctly. Write explicit evaluation criteria. Design for: persistent memory across sub-agents, heartbeat configs for proactive behavior, semantic routing between specialized components.',
      action: 'Build an evaluation harness: define "correct", run N iterations, measure consistency. Quantify failure modes before calling it production-ready.',
      fallback: 'Your next move: build an eval harness. Define "correct" explicitly, run N iterations, measure consistency across outputs. Design for persistent memory across sub-agent spawns, heartbeat configs for proactive behavior, and semantic routing between specialized components.'
    }
  };
  return toolSets[depth] || toolSets[1];
}

/**
 * Get static fallback text for AI Unlock when API fails
 * Returns curriculum-appropriate technical guidance
 */
function getStaticAIUnlock(answers) {
  const depth = getDepthLevel(answers);
  const tools = getToolsByDepth(depth);
  return tools.fallback;
}

/**
 * Build the Gemini prompt for AI unlock generation
 * Outputs a technical challenge appropriate to their depth level
 */
function buildAIUnlockPrompt(persona, style, posture, archetype, answers = {}, userProblem = '', problemClarity = '') {
  return `You are a technical mentor reviewing a project proposal from a tech-savvy professional who is new to AI tooling but comfortable with CLI tools, low-code builders, and code generation (Claude Code, Cursor, etc).

${userProblem ? `THEIR PROJECT: "${userProblem}"` : 'NO PROJECT STATED - give generic first-project advice'}

Your job: Give them ONE concrete technical challenge or decision they need to solve first. Not praise. Not a roadmap. The single hardest or most important thing they haven't thought through yet.

Write 2-3 sentences (max 70 words):
- Identify the key technical decision or gap in their project idea
- Tell them exactly what to build, test, or spec out first
- Be specific to THEIR project, not generic advice

TONE:
- Direct, like a senior engineer in a code review
- Assume competence, challenge their thinking
- NO "great idea", NO "you could", NO "consider" - just tell them what to do`;
}

/**
 * Build the prompt for "Your Signal" - personalized identity paragraph
 * Combines archetype identity + strength + element + Q3 context
 */
function buildSignalPrompt(persona, archetype, element, userProblem = '') {
  const archetypeContent = AVATAR_SCHEMA.archetypeContent[archetype];
  const elementStyle = AVATAR_SCHEMA.elementStyle[element];
  const personaContext = AVATAR_SCHEMA.personaContext[persona];

  return `You are writing a personal insight for someone who just discovered their AI Archetype.

THEIR ARCHETYPE: "${archetype}"
ARCHETYPE MEANING: "${archetypeContent.identity}"
THEIR STRENGTH: "${archetypeContent.strength}"
THEIR ROLE: "${personaContext.role}"
ELEMENT: ${element} (${elementStyle.mood})
${userProblem ? `CONTEXT FROM THEIR WORLD: "${userProblem}"` : ''}

Write 4-5 sentences that tell them WHO THEY ARE. This is about their identity, not their to-do list.

STRUCTURE:
- Sentence 1-2: What makes them this archetype (use their context to ground it if provided, don't dwell on it)
- Sentence 3: How their element energy shapes how they move
- Sentence 4-5: What this means for how they'll engage with AI (identity, not instructions)

TONE:
- Second person ("You...")
- Confident, like you've seen this pattern before
- Slightly poetic but grounded
- NO action items, NO "you should", NO advice
- This is a mirror, not a manual

MAX: 110 words`;
}

/**
 * Build the Gemini image generation prompt for avatar badge
 */
function buildImagePrompt(persona, archetype, element) {
  const symbolCtx = AVATAR_SCHEMA.symbolContent[archetype];
  const personaVis = AVATAR_SCHEMA.personaVisual[persona];
  const elementSty = AVATAR_SCHEMA.elementStyle[element];

  return `Create a symbolic avatar badge in a stylized, iconic illustration style.

COMPOSITION:
- Square format, centered design
- Central symbol: ${symbolCtx.symbol}
- Symbol meaning: ${symbolCtx.meaning}
- Background element: ${element}

FIGURE ENERGY:
- ${personaVis.energy}
- Figure posture: ${personaVis.posture}
- The figure should embody the archetype of "${archetype}"

ELEMENT STYLING (${element}):
- Color palette: ${elementSty.palette}
- Textures: ${elementSty.texture}
- Lighting: ${elementSty.light}
- Frame treatment: ${elementSty.frame}
- Overall mood: ${elementSty.mood}

STYLE GUIDELINES:
- Symbolic/iconic rather than literal
- Bold shapes, limited detail
- Professional yet evocative
- Suitable for a personal brand badge
- No text or letters in the image
- Clean, modern, slightly mystical aesthetic`;
}

/**
 * Generate complete avatar output (without AI unlock - that requires API call)
 * @param {string} persona - catalyst, strategist, explorer, champion, builder
 * @param {string} style - analytical, relational, kinetic, foundational, intuitive
 * @param {string} posture - reclaim, rebuild, rewild, remix, relay, recon
 * @param {string} element - earth, water, fire, air, light, space
 * @param {object} answers - Optional survey answers for depth/use-case mapping
 * @param {string} userProblem - Optional user's stated AI problem
 * @param {string} problemClarity - Optional clarity level (crystal, few_ideas, need_think, no_idea)
 */
function generateAvatarOutput(persona, style, posture, element, answers = {}, userProblem = '', problemClarity = '') {
  // Validate inputs
  const validPersonas = ['catalyst', 'strategist', 'explorer', 'champion', 'builder'];
  const validStyles = ['analytical', 'relational', 'kinetic', 'foundational', 'intuitive'];
  const validPostures = ['reclaim', 'rebuild', 'rewild', 'remix', 'relay', 'recon'];
  const validElements = ['earth', 'water', 'fire', 'air', 'light', 'space'];

  if (!validPersonas.includes(persona)) {
    console.error('Invalid persona:', persona);
    return null;
  }
  if (!validStyles.includes(style)) {
    console.error('Invalid style:', style);
    return null;
  }
  if (!validPostures.includes(posture)) {
    console.error('Invalid posture:', posture);
    return null;
  }
  if (!validElements.includes(element)) {
    console.error('Invalid element:', element);
    return null;
  }

  // Step 1: Derive archetype
  const archetype = getArchetype(style, posture);

  // Step 2: Assemble title
  const title = getAvatarTitle(persona, archetype);

  // Step 3: Lookup identity & strength
  const content = getArchetypeContent(archetype);

  // Step 4: Build prompt for AI unlock with answers for depth/use-case mapping
  const aiUnlockPrompt = buildAIUnlockPrompt(persona, style, posture, archetype, answers, userProblem, problemClarity);

  // Step 5: Build prompt for image generation
  const imagePrompt = buildImagePrompt(persona, archetype, element);

  // Step 6: Build prompt for "Your Signal" paragraph
  const signalPrompt = buildSignalPrompt(persona, archetype, element, userProblem);

  // Step 7: Get symbol content for display
  const symbolCtx = AVATAR_SCHEMA.symbolContent[archetype];

  return {
    avatar: {
      title: title,
      signal: null, // Will be populated by OpenAI API call
      symbol: symbolCtx.symbol,
      symbolMeaning: symbolCtx.meaning,
      ai_unlock: null, // Will be populated by OpenAI API call
      image: null // Will be populated by Gemini image generation
    },
    meta: {
      persona: persona,
      style: style,
      posture: posture,
      element: element,
      archetype: archetype,
      signalPrompt: signalPrompt,
      aiUnlockPrompt: aiUnlockPrompt,
      imagePrompt: imagePrompt
    }
  };
}

// Export for use in survey.js
if (typeof window !== 'undefined') {
  window.AVATAR_SCHEMA = AVATAR_SCHEMA;
  window.generateAvatarOutput = generateAvatarOutput;
  window.buildSignalPrompt = buildSignalPrompt;
  window.buildAIUnlockPrompt = buildAIUnlockPrompt;
  window.buildImagePrompt = buildImagePrompt;
  window.getStaticAIUnlock = getStaticAIUnlock;
  window.getDepthLevel = getDepthLevel;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AVATAR_SCHEMA,
    generateAvatarOutput,
    buildAIUnlockPrompt,
    buildImagePrompt,
    getArchetype,
    getAvatarTitle,
    getArchetypeContent,
    getStaticAIUnlock,
    getDepthLevel
  };
}
