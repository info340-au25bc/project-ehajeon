import React, { useState } from 'react';
import BUFF_DATA from '../data/buffs.json'

// Step-By-Step Process
// 1. Select type of content (Raid) --> Number of slots should change dynamically
// 2. Like the ESPC system, click on character icons to slot them into the composition.
//     -> Should gray out icon, and upon hover, display an X
//     -> Cropped character portrait should be inserted into the slot
// 3. Should also display the buffs/debuffs/potential healing they bring in boxed lists to the bottom (mobile) or right (desktop) containers next to the party slots. 

// Notes:
// - Make adding/removing more obvious
// - Add filtering to review what kinds of buffs/debuffs are covered (assign types to json)
// - [DATA] Add icons and maybe hover-able tooltips to buffs/debuffs
// - [Feature] Add certain warnings/indicators to add more cda/healing/etc. (assign types to json) based on certain comps. Was not included in this iteration as it did not pan out well in practice; best compromise would be bullet point 2
// - [Refining] Break-up BuildParty component

export function BuildParty({ chars }) {
    const charsBase = Object.keys(chars);

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

                <RaidSelector
                    raids={raidSlots}
                    selectedRaid={raidSelect}
                    onSelect={raidSelector}
                />

                <div className="party-view">
                    <PartySlots
                        party={party}
                        onRemove={removeFromParty}
                    />
                </div>

                <RaidBuffs buffsData={activeBuffs()} />

                <ElSearchParty
                    chars={chars}
                    party={party}
                    onAdd={addToParty}
                />

            </main>
        </div>
    );
};

function RaidSelector ({ raids, selectedRaid, onSelect }) {
    return (
        <div className="raid-select">
            <div className="dropdown">
                <button>{selectedRaid || "Select Raid"}</button>

                <div className="raid">
                    {Object.keys(raids).map(raidName => (
                        <button
                            key={raidName}
                            onClick={() => {onSelect(raidName);}}>

                            {raidName}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
};

function PartySlots({ party, onRemove }) {
    return (
        <div className="char-slots">
            <ul>
                {party.map((jobData, index) => (
                    <li key={index} className="slot">
                        {jobData ? (
                            <img
                                src={jobData.crop}
                                alt={jobData.name}
                                onClick={() => onRemove(index)}
                            />
                            ) : (
                            <span className="empty"></span>
                        )}
                    </li>
                    )
                )}
            </ul>
        </div>
    )
};

function RaidBuffs({ buffsData }) {
    const { buffs, debuffs, healing } = buffsData;

    const renderList = (title, data) => ( // standardize format to cut down repeats!
        <div>
            <h2>{title}</h2>
            <ul>
                {Object.entries(data).map(([name, info]) => (
                    <li key={name}>
                        <strong>{name}</strong>: {info.effect} ({info.duration}, CD: {info.cooldown})
                    </li>
                ))}
            </ul>
        </div>
    );
    
    return (
        <div className="buffs">
            {renderList("Raid Buffs", buffs)}
            {renderList("Raid Debuffs", debuffs)}
            {renderList("Healing", healing)}
        </div>
    )
};

function ElSearchParty({ chars, party, onAdd }) {
    return (
        <div className="espc">
            {Object.keys(chars).map(base => {
                const character = chars[base];

                return Object.keys(character.jobs).map(jobKey => {
                    const job = character.jobs[jobKey];
                    const isUsed = party.some(p => p?.key === jobKey);

                    return (
                    <img
                        key={jobKey}
                        src={`img/icons/${jobKey}.png`}
                        alt={job.name}
                        className={isUsed ? "grayed-out" : ""}
                        onClick={() => !isUsed && onAdd({...job, key : jobKey})}
                    />
                    );
                });
            })}
        </div>
    )
}