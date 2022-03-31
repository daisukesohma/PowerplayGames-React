import React, { useState } from "react";
import classes from "./index.module.scss";
import FilledArrow from "../FilledArrow";

const MyAccountMenu = (props) => {
  const {
    value = "",
    options = [{}],
    onClick = () => {},
    visible = false,
  } = props || {};

  const [showSubmenu, setSubMenuStatus] = useState(false);

  return (
    <div className={classes.__my_account_menu}>
      {visible && (
        <div className={classes.__list}>
          {options.map((item, index) => {
            return (
              <div
                key={index}
                className={`${classes.__list_item}
                                         ${
                                           showSubmenu && item.label == "How to Play" &&
                                           classes.__list_item_selected
                                         }
                                         ${
                                           index == 0 &&
                                           classes.__list_item_border_radius_top
                                         }
                                         ${
                                           options.length - 1 == index &&
                                           classes.__list_item_border_radius_bottom
                                         }
                                        `}
                onClick={() => {
                  if(item.label == "How to Play") {
                    setSubMenuStatus(!showSubmenu);
                  }
                  else {
                    onClick(item.value);
                  }
                }}
                style={{position: "relative"}}
              >
                {item.label}
                {item.label == "How to Play" && <spam style={{
                  position: "absolute",
                  right: 10,
                  transform: "rotate(270deg)"
                }}>
                  <FilledArrow down={true}/>
                </spam>}
                {item.label == "How to Play" && showSubmenu && 
                  <div style={{
                    position: "absolute",
                    left: "-151px",
                    width: 150,
                    top: 0
                  }}>
                    <ul style={{
                      listStyle: "none",
                      padding: 0
                    }}>
                      <li className={classes.list_li} style={{
                        borderRadius: "8px 8px 0 0"
                      }} onClick={(e) => {
                        e.stopPropagation();
                        onClick("/how-to-play");
                      }}>PowerdFS</li>
                      <li className={classes.list_li} style={{
                        borderRadius: "0 0 8px 8px"
                      }} onClick={(e) => {
                        e.stopPropagation();
                        onClick("/recharge-how-to-play");
                      }}>ReCharge</li>
                    </ul>
                  </div>
                }
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAccountMenu;
