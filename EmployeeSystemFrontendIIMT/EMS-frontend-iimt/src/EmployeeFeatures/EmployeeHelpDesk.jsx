import React, { useState } from "react";

function EmployeeHelpDesk() {
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      id: 1,
      question: "How do I log in to the EMS?",
      answer:
        "Use your Employee ID and Password on the login page. If you forget your password, click on 'Forgot Password' to reset it.",
    },
    {
      id: 2,
      question: "How can I check my attendance?",
      answer:
        "Go to the Attendance section in your dashboard to view your daily and monthly records.",
    },
    {
      id: 3,
      question: "How do I apply for leave?",
      answer:
        "Navigate to Leave Requests → Select the dates → Enter reason → Submit. Your manager will review and approve/reject the request.",
    },
    {
      id: 4,
      question: "How can I download my salary slip?",
      answer:
        "Go to Salary Section → Select the month → Click on Download Salary Slip. It will be saved as a PDF.",
    },
    {
      id: 5,
      question: "Who do I contact for technical issues?",
      answer:
        "Raise a ticket under Help Desk → Create Ticket or email support@ems.com for urgent help.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <h2 className="text-center mt-3">Help Center</h2>

      <div className="d-flex justify-content-center my-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="accordion" id="emsFaq">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div className="accordion-item" key={faq.id}>
              <h2 className="accordion-header" id={`heading${faq.id}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#faq${faq.id}`}
                  aria-expanded="false"
                  aria-controls={`faq${faq.id}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`faq${faq.id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${faq.id}`}
                data-bs-parent="#emsFaq"
              >
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No FAQs found.</p>
        )}
      </div>
    </div>
  );
}

export default EmployeeHelpDesk;
