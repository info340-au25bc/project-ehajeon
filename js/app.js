// menu expand
const hamMenu = document.querySelector('.hamburger-menu');

const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
})

// overview expand
const charsBase = document.querySelectorAll('.base');
const overview = document.querySelector('.overview');

const charData = {
  Elsword: {
    name: "Elsword",
    jobs: {
      KE: {
        name: "Knight Emperor",
        role: "Physical DPS",
        desc: "High burst damage and survivability.",
        pros: "Strong attacks.",
        cons: "Slower movement.",
        img: "img/portraits/01-ELS/KE.png",
        paths: ["KE", "RM", "IM", "GN"]
      },
      RM: {
        name: "Rune Master",
        role: "Hybrid DPS",
        desc: "Balanced between offense and defense.",
        pros: "Flexible build.",
        cons: "Average damage.",
        img: "img/portraits/01-ELS/RM.png",
        paths: ["KE", "RM", "IM", "GN"]
      },
    }
  },
  Aisha: {
    name: "Aisha",
    jobs: {
      AS: {
        name: "Aether Sage",
        role: "Magical DPS",
        desc: "High range AoE mage.",
        pros: "Strong magic.",
        cons: "Low defense.",
        img: "img/portraits/02-AIS/AS.png",
        paths: ["AS", "VP", "EM", "DW"]
      },
    }
  }
};

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
