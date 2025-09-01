// ReviewsTable.js
import React, { useState } from "react";
import ReviewForm from "../ReviewForm/ReviewForm";

const doctors = [
  { id: 1, name: "Dr. John Doe", speciality: "Cardiology" },
  { id: 2, name: "Dr. Jane Smith", speciality: "Dermatology" }
];

function ReviewsTable() {
  // Track reviews keyed by doctor id
  const [reviews, setReviews] = useState({ /* id: reviewObj */ });

  return (
    <table>
      <thead>
        <tr>
          <th>Serial Number</th>
          <th>Doctor Name</th>
          <th>Doctor Speciality</th>
          <th>Provide feedback</th>
          <th>Review Given</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doctor, idx) => (
          <tr key={doctor.id}>
            <td>{idx + 1}</td>
            <td>{doctor.name}</td>
            <td>{doctor.speciality}</td>
            <td>
              <ReviewForm
                disabled={Boolean(reviews[doctor.id])}
                doctor={doctor}
                onReviewSubmit={review => {
                  setReviews(prev => ({ ...prev, [doctor.id]: review }));
                }}
              />
            </td>
            <td>
              {reviews[doctor.id] && (
                <div style={{ border: "2px solid red", padding: "0.5em" }}>
                  <b>{reviews[doctor.id].name}</b><br />
                  <span>{reviews[doctor.id].review}</span><br />
                  <span>Rating: {reviews[doctor.id].rating}</span>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReviewsTable;
