const language = (document.documentElement.lang || 'it').toLowerCase().startsWith('en') ? 'en' : 'it';
const copy = {
  it: {
    moderatorTrial: 'Moderatore · In prova',
    moderator: 'Moderatore',
    moderatorFemale: 'Moderatrice',
    julieName: 'julisenpai',
    worldEditor: 'Editor mappa',
    guestDescription: 'The Realms ITA è una community italiana di VRChat, chill e aperta a tutti. Fondata su rispetto, amicizia e divertimento, offre uno spazio tranquillo dove essere se stessi, conoscere nuove persone e condividere momenti senza pressioni.',
    guestEmpty: 'Le community ospiti verranno aggiunte qui.',
    vrchatGroup: 'Gruppo VRChat',
    joinAria: 'Questo spazio potrebbe essere tuo - apri Discord',
    joinText: 'Questo spazio potrebbe essere tuo',
    noStaff: 'No staff',
    collaborators: 'Collaboratori esterni',
    founders: 'Fondatori (no staff)',
    trailerTitle: 'Guarda il trailer.',
    trailerDescription: 'Scopri in anteprima la nuova versione di Celestia e preparati a tornare tra le stelle.',
    trailerFrameTitle: 'Trailer Celestia Remastered',
    trailerSoon: 'Trailer in arrivo',
    trailerSoonDescription: 'Il player YouTube è già predisposto. Verrà attivato appena sarà disponibile il link ufficiale del trailer.'
  },
  en: {
    moderatorTrial: 'Moderator · Trial',
    moderator: 'Moderator',
    moderatorFemale: 'Moderator',
    julieName: 'Julie Senpai',
    worldEditor: 'World Editor',
    guestDescription: 'The Realms ITA is an Italian VRChat community that is relaxed and open to everyone. Built around respect, friendship, and fun, it offers a welcoming space where people can be themselves, meet new people, and share moments without pressure.',
    guestEmpty: 'Guest communities will be added here.',
    vrchatGroup: 'VRChat Group',
    joinAria: 'This space could be yours - open Discord',
    joinText: 'This space could be yours',
    noStaff: 'Not staff',
    collaborators: 'External collaborators',
    founders: 'Founders (not staff)',
    trailerTitle: 'Watch the trailer.',
    trailerDescription: 'Get a first look at the new version of Celestia and get ready to return among the stars.',
    trailerFrameTitle: 'Celestia Remastered Trailer',
    trailerSoon: 'Trailer coming soon',
    trailerSoonDescription: 'The YouTube player is already set up. It will be enabled as soon as the official trailer link is available.'
  }
}[language];

const body = document.body;
const toggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = [...document.querySelectorAll('[data-nav]')];
const sections = [...document.querySelectorAll('main section[id]')];

// Add or remove staff/community members here.
// `level` must be a number from 1 to 5.
// Level 1 is shown at the top; level 5 is shown at the bottom.
// Levels are used only to separate members into rows and are not shown on the page.
// Levels 1-3 are staff; level 4 is below the "No staff" divider; level 5 is below the "Collaboratori esterni" divider.
// IMPORTANT: members inside every level/category must always be displayed in alphabetical order by name.
// Suggested image path: /img/users/filename.webp
const staffMembers = [
  {
    name: 'Haxurus',
    role: 'CEO',
    level: 1,
    image: '/img/users/haxurus.webp'
  },

  // Level 2 - Moderatori. Keep these members in alphabetical order.
  {
    name: 'Flowey',
    role: copy.moderatorTrial,
    level: 2,
    image: '/img/users/floweyy.webp'
  },
  {
    name: 'Altr3xa',
    role: copy.moderator,
    level: 2,
    image: '/img/users/altr3xa.webp'
  },
  {
    name: 'Artyom',
    role: copy.moderator,
    level: 2,
    image: '/img/users/artyom.webp'
  },
  {
    name: 'Cristaldragon17',
    role: copy.moderatorTrial,
    level: 2,
    image: '/img/users/cristaldragon17.webp'
  },
  {
    name: 'Di4mante',
    role: copy.moderatorFemale,
    level: 2,
    image: '/img/users/di4mante.webp'
  },
  {
    name: 'GoldenLuna',
    role: copy.moderator,
    level: 2,
    image: '/img/users/golden-luna.webp'
  },
  {
    name: copy.julieName,
    role: copy.moderator,
    level: 2,
    image: '/img/users/julie-senpai.webp'
  },
  {
    name: 'kitsunefirefox',
    role: copy.moderatorTrial,
    level: 2,
    image: '/img/users/kitsunefirefox.webp'
  },
  {
    name: 'Lev_Hiaba11',
    role: copy.moderatorTrial,
    level: 2,
    image: '/img/users/lev-haiba.webp'
  },
  {
    name: 'Neko Senpai',
    role: copy.moderator,
    level: 2,
    image: '/img/users/neko-senpai.webp'
  },
  {
    name: 'Tatsu-Ming',
    role: copy.moderatorTrial,
    level: 2,
    image: '/img/users/tatsu-ming.webp'
  },

  // Level 4 - Fondatori (no staff). Keep these members in alphabetical order.
  {
    name: 'Autoincazzata',
    role: '',
    level: 4,
    image: '/img/users/autoincazzata.webp'
  },
  {
    name: 'Haxurus',
    role: '',
    level: 4,
    image: '/img/users/haxurus.webp'
  },
  {
    name: copy.julieName,
    role: '',
    level: 4,
    image: '/img/users/julie-senpai.webp'
  },
  {
    name: 'Killer Jack',
    role: '',
    level: 4,
    image: '/img/users/killer-jack.webp'
  },
  {
    name: 'Neko Senpai',
    role: '',
    level: 4,
    image: '/img/users/neko-senpai.webp'
  },
  {
    name: 'Wodoox',
    role: '',
    level: 4,
    image: '/img/users/wodoox.webp'
  },

  // Level 5 - Collaboratori esterni. Keep these members in alphabetical order.
  {
    name: 'Kaira',
    role: copy.worldEditor,
    level: 5,
    image: '/img/users/kaira.webp'
  },
  {
    name: 'ThaWalife',
    role: 'Graphic Designer',
    level: 5,
    image: '/img/users/walife.webp'
  }
];

// Community ospiti.
// Per aggiungerne una, inserire un oggetto con:
// name, logo, description, vrchat, discord.
// Logo consigliato: /img/guests/nome-community.webp
const guestCommunities = [
  {
    name: 'The Realms',
    logo: '/img/guests/the-realms.webp',
    description: copy.guestDescription,
    vrchat: 'https://vrc.group/ITALIA.1585',
    discord: 'https://discord.gg/zMdY5SfPNy'
  }
];

const guestGrid = document.getElementById('guest-grid');

if (guestGrid) {
  if (!guestCommunities.length) {
    const empty = document.createElement('div');
    empty.className = 'guest-empty reveal';
    empty.textContent = copy.guestEmpty;
    guestGrid.appendChild(empty);
  } else {
    const guestFragment = document.createDocumentFragment();

    [...guestCommunities]
      .sort((a, b) => a.name.localeCompare(b.name, language, { sensitivity: 'base' }))
      .forEach((community) => {
        const card = document.createElement('article');
        card.className = 'guest-card reveal';

        const logo = document.createElement('div');
        logo.className = 'guest-logo';

        const img = document.createElement('img');
        img.src = community.logo;
        img.alt = `Logo ${community.name}`;
        img.loading = 'lazy';
        img.decoding = 'async';

        const fallback = document.createElement('span');
        fallback.className = 'guest-logo__fallback';
        fallback.textContent = community.name
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0])
          .join('')
          .toUpperCase() || '?';

        img.addEventListener('error', () => {
          logo.classList.add('is-placeholder');
          img.remove();
        }, { once: true });

        logo.append(img, fallback);

        const content = document.createElement('div');
        content.className = 'guest-card__content';

        const name = document.createElement('h3');
        name.textContent = community.name;

        const description = document.createElement('p');
        description.textContent = community.description;

        const actions = document.createElement('div');
        actions.className = 'guest-card__actions';

        if (community.vrchat) {
          const vrchat = document.createElement('a');
          vrchat.className = 'button button-primary';
          vrchat.href = community.vrchat;
          vrchat.target = '_blank';
          vrchat.rel = 'noopener noreferrer';
          vrchat.textContent = copy.vrchatGroup;
          actions.appendChild(vrchat);
        } else if (community.demo) {
          const vrchat = document.createElement('span');
          vrchat.className = 'button button-primary guest-demo-button';
          vrchat.setAttribute('aria-disabled', 'true');
          vrchat.textContent = copy.vrchatGroup;
          actions.appendChild(vrchat);
        }

        if (community.discord) {
          const discord = document.createElement('a');
          discord.className = 'button button-secondary';
          discord.href = community.discord;
          discord.target = '_blank';
          discord.rel = 'noopener noreferrer';
          discord.textContent = 'Discord';
          actions.appendChild(discord);
        } else if (community.demo) {
          const discord = document.createElement('span');
          discord.className = 'button button-secondary guest-demo-button';
          discord.setAttribute('aria-disabled', 'true');
          discord.textContent = 'Discord';
          actions.appendChild(discord);
        }

        content.append(name, description, actions);
        card.append(logo, content);
        guestFragment.appendChild(card);
      });

    const joinCard = document.createElement('a');
    joinCard.className = 'guest-card guest-card--join reveal';
    joinCard.href = 'https://discord.gg/8d4ZRhRN6y';
    joinCard.target = '_blank';
    joinCard.rel = 'noopener noreferrer';
    joinCard.setAttribute('aria-label', copy.joinAria);

    const joinIcon = document.createElement('span');
    joinIcon.className = 'guest-card--join__icon';
    joinIcon.setAttribute('aria-hidden', 'true');
    joinIcon.textContent = '+';

    const joinText = document.createElement('span');
    joinText.className = 'guest-card--join__text';
    joinText.textContent = copy.joinText;

    joinCard.append(joinIcon, joinText);
    guestFragment.appendChild(joinCard);

    guestGrid.appendChild(guestFragment);
  }
}

const staffGrid = document.getElementById('staff-grid');

if (staffGrid) {
  staffGrid.classList.add('staff-grid--levels');

  const groupedMembers = new Map();

  staffMembers.forEach((member) => {
    const parsedLevel = Number(member.level);
    const level = Number.isInteger(parsedLevel) && parsedLevel >= 1 && parsedLevel <= 5 ? parsedLevel : 5;
    if (!groupedMembers.has(level)) groupedMembers.set(level, []);
    groupedMembers.get(level).push(member);
  });

  groupedMembers.forEach((members) => {
    members.sort((a, b) => a.name.localeCompare(b.name, language, { sensitivity: 'base' }));
  });

  const orderedLevels = [...groupedMembers.keys()].sort((a, b) => a - b);

  const createStaffCard = (member) => {
    const card = document.createElement('article');
    card.className = 'staff-card reveal';

    const media = document.createElement('div');
    media.className = 'staff-card__media';

    const img = document.createElement('img');
    img.src = member.image;
    img.alt = member.role ? `${member.name} - ${member.role}` : member.name;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => {
      media.classList.add('is-placeholder');
      img.remove();
    }, { once: true });

    const initials = document.createElement('span');
    initials.className = 'staff-card__initials';
    initials.textContent = member.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || '?';

    media.append(img, initials);

    const info = document.createElement('div');
    info.className = 'staff-card__info';

    const name = document.createElement('h3');
    name.textContent = member.name;
    info.appendChild(name);

    if (member.role) {
      const role = document.createElement('span');
      role.className = 'staff-card__role';
      role.textContent = member.role;
      info.appendChild(role);
    }

    card.append(media, info);
    return card;
  };

  const fragment = document.createDocumentFragment();
  let noStaffDividerAdded = false;
  let collaboratorsDividerAdded = false;

  orderedLevels.forEach((level) => {
    if (level >= 4 && !noStaffDividerAdded) {
      const divider = document.createElement('div');
      divider.className = 'staff-divider';
      const label = document.createElement('span');
      label.textContent = copy.noStaff;
      divider.appendChild(label);
      fragment.appendChild(divider);
      noStaffDividerAdded = true;
    }

    if (level >= 5 && !collaboratorsDividerAdded) {
      const divider = document.createElement('div');
      divider.className = 'staff-divider';
      const label = document.createElement('span');
      label.textContent = copy.collaborators;
      divider.appendChild(label);
      fragment.appendChild(divider);
      collaboratorsDividerAdded = true;
    }

    const section = document.createElement('div');
    section.className = 'staff-level';
    section.setAttribute('data-level', String(level));

    const row = document.createElement('div');
    row.className = 'staff-level__grid';
    groupedMembers.get(level).forEach((member) => row.appendChild(createStaffCard(member)));

    section.appendChild(row);
    fragment.appendChild(section);
  });

  staffGrid.appendChild(fragment);
}

// Trailer YouTube ufficiale Celestia Remastered.
const trailerVideoId = '716jlzONSFo';
const heroSection = document.querySelector('.hero');

if (heroSection && !document.getElementById('trailer')) {

  const trailerSection = document.createElement('section');
  trailerSection.className = 'section trailer-section';
  trailerSection.id = 'trailer';

  const container = document.createElement('div');
  container.className = 'container';

  const head = document.createElement('div');
  head.className = 'trailer-head reveal';
  head.innerHTML = `
    <span class="section-kicker">Celestia Remastered</span>
    <h2>${copy.trailerTitle}</h2>
    <p>${copy.trailerDescription}</p>
  `;

  const player = document.createElement('div');
  player.className = 'trailer-player reveal';

  if (trailerVideoId) {
    const iframe = document.createElement('iframe');
    iframe.title = copy.trailerFrameTitle;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.dataset.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailerVideoId)}?autoplay=1&mute=1&rel=0&playsinline=1&enablejsapi=1`;
    player.appendChild(iframe);

    let trailerStarted = false;
    const sendTrailerCommand = (command) => {
      if (!iframe.contentWindow) return;
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: command,
        args: []
      }), '*');
    };

    const trailerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          if (!trailerStarted) {
            iframe.src = iframe.dataset.src;
            trailerStarted = true;
          } else {
            sendTrailerCommand('playVideo');
          }
        } else if (trailerStarted) {
          sendTrailerCommand('pauseVideo');
        }
      });
    }, { threshold: [0, 0.35, 0.7] });

    trailerObserver.observe(player);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'trailer-placeholder';
    placeholder.innerHTML = `
      <div class="trailer-placeholder__inner">
        <div class="trailer-placeholder__play" aria-hidden="true">▶</div>
        <h3>${copy.trailerSoon}</h3>
        <p>${copy.trailerSoonDescription}</p>
      </div>
    `;
    player.appendChild(placeholder);
  }

  container.append(head, player);
  trailerSection.appendChild(container);
  heroSection.insertAdjacentElement('afterend', trailerSection);
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/celestia.ita',
    external: true
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@celestiaita',
    external: true
  }
];

const heroActions = document.querySelector('.hero-actions');
if (heroActions) {
  socialLinks.forEach(({ label, href, external }) => {
    if (heroActions.querySelector(`[data-social="${label.toLowerCase()}"]`)) return;
    const link = document.createElement('a');
    link.className = 'button button-secondary';
    link.href = href;
    link.dataset.social = label.toLowerCase();
    link.textContent = label;
    if (external) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    heroActions.appendChild(link);
  });
}

const footerLinks = document.querySelector('.footer-links');
if (footerLinks) {
  socialLinks.forEach(({ label, href, external }) => {
    if (footerLinks.querySelector(`[data-social="${label.toLowerCase()}"]`)) return;
    const link = document.createElement('a');
    link.href = href;
    link.dataset.social = label.toLowerCase();
    link.textContent = label;
    if (external) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    footerLinks.insertBefore(link, footerLinks.querySelector('a[href="../../"]'));
  });
}

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  mobileMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const navObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`);
  });
}, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.4] });

sections.forEach((section) => navObserver.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
  const founders = document.querySelector('.staff-level[data-level="4"]');
  const divider = founders?.previousElementSibling;
  const label = divider?.classList.contains('staff-divider') ? divider.querySelector('span') : null;
  if (label) label.textContent = copy.founders;
});

(() => {
  const intro = document.getElementById('site-intro');
  if (!intro) {
    document.body.classList.remove('intro-active');
    return;
  }

  window.setTimeout(() => {
    intro.classList.add('is-leaving');
    document.body.classList.remove('intro-active');
    window.setTimeout(() => intro.remove(), 950);
  }, 2000);
})();

document.addEventListener('DOMContentLoaded', () => {
  const trailerDescription = document.querySelector('.trailer-head p');
  if (trailerDescription) trailerDescription.remove();

  const staffGrid = document.getElementById('staff-grid');
  if (!staffGrid) return;

  const level4 = staffGrid.querySelector('.staff-level[data-level="4"]');
  const level5 = staffGrid.querySelector('.staff-level[data-level="5"]');
  const dividers = [...staffGrid.querySelectorAll('.staff-divider')];

  if (level4 && level5 && dividers.length >= 2) {
    const collaboratorsDivider = dividers[0];
    const foundersDivider = dividers[1];
    const collaboratorsLabel = collaboratorsDivider.querySelector('span');
    const foundersLabel = foundersDivider.querySelector('span');

    if (collaboratorsLabel) collaboratorsLabel.textContent = copy.collaborators;
    if (foundersLabel) foundersLabel.textContent = copy.founders;

    staffGrid.append(collaboratorsDivider, level5, foundersDivider, level4);
  }
});
