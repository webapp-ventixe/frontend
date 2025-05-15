import React, { useState, useEffect } from 'react';
import './Events.css';
import { getEvents } from '@services/api';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('active');

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

    // För demo, komplettera med statiska data om API inte returnerar tillräckligt med info
    const demoEvents = [
        {
            id: 1,
            title: "Adventure Gear Show",
            category: "Outdoor & Adventure",
            location: "Rocky Ridge Exhibition Hall, Denver, CO",
            date: "2023-06-05T15:00:00",
            imageUrl: "https://via.placeholder.com/300",
            price: 40,
            availableSeats: 70,
            capacity: 200,
            percentage: 65,
            status: "Active"
        },
        {
            id: 2,
            title: "Symphony Under the Stars",
            category: "Music",
            location: "Sunset Park, Los Angeles, CA",
            date: "2023-04-20T19:00:00",
            imageUrl: "https://via.placeholder.com/300",
            price: 50,
            availableSeats: 50,
            capacity: 200,
            percentage: 75,
            status: "Active"
        },
        {
            id: 3,
            title: "Runway Revolution 2029",
            category: "Fashion",
            location: "Vogue Hall, New York, NY",
            date: "2023-05-01T18:00:00",
            imageUrl: "https://via.placeholder.com/300",
            price: 100,
            availableSeats: 100,
            capacity: 200,
            percentage: 50,
            status: "Active"
        },
        {
            id: 4,
            title: "Global Wellness Summit",
            category: "Health & Wellness",
            location: "Wellness Arena, Miami, FL",
            date: "2023-05-05T08:00:00",
            imageUrl: "https://via.placeholder.com/300",
            price: 75,
            availableSeats: 120,
            capacity: 200,
            percentage: 40,
            status: "Active"
        }
    ];

    // Använd demodata om vi inte har events från API
    const displayEvents = events.length > 0 ? events : demoEvents;

    if (loading) return <div className="loading">Loading events...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="events-container">
            {/* Filter Tabs */}
            <div className="events-filter">
                <div className={`filter-tab ${activeFilter === 'active' ? 'active' : ''}`} onClick={() => setActiveFilter('active')}>
                    Active <span className="count">(89)</span>
                </div>
                <div className={`filter-tab ${activeFilter === 'draft' ? 'active' : ''}`} onClick={() => setActiveFilter('draft')}>
                    Draft <span className="count">(22)</span>
                </div>
                <div className={`filter-tab ${activeFilter === 'past' ? 'active' : ''}`} onClick={() => setActiveFilter('past')}>
                    Past <span className="count">(122)</span>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="events-search-bar">
                <div className="search-input">
                    <input type="text" placeholder="Search event, location, etc" />
                    <span className="search-icon">🔍</span>
                </div>
                <div className="filter-options">
                    <button className="filter-button">
                        <span>All Category</span>
                        <span className="arrow-down">▼</span>
                    </button>
                    <button className="filter-button">
                        <span>This Month</span>
                        <span className="arrow-down">▼</span>
                    </button>
                    <button className="view-button grid-view-active">
                        <span>☷</span>
                    </button>
                    <button className="view-button">
                        <span>☰</span>
                    </button>
                </div>
            </div>

            {/* Events Grid */}
            <div className="events-grid">
                {displayEvents.map((event) => (
                    <div key={event.id} className="event-card">
                        <div className="event-card-header">
                            <span className="event-category">{event.category}</span>
                            <span className="event-status">{event.status || "Active"}</span>
                        </div>
                        <div className="event-card-image"></div>
                        <div className="event-card-details">
                            <div className="event-date">
                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} — {new Date(event.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                            </div>
                            <h3 className="event-title">{event.title}</h3>
                            <div className="event-location">
                                <span className="location-icon">📍</span> {event.location}
                            </div>
                            <div className="event-progress-container">
                                <div className="progress-bar">
                                    <div
                                        className="progress-bar-fill"
                                        style={{
                                            width: `${event.percentage || 65}%`,
                                            backgroundColor: `var(--primary-100)`
                                        }}
                                    ></div>
                                </div>
                                <div className="progress-details">
                                    <span className="progress-percentage">{event.percentage || 65}%</span>
                                    <span className="event-price">${event.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <div className="showing-info">
                    Showing <span className="showing-count">8</span> out of 48
                </div>
                <div className="pagination-controls">
                    <button className="pagination-arrow prev">←</button>
                    <button className="pagination-number active">1</button>
                    <button className="pagination-number">2</button>
                    <button className="pagination-number">3</button>
                    <span className="pagination-ellipsis">...</span>
                    <button className="pagination-number">8</button>
                    <button className="pagination-arrow next">→</button>
                </div>
            </div>
        </div>
    );
};

export default Events;