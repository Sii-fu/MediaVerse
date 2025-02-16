import React from 'react';
import './NewsCard.css';
import newss from './newss.jpg';

const NewsCard = ({ news }) => {
  return (
    <div className="news-card111">
      {/* headline and tile will be on the same line */}
      <img src={newss} alt="News" className="news-img111" />
      <h4>{news.headline}</h4>
      <h5>{news.title}</h5>

      <p>{news.description}</p>
    </div>
  );
};

export default NewsCard;
