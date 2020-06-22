import React, { PureComponent } from 'react';
import './Login.scss';
import { Form, Input, Button } from 'antd';
import { ReactComponent as XebiaLogo } from '../../images/Logo.svg';
import { login } from '../Auth/Auth';
import HomePage from '../HomePage/HomePage';
import ProgressBar from '../ProgressBar/ProgressBar';
import Alertbox from '../Alert/Alert';
import { isAuthenticated } from '../Auth/Auth';
import {
  getEmailVerify,
  getOTPByEmail,
  getVerifyOtp
} from '../../services/AppService';
import {
  EMAIL_SUCCESS_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  OTP_SUCCESS_MESSAGE,
  EMAIL_ENTER_MESSAGE,
  OTP_ENTER_MESSAGE,
  SUCCESS,
  OTP_INVALID_MESSAGE
} from '../../Config/Constants';
import { validateEmail } from '../../Utility/CommonFunctions';

class Login extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      buttonStatus: "emailCheck",
      messageStatus: "",
      inputEmailStyle: "registeredinputEmail",
      emailRegister: false,
      loginLableName: EMAIL_ENTER_MESSAGE,
      inputPlaceHolder: '',
      loginBtnName: 'Next',
      loginInfo: '',
      loginBtnColor: '#e4500e',
      error: false,
      emailStatus: false,
      emailInputView: true,
      buttonEnabled: true,
      email: "",
      otpSuccess: false,
      otpResendEnabled: false,
      resendTextStyle: "Didntreceivetext-style-1",
      otpSendEnabled: false,
      emailIDText: "",
      otpText: "",
      alertText: ""
    }
  }

  //Duplicate Call we can remove it
  onButtonClicked1 = () => {
    this.setState({ isLogin: true, buttonEnabled: true })
  }

  onButtonClicked = () => {
    if (this.state.otpSendEnabled) {
      this.getOTP();
    }

    if (this.state.otpSuccess) {
      this.getOTPVerify(this.state.otpText);
    }
    else {
      this.setState({
        email: "",
        loginBtnName: "Login",
        inputPlaceHolder: OTP_ENTER_MESSAGE,
        emailInputView: false,
        loginInfo: "",
        buttonStatus: "otpBtn",
        loginLableName: 'Enter OTP',
        otpSendEnabled: false,
        otpResendEnabled: true
      })
    }
  }

  updateInputValue = (evt) => {
    this.setState({
      email: evt.target.value
    });
  }

  getOTP() {
    const email = this.state.emailIDText;
    if (email) {
      const requestParam = {
        email: email
      };
      getOTPByEmail(requestParam)
        .then(res => {
          this.setAlertName = OTP_SUCCESS_MESSAGE;
          this.setState({ showAlert: true, alertText: OTP_SUCCESS_MESSAGE, otpSuccess: true, emailStatus: true });
          this.AlertShow(OTP_SUCCESS_MESSAGE);
        })
        .catch(error => {
          console.log(error)
          this.setState({ otpSuccess: false, emailStatus: false });
        });
    }
  }

  getOTPVerify(otp) {
    if (otp) {
      const requestParam = {
        otp: otp
      }
      getVerifyOtp(requestParam)
        .then(response => {
          if (response.data.message === SUCCESS) {
            login(response.data);
            this.loginTimer = setTimeout(() => {
              this.setState({ isLogin: true })
            }, 1000);
          }
        })
        .catch(error => {
          console.log(error)
          this.setState({ email: "", isLogin: false });
        });
    }
    else {
      alert(OTP_INVALID_MESSAGE);
    }
  }

  handleChange = (evt) => {
    this.setState({ email: evt.target.value });
    if (this.state.emailInputView) {
      const val = String(evt.target.value).toLowerCase();
      clearTimeout(this.typingTimer);
      let ve = validateEmail(val);
      if (ve) {
        this.typingTimer = setTimeout(() => {
          this.setState({ emailRegister: true })
        }, 0);
        //api call to check email register
        this.emailRegisteredCheck(val);
        this.setState({ emailIDText: val, otpSendEnabled: true, emailRegister: false, buttonEnabled: false })
      }
      else {
        this.setState({ otpSendEnabled: false, buttonEnabled: true, emailRegister: false, buttonStatus: "emailCheck", loginInfo: null })
      }
    }
    else {
      const valOTP = evt.target.value;
      // check otp 
      if (valOTP) {
        this.setState({ otpText: valOTP });
      }
    }
  }

  emailRegisteredCheck = (email) => {
    const requestParam = {
      emailId: email
    }
    getEmailVerify(requestParam)
      .then(response => {
        if (response.data.message === SUCCESS) {
          if (response.data.result === true) {
            this.setState({
              buttonStatus: "emailSuccess",
              loginInfo: EMAIL_SUCCESS_MESSAGE,
              emailRegister: false,
              messageStatus: "optMessage",
              inputEmailStyle: "registeredinputEmail",
              buttonEnabled: false
            });
          } else if (response.data.result === false) {
            this.setState({
              buttonStatus: "emailCheck",
              loginInfo: EMAIL_ERROR_MESSAGE,
              emailRegister: false,
              messageStatus: 'emailMessage',
              inputEmailStyle: "notRegisteredEmail",
              buttonEnabled: true
            });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    clearTimeout(this.typingTimer);
    clearTimeout(this.alertTimer);
    clearTimeout(this.loginTimer);
  }

  resendTextOnMouseover(event) {
    if (event === "In") {
      this.setState({ resendTextStyle: "Didntreceivetext-style-2" });
    }
    else {
      this.setState({ resendTextStyle: "Didntreceivetext-style-1" });
    }
  }

  resendOTPClick() {
    this.getOTP();
  }

  AlertShow(alert) {
    this.alertTimer = setTimeout(() => {
      this.setState({ showAlert: false })
    }, 4000);
  };

  render() {
    if (this.state.isLogin || isAuthenticated()) {
      return <HomePage />
    }
    const alertName = OTP_SUCCESS_MESSAGE;
    return (
      <div className="App">
        {this.state.showAlert ?
          <Alertbox alertName={alertName} alertText={this.state.alertText} /> : null
        }
        <XebiaLogo className='xebia-login-logo' />
        <div className="main">
          <h2 className='Login'>Login</h2>
          <div className="mainContaine">
            <Form>
              <Form.Item className="enterYourEmailId" label={this.state.loginLableName}>
                <Input placeholder={this.state.inputPlaceHolder} className={"inputEmail"}
                  value={this.state.email} onChange={this.handleChange}>
                </Input>
                {this.state.emailRegister ?
                  <div className='progrees'>
                    <ProgressBar />
                  </div> : null
                }
              </Form.Item>
              <h3 className={this.state.messageStatus}> {this.state.loginInfo}</h3>
              <Form.Item>
                <Button disabled={this.state.buttonEnabled} className={this.state.buttonStatus}
                  onClick={this.onButtonClicked}>{this.state.loginBtnName}</Button>
              </Form.Item>
              {this.state.otpResendEnabled ?
                <div className="otpResendDivStyle">
                  <h2 className="Didntreceivetext-style-1"> Didn’t receive the email? </h2>
                  <h3 onMouseOut={e => this.resendTextOnMouseover("Out")} onMouseOver={e => this.resendTextOnMouseover("In")} onClick={e => this.resendOTPClick(e)} className={this.state.resendTextStyle}> Resend the OTP on same email ID. </h3>
                </div> : null
              }
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

