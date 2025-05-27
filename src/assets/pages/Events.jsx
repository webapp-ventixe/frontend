import React, { useState, useEffect } from 'react';
import './Events.css';
import { getEvents } from '@services/api';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventData = await getEvents();
                setEvents(eventData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError('Failed to load events. Please try again later.');
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <div className="loading">Loading events...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="events-container">
            <div className="section-header">
                <h3>Events</h3>
            </div>

            <div className="events-grid">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id} className="event-card">
                            <div className="event-card-tag">{event.category}</div>
                            <div className="event-image">
                                {event.imageUrl ? (
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover"
                                        }}
                                    />
                                ) : (
                                    <div style={{
                                        width: "100%",
                                        height: "100%",
                                        background: "linear-gradient(135deg, #f26cf9 0%, #667eea 100%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                        fontSize: "14px"
                                    }}>
                                        {event.category}
                                    </div>
                                )}
                            </div>
                            <div className="event-card-content">
                                <h4>{event.title}</h4>
                                <p className="event-location">{event.location}</p>
                                <div className="event-footer">
                                    <div className="event-date">
                                        <span>{new Date(event.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="event-price">${event.price}</div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </div>
        </div>
    );
};

export default Events;