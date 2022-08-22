import React, { useState } from 'react'
import Filter from '../../Assets/filter-icon.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

import './FilterNav.css'

import Select from 'react-select';



import AnalyticsIcon from '@mui/icons-material/Analytics';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import SellIcon from '@mui/icons-material/Sell';
import GridViewIcon from '@mui/icons-material/GridView';
import ShowChartIcon from '@mui/icons-material/ShowChart';
const options = [
    { value: 'Recently Listed', label: 'Recently Listed' },
    { value: 'Ending Soon', label: 'Ending Soon' },
    { value: 'Price Low - High', label: 'Price Low - High' },
    { value: 'Price High - Low', label: 'Price High - Low' },
];
const customStyles = {
    option: (provided, state) => ({
        ...provided,
        whiteSpace: "nowrap",
        borderRadius: "10px",

    }),
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: '#000000',
        }
    },
}
function CollectionFilterNav({ showFilter, setShowFilter, execute }) {

    const [showSort, setShowSort] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [firstDropDown, setFirstDropDown] = useState(false);
    const [secondDropDown, setSecondDropDown] = useState(false);
    const [thirdDropDown, setThirdDropDown] = useState(false);
    const [fourthDropDown, setFourthDropDown] = useState(false);
    const [collectionenable, setcollectionenable] = useState(false);
    const [usd, setusd] = useState('');
    const [minusd, setminusd] = useState(0);
    const [maxusd, setmaxusd] = useState(0);
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


    const handleShowFilter = () => {
        setShowFilter(!showFilter)
    }


    const handleSort = () => {
        setShowSort(!showSort)
    }
    return (
        <div className='container-fluid filter_nav_container2' >
            <div className='row filterNavRow'>
                <div className='col-sm-1'></div>

                <div className='col-md-12 col-lg-12 col-sm-10 filterSearchContainer'>
                    <div onClick={handleShowFilter} className='filterIcon'>

                        <img src={Filter} alt='filter-icon' />
                    </div>
                    <div className='searchBar'>
                        <div className="filtersearchbar_container">
                            <div className="search">
                                <input className="filtersearchbar" onChange={(e) => execute('search', e.target.value)} placeholder="Search" type="text" name="txtBox" />
                                <button className="search_btn">
                                    <SearchIcon color="action" class="search_icon"></SearchIcon>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='sortBy_btn_container'>
                        <select
                            class="form-select sortSelection"
                            id="exampleFormControlSelect1"
                            onChange={(e) =>{setShowFilter(false); execute('select', e.target.value)}}
                        >
                            <option value="" selected disabled>Sort by</option>
                            <option value="Recently Listed">Recently Listed</option>
                            <option value="Ending Soon">Ending Soon</option>
                            <option value="Price Low - High">Price Low - High</option>
                            <option value="Price High - Low">Price High - low</option>
                            {/* <option value="Most Favourited">Most Favourited</option> */}
                        </select>
                    </div>

                </div>
                <div className='col-sm-1'></div>

            </div>
            <div className='row filterRow'>
                {showFilter ? (<>
                    <div className=" container-fluid filterOtpions_container">
                        <div className="row dropdownRow">
                            <div className="col-2 icon">

                            </div>
                            <div className="col-8 filtertext">
                                Filters
                            </div>
                            <div onClick={handleShowFilter} className="col-2 downIcon">
                                <ArrowBackIcon />
                            </div>

                        </div>
                        <div onClick={handleSecond} className={secondDropDown ? "row dropdownRow statusdropDown_active my-3" : "row dropdownRow statusdropDown my-3"}>
                            <div className="col-2 icon">
                                <SellIcon />
                            </div>
                            <div className="col-8 text">
                                Network Type
                            </div>
                            <div className="col-2 downIcon">
                                <KeyboardArrowDownIcon />
                            </div>

                        </div>
                        <div className={secondDropDown ? "dropDown_content PricedropDown_content_active container-fluid " : " dropDown_content PricedropDown_content container-fluid"} >
                            <select
                                class="form-select mt-3"
                                id="exampleFormControlSelect1"
                                onChange={((e) =>{setShowFilter(false); execute('usd', e.target.value)})}
                            >
                                <option value="" selected disabled>Select Chain</option>
                                <option value={'Ethereum'}>Ethereum</option>
                                <option value={'BSC SmartChain'}>BSC Smart Chain</option>
                                <option value={'Polygon'}>Polygon</option>
                            </select>
                        </div>
                    </div>
                </>) : ("")}
            </div>
        </div>
    )
}

export default CollectionFilterNav