import React from 'react';
import { useSelector } from 'react-redux';

import './BingoGame2.scss';

const BingoGame2 = props => {
    const { bingo_game: bingoGame = [] } = useSelector((state) => state.bingoGame);
    
    const renderTableRow = (list) => {
        return (
            list && list?.length && list?.map((value, index) =>
                <div key={index + ' ' + value}>{ value }</div>
            )
        )
    }

    const renderTable = (list, column) => {
        if (column === 0) return (<>
            <div className='__bold' key={`B - ${column}`}>B</div>
            {
                renderTableRow(list)
            }
        </>)
        if (column === 1) return (<>
            <div className='__bold' key={`I - ${column}`}>I</div>
            {
                renderTableRow(list)
            }
        </>)
        if (column === 2) return (<>
            <div className='__bold' key={`N - ${column}`}>N</div>
            {
                renderTableRow(list)
            }
        </>)
        if (column === 3) return (<>
            <div className='__bold' key={`G - ${column}`}>G</div>
            {
                renderTableRow(list)
            }
        </>)
        if (column === 4) return (<>
            <div className='__bold' key={`O - ${column}`}>O</div>
            {
                renderTableRow(list)
            }
        </>)
    }
    
    return (
        <div className='__bingo-game-2 __primary-color __h2 __mediam-on-small'>
            {
                bingoGame?.map((list, column) => {
                    return renderTable(list, column)
                })
            }
            
        </div>
    )
}

export default React.memo(BingoGame2);