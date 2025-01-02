import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import '../Admin/Css/Team.css';

const Team = () => {
  const [teamData, setTeamData] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTeamData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://signpostphonebook.in/try_totalcount.php");
      const data = await response.json();
      setTeamData(data);
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCalendarData = async (memberId) => {
    try {
      const response = await fetch(`https://signpostphonebook.in/fetch_events.php?id=${memberId}`);
      if (!response.ok) throw new Error("Failed to fetch calendar data.");
      const data = await response.json();
      const events = data.map((entry) => ({
        title: `Count: ${entry.count}`,
        date: entry.date,
      }));
      setCalendarEvents(events);
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  const openCalendarModal = (member) => {
    setSelectedMember(member);
    fetchCalendarData(member.id);
    setIsModalOpen(true);
  };

  const closeCalendarModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    setCalendarEvents([]);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="team-container">
      <h2 className="team-title">Team</h2>
      <div className="team-table-container">
        <table className="team-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Total Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamData.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name || "No Name"}</td>
                <td>{member.total_count || "N/A"}</td>
                <td>
                  <button
                    onClick={() => openCalendarModal(member)}
                    aria-label={`Open calendar for ${member.name}`}
                  >
                    <ArrowForwardIcon />
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
            <h3>{selectedMember.name}'s Calendar</h3>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "",
              }}
              events={calendarEvents}
              eventContent={(eventInfo) => (
                <div>
                  <strong>{eventInfo.event.title}</strong>
                </div>
              )}
              height={"70vh"}
            />
            <button onClick={closeCalendarModal} className="close-btn">
              Close
            </button>
             
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
