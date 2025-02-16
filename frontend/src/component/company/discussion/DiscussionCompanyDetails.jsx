import React from "react";
import { useParams } from "react-router-dom";
import "./DiscussionCompanyDetails.css";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";


const dummyDetails = {
  id: 1,
  date: "Dec 24, 2024",
  title: "Join Our Discord Community for Support and Anime Fun!",
  description: `
Hello everyone,

We understand that many of you have been experiencing various issues with the website. While our moderators do their best to assist here when possible, it’s simply not feasible to address every concern directly on the site.

For more immediate and comprehensive support, we encourage you to join our Discord server. There, you'll find dedicated channels for website support.

Beyond just support, our Discord server is a fantastic place to connect with fellow anime fans, discuss your favorite series, and stay updated on the latest news and events.

Join us today and become part of an active and welcoming anime community!

Here's your invite link: [HiAnime Discord Server](https://discord.com/invite/hianime)

**Note:** Please ensure that your account is at least 7 days old before joining the server.**`,
  username: "User_name_User_Name",
  upvotes: 24,
  downvotes: 10,
  comments: [
    {
      username: "User_name_User_Name",
      date: "4 Months ago",
      content: "If you are banned and want to appeal, kindly use this form: https://dyno.gg/form/5c421053",
      upvotes: 90,
      downvotes: 10,
    },
    {
      username: "Zerowxx_324",
      date: "5 Hours ago",
      content: "Why dress experimenting with features?",
      upvotes: 12,
      downvotes: 0,
    },
    {
      username: "Uzumaki_Alasoon",
      date: "4 Months ago",
      content: "Hey when why is skip intro is removed",
      upvotes: 18,
      downvotes: 2,
    },
    {
      username: "Robert_HONson",
      date: "4 Months ago",
      content:
        "Noticed that people, including me, sometimes streams will not work and figured how to make it work: turn off AUTO NEXT.",
      upvotes: 56,
      downvotes: 10,
    },
  ],
};

const DiscussionCompanyDetails = () => {
  const { id } = useParams(); // Use id for fetching details dynamically in the future
  const post = dummyDetails;

  return (
    <div className="discussion-company-details">
      <div className="post-container">
        <div className="post-header">
          <span className="username">{post.username}</span>
          <span className="post-date">• {post.date}</span>
        </div>
        <h1 className="post-title">{post.title}</h1>
        <p className="post-description">{post.description}</p>
        <div className="post-interactions">
          <div className="votes">
            <FaThumbsUp /> {post.upvotes}
          </div>
          <div className="votes">
            <FaThumbsDown /> {post.downvotes}
          </div>
        </div>
      </div>
      <div className="comments-section">
        <h2>{post.comments.length} Comments</h2>
        <textarea className="comment-box" placeholder="Leave a comment..."></textarea>
        <div className="comments-list">
          {post.comments.map((comment, index) => (
            <div key={index} className="comment-card">
              <div className="comment-header">
                <span className="comment-username">{comment.username}</span>
                <span className="comment-date">• {comment.date}</span>
              </div>
              <p className="comment-content">{comment.content}</p>
              <div className="comment-interactions">
                <FaThumbsUp /> {comment.upvotes}
                <FaThumbsDown /> {comment.downvotes}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscussionCompanyDetails;
