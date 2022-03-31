import React, { useEffect } from "react";
import * as $ from "jquery";
import { useHistory } from "react-router-dom";

import { getLocalStorage, redirectTo } from "../../utility/shared";
import { CONSTANTS } from "../../utility/constants";
import { socket } from "../../config/server_connection";

import "./userGateway.css";

let _socket = null;

const UsersGateway = ({amount, paymentMethod, email}) => {
  const history = useHistory();
 
  
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
      
    });
  }, [_socket]);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://api.myuser.com/js/checkout.js";

    document.body.appendChild(script);

    setTimeout(async () => {
      $(".myuserPay-Paybutton").click();
    }, 1000);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <form
        className={"__form__"}
        action={`${process.env.REACT_APP_API_URL}/api/v1/users/account/update-myuserpay-balance`}
        method="post"
      >
        <input type="hidden" name="token" value={`Bearer ${token}`} />
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="user_id" value={user_id} />
        <script
          class="myuserPay-button"
          data-public_key={process.env.REACT_APP_MYUSERPAY_PUBLIC_KEY}
          data-amount={amount * 100}
          data-description="Deposit Money"
          data-name="Defy Games Demo"
          data-image="Item or your picture,logo"
          data-submit-ajax="1"
        ></script>
      </form>
    </>
  );
};

export default UsersGateway;
