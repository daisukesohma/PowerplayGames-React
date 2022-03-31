import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchUserBalance,
  REMOVE_ZUM_REDIRECT_URL,
  sendZumTransaction,
} from "../../actions/userActions";
import { showToast } from "../../actions/uiActions";

const PaymentFrame = (props) => {
  const dispatch = useDispatch();
  const [previousPath] = useState(props.location?.state?.previousPath);

  window.addEventListener("message", function (e) {
    var data = e.data;
    if (data && data.origin && data.origin === "ZUM_RAILS") {
      // call action for pushing the transaction to backend
      const { transactionId } = data;

      if (transactionId) {
        dispatch(sendZumTransaction(transactionId, markupRate));
      }
    }
  });

  const frameUrl = useSelector((state) => state.user?.zumRedirectUrl);
  const markupRate = useSelector((state) => state.user?.markedUpRate);
  if (!frameUrl) {
    props.history.push(previousPath ? previousPath : "/");
  }

  return (
    <>
      <iframe
        src={frameUrl}
        width="100%"
        style={{
          minHeight: "100vh",
          display: "block",
          overflow: "hidden",
          border: "0",
        }}
        title="Payment Frame"
      />
    </>
  );
};

export default PaymentFrame;
