document.addEventListener('DOMContentLoaded', async () => {
  const eventsContainer = document.getElementById('events');
  
  try {
    const response = await fetch('/api/events');
    if (!response.ok) throw new Error('Network response failed');
    
    const events = await response.json();
    
    events.forEach(event => {
      const eventDiv = document.createElement('div');
      eventDiv.className = 'event-card';
      eventDiv.innerHTML = `
        <h3>${event.title}</h3>
        <p class="date">📅 ${new Date(event.date).toLocaleDateString()}</p>
        <p class="location">📍 ${event.location}</p>
        <p class="organizer">🏢 ${event.organizer}</p>
        ${event.link ? `<a href="${event.link}" target="_blank" class="event-link">Event Details</a>` : ''}
      `;
      eventsContainer.appendChild(eventDiv);
    });
  } catch (error) {
    eventsContainer.innerHTML = `
      <div class="error">
        Failed to load events. Please try again later.
      </div>
    `;
  }
});
