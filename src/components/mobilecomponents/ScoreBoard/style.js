import Styled from "styled-components";

const BoardWrapper = Styled.section`
background-color: #17181a;
margin-top: -1px;

.details{
    padding: 0 15px 48px;
    .active{
        h3{
            font-weight: 700;
            color: #fb6e00;
            padding-bottom: 15px;
            font-family: "Poppins", sans-serif;
            font-size: 16px;
            line-height: 20px;
            margin:0;
            
        }
        .border-line{
            border-bottom: 1px solid #fb6e00;
            width: 120px;
            
        }
    }
    a{
        text-decoration: none;
        color: #f2f2f2;
    }
}

.taglines{
    margin-bottom: 5px;
    .border-line{
        border-top: solid 5px #fb6e00;
        width: 28px;
        border-radius: 25px;
        margin-top: 3px;
        
    }
    h2{
        font-style: italic;
        font-weight: bold;
        font-family: 'Poppins', sans-serif;
    }
    h4{
        font-size: 12px;
        line-height: 1.33;
        color: #979797;
        font-weight: 400;
        span{
        
            font-weight: bold;
            font-style: italic;
        }
    }
}  

.reto{
    .xp{
       

        h4{
            font-weight: 700;
    color: #fff;
        }
    }
}
`;

const IconsSide = Styled.div`
    text-align:center;
    border-radius: 8px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.5);
    background-color: #202124;
    padding:${props =>
      props.icons === true
        ? "36.4px 0"
        : props.icons === false && props.baseBall === true
        ? "66.3px 0"
        : "55.3px 0"};
    position: relative;
    min-height: 100%;

    img{
        display: block;
        margin: auto;
    }
`;

const Badge = Styled.div`
width: 100px;
   position:absolute;
   top:0;
   left:0;
   border-top-left-radius:5px;
   box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.5);
   background-image: linear-gradient(99deg, #e05600, #fb7b19);
   

   div {
    display:flex;
    justify-content:center;
    align-items:baseline;

    .star{
        padding:0;
        margin:0;
     font-family: Teko;
     font-size: 12px;
     font-weight: 600;
     font-stretch: normal;
     font-style: normal;
   
     letter-spacing: 0.34px;
     color: #202124;
 
    }
   }
`;

const Indicators = Styled.div`
    margin:0;
    bottom: ${props => (props.baseBall === true ? "9px" : "13px")};
    left: 42px;
    button{
        width: 10px !important;
        height: 10px !important;
        margin: 0 6px 0 0 !important;
        padding: 0 !important;
        opacity: 0.1 !important;
        background-color: #f2f2f2 !important;
        border-radius: 50px !important;
        border:1px solid #f2f2f2 !important;

        &:focus{
            box-shadow: none !important;
            outline: none !important;
        }
    }
    .active{
        opacity: 0.5 !important;
        background-color: #f2f2f2 !important;
    }
`;

const EndTag = Styled.div`

position:absolute;
bottom:10px;
left:16px;


`;

const Data = Styled.div`
    height:${props =>
      props.secondShow === true && props.baseBall === true
        ? "248px"
        : "227px"} ;
    border-radius: 8px;
    box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.5);
    background-color: #202124;
    padding: 17px 14px 8px 14px;
     border-top-right-radius: 0;
    border-bottom-right-radius: 0;
   h2{
       margin-top:${props => (props.topSpace ? "0px" : "5px")};
       font-size: 18px;
       font-weight: 600;
       color: #8cc2ff;
       font-family: 'Poppins', sans-serif;
       margin-bottom: 2px;
   }
   .point{
       p{
           text-align: end;
           margin-right: 18px;
       }
       h3{
           font-weight: 600;
           margin: 3px 0 0;
           padding: 3px 40px 4px 10px;
           border-radius: 6px;
           border: solid 1px #fb6e00;
           background-color: rgba(251, 110, 0, 0.1);
           width: 50px;
           float: right;
       }
   }
    h4{
        font-weight: bold;
         letter-spacing: 1px;
        color: #688fbd;
    }
    .roger{
        p{
            display: flex;
            align-items: center;
            margin-top: 3px;

            img{
                margin-right: 8px;
                width:20px;
            }
        }

        h4 {
            font-family: Poppins;
  font-size: 12px;
            font-weight: bold;
  letter-spacing: 1px;
  color: #688fbd;
        }
    }

`;

const FieldText = Styled.div`
     text-align:center;
     margin: 10px 0 8px 0;
     padding: 4px 0 4px 0px;
     border-radius: 6px;
     background-color: rgba(255, 255, 255, 0.05);
     h4{
        font-weight: 700;
        margin:0;
        color: ${props => props.fieldColor};
    }


`;

const Table = Styled.table`
   width:100%;
   margin-top:10px;


     th {
        font-family: Poppins;
        font-size: 12px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.42;
        letter-spacing: normal;
        color: #688fbd;
     }

     tbody {
       
        tr {
            td {
                font-family: Poppins;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.42;
  letter-spacing: normal;
  color: #979797; 
            }
        }

     }



`;

const ImageHolder = Styled.div`
   text-align:center;
img{
    
    width:100%;
    height:128px;
    object-fit:cover;
    object-position:center;
}

div {
    position: absolute;
    top: 44%;
    bottom: 0;
    right: 0;
    left: 0;

    button {
        padding: 8px 45px 7px;
        opacity: 0.8;
        border: solid 1px #ffffff;
        background-color: #041838;
        font-family: Montserrat;
  font-size: 10px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
    }


}
 



`;

export {
  BoardWrapper,
  IconsSide,
  Badge,
  Indicators,
  EndTag,
  Data,
  FieldText,
  Table,
  ImageHolder,
};
