import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const lastActivities = [
    {
      img: "https://th.bing.com/th/id/OIP.GeLd-jqEwcg9oLk6bM6cigHaKA?w=202&h=273&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      title:
        'JohnDoe rated "The Crown" 4/5 and reviewed "Excellent acting, engaging plot."',
      date: "12/20/2024",
    },
    {
      img: "https://th.bing.com/th/id/OIP.HUGyv2TGl_tG_Ae7TOxatQHaLO?w=202&h=306&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      title: 'New discussion threads started for "Dune".',
      date: "12/20/2024",
    },
    {
      img: "https://th.bing.com/th/id/OIP.HUGyv2TGl_tG_Ae7TOxatQHaLO?w=202&h=306&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      title: 'Robert gave a review about JAWS".',
      date: "12/20/2024",
    },
  ];

  const realTimeActivity = {
    newFollowers: [
      {
        img: "https://th.bing.com/th/id/OIP.GeLd-jqEwcg9oLk6bM6cigHaKA?w=202&h=273&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        name: "Name1",
        comment: "Joined the platform recently!",
        date: "12/21/2024",
      },
      {
        img: "https://th.bing.com/th/id/OIP.HUGyv2TGl_tG_Ae7TOxatQHaLO?w=202&h=306&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        name: "Name2",
        comment: "Following your channel now.",
        date: "12/20/2024",
      },
    ],
    lastReviews: [
      {
        img: "https://th.bing.com/th/id/OIP.HUGyv2TGl_tG_Ae7TOxatQHaLO?w=202&h=306&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        reviewer: "Nickname",
        media: "Dune",
        comment: "Dune was visually stunning, but slow...",
        date: "12/20/2024",
      },
      {
        img: "https://th.bing.com/th/id/OIP.HUGyv2TGl_tG_Ae7TOxatQHaLO?w=202&h=306&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        reviewer: "Nickname",
        media: "Spider-Verse",
        comment: "Spider-Verse is a masterpiece. Loved it!",
        date: "12/19/2024",
      },
    ],
  };

  const dummyData = [
    { month: "Jan", engagements: 120 },
    { month: "Feb", engagements: 210 },
    { month: "Mar", engagements: 160 },
    { month: "Apr", engagements: 280 },
    { month: "May", engagements: 190 },
  ];

  return (
    <div className="dashboard-container">
      <div className="last-activity">
        <h2>Last Activity</h2>
        {lastActivities.map((activity, index) => (
          <div key={index} className="activity-item">
            <img src={activity.img} alt="activity" />
            <div>
              <p>{activity.title}</p>
              <span>{activity.date}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="overview-and-realtime">
        <div className="channel-overview">
          <h2>My Channel Overview</h2>
          <div className="overview-stats">
            <div className="stat">
              <p>Plan to Watch</p>
              <h3>150</h3>
              <span className="positive">+12.5%</span>
            </div>
            <div className="stat">
              <p>Watched</p>
              <h3>150</h3>
              <span className="negative">-12.5%</span>
            </div>
          </div>
          <p>Your channel got 256 engagements in the last 28 days</p>
          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dummyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="engagements"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="real-time-activity">
          <h2>Real-Time Activity</h2>
          <div>
            <h3>New In List</h3>
            {realTimeActivity.newFollowers.map((follower, index) => (
              <div key={index} className="activity-item2">
                <img src={follower.img} alt="follower" />
                <div>
                  <p>{follower.name}</p>
                  <span>{follower.comment}</span>
                  <span>{follower.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3>Last Reviews</h3>
            {realTimeActivity.lastReviews.map((review, index) => (
              <div key={index} className="activity-item2">
                <img src={review.img} alt="reviewer" />
                <div>
                  <p>
                    {review.media}: {review.comment}
                  </p>
                  <span>- {review.reviewer}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
