import React, { useState } from "react";
import "./FindPassword.css";
import { findPassMail } from "../../util/APIUtils";
import Alert from "react-s-alert";

function FindPassword() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function findPass(event) {
    const findpasswordRequest = {
      email: email,
      name: name,
    };

    findPassMail(findpasswordRequest)
      .then((response) => {
        Alert.success("등록된 메일로 임시비밀번호 발송완료!");
        setEmail("");
        setName("");
        window.location = "/login";
      })
      .catch((error) => {
        Alert.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!"
        );
      });
  }

  return (
    <div className="pwfind-container">
      <div className="pwfind-content">
        <form>
          <div className="form-item">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br />

          <div className="form-item">
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="form-item">
            <button type="button" onClick={findPass}>
              Find Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FindPassword;
