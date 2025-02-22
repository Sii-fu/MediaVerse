import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../../firebase"; // Make sure to configure and export your Firebase storage instance
import "./ProfilePage.css";

const ProfilePage = () => {
  const initialProfile = {
    IMG: "", // Placeholder image URL
    NAME: "",
    EMAIL: "",
    DESCRIPTION: "",
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialProfile.IMG);
  const [imageUpload, setImageUpload] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:5000/company/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: localStorage.getItem("user_id") }), // Get user ID from local storage or session
        });
        if (response.status === 200) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = async () => {
    let updatedProfile = { ...profile };

    // Only upload the image if a new file has been selected
    if (imageUpload) {
      const imageRef = ref(storage, `company/profile/${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef);
      updatedProfile.IMG = url;
      // Clear the image upload state after uploading
      setImageUpload(null);
    }

    // Send the updated profile data to the backend
    try {
      const response = await fetch("http://localhost:5000/company/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.status === 200) {
        setProfile(updatedProfile);
        setIsEditing(false);
        alert("Profile updated successfully");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="profile-page3">
      {/* <h2>Company Profile</h2> */}
      <div className="profile-info-image">
        {isEditing ? (
          <>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="profile-img-preview"
              />
            )}
            <input type="file" name="img" onChange={handleImageChange} />
          </>
        ) : (
          <img
            src={profile.img}
            alt={profile.name}
            className="profile-page3-Profile"
          />
        )}
      </div>
      {isEditing ? null : <i class="fa fa-user-circle"></i>}

      <div className="profile-info3-container">
        <div className="profile-info3">
          <label>Name: </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.name}</span>
          )}
        </div>
        <div className="profile-info3">
          <label>Email: </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.email}</span>
          )}
        </div>
        <div className="profile-info3">
          <label>Description: </label>
          {isEditing ? (
            <textarea
              name="description"
              value={profile.description}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.description}</span>
          )}
        </div>
        <div className="profile-buttons3">
          {isEditing ? (
            <button onClick={handleUpdate}>Update</button>
          ) : (
            <button onClick={toggleEdit}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
