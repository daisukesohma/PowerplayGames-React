import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { getLocalStorage, redirectTo } from "../../utility/shared";
import { CONSTANTS } from "../../utility/constants";
import { socket } from "../../config/server_connection";

import "./psiGateway.css";

let _socket = null;
const INTIAL_PAYMENT_DATA = {
    CustomerRefNo: Math.floor(10000000 + Math.random() * 90000000),
    CardNumber: '4111111111111111',
    Email: '',
    CardExpMonth: '12',
    CardExpYear: '13',
    CardIDNumber: '3422',
};

const PSiGateway = (props) => {

    const [paymentData, setPaymentData] = useState(INTIAL_PAYMENT_DATA);

    const history = useHistory();
    const {
        location: { state },
    } = props;

    const user_id = getLocalStorage("PERSONA_USER_ID");
    const token = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER);

    useEffect(() => {
        _socket = socket();
        return function cleanUp() {
            _socket = null;
        };
    }, []);

    useEffect(() => {
        _socket?.on(CONSTANTS.SOCKET_EVENTS.PAYMENT.SUCCESS, (response) => {
            redirectTo(
                { history },
                {
                    path: `${state.previousPath}?status=true`,
                }
            );
        });
    }, [_socket]);

    const handleChange = (e) => {
        const obj = { ...paymentData };
        obj[e.target.name] = e.target.value;
        setPaymentData(obj);
    }

    return (
        <>
            <form action='https://checkout.psigate.com/HTMLPost/HTMLMessenger' method="post" className="main-form">
                {/* <div className="form-input">
                    <p>MerchantID:</p><input type="text" name="MerchantID" value="merchantcardcapture200024" />
                </div>
                <div className="form-input">
                    <p>CustomerRefNo:</p> <input type="text" name="CustomerRefNo" value={paymentData.CustomerRefNo} /><br />
                </div>
                <div className="form-input">
                    <p>PaymentType:</p> <input type="text" name="PaymentType" value="CC" /><br />
                </div>
                <div className="form-input">
                    <p>TestResult:</p> <input type="text" name="TestResult" value="" /><br />
                </div>
                <div className="form-input">
                    <p>OrderID:</p> <input type="text" name="OrderID" value="" /><br />
                </div>
                <div className="form-input">
                    <p>UserID:</p> <input type="text" name="UserID" value="User1" /><br />
                </div>
                <div className="form-input">
                    <p>CardAction:</p> <input type="text" name="CardAction" value="0" /><br />
                </div> */}
                <div className="form-input">
                    <p>CardNumber:</p> <input type="text" name="CardNumber" onChange={handleChange} value={paymentData.CardNumber} /><br />
                </div>
                <div className="form-input">
                    <p>Email:</p> <input type="text" name="Email" onChange={handleChange} value={paymentData.Email} /><br />
                </div>
                <div className="form-input">
                    <p>CardExpMonth:</p> <input type="text" name="CardExpMonth" onChange={handleChange} value={paymentData.CardExpMonth} /><br />
                </div>
                <div className="form-input">
                    <p>CardExpYear:</p> <input type="text" name="CardExpYear" onChange={handleChange} value={paymentData.CardExpYear} /><br />
                </div>
                <div className="form-input">
                    <p>CardIDNumber:</p> <input type="text" name="CardIDNumber" onChange={handleChange} value={paymentData.CardIDNumber} /><br />
                </div>
                <div className="form-input">
                    <p>Tax1:</p> <input type="text" name="Tax1" value="5" /><br />
                </div>
                <div className="form-input">
                    <p>SubTotal:</p> <input type="text" name="SubTotal" value={state?.amount} /><br />
                </div>

                <input type="hidden" name="ThanksURL" value={`${process.env.REACT_APP_API_URL}/api/v1/users/catch-thanks-url?user_id=${user_id}`} />
                <input type="hidden" name="NoThanksURL" value={`${process.env.REACT_APP_API_URL}/api/v1/users/catch-nothanks-url`} />

                {/* <input type="hidden" name="ThanksURL" value="https://stagingcheckout.psigate.com/HTMLPost/generic_nothankyou.jsp" />
                <input type="hidden" name="NoThanksURL" value="https://stagingcheckout.psigate.com/HTMLPost/generic_nothankyou.jsp" /> */}
                <div className="form-btn">
                    <input type="submit" value="Buy Now" />
                </div>
            </form>
        </>
    );
};

export default PSiGateway;
