import React, { useState } from "react";
import "./EmailScheduler.css"; // Make sure you create this CSS file

const EmailScheduler = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch("http://localhost:5000/api/schedule", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setSuccess(true);
      form.reset();
    } else {
      alert("❌ Error scheduling email.");
    }
  };

  return (
    <div className="form-container">
      {success ? (
        <div className="success">
          <h2>✅ Email Sent Successfully!</h2>
          <button onClick={() => setSuccess(false)}>
            📧 Send Another Email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h2>📨 Schedule an Email</h2>

          <label>Subject:</label>
          <input type="text" name="subject" required />

          <label>Message:</label>
          <textarea name="body" required></textarea>

          <label>Recipients (comma-separated):</label>
          <input type="text" name="recipients" required />

          <label>Image:</label>
          <input type="file" name="image" />

          <label>Attachment:</label>
          <input type="file" name="attachment" />

          <label>Send at (HH:MM):</label>
          <input type="time" name="send_time" />

          <label>OR Send after delay (in seconds):</label>
          <input type="number" name="delay" min="1" />

          <label>OR Recurring Schedule:</label>
          <select name="recur">
            <option value="">-- Select --</option>
            <option value="2s">Every 2 seconds</option>
            <option value="10min">Every 10 minutes</option>
            <option value="hourly">Every hour</option>
            <option value="daily">Every day at 10:30</option>
            <option value="monday">Every Monday at 09:00</option>
            <option value="wednesday">Every Wednesday at 13:15</option>
          </select>

          <button type="submit" className="submit-btn">
            Schedule Email
          </button>
        </form>
      )}
    </div>
  );
};

export default EmailScheduler;
