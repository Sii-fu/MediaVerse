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
        {/* <div className="votes">
          <FaThumbsUp /> <span>{post.upvotes}</span>
        </div>
        <div className="votes">
          <FaThumbsDown /> <span>{post.downvotes}</span>
        </div> */}
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


// import React, { useEffect, useState } from "react";
// import "./DiscussionCompany.css";
// import { FaThumbsUp, FaThumbsDown, FaCommentAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const DiscussionCompanyCard = ({ post }) => (
//   <Link to={`/company/discussion/${post.id}`}>
//   <div className="discussion-company-card">
//     {post.pinned && <span className="pinned-badge">📌 Pinned</span>}
//     <span className="post-date">• {post.dis_date}</span>
//     <h3 className="post-title">{post.title}</h3>
//     <p className="post-description">{post.description}</p>
//     <div className="post-footer">
//       <div className="user-info">
//         <i className="fa-regular fa-circle-user"></i>
//         <span>{post.username}</span>
//       </div>
//       <div className="interactions">
//         <div className="votes">
//           <FaThumbsUp /> <span>{post.upvotes}</span>
//         </div>
//         <div className="votes">
//           <FaThumbsDown /> <span>{post.downvotes}</span>
//         </div>
//         <div className="comments">
//           <FaCommentAlt /> <span>{post.reply_count}</span>
//         </div>
//       </div>
//     </div>
//   </div>
//   </Link>
// );


// const DiscussionCompany = () => {
//   const [posts, setPosts] = useState([]); // state to store posts
//   const [loading, setLoading] = useState(true); // state to handle loading state
//   const [error, setError] = useState(null); // state to handle errors

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/company/mymedia", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             com_id: localStorage.getItem("user_id"), // Replace with the actual company ID
//           }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const data = await response.json();
//         setPosts(data); // Set the fetched data to the state
//         setLoading(false); // Data fetched successfully, stop loading
//       } catch (error) {
//         setError(error.message); // Set error if fetch fails
//         setLoading(false); // Stop loading in case of error
//       }
//     };

//     fetchPosts();
//   }, []); // Empty dependency array to run once on component mount

//   if (loading) {
//     return <div>Loading...</div>; // Loading state
//   }

//   if (error) {
//     return <div>Error: {error}</div>; // Display error message if there is one
//   }

//   return (
//     <div className="discussion-company">
//       <h2>Result</h2>
//       {posts.length > 0 ? (
//         posts.map((post) => <DiscussionCompanyCard key={post.id} post={post} />)
//       ) : (
//         <div>No discussions found.</div>
//       )}
//     </div>
//   );
// };

// export default DiscussionCompany;

