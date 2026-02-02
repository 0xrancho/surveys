/**
 * AI Avatar Survey - Question Flow & Scoring Logic
 * v4 - Added resource request modal
 */

(function() {
  'use strict';

  // =============================================
  // Configuration (loaded from config.json)
  // =============================================

  let CONFIG = null;

  // =============================================
  // State
  // =============================================

  const state = {
    currentQuestion: 0,
    answers: {},
    answerTexts: {},
    scores: {
      catalyst: 0,
      champion: 0,
      strategist: 0,
      builder: 0,
      explorer: 0
    },
    scoreHistory: [],
    questionFlow: [],
    userData: {
      email: null,
      name: null,
      sessionId: null
    },
    airtableRecordId: null,
    // Avatar modifier dimensions
    modifiers: {
      style: null,
      posture: null,
      element: null
    }
  };

  // =============================================
  // Question Flow Logic
  // =============================================

  function buildQuestionFlow() {
    state.questionFlow = ['q1_excited', 'q2_imagine', 'q3_problem', 'q4_makeithappen'];
  }

  function getNextQuestion(currentQuestionId, answerId) {
    const currentCard = document.getElementById(currentQuestionId);
    const selectedOption = currentCard ? currentCard.querySelector(`[data-value="${answerId}"]`) : null;

    if (selectedOption && selectedOption.dataset.next) {
      return selectedOption.dataset.next;
    }

    switch (currentQuestionId) {
      case 'q1_excited':
        return 'q2_imagine';
      case 'q2_imagine':
        return 'q3_problem';
      case 'q3_problem':
        return 'q4_makeithappen';
      case 'q4_makeithappen':
        if (['my_call', 'convince'].includes(answerId)) {
          return 'q5_scope';
        } else {
          return 'q5_learn';
        }
      case 'q5_scope':
        return 'q6_style';
      case 'q5_learn':
        return 'q6_style';
      case 'q6_style':
        return 'q7_posture';
      case 'q7_posture':
        return 'q8_element';
      case 'q8_element':
        return 'result';
      default:
        return 'result';
    }
  }

  function getTotalQuestionsInFlow() {
    return 8;
  }

  // =============================================
  // Scoring Logic
  // =============================================

  function applyScoring(questionId, answerId) {
    if (!CONFIG || !CONFIG.scoring || !CONFIG.scoring.rules) return;

    const questionRules = CONFIG.scoring.rules[questionId];
    if (!questionRules) return;

    const answerScores = questionRules[answerId];
    if (!answerScores) return;

    const pointsEarned = { ...answerScores };

    Object.keys(answerScores).forEach(avatar => {
      if (state.scores.hasOwnProperty(avatar)) {
        state.scores[avatar] += answerScores[avatar];
      }
    });

    state.scoreHistory.push({
      questionId,
      answerId,
      pointsEarned
    });

    console.log('Scores after', questionId, ':', { ...state.scores });
  }

  function getWinningAvatar() {
    const tiebreaker = CONFIG.scoring.tiebreaker ||
      ['catalyst', 'champion', 'strategist', 'builder', 'explorer'];

    let maxScore = -1;
    let winner = 'explorer';

    Object.entries(state.scores).forEach(([avatar, score]) => {
      if (score > maxScore) {
        maxScore = score;
        winner = avatar;
      }
    });

    const tiedAvatars = Object.entries(state.scores)
      .filter(([_, score]) => score === maxScore)
      .map(([avatar, _]) => avatar);

    if (tiedAvatars.length > 1) {
      for (const avatar of tiebreaker) {
        if (tiedAvatars.includes(avatar)) {
          winner = avatar;
          break;
        }
      }
    }

    return winner;
  }

  // =============================================
  // UI Functions
  // =============================================

  function updateProgress() {
    const answeredCount = Object.keys(state.answers).length;
    const totalQuestions = getTotalQuestionsInFlow();
    const percentage = Math.min((answeredCount / totalQuestions) * 100, 100);

    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent =
      `Question ${Math.min(answeredCount + 1, totalQuestions)} of ${totalQuestions}`;
  }

  function showQuestion(questionId) {
    document.querySelectorAll('.question-card').forEach(card => {
      card.classList.add('hidden');
    });

    const targetCard = document.getElementById(questionId);
    if (targetCard) {
      targetCard.classList.remove('hidden');
      targetCard.style.animation = 'none';
      targetCard.offsetHeight;
      targetCard.style.animation = 'slideUp 0.3s ease-out';
    }
  }

  function handleOptionClick(event) {
    const button = event.currentTarget;
    const card = button.closest('.question-card');
    const questionId = card.dataset.question;
    const answerId = button.dataset.value;
    const answerText = button.querySelector('.option-text').textContent;

    card.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.remove('selected');
    });
    button.classList.add('selected');

    state.answers[questionId] = answerId;
    state.answerTexts[questionId] = answerText;
    applyScoring(questionId, answerId);

    // Capture modifier values for avatar generation
    if (questionId === 'q6_style') {
      state.modifiers.style = answerId;
    } else if (questionId === 'q7_posture') {
      state.modifiers.posture = answerId;
    } else if (questionId === 'q8_element') {
      state.modifiers.element = answerId;
    }

    setTimeout(() => {
      const nextQuestion = getNextQuestion(questionId, answerId);

      if (nextQuestion === 'result') {
        showResult();
      } else {
        updateProgress();
        showQuestion(nextQuestion);
      }
    }, 300);
  }

  // =============================================
  // Intro Form
  // =============================================

  function handleIntroSubmit(event) {
    event.preventDefault();

    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');

    state.userData.name = nameInput.value.trim();
    state.userData.email = emailInput.value.trim();

    console.log('User data captured:', state.userData);

    document.getElementById('introSection').classList.add('hidden');
    document.getElementById('progressContainer').classList.remove('hidden');
    document.getElementById('questionsContainer').classList.remove('hidden');

    showQuestion('q1_excited');
    updateProgress();
  }

  // =============================================
  // Problem Text Input Handler (Q3)
  // =============================================

  async function analyzeProblemClarity(problemText) {
    const prompt = `Analyze this person's description of an AI problem they want to solve. Rate their clarity on a 4-point scale.

THEIR RESPONSE:
"${problemText}"

RATING CRITERIA:
- "crystal": They describe a specific, actionable problem with clear inputs/outputs (e.g., "summarize my meeting transcripts into action items")
- "few_ideas": They have a general area but haven't narrowed down specifics (e.g., "help with customer service somehow")
- "need_think": They express interest but are vague or uncertain (e.g., "maybe something with writing?")
- "no_idea": Very generic, confused, or admits they don't know (e.g., "I don't know" or "whatever AI can do")

Respond with ONLY one of these four words: crystal, few_ideas, need_think, no_idea`;

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (response.ok) {
        const data = await response.json();
        const clarity = data.text?.trim().toLowerCase();
        if (['crystal', 'few_ideas', 'need_think', 'no_idea'].includes(clarity)) {
          console.log('🔮 Problem clarity:', clarity);
          return clarity;
        }
      }
    } catch (err) {
      console.error('❌ Clarity analysis failed:', err);
    }

    // Default fallback based on length/specificity heuristics
    if (problemText.length < 20) return 'no_idea';
    if (problemText.length < 50) return 'need_think';
    return 'few_ideas';
  }

  async function handleProblemSubmit(event) {
    event.preventDefault();

    const problemInput = document.getElementById('problemInput');
    const submitBtn = event.target.querySelector('.text-submit-btn');
    const problemText = problemInput.value.trim();

    if (!problemText) return;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Analyzing...';

    // Store the problem text
    state.answers.q3_problem = problemText;
    state.answerTexts.q3_problem = problemText;
    state.userProblem = problemText;

    console.log('📝 User problem captured:', problemText);

    // Analyze clarity in background (don't block)
    analyzeProblemClarity(problemText).then(clarity => {
      state.problemClarity = clarity;
      console.log('🔮 Inferred clarity level:', clarity);
    });

    // Move to next question immediately (don't wait for analysis)
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Continue →';
      updateProgress();
      showQuestion('q4_makeithappen');
    }, 300);
  }

  // =============================================
  // Result Display
  // =============================================

  async function showResult() {
    try {
    const persona = getWinningAvatar();
    const personaConfig = CONFIG.avatars[persona];
    const cta = CONFIG.cta.byAvatar[persona];

    // Generate avatar output using the schema
    const avatarOutput = window.generateAvatarOutput(
      persona,
      state.modifiers.style,
      state.modifiers.posture,
      state.modifiers.element,
      state.answers,
      state.userProblem || '',
      state.problemClarity || ''
    );

    state.avatarOutput = avatarOutput;
    console.log('🎭 Avatar Output:', avatarOutput);

    // Hide questions, show loading screen
    document.getElementById('questionsContainer').style.display = 'none';
    document.getElementById('progressContainer').style.display = 'none';

    const loadingSection = document.getElementById('loadingSection');
    const resultSection = document.getElementById('resultSection');

    loadingSection.classList.remove('hidden');
    resultSection.classList.add('hidden');

    // Fetch all API calls in parallel
    console.log('⏳ Fetching AI content...');
    console.log('📡 Signal prompt:', avatarOutput?.meta?.signalPrompt ? 'present' : 'MISSING');
    console.log('🔑 AI Unlock prompt:', avatarOutput?.meta?.aiUnlockPrompt ? 'present' : 'MISSING');
    console.log('🖼️ Image prompt:', avatarOutput?.meta?.imagePrompt ? 'present' : 'MISSING');
    const [signalResult, aiUnlockResult, imageResult] = await Promise.allSettled([
      fetchSignalAsync(avatarOutput?.meta?.signalPrompt),
      fetchAIUnlockAsync(avatarOutput?.meta?.aiUnlockPrompt),
      fetchAvatarImageAsync(avatarOutput?.meta?.imagePrompt)
    ]);
    console.log('✅ API calls complete:', { signal: signalResult.status, aiUnlock: aiUnlockResult.status, image: imageResult.status });

    // Hide loading, show results
    console.log('🎬 Transitioning to results...');
    loadingSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    console.log('✅ Results section visible');
    resultSection.dataset.avatar = persona;
    resultSection.dataset.archetype = avatarOutput?.meta?.archetype || '';

    // Display avatar output
    const elementEmojis = {
      earth: '🌍',
      water: '💧',
      fire: '🔥',
      air: '💨',
      light: '✨',
      space: '🌌'
    };

    const avatarEmoji = document.getElementById('avatarEmoji');
    const avatarImage = document.getElementById('avatarImage');

    // Handle image result
    if (imageResult.status === 'fulfilled' && imageResult.value) {
      const img = document.createElement('img');
      img.src = imageResult.value.src;
      img.alt = 'Your AI Avatar Badge';
      img.className = 'avatar-badge-image';
      avatarImage.innerHTML = '';
      avatarImage.appendChild(img);
      avatarEmoji.style.display = 'none';
      state.avatarOutput.avatar.image = imageResult.value.base64;
    } else {
      // Show emoji fallback
      avatarImage.innerHTML = '';
      avatarEmoji.textContent = elementEmojis[state.modifiers.element] || '🎯';
      avatarEmoji.style.display = '';
    }

    document.getElementById('avatarTitle').textContent = avatarOutput?.avatar?.title || `${capitalize(persona)}`;

    // Handle Signal result (replaces Identity + Strength)
    const signalSection = document.getElementById('avatarSignalSection');
    const signalText = document.getElementById('avatarSignal');
    signalSection.classList.remove('hidden');

    if (signalResult.status === 'fulfilled' && signalResult.value) {
      console.log('📡 Signal: GENERATED by OpenAI GPT');
      signalText.textContent = signalResult.value;
      state.avatarOutput.avatar.signal = signalResult.value;
    } else {
      // Use static fallback from archetype content
      console.log('📡 Signal: FALLBACK (static)', signalResult.reason || 'no API response');
      const fallbackSignal = `${avatarOutput?.avatar?.identity || personaConfig.description} ${avatarOutput?.avatar?.strength || ''}`;
      signalText.textContent = fallbackSignal;
      state.avatarOutput.avatar.signal = fallbackSignal;
    }

    // Handle AI Unlock result
    const unlockSection = document.getElementById('avatarUnlockSection');
    const unlockText = document.getElementById('avatarUnlock');
    unlockSection.classList.remove('hidden');

    if (aiUnlockResult.status === 'fulfilled' && aiUnlockResult.value) {
      console.log('🤖 AI Unlock: GENERATED by OpenAI GPT');
      unlockText.textContent = aiUnlockResult.value;
      state.avatarOutput.avatar.ai_unlock = aiUnlockResult.value;
    } else {
      // Use static fallback
      console.log('📋 AI Unlock: FALLBACK (heuristic)', aiUnlockResult.reason || 'no API response');
      const staticUnlock = window.getStaticAIUnlock ? window.getStaticAIUnlock(state.answers) : null;
      unlockText.textContent = staticUnlock || 'Your next move: build a schema-driven prompt. Tell the model HOW to help before WHAT to answer.';
      state.avatarOutput.avatar.ai_unlock = unlockText.textContent;
    }

    document.getElementById('ctaHeadline').textContent = cta.headline;
    document.getElementById('ctaBody').textContent = cta.body;

    // Setup primary CTA
    const primaryBtn = document.getElementById('ctaPrimary');
    primaryBtn.textContent = cta.primaryAction.text;
    if (cta.primaryAction.type === 'modal') {
      primaryBtn.href = '#';
      primaryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openResourceModal();
      });
    } else {
      primaryBtn.href = resolveCtaUrl(cta.primaryAction.url);
      primaryBtn.target = '_blank';
    }

    // Setup secondary CTA
    const secondaryBtn = document.getElementById('ctaSecondary');
    if (cta.secondaryAction) {
      secondaryBtn.textContent = cta.secondaryAction.text;
      secondaryBtn.style.display = '';
      if (cta.secondaryAction.type === 'modal') {
        secondaryBtn.href = '#';
        secondaryBtn.addEventListener('click', (e) => {
          e.preventDefault();
          openResourceModal();
        });
      } else {
        secondaryBtn.href = resolveCtaUrl(cta.secondaryAction.url);
        secondaryBtn.target = '_blank';
      }
    } else {
      secondaryBtn.style.display = 'none';
    }

    // Show service tiers
    if (cta.showServiceTiers && CONFIG.cta.serviceTiers) {
      const tiersSection = document.getElementById('serviceTiers');
      tiersSection.classList.remove('hidden');

      const tiersGrid = document.getElementById('tiersGrid');
      tiersGrid.innerHTML = CONFIG.cta.serviceTiers.tiers.map(tier => `
        <div class="tier-card">
          <div class="tier-icon">${tier.icon || ''}</div>
          <div class="tier-name">${tier.name}</div>
          <div class="tier-description">${tier.description}</div>
        </div>
      `).join('');
    }

    submitSurveyData(persona, avatarOutput);
    console.log('✅ showResult complete');
    } catch (err) {
      console.error('❌ showResult ERROR:', err);
      // Force show results even on error
      document.getElementById('loadingSection')?.classList.add('hidden');
      document.getElementById('resultSection')?.classList.remove('hidden');
    }
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Helper to add timeout to fetch calls
  function withTimeout(promise, ms) {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    );
    return Promise.race([promise, timeout]);
  }

  // Async fetch functions that return data (for parallel loading)
  async function fetchAIUnlockAsync(prompt) {
    if (!prompt) return null;

    try {
      const response = await withTimeout(
        fetch('/api/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        }),
        15000 // 15 second timeout
      );

      if (response.ok) {
        const data = await response.json();
        if (data.text) {
          console.log('✨ AI Unlock generated');
          return data.text;
        }
      }
      throw new Error(`API error: ${response.status}`);
    } catch (err) {
      console.error('❌ AI Unlock generation failed:', err.message);
      return null;
    }
  }

  async function fetchSignalAsync(prompt) {
    if (!prompt) return null;

    try {
      const response = await withTimeout(
        fetch('/api/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        }),
        15000 // 15 second timeout
      );

      if (response.ok) {
        const data = await response.json();
        if (data.text) {
          console.log('📡 Signal generated');
          return data.text;
        }
      }
      throw new Error(`API error: ${response.status}`);
    } catch (err) {
      console.error('❌ Signal generation failed:', err.message);
      return null;
    }
  }

  async function fetchAvatarImageAsync(prompt) {
    if (!prompt) return null;

    try {
      const response = await withTimeout(
        fetch('/api/gemini-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        }),
        30000 // 30 second timeout for image generation
      );

      const data = await response.json();

      if (response.ok && data.success && data.image) {
        console.log('🎨 Avatar image generated');
        return {
          src: `data:${data.mimeType};base64,${data.image}`,
          base64: data.image
        };
      }
      console.log('ℹ️ Avatar image skipped:', data.error || response.status);
      return null;
    } catch (err) {
      console.log('ℹ️ Avatar image unavailable:', err.message);
      return null;
    }
  }

  // =============================================
  // Resource Modal
  // =============================================

  function openResourceModal() {
    const modal = document.getElementById('resourceModal');
    const optionsContainer = document.getElementById('resourceOptions');
    const form = document.getElementById('resourceForm');
    const successMsg = document.getElementById('modalSuccess');

    // Reset state
    form.style.display = '';
    successMsg.classList.add('hidden');

    // Populate options from config
    if (CONFIG.cta.resourceOptions) {
      optionsContainer.innerHTML = CONFIG.cta.resourceOptions.map(opt => `
        <label class="resource-option">
          <input type="checkbox" name="resources" value="${opt.id}">
          <span class="checkbox-custom"></span>
          <span class="option-label">${opt.label}</span>
        </label>
      `).join('');
    }

    modal.classList.remove('hidden');
  }

  function closeResourceModal() {
    document.getElementById('resourceModal').classList.add('hidden');
  }

  async function handleResourceSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const checkboxes = form.querySelectorAll('input[name="resources"]:checked');
    const selectedResources = Array.from(checkboxes).map(cb => cb.value);

    if (selectedResources.length === 0) {
      return;
    }

    console.log('📦 Requesting resources:', selectedResources);

    // Submit to Airtable
    const fields = {
      'Name': state.userData.name || '',
      'Email': state.userData.email || '',
      'Resources Requested': selectedResources.join(', ')
    };

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      });

      if (response.ok) {
        console.log('✅ Resource request submitted');
      }
    } catch (err) {
      console.error('❌ Resource request failed:', err);
    }

    // Show success message
    form.style.display = 'none';
    document.getElementById('modalSuccess').classList.remove('hidden');

    // Close modal after delay
    setTimeout(() => {
      closeResourceModal();
    }, 2000);
  }

  function setupModalListeners() {
    document.getElementById('modalClose').addEventListener('click', closeResourceModal);
    document.getElementById('resourceModal').addEventListener('click', (e) => {
      if (e.target.id === 'resourceModal') {
        closeResourceModal();
      }
    });
    document.getElementById('resourceForm').addEventListener('submit', handleResourceSubmit);
  }

  // =============================================
  // Utilities
  // =============================================

  function resolveCtaUrl(url) {
    if (url === 'calendarLink') return CONFIG.cta.calendarLink;
    if (url === 'communityLink') return CONFIG.cta.communityLink;
    if (url === 'siteLink') return CONFIG.cta.siteLink;
    return url;
  }

  // =============================================
  // Data Submission
  // =============================================

  async function submitSurveyData(persona, avatarOutput) {
    console.log('📊 Submitting survey data...');
    console.log('📈 Final scores:', state.scores);
    console.log('🏆 Winning persona:', persona);
    console.log('🎭 Avatar output:', avatarOutput);

    const personaConfig = CONFIG.avatars[persona];

    // Full payload matching Airtable schema
    const fields = {
      // User info
      'Name': state.userData.name || '',
      'Email': state.userData.email || '',
      'Session ID': state.userData.sessionId || '',
      'Submitted At': new Date().toISOString(),

      // Question answers
      'Q1 Excited': state.answers.q1_excited || '',
      'Q2 Imagine': state.answers.q2_imagine || '',
      'Q3 Problem': state.answers.q3_problem || state.userProblem || '',
      'Q4 Make It Happen': state.answers.q4_makeithappen || '',
      'Q5 Scope': state.answers.q5_scope || '',
      'Q5 Learn': state.answers.q5_learn || '',
      'Q6 Style': state.answers.q6_style || state.modifiers.style || '',
      'Q7 Posture': state.answers.q7_posture || state.modifiers.posture || '',
      'Q8 Element': state.answers.q8_element || state.modifiers.element || '',

      // Scores
      'Score Catalyst': state.scores.catalyst || 0,
      'Score Champion': state.scores.champion || 0,
      'Score Strategist': state.scores.strategist || 0,
      'Score Builder': state.scores.builder || 0,
      'Score Explorer': state.scores.explorer || 0,

      // Avatar output
      'Persona': persona,
      'Archetype': avatarOutput?.meta?.archetype || '',
      'Avatar Title': avatarOutput?.avatar?.title || '',
      'Signal': avatarOutput?.avatar?.signal || '',
      'AI Unlock': avatarOutput?.avatar?.ai_unlock || '',

      // Lead classification
      'Lead Type': personaConfig?.leadType || 'nurture',
      'Problem Clarity': state.problemClarity || ''
    };

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      });

      const data = await response.json();
      if (response.ok) {
        state.airtableRecordId = data.records?.[0]?.id;
        console.log('✅ Submitted to Airtable:', state.airtableRecordId);
      } else {
        console.error('❌ Submission error:', response.status, data);
        console.error('❌ Airtable message:', data.error?.message || JSON.stringify(data));
      }
    } catch (err) {
      console.error('❌ Submission failed:', err);
    }
  }

  // =============================================
  // Share Functions
  // =============================================

  function setupShareButtons() {
    document.getElementById('shareTwitter').addEventListener('click', () => {
      const title = state.avatarOutput?.avatar?.title || 'My AI Avatar';
      const element = capitalize(state.modifiers.element || '');
      const text = `I just discovered I'm a "${title}" with ${element} energy! 🎯 Take the AI Avatar quiz!`;
      const url = window.location.href;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    });

    document.getElementById('shareLinkedIn').addEventListener('click', () => {
      const url = window.location.href;
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    });

    document.getElementById('copyLink').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        const btn = document.getElementById('copyLink');
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = originalText; }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  }

  // =============================================
  // URL Parameters
  // =============================================

  function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    state.userData.email = params.get('email');
    state.userData.name = params.get('name');
    state.userData.sessionId = params.get('session_id') || params.get('sessionId');

    if (state.userData.email && state.userData.name) {
      return true;
    }
    return false;
  }

  // =============================================
  // Initialization
  // =============================================

  async function loadConfig() {
    try {
      const response = await fetch('config.json');
      CONFIG = await response.json();
      console.log('Config loaded:', CONFIG);
    } catch (error) {
      console.error('Failed to load config:', error);
    }
  }

  function setupEventListeners() {
    document.getElementById('introForm').addEventListener('submit', handleIntroSubmit);

    // Problem text input form (Q3)
    document.getElementById('problemForm').addEventListener('submit', handleProblemSubmit);

    document.querySelectorAll('.option-btn').forEach(button => {
      button.addEventListener('click', handleOptionClick);
    });

    // Element grid buttons use different class but same handler
    document.querySelectorAll('.element-btn').forEach(button => {
      button.addEventListener('click', handleElementClick);
    });

    setupShareButtons();
    setupModalListeners();
  }

  function handleElementClick(event) {
    const button = event.currentTarget;
    const card = button.closest('.question-card');
    const questionId = card.dataset.question;
    const answerId = button.dataset.value;
    const answerText = button.querySelector('.element-name').textContent;

    card.querySelectorAll('.element-btn').forEach(btn => {
      btn.classList.remove('selected');
    });
    button.classList.add('selected');

    state.answers[questionId] = answerId;
    state.answerTexts[questionId] = answerText;
    state.modifiers.element = answerId;

    setTimeout(() => {
      const nextQuestion = getNextQuestion(questionId, answerId);

      if (nextQuestion === 'result') {
        showResult();
      } else {
        updateProgress();
        showQuestion(nextQuestion);
      }
    }, 300);
  }

  async function init() {
    await loadConfig();
    const skipIntro = parseUrlParams();
    buildQuestionFlow();
    setupEventListeners();

    if (skipIntro) {
      document.getElementById('introSection').classList.add('hidden');
      document.getElementById('progressContainer').classList.remove('hidden');
      document.getElementById('questionsContainer').classList.remove('hidden');
      showQuestion('q1_excited');
      updateProgress();
      console.log('Survey initialized (skipped intro). User data:', state.userData);
    } else {
      if (state.userData.name) {
        document.getElementById('userName').value = state.userData.name;
      }
      if (state.userData.email) {
        document.getElementById('userEmail').value = state.userData.email;
      }
      console.log('Survey initialized. Showing intro form.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
