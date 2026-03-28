import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await API.get("/auth/user");
        setUser(userRes.data);
        
        if (userRes.data?.role !== "teacher") {
            const statsRes = await API.get("/analytics/student");
            setAnalytics(statsRes.data);
        }
      } catch (error) {
        console.log("Dashboard fetch error:", error);
      }
    };
    fetchData();
  }, []);

  if (!user) return <div className="loader-container"><div className="spinner"></div><p>Loading Dashboard...</p></div>;

  return (
    <div className="page-container">
      <header style={{ marginBottom: '2rem' }}>
        <h1>Welcome back, {user.name}</h1>
        <p>Access your personalized AI evaluation metrics below.</p>
      </header>

      {analytics && (
        <div className="glass-panel">
          <h3>Your Performance Overview</h3>
          <div className="dashboard-grid">
            <div className="stat-card">
              <span className="stat-value">{analytics.accuracy}%</span>
              <span className="stat-label">Accuracy Rate</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{analytics.totalAttempts}</span>
              <span className="stat-label">Total Attempts</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{analytics.correctAttempts}</span>
              <span className="stat-label">Correct Answers</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{analytics.averageTime || 0}s</span>
              <span className="stat-label">Avg Time Elapsed</span>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-grid" style={{ marginTop: '2rem' }}>
         <div className="glass-panel">
            <h3>Quick Actions</h3>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <Link to="/questions" className="btn btn-primary">Browse Questions</Link>
                <Link to="/submit-attempt" className="btn btn-secondary">Test Knowledge</Link>
                {user.role === 'teacher' && (
                    <Link to="/create-question" className="btn btn-secondary">Create a Question</Link>
                )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;