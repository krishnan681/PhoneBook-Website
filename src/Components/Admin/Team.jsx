import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../Admin/Css/Team.css";

const Team = () => {
  const [teamData, setTeamData] = useState([]); // Team data state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [selectedMember, setSelectedMember] = useState(null); // Selected member state
  const [calendarEvents, setCalendarEvents] = useState([]); // Calendar events state

  // Fetch team data from both APIs and combine them
  const fetchData = async () => {
    try {
      const response1 = await fetch("https://signpostphonebook.in/fetch_total_count.php");
      const data1 = await response1.json();

      const response2 = await fetch("https://signpostphonebook.in/try_totalcount.php");
      const data2 = await response2.json();

      const combinedData = data1.map((item1) => {
        const matchingItem = data2.find((item2) => item2.id === item1.id);
        return {
          id: item1.id,
          name: item1.name,
          total_count: matchingItem ? matchingItem.total_count : "0",
        };
      });

      setTeamData(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchCalendarData = async (memberId) => {
    try {
      const response = await fetch(`https://signpostphonebook.in/fetch_total_count.php?id=${memberId}`);
      const data = await response.json();
  
      // Filter data for the selected member ID
      const filteredEvents = data.map((entry) => ({
        title: `Count: ${entry.count}`,
        date: entry.date, // Ensure date is in YYYY-MM-DD format
      }));
  
      setCalendarEvents(filteredEvents); // Update state with filtered data
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };
  

  // Fetch data on component mount and refresh every 10 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Open the modal with the calendar for the selected team member
  const openCalendarModal = (member) => {
    setSelectedMember(member);
    fetchCalendarData(member.id); // Fetch data for the selected member
    setIsModalOpen(true);
  };

  // Close the modal
  const closeCalendarModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    setCalendarEvents([]); // Clear calendar events when modal is closed
  };

  return (
    <div className="team-container">
      <button className="add-member-button">Add New Member</button>
      <h2 className="team-title">Team</h2>
      <div className="team-table-container">
        <table className="team-table">
          <thead>
            <tr>
              <th style={{ padding: "8px" }}>ID</th>
              <th style={{ padding: "8px" }}>Name</th>
              <th style={{ padding: "8px" }}>Total Count</th>
              <th style={{ padding: "8px" }}>More</th>
            </tr>
          </thead>
          <tbody>
            {teamData.map((member) => (
              <tr key={member.id}>
                <td style={{ padding: "8px" }}>{member.id}</td>
                <td style={{ padding: "8px" }}>{member.name}</td>
                <td style={{ padding: "8px" }}>{member.total_count}</td>
                <td style={{ padding: "8px" }}>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "blue",
                    }}
                    onClick={() => openCalendarModal(member)}
                  >
                    <ArrowForwardIcon style={{ fontSize: "20px" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal with FullCalendar */}
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
              events={calendarEvents} // Pass filtered events to the calendar
              height={"70vh"}
            />
            <button className="close-modal-button" onClick={closeCalendarModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
