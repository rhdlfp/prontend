import React, { Component } from "react";
import "./Signup.css";
import { Link, Redirect } from "react-router-dom";
import { GOOGLE_AUTH_URL, GITHUB_AUTH_URL, NAVER_AUTH_URL, KAKAO_AUTH_URL } from "../../constants";
import { signup, checkEmail } from "../../util/APIUtils";
import googleLogo from "../../img/google-logo.png";
import githubLogo from "../../img/github-logo.png";
import naverLogo from "../../img/naver-logo.png";
import kakaoLogo from "../../img/kakao-logo.png";
import Alert from "react-s-alert";

class Signup extends Component {
  render() {
    if (this.props.authenticated) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: this.props.location },
          }}
        />
      );
    }

    return (
      <div className="signup-container">
        <div className="signup-content">
          <h1 className="signup-title">join membership</h1>
          <SignupForm {...this.props} />
          <div className="or-separator">
            <span className="or-text">OR</span>
          </div>
          <SocialSignup />
          <span className="login-link">
            Already have an account? <Link to="/login">Login!</Link>
          </span>
        </div>
      </div>
    );
  }
}

class SocialSignup extends Component {
  render() {
    return (
      <div className="social-signup">
        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
          <img src={googleLogo} alt="Google" /> Sign up with Google
        </a>
        <a className="btn btn-block social-btn naver" href={NAVER_AUTH_URL}>
          <img src={naverLogo} alt="Naver" /> Sign up with Naver
        </a>
        <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
          <img src={githubLogo} alt="Github" /> Sign up with Github
        </a>
        <a className="btn btn-block social-btn github" href={KAKAO_AUTH_URL}>
          <img src={kakaoLogo} alt="Kakao" /> Sign up with Kakao
        </a>
      </div>
    );
  }
}

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      phone: "",
      nickname: "",
      isEmailUnique: "", // 이메일 중복 여부를 나타내는 상태 변수
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;
    let inputValue = target.value;

    if (inputName === "phone") {
      // 숫자만 추출하여 하이픈을 자동으로 추가합니다.
      inputValue = inputValue.replace(/[^0-9]/g, "");
      const len = inputValue.length;

      if (len >= 3) {
        inputValue =
          inputValue.slice(0, 3) +
          (len > 3 ? "-" : "") +
          inputValue.slice(3, 7) +
          (len > 7 ? "-" : "") +
          inputValue.slice(7, 11);
      }

      // 입력값이 13자를 초과하지 않도록 합니다.
      if (inputValue.length > 13) {
        inputValue = inputValue.substring(0, 13);
      }
    }

    this.setState({
      [inputName]: inputValue,
    });
  }

  checkEmail = async () => {
    const email = this.state.email;
    if (!email) {
      Alert.error("이메일을 먼저 입력해주세요.");
      return;
    }

    try {
      const response = await checkEmail(email);

      if (response === false) {
        Alert.success("등록 가능한 이메일 입니다!");
        this.setState({ isEmailUnique: true });
      } else {
        Alert.error("이미 등록된 이메일 입니다.");
        this.setState({ isEmailUnique: false });
      }
    } catch (error) {
      Alert.error("Oops! Something went wrong. Please try again.");
    }
  };

  isPasswordValid(password) {
    // 패스워드 검증 조건을 정의
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    return passwordRegex.test(password);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { password, isEmailUnique } = this.state;

    if (!this.isPasswordValid(password)) {
      Alert.error("패스워드는 7자리 이상이고 특수기호 1개 이상, 숫자 1개 이상을 포함해야 합니다.");
      return;
    }

    if (isEmailUnique === "") {
      Alert.error("이메일 중복 체크를 확인해주세요.");
      return;
    }

    if (!isEmailUnique) {
      Alert.error("이미 등록된 이메일 입니다.");
      return;
    }

    const signUpRequest = Object.assign({}, this.state);
    console.log(signUpRequest);

    signup(signUpRequest)
      .then((response) => {
        Alert.success("You're successfully registered. Please login to continue!");
        this.props.history.push("/login");
      })
      .catch((error) => {
        Alert.error((error && error.message) || "Oops! Something went wrong. Please try again!");
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-item">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-item" style={{ display: "flex" }}>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <button type="button" className="btn btn-secondary" onClick={this.checkEmail}>
            중복 체크
          </button>
        </div>

        <div className="form-item">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="phone"
            value={this.state.phone}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <input
            type="nickname"
            name="nickname"
            className="form-control"
            placeholder="nickname"
            value={this.state.nickname}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <button type="submit" className="btn btn-block btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

export default Signup;