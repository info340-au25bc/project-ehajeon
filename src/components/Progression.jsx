import React from "react";

export function Progression(props) {
    return(
        <div>
            <main>
                <div className="user-progress">
                    <div className="user-profile">
                        <header>
                            <h1>Progression Checklist</h1>
                        </header>
                        <h2>Hi, [Username]!</h2>
                        <button>Change Character</button>

                        <div className="user-char">
                            <img src="img/portraits-cropped/03-RENA/AN.png" alt="Anemos"></img>
                            <div className="user-overlay">
                                <h3>Anemos</h3>
                                <p>Physical DPS</p>
                            </div>
                        </div>

                    </div>

                    <div className="checklist">
                        <div className="box">
                            <button className="collapsible">Titles</button>
                                <div className="content">
                                    <ul>
                                        <li><input type="checkbox" />Pierce the Heavens</li>
                                        <li><input type="checkbox" />Survival of the Cold</li>
                                        <li><input type="checkbox" />Black and White</li>
                                        <li><input type="checkbox" />Natural Flow</li>
                                    </ul>
                                </div>
                        </div>
                        
                        <div className="box">
                        <button className="collapsible">Accessories</button>
                            <div className="content">
                                <ul>
                                    <li><input type="checkbox" />Code of Honor</li>
                                    <li><input type="checkbox" />Cooling Engine</li>
                                    <li><input type="checkbox" />Baryon's Fur Ornament</li>
                                </ul>
                            </div>
                        </div>
                            
                        <div className="box">
                        <button className="collapsible">Gear</button>
                            <div className="content">
                                <ul>
                                    <li><input type="checkbox" />Rigomor Set</li>
                                    <li><input type="checkbox" />Tenebrous Set</li>
                                    <li><input type="checkbox" />Exascale</li>
                                </ul>
                            </div>
                        </div>

                        <div className="box">
                        <button className="collapsible">Misc</button>
                            <div className="content">
                                <ul>
                                    <li><input type="checkbox" />ESPC</li>
                                    <li><input type="checkbox" />Pet</li>
                                    <li><input type="checkbox" />Exascale</li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div> 
            </main>
        </div>
    )
}