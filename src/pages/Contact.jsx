import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../css/Contact.css";
import Header from "../components/Header";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_fyo6kbu",     // Replace
        "template_r21apxb",    // Replace
        formData,
        "EYcgc32fL1asT871i"      // Replace
      )
      .then(
        (result) => {
          alert("Message Sent Successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          alert("Failed to send. Please try again!");
        }
      );
  };

  return (
    <>
      <Header />
      <div className="contact-container">
        <h2>Contact Us</h2>
        <form onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </>
  );
}
