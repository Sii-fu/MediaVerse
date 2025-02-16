import React from 'react';
import './RoleCard2.css'; // Import the CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const RoleCard2 = ({ role, handleDeleteRole }) => {

    // console.log(role);
  return (
    <div className="role2-card">
            <img src={role.img} alt={role.name} className="role2-img" />
            <div className="role2-info">
                <h4>{role.name}</h4>
                <p>{role.role_type}</p>
            </div>
            <button className='role2-action' onClick={handleDeleteRole}>
              <FontAwesomeIcon icon={faXmark} className="remove-icon"/>

            </button>
        </div>
  );
};

export default RoleCard2;