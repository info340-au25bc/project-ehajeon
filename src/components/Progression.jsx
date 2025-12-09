import React, { useState } from "react";
import { Button, Dropdown, Modal } from 'react-bootstrap';

import CHAR_DATA from "../data/chars.json";
import PROG_DATA from "../data/checklist.json"

// Notes:
// - Consider adding tooltips
// - Allow users to edit the same user profile (was an oversight...)
// - New Page: ESPC 
// - [DATA] Add more progression systems and goals through json file
// - [Refining] Currently, only one checkbox per region can be opened. See if we can open several (have to check heights first)

export function Progression(props) {
    const charsBase = Object.keys(CHAR_DATA);

    // Profiles
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(0); //index of current profile

    const [showModal, setShowModal] = useState(false); //pop-up form
    const [formData, setFormData] = useState({
        name: "",
        server: "Solace",
        char: charsBase[0],
        job: Object.keys(CHAR_DATA[charsBase[0]].jobs)[0],
        progress: getInitialProgress(),
    });

    const currentProfile = profiles[selectedProfile] || formData;

    const charData = CHAR_DATA[currentProfile.char];
    const jobKey = charData.jobs[currentProfile.job]
        ? currentProfile.job
        : Object.keys(charData.jobs)[0];


    // Checklist open
    const [open, setOpen] = useState({});

    // TOGGLES
    function toggleItem(region, category, item) {
        setProfiles(prev => {
            const updatedProfiles = [...prev];
            const profile = { ...updatedProfiles[selectedProfile] };

            profile.progress = { ...profile.progress };
            profile.progress[region] = { ...profile.progress[region] };
            profile.progress[region][category] = { ...profile.progress[region][category] };
            profile.progress[region][category][item] = !profile.progress[region][category][item];

            updatedProfiles[selectedProfile] = profile;
            return updatedProfiles;
        });
    }

    function toggleCollapse(region, category) {
    setOpen(prev => ({
        ...prev,
        [region]: prev[region] === category ? null : category
    }));
    }

  // HELPERS
    function handleFormChange(e) {
        const { name, value } = e.target;

        // If character changes, automatically update job to first available
        if (name === "char") {
            const firstJob = Object.keys(CHAR_DATA[value].jobs)[0];
            setFormData(prev => ({ ...prev, char: value, job: firstJob }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const newProgress = {};
        for (const region in PROG_DATA) {
            newProgress[region] = {};
            for (const category in PROG_DATA[region]) {
                newProgress[region][category] = {};
                PROG_DATA[region][category].forEach(item => {
                    newProgress[region][category][item] = false;
            });
            }
        }

        setProfiles(prev => {
            const newProfiles = [...prev, { ...formData, progress: newProgress }];
            setSelectedProfile(newProfiles.length - 1);
            return newProfiles;
        });

        setFormData({ 
            name: "",
            server: "Solace",
            char: charsBase[0],
            job: Object.keys(CHAR_DATA[charsBase[0]].jobs)[0],
            progress: getInitialProgress()
        });

        setShowModal(false);
    }

    function getInitialProgress() {
        const init = {};
        
        for (const region in PROG_DATA) {
            init[region] = {};
            for (const category in PROG_DATA[region]) {
                init[region][category] = {};
                PROG_DATA[region][category].forEach(item => {
                    init[region][category][item] = false;
                });
            }
        }
        return init;
    }

    return(
        <div>
            <main>
                <div className="user-progress">
                    <div className="user-profile">
                        <header>
                            <h1>Progression Checklist</h1>
                        </header>

                        <h2>Hi, [Username]!</h2>
                        < ProfileSelector
                            profiles={profiles}
                            currentProfile={currentProfile}
                            onSelect={setSelectedProfile}
                            onCreate={() => setShowModal(true)}
                        />

                        <CharacterDisplay charData={charData} jobKey={jobKey} charName={currentProfile.char} />
                    </div>

                    <ProfileModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        formData={formData}
                        onChange={handleFormChange}
                        onSubmit={handleFormSubmit}
                        charsBase={charsBase}
                    />

                    <div className="checklist">
                        <Checklist
                            progData={PROG_DATA}
                            profile={currentProfile}
                            open={open}
                            onToggleItem={toggleItem}
                            onToggleCollapse={toggleCollapse}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
};

    function ProfileSelector({ profiles, currentProfile, onSelect, onCreate }) {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-autoclose-true">
                    {currentProfile.name || "Select Profile"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {profiles.map((p, i) => (
                    <Dropdown.Item key={i} onClick={() => onSelect(i)}>
                        {p.name}
                    </Dropdown.Item>
                    ))}
                    <Dropdown.Item onClick={onCreate}>
                        + Create New Profile
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }

function ProfileModal({ show, onHide, formData, onChange, onSubmit, charsBase }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={onSubmit}>
                <div>
                    <label>
                        Profile Name:
                        <input type="text" name="name" value={formData.name} onChange={onChange} required />
                    </label>
                </div>


                <div>
                    <label>
                        Server:
                        <select name="server" value={formData.server} onChange={onChange}>
                            <option value="Gaia">Gaia</option>
                            <option value="Solace">Solace</option>
                        </select>
                    </label>
                </div>

                <div>
                    <label>
                        Character:
                        <select name="char" value={formData.char} onChange={onChange}>
                            {charsBase.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </label>
                </div>

                <div>
                    <label>
                        Job:
                        <select name="job" value={formData.job} onChange={onChange}>
                            {Object.keys(CHAR_DATA[formData.char].jobs).map(j => (
                            <option key={j} value={j}>{CHAR_DATA[formData.char].jobs[j].name}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div style={{ marginTop: "10px" }}>
                    <Button type="submit" variant="primary">Save Profile</Button>{" "}
                    <Button variant="secondary" onClick={onHide}>Cancel</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

function CharacterDisplay({ charData, jobKey, charName }) {
    return (
        <div className="user-char">
            <img src={charData.jobs[jobKey].ncrop} alt={charName} />
            <div className="user-overlay">
                <h3>{charName}</h3>
                <p>{charData.jobs[jobKey].type} {charData.jobs[jobKey].role}</p>
            </div>
        </div>
    )
}

function Checklist({ progData, profile, open, onToggleItem, onToggleCollapse }) {
    return (
    <>
        {Object.entries(progData).map(([region, categories]) => (
            <div className="region-box" key={region}>
            <h2>{region}</h2>

            {Object.entries(categories).map(([category, items]) => (
                <div className="box" key={category}>
                    <button className="collapsible" onClick={() => onToggleCollapse(region, category)}>{category}</button>
                    
                    <div className={"content " + (open[region] === category ? "open" : "")}>
                        <ul>
                            {items.map(item => (
                                <li key={item}>
                                    <input
                                        type="checkbox"
                                        checked={profile.progress[region][category][item]}
                                        onChange={() => onToggleItem(region, category, item)}
                                    />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
        ))}
    </>
)}