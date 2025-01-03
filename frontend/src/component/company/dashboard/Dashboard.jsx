import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const lastActivities = [
    {
      img: "https://via.placeholder.com/60",
      title: 'JohnDoe rated "The Crown" 4/5 and reviewed "Excellent acting, engaging plot."',
      date: "12/20/2024",
    },
    {
      img: "https://via.placeholder.com/60",
      title: 'New discussion threads started for "Dune".',
      date: "12/20/2024",
    },
    {
      img: "https://via.placeholder.com/60",
      title: 'Added A new movie: "Oppenheimer".',
      date: "12/20/2024",
    },
  ];

  const realTimeActivity = {
    newFollowers: ["name1", "name2", "name3"],
    lastReviews: [
      { reviewer: "Nickname", media: "Dune", comment: "Dune was visually stunning, but slow..." },
      { reviewer: "Nickname", media: "Spider-Verse", comment: "Spider-Verse is a masterpiece. Loved it!" },
      { reviewer: "Nickname", media: "The Crown", comment: "The Crown's casting was perfect!" },
    ],
    recentMedia: [
      { title: "Spider-man", change: "-12.5%" },
      { title: "DUNE", change: "+12.5%" },
      { title: "Avengers", change: "-12.5%" },
    ],
  };

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
              <p>Follow</p>
              <h3>150</h3>
              <span className="positive">+12.5%</span>
            </div>
            <div className="stat">
              <p>Views</p>
              <h3>150</h3>
              <span className="negative">-12.5%</span>
            </div>
          </div>
          <p>Your channel got 256 engagements in the last 28 days</p>
          <div className="chart">
            {/* Replace this with your chart library */}
            <p>Graph placeholder</p>
          </div>
        </div>

        <div className="real-time-activity">
          <h2>Real-Time Activity</h2>
          <div>
            <h3>New Followers</h3>
            <ul>
              {realTimeActivity.newFollowers.map((follower, index) => (
                <li key={index}>{follower}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Last Reviews</h3>
            <ul>
              {realTimeActivity.lastReviews.map((review, index) => (
                <li key={index}>
                  <p>{review.media}: {review.comment}</p>
                  <span>- {review.reviewer}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Recent Media</h3>
            <ul>
              {realTimeActivity.recentMedia.map((media, index) => (
                <li key={index}>
                  <p>{media.title}</p>
                  <span>{media.change}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
