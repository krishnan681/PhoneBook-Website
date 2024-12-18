import React, { useState } from 'react';
import '../Admin/Css/Team.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Importing the icon from Material UI
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import 'react-calendar/dist/Calendar.css';

const Team = () => {
  const [teamMembers] = useState([
    { name: 'Karan', role: 'HR', contact: 'john@example.com' },
    { name: 'Pavithra', role: 'Digital Marketing', contact: 'jane@example.com' },
    { name: 'Shanmugam', role: 'Digital Marketing', contact: 'alice@example.com' },
    { name: 'Karthikeyan', role: 'Digital Marketing', contact: 'bob@example.com' },
    { name: 'Sathiya', role: 'Digital Marketing', contact: 'charlie@example.com' },
    { name: 'Sivaraj', role: 'Digital Marketing', contact: 'dana@example.com' },
    { name: 'Ramshetha', role: 'Digital Marketing', contact: 'eve@example.com' },
    { name: 'Ranjini', role: 'Digital Marketing', contact: 'frank@example.com' },
    { name: 'Subanithi', role: 'Digital Marketing', contact: 'grace@example.com' },
    { name: 'Sameera', role: 'Digital Marketing', contact: 'hank@example.com' },
    { name: 'Madhan Sekar', role: 'Digital Marketing', contact: 'ivy@example.com' },
    // { name: 'Jack Wilson', role: 'Digital Marketing', contact: 'jack@example.com' },
    // { name: 'Kelly Moore', role: 'Digital Marketing', contact: 'kelly@example.com' },
    // { name: 'Luke Taylor', role: 'Digital Marketing', contact: 'luke@example.com' },
    // { name: 'Mia Allen', role: 'Digital Marketing', contact: 'mia@example.com' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const openCalendarModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeCalendarModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="team-container">
      <button className="add-member-button">Add New Member</button>
      <h2 className="team-title">Team</h2>
      <div className="team-table-container">
        <table className="team-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role/Position</th>
              <th>Contact Info</th>
              <th>Count</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, index) => (
              <tr key={index}>
                <td>{member.name}</td>
                <td>{member.role}</td>
                <td>{member.contact}</td>
                <td></td>
                <td>
                  <button className="row-action-button" onClick={() => openCalendarModal(member)}>
                    <ArrowForwardIcon style={{ fontSize: '20px' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedMember && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedMember.name}'s Entries</h3>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={"dayGridMonth"}
              headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              height={"70vh"}
            />
            <button className="close-modal-button" onClick={closeCalendarModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
