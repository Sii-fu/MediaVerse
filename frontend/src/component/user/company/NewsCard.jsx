import React from 'react';
import './NewsCard.css';
import newss from './newss.jpg';

const NewsCard = ({ news }) => {
  return (
    <div className="news-card111">
      {/* headline and tile will be on the same line */}
<<<<<<< HEAD
      <img src={newss} alt="News" className="news-img111" />
      <h4>{news.headline}</h4>
      <h5>{news.title}</h5>
=======
      <h4>{news.headline}</h4>
      <h5>{news.media_title}</h5>
>>>>>>> f0173401034900767f78fe183a46cd72e8b56ac1

      <p>{news.description}</p>
    </div>
  );
};

export default NewsCard;
