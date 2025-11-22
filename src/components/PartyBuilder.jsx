import React, { useState } from 'react';
import CHAR_DATA from '../data/chars.json';
import BUFF_DATA from '../data/buffs.json'

// Step-By-Step Intended Process
// 1. Select type of content (Raid) --> Number of slots should change dynamically
// 2. Like the ESPC system, click on character icons to slot them into the composition.
//     -> Should gray out icon, and upon hover, display an X
//     -> Cropped character portrait should be inserted into the slot
// 3. Should also display the buffs/debuffs/potential healing they bring in boxed lists to the bottom (mobile) or right (desktop) containers next to the party slots. 

export function BuildParty() {
    // CONSTANTS
    const charsBase = Object.keys(CHAR_DATA);

    const raidSlots = {
        Rosso: 6,
        Berthe: 6,
        Ran: 4,
        "Orchestra Hall": 6
    };

    // RAID STATES

    const [raidSelect, setRaidSelect] = useState(null);
    const [slotCount, setSlotCount] = useState(raidSlots[null]);

    // PARTY STATES

    const [party, setParty] = useState([null, null, null, null, null, null]);

    // RAID SELECT

    function raidSelector(raid) {
        setRaidSelect(raid);
        setSlotCount(raidSlots[raid]);
        setParty(Array(raidSlots[raid]).fill(null));
    }

    // ADD AND REMOVE FROM PARTY

    function addToParty(job) {
        setParty(prev => {
            if (prev.includes(job)) return prev; // prevent duplicate characters 
            
            const index = prev.indexOf(null);
            if (index === -1) return prev; // indicates no more slots left :)

            const updated = [...prev];
            updated[index] = job;
            return updated;
        })
    }

    function removeFromParty(index) {
        setParty(prev => {
            const updated = [...prev];
            updated[index] = null; // clears slot
            return updated;
        });
    }

    // BUFF DISPLAY

    function activeBuffs() {
        const buffs = {};
        const debuffs = {};
        const healing = {};

        party.forEach(job => {
            if (!job) return; // checks to skip empty slots

            const jobBuffs = BUFF_DATA[job.key]?.buffs || {};
            const jobDebuffs = BUFF_DATA[job.key]?.debuffs || {};
            const jobHealing = BUFF_DATA[job.key]?.healing || {};

            Object.assign(buffs, jobBuffs);
            Object.assign(debuffs, jobDebuffs);
            Object.assign(healing, jobHealing);
        });

        return { buffs, debuffs, healing };
    }
    
    return(
        <div>
            <main>
                <header>
                    <h1>Party Builder</h1>
                </header>

                <div className="raid-select">
                    <div className="dropdown">
                        <button>{raidSelect || "Select Raid"}</button>

                        <div className="raid">
                            {Object.keys(raidSlots).map(raidName => (
                                <a
                                    key={raidName}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        raidSelector(raidName);
                                    }}
                                >
                                    {raidName}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="party-view">
                    <div className="char-slots">
                        <ul>
                            {party.map((jobData, index) => (
                                <li key={index} className="slot">
                                    {jobData ? (
                                        <img
                                            src={jobData.crop}
                                            alt={jobData.name}
                                            onClick={() => removeFromParty(index)}
                                        />
                                        ) : (
                                        <span className="empty"></span>
                                    )}
                                </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div className="buffs">
                       <h2>Raid Buffs</h2>
                       <ul>
                            {Object.entries(activeBuffs().buffs).map(([buffName, buff]) => (
                                <li key={buffName}>
                                    <strong>{buffName}</strong>: {buff.effect} ({buff.duration}, CD: {buff.cooldown})
                                </li>
                            ))}
                        </ul>

                        <h2>Raid Debuffs</h2>
                        <ul>
                            {Object.entries(activeBuffs().debuffs).map(([debuffName, debuff]) => (
                                <li key={debuffName}>
                                    <strong>{debuffName}</strong>: {debuff.effect} ({debuff.duration}, CD: {debuff.cooldown})
                                </li>
                            ))}
                        </ul>

                        <h2>Healing</h2>
                        <ul>
                            {Object.entries(activeBuffs().healing).map(([healingName, healing]) => (
                                <li key={healingName}>
                                    <strong>{healingName}</strong>: {healing.effect} ({healing.duration}, CD: {healing.cooldown})
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="espc">
                    {Object.keys(CHAR_DATA).map(base => {
                        const character = CHAR_DATA[base];

                        return Object.keys(character.jobs).map(jobKey => {
                            const job = character.jobs[jobKey];
                            const isUsed = party.some(p => p?.key === jobKey);

                            return (
                            <img
                                key={jobKey}
                                src={`img/icons/${jobKey}.png`}
                                alt={job.name}

                                className={isUsed ? "grayed-out" : ""}
                                onClick={() => !isUsed && addToParty({...job, key : jobKey})}
                            />
                            );
                        });
                    })}
                </div>
            </main>
        </div>
    );
}