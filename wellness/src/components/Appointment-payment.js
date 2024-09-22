import React from "react";
import appPayStyle from "../assets/css/appointmentpayclient.module.css"
import { Form } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";



function Appointmentpayment(){
    const Testname = useSelector((state) => (state.test.testName));
    const TestPrice = useSelector((state) => (state.appBook.testprice));
    const hospname = useSelector((state) => (state.appBook.nameofhospital));
    const hospadd = useSelector((state) => (state.appBook.hospitaladdress));
  
    



    return (
        <>
        

        <div className={appPayStyle.iphone}>
      <header className={appPayStyle.header}>
        <h1>Checkout</h1>
      </header>

      <Form  className={appPayStyle.form} method="POST">
        <div>
          <h2>Summary</h2>

          <div className={appPayStyle.card}>
            <address>
           <pre>Type of Test     :<span style={{display:"inline"}}>{Testname}</span></pre>
           <pre>Test Price       :<span style={{display:"inline"}}>{TestPrice}</span>/-</pre>
           <pre>Hospital name    :<span style={{display:"inline"}}>{hospname}</span></pre>
           <pre>Hospital Address :<span style={{display:"inline"}}>{hospadd}</span></pre>
            </address>
          </div>
        </div>

        <fieldset>
          <legend>Payment Method</legend>

          <div className={appPayStyle['form__radios']}>
            <div className={appPayStyle['form__radio']}>
              <label htmlFor="visa">
                <i className="fa-brands fa-cc-mastercard"></i>Visa Payment
              </label>
              <div>
              <input defaultChecked id="visa" name="payment-method" type="radio"/>
              </div>
            </div>

            <div className={appPayStyle['form__radio']}>
              <label htmlFor="paypal">
                <i className="fa-brands fa-google-pay"></i>PayPal
              </label>
              <div>
              <input id="paypal" name="payment-method" type="radio" />
              </div>
            </div>

            <div className={appPayStyle['form__radio']}>
              <label htmlFor="mastercard">
                <i className="fa-brands fa-cc-visa"></i>Master Card
              </label>
              <div>
              <input id="mastercard" name="payment-method" type="radio" />
              </div>
            </div>
          </div>
        </fieldset>

        <div>
          <h2>Payment Details</h2>

          <table>
            <tbody>
              <tr>
                <td>Test fee</td>
                <td align="right">{TestPrice}/-</td>
              </tr>
              <tr>
                <td>Platform fee</td>
                <td align="right">10/-</td>
              </tr>
              
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td align="right">{TestPrice+10}/-</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div>
          <button className={`${appPayStyle.button} ${appPayStyle['button--full']}`} type="submit">
            <svg className={appPayStyle.icon}>
              <use xlinkHref="#icon-shopping-bag" />
            </svg>
            Proceed
          </button>
        </div>
      </Form>
    
    </div>
         



        </>
    )
}

export default Appointmentpayment;