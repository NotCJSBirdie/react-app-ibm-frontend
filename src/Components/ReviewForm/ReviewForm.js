import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./ReviewForm.css";

function ReviewForm({ doctor, onReviewSubmit, disabled }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", review: "", rating: 0 });
  const [starRating, setStarRating] = useState(0);
  const [warning, setWarning] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleStarClick = (index) => {
    setStarRating(index);
    setFormData({ ...formData, rating: index });
  };

  const handleClick = () => setShowForm(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating > 0) {
      setWarning(false);
      onReviewSubmit(formData);
      setShowForm(false);
    } else {
      setWarning(true);
    }
  };

  return (
    <div className="review-form-container">
      {!showForm && (
        <button
          className="review-btn"
          disabled={disabled}
          onClick={handleClick}
        >
          Click Here
        </button>
      )}
      {showForm && (
        <form className="review-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Review:
            <textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Rating:
            <div className="star-container">
              {[1,2,3,4,5].map(index => (
                <FaStar
                  key={index}
                  size={24}
                  color={starRating >= index ? "#F2C265" : "#a9a9a9"}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleStarClick(index)}
                  data-testid={`star-${index}`}
                />
              ))}
            </div>
          </label>
          {warning && <div className="warning-text">Please fill out all fields.</div>}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default ReviewForm;
