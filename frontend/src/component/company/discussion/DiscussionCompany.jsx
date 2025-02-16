import React from "react";
import "./DiscussionCompany.css";
import { FaThumbsUp, FaThumbsDown, FaCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const dummyPosts = [
  {
    id: 1,
    pinned: true,
    date: "Dec 24, 2024",
    title: "Join Our Discord Community for Support and Anime Fun!",
    description:
      "Hello everyone, we understand that many of you have been experiencing various issues with the website. While our moderators do their best to assist here when possible, it’s simply not feasible to address every concern directly on the site.",
    username: "User_name_User_Name",
    upvotes: 24,
    downvotes: 10,
    comments: 100,
  },
  {
    id: 2,
    pinned: true,
    date: "Jan 04, 2025",
    title: "New Rules for Community and Comments",
    description:
      "ZORO.TO COMMUNITY RULES (by agaric1) Contributions by Ruto, Kaido, and Cardboard_Face Review all rules before using Community or Comments",
    username: "Shdoe_tokyo",
    upvotes: 45,
    downvotes: 50,
    comments: 95,
  },
  {
    id: 3,
    pinned: true,
    date: "Dec 2, 2054",
    title: "Join Our Discord Community for Support and Anime Fun!",
    description:
      "Hello everyone, we understand that many of you have been experiencing various issues with the website. While our moderators do their best to assist here when possible, it’s simply not feasible to address every concern directly on the site.",
    username: "hala_madrid",
    upvotes: 67,
    downvotes: 20,
    comments: 34,
  },
];

const DiscussionCompanyCard = ({ post }) => (
  <Link to={`/company/discussion/${post.id}`}>
  <div className="discussion-company-card">
    {post.pinned && <span className="pinned-badge">📌 Pinned</span>}
    <span className="post-date">• {post.date}</span>
    <h3 className="post-title">{post.title}</h3>
    <p className="post-description">{post.description}</p>
    <div className="post-footer">
      <div className="user-info">
        <i className="fa-regular fa-circle-user"></i>
        <span>{post.username}</span>
      </div>
      <div className="interactions">
        <div className="votes">
          <FaThumbsUp /> <span>{post.upvotes}</span>
        </div>
        <div className="votes">
          <FaThumbsDown /> <span>{post.downvotes}</span>
        </div>
        <div className="comments">
          <FaCommentAlt /> <span>{post.comments}</span>
        </div>
      </div>
    </div>
  </div>
  </Link>
);

const DiscussionCompany = () => (
  <div className="discussion-company">
    <h2>Result</h2>
    {dummyPosts.map((post) => (
      <DiscussionCompanyCard key={post.id} post={post} />
    ))}
  </div>
);

export default DiscussionCompany;
