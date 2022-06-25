import React, { useState } from "react";
import './MenuBoardDropDown.css'
import dropDownIcon from '../../Assets/Icon-arrow-dropdown.png'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FilterListIcon from '@mui/icons-material/FilterList';
import SellIcon from '@mui/icons-material/Sell';
import GridViewIcon from '@mui/icons-material/GridView';
import ShowChartIcon from '@mui/icons-material/ShowChart';

function MenuBoardDropDown({ showFilter , setShowFilter }) {
    const[firstDropDown,setFirstDropDown] = useState(false);
    const[secondDropDown,setSecondDropDown] = useState(false);
    const[thirdDropDown,setThirdDropDown] = useState(false);
    const[fourthDropDown,setFourthDropDown] = useState(false);
    const[fifthDropDown,setFifthDropDown] = useState(false);

    const handleFirst = () => {
        setFirstDropDown(!firstDropDown)
    }
    const handleSecond = () => {
        setSecondDropDown(!secondDropDown)
    }
    const handleThird = () => {
        setThirdDropDown(!thirdDropDown)
    }
    const handleFourth = () => {
        setFourthDropDown(!fourthDropDown)
    }
    const handleFifth = () => {
        setFifthDropDown(!fifthDropDown)
    }

    const handleShowFilter = () => {
        setShowFilter(!showFilter)
    }

  return (
    <div className=" container-fluid menuBoardfilterOtpions_container">
      {/* <div className="row dropdownRow">
          <div className="col-2 icon">
        
          </div>
          <div className="col-8 filtertext">
              Filters
          </div>
          <div onClick={handleShowFilter} className="col-2 downIcon">
          <ArrowBackIcon/>
          </div>
          
      </div> */}
      <div onClick={handleFirst} className={firstDropDown ? "row dropdownRow firstdropDown_active":"row dropdownRow firstdropDown"}>
          <div className="col-2 icon">
          <InsertDriveFileIcon/>
          </div>
          <div className="col-8 text">
              Description
          </div>
          <div  className="col-2 downIcon">
          {/* <KeyboardArrowDownIcon/> */}
          <img src={dropDownIcon} />
          </div>
          <div className={firstDropDown ? "menuBoarddropDown_content firstdropDown_content_active":"firstdropDown_content"} >
              <p>"Fragile II" is the original oil painting in size 30x30cm. If you are interested in a physical version of this painting, please contact me.</p>
          </div>
      </div>
      <div onClick={handleSecond} className={secondDropDown ? "row dropdownRow firstdropDown_active":"row dropdownRow firstdropDown"}>
      <div className="col-2 icon">
          <FormatListBulletedIcon/>
          </div>
          <div className="col-8 text">
              Properties
          </div>
          <div className="col-2 downIcon">
          {/* <KeyboardArrowDownIcon/> */}
          <img src={dropDownIcon} />
          </div>
          <div  className={secondDropDown ? "menuBoarddropDown_content seconddropDown_content_active container-fluid":" dropDown_content seconddropDown_content container-fluid"} >
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>
      </div>
      <div onClick={handleThird} className={thirdDropDown ? "row dropdownRow thirddropDown_active":"row dropdownRow thirddropDown"}>
      <div className="col-2 icon">
          <GridViewIcon/>
          </div>
          <div className="col-8 text">
              NFT Type
          </div>
          <div className="col-2 downIcon">
          {/* <KeyboardArrowDownIcon/> */}
          <img src={dropDownIcon} />
          </div>
          <div className={thirdDropDown ? "menuBoarddropDown_content thirddropDown_content_active ":" dropDown_content thirddropDown_content "} >
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
velit esse cillum dolore eu fugiat nulla pariatur.</p>
             
          </div>
      </div>
      <div onClick={handleFourth} className={fourthDropDown ? "row dropdownRow fourthdropDown_active":"row dropdownRow fourthdropDown"}>
      <div className="col-2 icon">
          <ShowChartIcon/>
          </div>
          <div className="col-8 text">
             About Creator
          </div>
          <div className="col-2 downIcon">
          {/* <KeyboardArrowDownIcon/> */}
          <img src={dropDownIcon} />
          </div>
          <div className={fourthDropDown ? "menuBoarddropDown_content firstdropDown_content_active":"firstdropDown_content"} >
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>
      </div>
      <div onClick={handleFifth} className={fifthDropDown ? "row dropdownRow fourthdropDown_active":"row dropdownRow fourthdropDown"}>
      <div className="col-2 icon">
          <ShowChartIcon/>
          </div>
          <div className="col-8 text">
             Details
          </div>
          <div className="col-2 downIcon">
          {/* <KeyboardArrowDownIcon/> */}
          <img src={dropDownIcon} />
          </div>
          <div className={fifthDropDown ? "menuBoarddropDown_content firstdropDown_content_active":"firstdropDown_content"} >
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>
      </div>
      </div>
 
  );
}

export default MenuBoardDropDown;
