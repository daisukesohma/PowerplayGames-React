import React, {useState} from "react";
import { Modal } from "reactstrap";
import Player from "./Player";
import "./starter.scss";
import { isEmpty } from "lodash";
//********************************************************************************
//********************************************************************************
// ** I HAVE TO OVERWRITE MODAL COMPONENT CSS AND IT CAN BE FOUND IN STYLE.SCSS FILE.
//********************************************************************************
//********************************************************************************
const SwapStarter = ({ swap, swapModal, selectedPlayer, swapPlayerList, onSwap, loadingPlayerList, searchPlayerList}) => {
  const [filterString, setFilterString] = useState("");
  const aa = swapPlayerList;
  const RenderRow = (item) => {
    return (
      <Player items={[item]} onSwap={onSwap}/>
    )
  }
  const renderLoadingMessage = () => {
    return (<h2 className="loadingMessage">Loading...</h2>);
  }
  const noDataMessage = () => {
    return (<h2 className="noDataMessage">No data found.</h2>);
  }
  const searchPlayerListNew = (searchTerm) => {
    let searchText = searchTerm.target.value;
    setFilterString(searchText);
    searchPlayerList(searchText);
  }
 
  return (
    <Modal isOpen={swap} toggle={swapModal} className="popUpModal swapModal ">
      <d className="swap__wrapper">
        <div className="heading">
          <h2>Swap Your Starter</h2>
          <p>Choose {selectedPlayer?.player?.current_position} player to replace</p>
          <h1>{selectedPlayer?.player?.name}</h1>
        </div>
        <div
          className="swap__wrapper__searchFileds"
          style={{ marginTop: "30px", paddingBottom: "0px" }}
        >
          <div className="input__search">
            <input type="text" placeholder="Search By Player Name" onChange={searchPlayerListNew}/>
            <img src="/images/searchIcon.svg" alt="icon" />
          </div>
        </div>
        {loadingPlayerList === true ? (
          renderLoadingMessage()
        ) : (
          swapPlayerList && swapPlayerList?.listData?.length > 0 ? (<div className="swapPlayersListDiv">{swapPlayerList.listData.map(RenderRow)}</div>) : noDataMessage()
        )}
        <div className="close__box" onClick={() => swapModal(false)}>
          X
        </div>
      </d>
    </Modal>
  );
};

export default SwapStarter;
