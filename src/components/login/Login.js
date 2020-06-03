import React, { PureComponent, useState } from 'react';

import './Login.scss';
import { Form, Input, Button } from 'antd';
//import XebiaLogo from './image/Logo.svg';
import XebiaLogo from '../../images/Logo2.svg';
import axios from 'axios';
import { login } from '../Auth/Auth';
import HomePage from '../HomePage/HomePage';
import ProgressBar from '../ProgressBar/ProgressBar'
import { red } from '@material-ui/core/colors';
import Alertbox from '../Alert/Alert';

class Login extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      buttonStatus: "emailCheck",
      messageStatus: "",
      inputEmailStyle: "registeredinputEmail",
      emailRegister: false,
      loginLableName: 'Enter your Email Id',
      inputPlaceHolder: '',
      loginBtnName: 'Next',
      loginInfo: '',
      loginBtnColor: '#e4500e',
      error: false,
      emailStatus: false,
      emailInputView: true,
      buttonEnabled: true,
      email: "bikrant.singh@xebia.com",
      otpSuccess: false,
      otpResendEnabled: false,
      resendTextStyle: "Didntreceivetext-style-1",
      otpSendEnabled: false,
      emailIDText: "",
      otpText: "",
      alertText: ""
    }
  }



  onButtonClicked = () => {

    this.setState({ isLogin: true, buttonEnabled: true })

  }



  onButtonClicked1 = () => {

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
        inputPlaceHolder: 'Enter One Time Password',
        emailInputView: false,
        loginInfo: "",
        buttonStatus: "otpBtn",
        loginLableName: 'Enter OTP',
        otpSendEnabled: false,
        otpResendEnabled: true
      })
      console.log(this.state, "check");
    }
  }

  updateInputValue = (evt) => {
    this.setState({
      email: evt.target.value
    });
  }

  getOTP() {
    const email = this.state.emailIDText;
    if (email)
      axios.post(`https://cors-anywhere.herokuapp.com/http://iportal.herokuapp.com/innovation-portal/api/v1/otp`, { email })
        .then(res => {
          const emailStatus = res.data;
          this.setAlertName = "OTP send successfully!";
          this.setState({ showAlert: true, alertText: 'OTP send successfully!', otpSuccess: true, emailStatus: true });
          this.AlertShow("OTP send successfully!");
        })
        .catch(error => {
          console.log(error)
          this.setState({ otpSuccess: false, emailStatus: false });
        });
  }

  getOTPVerify(otp) {
    if (otp) {
      const otpAPI = 'https://cors-anywhere.herokuapp.com/http://iportal.herokuapp.com/innovation-portal/api/v1/otp/verify';

      axios.get(otpAPI,
        {
          params: {
            otp: otp
          }
        })
        .then(response => {
          console.log('getEmailVerify', response)
          if (response.data.message === 'success') {
            this.setState({ isLogin: true })
            login(response.data.token);
          }


        })
        .catch(error => {
          console.log(error)
          this.setState({ email: "", isLogin: false });

        });
    }
    else {
      alert("Please enter valid otp");
    }
  }





  handleChange = (evt) => {

    this.setState(
      { email: evt.target.value });

    if (this.state.emailInputView) {
      const val = evt.target.value;
      console.log(val);
      clearTimeout(this.typingTimer);

      let ve = this.validateEmail(val);
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
      console.log(valOTP, "otp");
      // check otp 

      if (valOTP) {

        this.setState({ otpText: valOTP });

      }

    }

  }

  validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      //Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
      if (email.indexOf("@xebia.com", email.length - "@xebia.com".length) !== -1) {
        //VALID
        console.log("VALID");
        return true;
      }
    }
  }

  emailRegisteredCheck = (email) => {

    axios.get('http://iportal.herokuapp.com/innovation-portal/api/v1/token/verify?emailId=' + email)
      .then(response => {
        console.log(response.data.result);
        this.setState({
          buttonStatus: "emailSuccess",
          loginInfo: 'Your will receive an OTP on this email to continue to application.',
          emailRegister: false,
          messageStatus: "optMessage",
          inputEmailStyle: "registeredinputEmail",
          buttonEnabled: false
        });
        console.log(this.state);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          buttonStatus: "emailCheck",
          loginInfo: 'This email address is not registered with us, try with different one.',
          emailRegister: false,
          messageStatus: 'emailMessage',
          inputEmailStyle: "notRegisteredEmail",
          buttonEnabled: true
        });
        console.log(this.state);
      });
  }



  componentWillUnmount() {
    clearTimeout(this.typingTimer);
  }

  componentDidUpdate(prevState) {

    if (this.prevState != this.state) {

      console.log(prevState);

    }

  }

  resendTextOnMouseover(e) {

    console.log(e);
    if (e === "In") {

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
    setTimeout(() => {
      this.setState({ showAlert: false })
    }, 4000);
  };


  render() {
    if (this.state.isLogin) {
      return <HomePage />
    }
    const alertName = "OTP send successfully!";
    return (

      <div className="App">
        {this.state.showAlert ?
          <Alertbox alertName={alertName} alertText={this.state.alertText} /> : null
        }
        <div className="headerlogos">
          <img src={XebiaLogo} alt="logo" className="xebia_logo-large-transparent" />
        </div>
        <div className="main">
          <h2 className='Login' >Login</h2>
          <div className="mainContaine">
            <Form>
              <Form.Item className="enterYourEmailId" label={this.state.loginLableName}>
                <Input placeholder={this.state.inputPlaceHolder} className={"inputEmail"}
                  value={this.state.email} onChange={this.handleChange}>
                </Input>

                {this.state.emailRegister ?
                  <div className='progrees' >
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

