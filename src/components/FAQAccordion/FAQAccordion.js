import React from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FilterListIcon from '@mui/icons-material/FilterList';
import SellIcon from '@mui/icons-material/Sell';
import GridViewIcon from '@mui/icons-material/GridView';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import plusIcon from "../../Assets/plus-icon.png";
import faq1 from "../../Assets/faq1.png";
import faq2 from "../../Assets/faq2.png";

import './FAQAccordion.css'

function FAQAccordion() { 
  return (
    <div>
        <div class="accordion faqAccordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item faqAccordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed first " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        <div className='row'>
        
          <div className="col-8 faqtext">
          Who is Indigena ?
          </div>
          {/* <div className="col-2 icon">
          <img src={plusIcon} alt='faq-plus-icon'/>
          </div> */}
        </div>
      </button> 
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body faqAccordion_body">Indigena is a group comprised of distinctive Indigenous backgrounds from across the globe coming together as one.
made by indigenous for indigenous people.</div>
    </div>
  </div>
  <div class="accordion-item faqAccordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed first " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        <div className='row'>
        
          <div className="col-8 faqtext">
          What is Indigena ? 
          </div>
          {/* <div className="col-2 icon">
          <img src={plusIcon} alt='faq-plus-icon'/>
          </div> */}
        </div>
      </button> 
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body faqAccordion_body">A community/ eco-system for indigenous people with true ownership of your own content and governance power over INDI ECOSystem with INDI Token
Indigena is an ecosystem that we can use to thrive on the blockchain. It is important to understand the
difference between INDI and Indigena,
Indi is the governance token of the Indigena eco-system.
Indigena was created to encourage positive changes and democratize Cultural preservation.</div>
    </div>
  </div>
  <div class="accordion-item faqAccordion-item">
    <h2 class="accordion-header" id="flush-headingThree">
      <button class="accordion-button collapsed first " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        <div className='row'>
        
          <div className="col-8 faqtext">
          Solutions we provide
          </div>
          {/* <div className="col-2 icon">
          <img src={plusIcon} alt='faq-plus-icon'/>
          </div> */}
        </div>
      </button> 
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body faqAccordion_body"><div>
        </div><p>Culturally safe spaces to nurture indigenous participation in decentralised marketplace. Therefore increasing ownership, passing down of indigenous practices/knowledge (language and cultural preservation)
For indigenous artists, content providers & Iwi/Tribes to maintain cultural integrity</p>
<ul className='solutionsList'>
  <li>#1 Exploitation of Indigenous artist
    <ul>
      <li>Eliminating carpetbagging</li>
      <li>Eliminating third parties</li>
    </ul>
  </li>
  <li>#2 language & cultural preservation
    <ul>
      <li>Restoring love and integrity to our cultures</li>
      <li>Empowering the next generations</li>
    </ul>
  </li>
  <li>#3 Artist empowerment
    <ul>
      <li>Giving power back to the artist</li>
    </ul>
  </li>
  <li>#4 Blockchain Education <ul>
    <li>Teaching our fellow indigenous people how to use and navigate the world of blockchain</li>
    </ul></li>
  <li> #5 Friendly U.I for all ages</li>
  </ul></div>
    </div>
  </div>
  {/* <div class="accordion-item faqAccordion-item">
    <h2 class="accordion-header" id="flush-headingFour">
      <button class="accordion-button collapsed first " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
        <div className='row'>
        
          <div className="col-8 faqtext">
          is indigena linked with ripple or flare network
          </div>
          
        </div>
      </button> 
    </h2>
    <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body faqAccordion_body">Not yet. we are an independent team that want to merge Indigenous and
blockchain.</div>
    </div>
  </div> */}
  <div class="accordion-item faqAccordion-item">
    <h2 class="accordion-header" id="flush-headingFive">
      <button class="accordion-button collapsed first " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
        <div className='row'>
        
          <div className="col-8 faqtext">
          What makes us unique?

          </div>
          {/* <div className="col-2 icon">
          <img src={plusIcon} alt='faq-plus-icon'/>
          </div> */}
        </div>
      </button> 
    </h2>
    <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body faqAccordion_body">A platform specifically designed for Indigenous by Indigenous.
Indigena NFT marketplace is our Gateway to the evolving technology of
Blockchain, allowing our users to freely upload their content to the marketplace
and verifying their ownership on multiple blockchains.
A marketplace that is easy for all our users to access & use with a low barrier to
entry with multilingualism options.</div>
    </div>
  </div>
  <div class="accordion-item faqAccordion-item">
    <h2 class="accordion-header" id="flush-headingSix">
      <button class="accordion-button collapsed first " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
        <div className='row'>
        
          <div className="col-8 faqtext">
          Language barrier

          </div>
          {/* <div className="col-2 icon">
          <img src={plusIcon} alt='faq-plus-icon'/>
          </div> */}
        </div>
      </button> 
    </h2>
    <div id="flush-collapseSix" class="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body faqAccordion_body">Indigena Market will provide translations into the main Indigenous Language
groups. each regions and cultures as we further grow our operations globally
. <br/> Currently there is over 7,000 Indigenous Languages worldwide.</div>
    </div>
  </div>
  <div class="accordion-item faqAccordion-item">
    <h2 class="accordion-header" id="flush-headingSeven">
      <button class="accordion-button collapsed first " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
        <div className='row'>
        
          <div className="col-8 faqtext">
          Fees
          </div>
          {/* <div className="col-2 icon">
          <img src={plusIcon} alt='faq-plus-icon'/>
          </div> */}
        </div>
      </button> 
    </h2>
    <div id="flush-collapseSeven" class="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body faqAccordion_body">Indigena Market wants to become environmentally conscious by going green and eliminating gas fees. Therefore we will beadding blockchains that will be suitable for our vision.
has low gas or zero gas fees <br/> As we begin with the 3 most popular chains in ETH, POLY, Binance
We will continue to grow and add more chains in the future to fit our vision <br/>  <br/> Chains in the future will be<br/>  XRPL <br/> ALGO <br/>  XLM <br/> ADA
.</div>
    </div>
  </div>
  <div class="accordion-item faqAccordion-item">
    <h2 class="accordion-header" id="flush-headingEight">
      <button class="accordion-button collapsed first " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight">
        <div className='row'>
        
          <div className="col-8 faqtext">
          where can we buy indi tokens
          </div>
          {/* <div className="col-2 icon">
          <img src={plusIcon} alt='faq-plus-icon'/>
          </div> */}
        </div>
      </button> 
    </h2>
    <div id="flush-collapseEight" class="accordion-collapse collapse" aria-labelledby="flush-headingEight" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body faqAccordion_body"><div className='howToBuyINDI'><h5>How to  buy INDI</h5>
      <h6>SOLOGENIC</h6>
      <div className='overflowContain'>Go to 
       <a className='contactURLs' href='https://sologenic.org/trade?market=XRP%2F494E444900000000000000000000000000000000%2Br3Uqw95RzBpcFCSVNphAgWWhjsQTxG5xvV&fbclid=IwAR1UuWoqUh9Vdb_u4x6h_b48xicwClw_l8943ETgB38Twi080NQBZ21OHDw&network=mainnet' target='_blank'>Sologenic</a> 
      </div>
        <br/>
        <h5>XUMM</h5>
        <p >Step 1: 1. Install XUMM wallet</p>
        <span>Deposit XRP in your XUMM wallet (10 for the activation of your wallet, and 2 for the trustline)</span>

        <div className='overflowContain'>Go to this link & Set Trustline -
          <a className='contactURLs' href='https://xrpl.services/?issuer=r3Uqw95RzBpcFCSVNphAgWWhjsQTxG5xvV&currency=494E444900000000000000000000000000000000&limit=60000000000&fbclid=IwAR2w_JT4Q0SEzsB9fY3kUdJI3LkCbqw4NEXT1jxJbK1IoRjWQzXnBuAUNMU'>Set Trustline</a>
          </div>
        <span>Connect your XUMM wallet & buy your INDI.</span>
<h5>XRPTOOLKIT</h5>
<p>Step 2: How to buy INDI via XRPtoolkit using a mobile browser and XUMM:</p>
<span>Visit https://www.xrptoolkit.com/</span>
<p>Tap the three lines in the top left corner</p>
<span>Tap "Connect Wallet"</span>
<p>Under "Select wallet type" tap "Xumm App"</p>
<span>Tap the blue button that says "Open XUMM"</span>
<p>Slide to accept that you want to add it and tap the "Close" button after it completes</p>
<span>Tap the three lines again at the top left corner</span>
<p>Click the "Trade" option</p>
<span>On the top of the screen, tap "XRP-USD" (this is the trading pair) 10. Tap "Switch"</span>
<p>Change the Base to INDI 12. Make the keyboard disappear: tap Done on the keyboard for iOS 13. Tap anywhere in the empty gray space to get the currency pair window to disappear 14. From here you can place buy limits or buy at the current market price. Sometimes buying at the current market price fails, so you will have to
set a 'insta-fill' buy limit</p>
        </div></div>
    </div>
  </div>
  <div class="accordion-item faqAccordion-item">
    <h2 class="accordion-header" id="flush-headingNine">
      <button class="accordion-button collapsed first " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseNine" aria-expanded="false" aria-controls="flush-collapseNine">
        <div className='row'>
        
          <div className="col-8 faqtext">
         Future Operations
          </div>
          {/* <div className="col-2 icon">
          <img src={plusIcon} alt='faq-plus-icon'/>
          </div> */}
        </div>
      </button> 
    </h2>
    <div id="flush-collapseNine" class="accordion-collapse collapse" aria-labelledby="flush-headingNine" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body faqAccordion_body"><img src={faq1} alt='faq-1-img' className='faq-1-img'/></div>
    </div>
  </div>
  <div class="accordion-item faqAccordion-item">
    <h2 class="accordion-header" id="flush-headingTen">
      <button class="accordion-button collapsed first " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTen" aria-expanded="false" aria-controls="flush-collapseTen">
        <div className='row'>
        
          <div className="col-8 faqtext">
          What is indi labs
          </div>
          {/* <div className="col-2 icon">
          <img src={plusIcon} alt='faq-plus-icon'/>
          </div> */}
        </div>
      </button> 
    </h2>
    <div id="flush-collapseTen" class="accordion-collapse collapse" aria-labelledby="flush-headingTen" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body faqAccordion_body">
        <h5>This is Indigena's Non profit</h5>
        <h6>Indi Lab will be tasked with all the community interaction, participation & charitable projects. </h6>
        <p>Indi Labs will provide educational courses</p>
        <span>Another aim of Indi lab is to collaborate with remote communities, Youth centers & Iwis/Tribes. we will help to set up programs at these venues</span>
        <br/>
        <h5>Charitable Projects</h5>
        <p>All INDI token Holders will be able to vote on the charitable project Indi labs should tackle</p>
        <p>Projects can range from</p>
        <ul className='solutionsList'>
          <li>Replanting of Trees/conservation</li>
          <li>Beach Cleanups/ocean relief</li>
          <li>Community support</li>
          <li> Donations</li>
          <li> Animal Rights</li>
          <li>and many more for our Indi holders to vote on!</li>
        </ul>
        <img src={faq2} alt='faq-2' className='faq-2-img'/>
        </div>
    </div>
  </div>
  <div class="accordion-item faqAccordion-item">
    <h2 class="accordion-header" id="flush-headingEleven">
      <button class="accordion-button collapsed first " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEleven" aria-expanded="false" aria-controls="flush-collapseEleven">
        <div className='row'>
        
          <div className="col-8 faqtext">
          INDI Labs Developers Program
          </div>
          {/* <div className="col-2 icon">
          <img src={plusIcon} alt='faq-plus-icon'/>
          </div> */}
        </div>
      </button> 
    </h2>
    <div id="flush-collapseEleven" class="accordion-collapse collapse" aria-labelledby="flush-headingEleven" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body faqAccordion_body">
        <p>INDI Labs are committed to building the infrastructure required for large-scale adoption of NFTS & Cryptocurrencies on the Indigena Market
Eco-System. In the near future Indigena will introduce their very own Indigena Developer Program, funded by the INDI Community Fund
(ICF), allows developers to get involved in the Indigena ecosystem while taking on technological challenges to enhance their skills.
Developers around the world are encouraged to join the Indigena Developer Program to help create exciting new projects on the XRP
Ledger.
</p>
<h6>Roles INDI labs will be hiring for in the near future</h6>
<ul className='INDI_HIRING'>
  <li>-Web 3.0 Based Developers</li>
  <li>-Blockchain Developers</li>
  <li>-Debug Coder</li>
  <li>-U.X designer</li>
  <li>-Marketing team</li>
  <li>-Community based Teachers</li>
  <li>-Language Translator</li>
</ul>
        </div>
    </div>
  </div>
  <div class="accordion-item faqAccordion-item">
    <h2 class="accordion-header" id="flush-headingTwelve">
      <button class="accordion-button collapsed first " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwelve" aria-expanded="false" aria-controls="flush-collapseTwelve">
        <div className='row'>
        
          <div className="col-8 faqtext">
          Contact us
          </div>
          {/* <div className="col-2 icon">
          <img src={plusIcon} alt='faq-plus-icon'/>
          </div> */}
        </div>
      </button> 
    </h2>
    <div id="flush-collapseTwelve" class="accordion-collapse collapse" aria-labelledby="flush-headingTwelve" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body faqAccordion_body">
        <h5>You can contact us on our social pages</h5>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a className='contactURLs' href='https://twitter.com/INDICoin2' target='_blank'>Twitter</a></td>
            </tr>
            <tr>
              <td><a className='contactURLs' href='https://www.facebook.com/INDICoin2/' target='_blank'>Facebook</a></td>
            </tr>
            <tr>
              <td><a className='contactURLs' href='https://discord.com/invite/Zxn2kmaMEM' target='_blank'>Discord</a></td>
            </tr>
            <tr>
              <td><a className='contactURLs' href='https://t.me/+rfrb4HsBkU8wM2Nl' target='_blank'>Telegram</a></td>
            </tr>
          </tbody>
        </table>
        </div>
    </div>
  </div>
  
</div>
    </div>
  )
}

export default FAQAccordion