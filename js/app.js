// menu expand
const hamMenu = document.querySelector('.hamburger-menu');

const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
})


// ============================================================================

// overview expand
const charsBase = document.querySelectorAll('.base');
const overview = document.querySelector('.overview');

// character data
const charData = {
  Elsword: {
    name: "Elsword",
    jobs: {
      KE: {
        name: "Knight Emperor",
        role: "Physical DPS",
        desc: "The Knight of Elrios, forging his own path.",
        pros: "Great bossing and clearing with good utility tools",
        cons: "Slow casting, limited movement",
        img: "img/portraits/01-ELS/KE.png",
        paths: ["KE", "RM", "IM", "GN"]
      },
      RM: {
        name: "Rune Master",
        role: "Magical DPS",
        desc: "A magic swordsman with a Rune sword technique.",
        pros: "Good clearing",
        cons: "Very average output and minimal debuffing capability",
        img: "img/portraits/01-ELS/RM.png",
        paths: ["KE", "RM", "IM", "GN"]
      },
      IM: {
        name: "Immortal",
        role: "Physical DPS",
        desc: "A swordsman with endless potential.",
        pros: "Impressive damage output",
        cons: "Subpar clearing",
        img: "img/portraits/01-ELS/IM.png",
        paths: ["KE", "RM", "IM", "GN"]
      },
      GN: {
        name: "Genesis",
        role: "Magical DPS",
        desc: "Guardian of Elrios.",
        pros: "Easiest Elboy to play",
        cons: "Mostly just another DPS",
        img: "img/portraits/01-ELS/GN.png",
        paths: ["KE", "RM", "IM", "GN"]
      },
    }
  },
  Aisha: {
    name: "Aisha",
    jobs: {
      AES: {
        name: "Aether Sage",
        role: "Magical DPS",
        desc: "An elemental master.",
        pros: "Good rotations and damage",
        cons: "Movement learning curve",
        img: "img/portraits/02-AISHA/AES.png",
        paths: ["AES", "OZ", "MTM", "LA"]
      },
      OZ: {
        name: "Oz Sorcerer",
        role: "Magical DPS",
        desc: "An elemental master.",
        pros: "Good rotations and damage",
        cons: "Movement learning curve",
        img: "img/portraits/02-AISHA/OZ.png",
        paths: ["AES", "OZ", "MTM", "LA"]
      },
      MTM: {
        name: "Metamorphy",
        role: "Physical Synergy DPS",
        desc: "An elemental master.",
        pros: "Good rotations and damage",
        cons: "Movement learning curve",
        img: "img/portraits/02-AISHA/MTM.png",
        paths: ["AES", "OZ", "MTM", "LA"]
      },
      LA: {
        name: "Lord Azoth",
        role: "Physical Synergy DPS",
        desc: "An elemental master.",
        pros: "Good rotations and damage",
        cons: "Movement learning curve",
        img: "img/portraits/02-AISHA/LA.png",
        paths: ["AES", "OZ", "MTM", "LA"]
      },
    }
  },
  Laby: {
    name: "Laby",
    jobs: {
      ETW: {
        name: "Eternity Winner",
        role: "Physical DPS",
        desc: "A hard-hitting fist-fighter.",
        pros: "High damage ceiling",
        cons: "Reliance on active commands can be a learning curve",
        img: "img/portraits/13-LABY/ETW.png",
        paths: ["ETW", "RAS", "NL", "TP"]
      },
      RAS: {
        name: "Radiant Soul",
        role: "Magical Support",
        desc: "Well-rounded and easy to learn healer.",
        pros: "Longest freeze and great supporting capabilities, not hard to learn.",
        cons: "Skill casting can be a bit slow",
        img: "img/portraits/13-LABY/RAS.png",
        paths: ["ETW", "RAS", "NL", "TP"]
      },
      NL: {
        name: "Nisha Labyrinth",
        role: "Physical DPS",
        desc: "A devoted savior just for Laby.",
        pros: "Valuable asset on the team",
        cons: "Rotationally dependent",
        img: "img/portraits/13-LABY/NL.png",
        paths: ["ETW", "RAS", "NL", "TP"]
      },
      TP: {
        name: "Twins Picaro",
        role: "Magical DPS",
        desc: "The ultimate prankster.",
        pros: "Ridiculously high damage",
        cons: "Offers nothing else",
        img: "img/portraits/13-LABY/TP.png",
        paths: ["ETW", "RAS", "NL", "TP"]
      },
    }
  }
};

// OVERVIEW FORMAT

function expandOverview(data) {
    return `
    <div class="paths">
      <ul>
        ${data.paths.map(p => `<li><img src="img/icons/${p}.png" alt="${p}" class="job" data-char="${p}"></li>`).join('')}
      </ul>
    </div>

    <div>
      <img src="${data.img}" class="portrait" alt="${data.name}">
    </div>
    <div class="char-info">
        <h3>${data.name}</h3>
        <h4>Role: ${data.role}</h4>
        <p>${data.desc}</p>
        <p><strong>Pros:</strong> ${data.pros}</p>
        <p><strong>Cons:</strong> ${data.cons}</p>
      </div>
    </div>
  `;
}

// quiz results screen

function resultOverview(data) {
    return `
    <div class="result-overview">
      <h3>${data.name}</h3>
      <h4>Role: ${data.role}</h4>
      <p>${data.desc}</p>
      <p><strong>Pros:</strong> ${data.pros}</p>
      <p><strong>Cons:</strong> ${data.cons}</p>
    </div>
    `;
}

// controlling overview elements

charsBase.forEach(icon => {
  icon.addEventListener('click', () => {
    const key = icon.dataset.char;
    const char = charData[key];

    const defaultJob = Object.keys(char.jobs)[0];
    const data = char.jobs[defaultJob];

    overview.innerHTML = expandOverview(data)
    overview.classList.add('active');
    overview.scrollIntoView({ behavior: "smooth" });

    jobSpecific(char.jobs);
    jobActive(defaultJob);
  });
});

function jobSpecific(jobsData) {
    const jobs = overview.querySelectorAll('.job');

    jobs.forEach(job => {
        job.addEventListener('click', () => {
            const data = jobsData[job.dataset.char];

            overview.innerHTML = expandOverview(data);
            overview.classList.add('active');
            overview.scrollIntoView({ behavior: "smooth" });

            jobSpecific(jobsData);

            const newJobs = overview.querySelectorAll('.job');
            newJobs.forEach(j => {
                if (j.dataset.char === job.dataset.char) {
                    j.classList.add('active');
                } else {
                    j.classList.remove('active');
                }
            });
        });
    });
}

// Testing zone
const exChar = charData.Laby.jobs.RAS;
document.querySelector('.result-overlay').innerHTML = resultOverview(exChar);
