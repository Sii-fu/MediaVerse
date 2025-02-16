import React from 'react';
import './NewsCard.css';
import newss from './newss.jpg';

const NewsCard = ({ news }) => {
  return (
    <div className="news-card111">
      {/* headline and tile will be on the same line */}
      <h4>{news.headline}</h4>
      <h5>{news.media_title}</h5>

      <p>{news.description}</p>
    </div>
  );
};

export default NewsCard;
