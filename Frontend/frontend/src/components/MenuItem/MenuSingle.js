import "./MenuSingle.css"

import React from 'react'

const MenuSingle = ({ title, icon, active, setActive }) => {
    return (
        <div className={active === title? "active-item-container": "item-container"} onClick={() => setActive(title)}>
            <div className="icon-container">

                {icon ? icon : <></>}
            </div>

            <p>{title}</p>

        </div>
    )
}

export default MenuSingle