import React,{ useState } from 'react'
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
  // { value: 'Most Favourited', label: 'Most Favourited' },
];
const customStyles = {
    option: (provided, state) => ({
      ...provided,
     whiteSpace:"nowrap",
     borderRadius:"10px",

    }),
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: '#000000',
        }
    },
    // control: (provided, state) => ({
    //     ...provided,
    //     boxShadow: "none",
    //     border: state.isFocused && "none"
    //   }),
    //   menu: (provided, state) => ({
    //     ...provided,
    //     border: "none",
    //     boxShadow: "none"
    //   })
  }
function CollectionFilterNav({ showFilter , setShowFilter,execute }) {
    
    const[showSort,setShowSort] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const[firstDropDown,setFirstDropDown] = useState(false);
    const[secondDropDown,setSecondDropDown] = useState(false);
    const[thirdDropDown,setThirdDropDown] = useState(false);
    const[fourthDropDown,setFourthDropDown] = useState(false);
    const[collectionenable,setcollectionenable] = useState(false);
    const[usd,setusd]=useState('');
    const[minusd,setminusd]=useState(0);
    const[maxusd,setmaxusd]=useState(0);
    // if(window.location.href.includes("/UserCollection"))
    // {
    //     setcollectionenable(true)
    // }
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
   
    // const handleShowFilter = () => {
    //     setShowFilter(!showFilter)
    // }

    const handleSort = () => {
        setShowSort(!showSort)
    }
  return (
    <div className='container-fluid filter_nav_container' >
        <div  className='row filterNavRow'>
            <div className='col-sm-1'></div>
            
            <div className='col-md-12 col-lg-12 col-sm-10 filterSearchContainer'>
           <div onClick={handleShowFilter} className='filterIcon'>
                
                <img src={Filter} alt='filter-icon'/>
                </div>
                <div className='searchBar'>
                <div className="filtersearchbar_container">
                            <div className="search">
                        <input className="filtersearchbar"  onChange={(e)=>execute('search',e.target.value)}    placeholder="Search" type="text" name="txtBox" />
                        <button className="search_btn">
                        <SearchIcon color="action" class="search_icon"></SearchIcon>
                        </button>
                        </div>
                        </div>
                </div> 
                
                <div className='sortBy_btn_container'>
                    {/* <button className='filter_btns sortBy_btn'>Sort by </button>
                    {SortOptions.map((e)=> <SortAccordion id={e.id} heading={e.heading}dataBsTarget={e.collapseTarget}collapseId={e.collapseId}SortOption1={e.SortOption1}SortOption2={e.SortOption2} SortOption3={e.SortOption3} SortOption4={e.SortOption4} SortOption5={e.SortOption5}/>)} */}
                    {/* <div class="form-group">
                             
                            <select
                              class="form-select sortSelection"
                              id="exampleFormControlSelect1"
                            >
                              <option value="" selected disabled>Sort by</option>
                              <option>Recently Listed</option>
                              <option>Ending Soon</option> 
                              <option>Price Low - High</option>
                              <option>Price High - low</option>
                              <option>Most Favourited</option>
                            </select>
                            
                          </div> */}
             {/* <div className='sortBy_Container'>
                    <Select
                    placeholder={"Sort by"}
        defaultValue={selectedOption}
        onChange={(val)=>execute('select',val.value)}
        styles={customStyles} 
        options={options}
        />
                    </div> */}
                     <select
                              class="form-select sortSelection"
                              id="exampleFormControlSelect1"
                               onChange={(e)=>execute('select',e.target.value)}
                            >
                              <option value="" selected disabled>Sort by</option>
                              <option value="Recently Listed">Recently Listed</option>
                              <option value="Ending Soon">Ending Soon</option> 
                              <option value="Price Low - High">Price Low - High</option>
                              <option value="Price High - Low">Price High - low</option>
                              {/* <option value="Most Favourited">Most Favourited</option> */}
                            </select>
                </div>
                
                {/* <div className='collections_btn_container'>
                    <button className='filter_btns filterCollection_btn' onClick={()=>collectionbuttonhandle()}>Collections</button>
                </div> */}
               
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
          <ArrowBackIcon/>
          </div>
          
      </div>
      <div onClick={handleFirst} className={firstDropDown ? "row dropdownRow statusdropDown_active":"row dropdownRow statusdropDown"}>
          <div className="col-2 icon">
          <AnalyticsIcon/ >
          </div> 
          <div className="col-8 text">
              Status
          </div>
          <div  className="col-2 downIcon">
          <KeyboardArrowDownIcon   / >
          </div>
          
      </div>
      <div className={firstDropDown ? "dropDown_content StatusdropDown_content_active":"StatusdropDown_content"} >
              <button className="status_btn"  onClick={(e)=>execute('button','Fixedprice')} >Fixed Price</button>
              <button className="status_btn" onClick={(e)=>execute('button','Auction')} >Auction</button>
          </div>
      <div onClick={handleSecond} className={secondDropDown ? "row dropdownRow statusdropDown_active":"row dropdownRow statusdropDown"}>
      <div className="col-2 icon">
          <SellIcon/>
          </div>
          <div className="col-8 text">
              Price
          </div>
          <div className="col-2 downIcon">
          <KeyboardArrowDownIcon/>
          </div>
         
      </div>
      <div  className={secondDropDown ? "dropDown_content PricedropDown_content_active container-fluid":" dropDown_content PricedropDown_content container-fluid"} >
              {/* <div className="row currencyRow">
              <input type='text' className="CurrencyInput" onChange={(e)=>setusd(e.target.value)} placeholder="United States Dollar (USD)" />
              </div> */}
              <select
                              class="form-select"
                              id="exampleFormControlSelect1"
                              onChange={((e)=>setusd(e.target.value))}
                            >
                              <option value="" selected disabled>Select Chain</option>
                              <option value={'Ethereum'}>Ethereum</option>
                              <option value={'BSC SmartChain'}>BSC Smart Chain</option>
                              <option value={'Polygon'}>Polygon</option>
                            </select>
              <div className="row minRow">
                  <div className="col-lg-1 col-md-1 col-1"></div>
                 <div className="col-lg-4 col-md-4 col-4">
                  <input type='text' className="sortInput" onChange={(e)=>setminusd(e.target.value)} placeholder="Min" />
                  </div> 
                 
                  <div className="col-lg-2 col-md-2 col-2">
                  <span>To</span>
                  </div>
                  <div className="col-lg-4 col-md-4 col-4">
                  <input type='text' className="sortInput" onChange={(e)=>setmaxusd(e.target.value)} placeholder="Max" />
                  </div>
                  <div className="col-lg-1 col-md-1 col-1"></div>
              
              
              </div>
              <button className="filterapply_btn" onClick={()=>execute('usd',usd,minusd,maxusd)}>Apply</button>
          </div>
      <div onClick={handleThird} className={thirdDropDown ? "row dropdownRow filedropDown_active":"row dropdownRow filedropDown"}>
      <div className="col-2 icon">
          <GridViewIcon/>
          </div>
          <div className="col-8 text">
              Files Type
          </div>
          <div className="col-2 downIcon">
          <KeyboardArrowDownIcon/>
          </div>
          
      </div>
      <div className={thirdDropDown ? "dropDown_content FiledropDown_content_active ":" dropDown_content FiledropDown_content "} >
             <input type='radio' id="image"  value='Image' onClick={(e)=>execute('type','image')} name="file"/>
             <label for='image'>Image</label> 
             <input type='radio' id="Video" value='Video' onClick={(e)=>execute('type','video')} name="file"/>
             <label for='Video'>Video</label> 
             <input type='radio' id="Audio" value='Audio' onClick={(e)=>execute('type','audio')} name="file"/>
             <label for='Audio'>Audio</label> 
             
          </div>
      <div onClick={handleFourth} className={fourthDropDown ? "row dropdownRow saledropDown_active":"row dropdownRow saledropDown"}>
      <div className="col-2 icon">
          <ShowChartIcon/>
          </div>
          <div className="col-8 text">
              On Sale In
          </div>
          <div className="col-2 downIcon">
          <KeyboardArrowDownIcon/>
          </div>
         
      </div> 
     <div className={fourthDropDown ? "dropDown_content StatusdropDown_content_active":"StatusdropDown_content"} >
              <button className="status_btn" onClick={(e)=>execute('onsale','yes')} >Yes</button>
              <button className="status_btn"  onClick={(e)=>execute('onsale','no')}>No</button>
          </div> 
      </div>
        </>) : ("")}
        </div>
    </div>
  )
}

export default CollectionFilterNav