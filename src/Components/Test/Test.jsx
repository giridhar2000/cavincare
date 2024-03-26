import React, { useEffect, useState } from 'react'
import "../FilterCount/Filter.css"
import ManLogo from "../../assets/ManStandLogo.svg"
import { Space, Table, Tag, Select, Result, notification } from 'antd';
import EligibleCount from "../../assets/eligibleCount.svg"
import Maximize from "../../assets/MaximizeIcon.svg"
import { useNavigate } from 'react-router-dom'
import getFilterData, { getFilteredData } from '../../Service/optionsData'
import axios from 'axios'
import { BorderTopOutlined, SearchOutlined } from '@ant-design/icons'
import Minimize from "../../assets/Minimize.svg"
import CustomerData from '../../CustomerInfo.customer.json'

const Test = () => {
  const [gender, setGender] = useState(false);

  useEffect(() => {
    const data = CustomerData.map(value => value)
    console.log("data", data)
  }, [])

  return (
    <div className='filter'>
      <div className='filterForm mainForm'>
        <div className='filterFormTitle'>
          <h2 style={{ margin: 0 }}>Filter Details </h2><hr />
        </div>
        <div className='filterFormBody'>
          <div className='filterFormImg'>
            <img src={ManLogo} alt='man' />
          </div>
          <div className='form-group'>
            <div className='filterFormData filter-bg'>

              <div className='form'>
                <span>Gender</span>
                <label>Minimum Age</label>
                <label>Zone</label>
                <label>State</label>
                <label>City</label>
                <label>SEC</label>
                <label>Total Completes Required</label>
              </div>

              <div className='form'>

                <div className='genders' >
                  <div className='genderClass'>
                    <input name='gender' type='radio' id='Male' />
                    <label htmlFor='male'>Male</label>
                  </div>

                  <div className='genderClass'>
                    <input name='gender' type='radio' id='Female' />
                    <label htmlFor='female'>Female</label>
                  </div>

                  <div className='genderClass'>
                    <input name='gender' type='radio' id='Both' />
                    <label htmlFor='both'>Both</label>
                  </div>
                </div>
                <div className='ageForm'>

                  <input className='ageInput' />

                  <label> Maximum Age </label>
                  <input className='ageInput' />

                </div>

                <Select
                  placeholder="Select Zone"
                // value={selectedZone}
                // onChange={handleZoneChange}
                // options={zoneOptions}
                />

                <Select
                  placeholder="Select State"
                // value={selectedState}
                // onChange={handleStateChange}
                // options={stateOptions}
                />

                <Select
                  placeholder="Select City"
                // value={selectedCity}
                // onChange={handleCityChange}
                // options={cityOptions}
                />

                <Select
                  placeholder="Select SEC"
                // value={selectedSEC}
                // onChange={handleSECChange}
                // options={secOptions}
                />


                <input className='formInput' type='text' />
              </div>
            </div>
            <div className='filterGenderData filter-bg gray-bg'>
              <div className='form'>
                <label>Gender(both)</label>
                <label>Male</label>
                <label>Female</label>
                <label>Total</label>
              </div>
              <div className='form'>
                <Select
                  placeholder="Select Zone"
                // value={selectedZone}
                // onChange={handleZoneChange}
                // options={zoneOptions}
                />
                <input className='formInput' type='text' disabled={!gender} />
                <input className='formInput' type='text' />
                <label>100%</label>
              </div>
            </div>

            <div className='filterGenderData filter-bg gray-bg'>
              <div className='form'>
                <div>
                  <label className='form-label'>Age&#40;18 - 44&#41;</label>
                </div>
                <div>
                  <input className='formInput' type='text' style={{ width: "25%" }} onChange={(e) => handleSAgeChange(e)} />&nbsp; - &nbsp;
                  <input className='formInput' type='text' style={{ width: "25%" }} onChange={(e) => handleLAgeChange(e)} />&nbsp;
                </div>
                <div>
                  <input className='formInput' type='text' style={{ width: "25%" }} />&nbsp; - &nbsp;
                  <input className='formInput' type='text' style={{ width: "25%" }} />&nbsp;
                </div>
                <div>
                  <input className='formInput' type='text' style={{ width: "25%" }} />&nbsp; - &nbsp;
                  <input className='formInput' type='text' style={{ width: "25%" }} />&nbsp;
                </div>
                <label>Total</label>
              </div>
              <div className='form'>
                <Select
                  placeholder="Select Zone"
                // value={selectedZone}
                // onChange={handleZoneChange}
                // options={zoneOptions}
                />
                <input className='formInput' type='text' />
                <input className='formInput' type='text' />
                <input className='formInput' type='text' />
                <label>100%</label>
              </div>
            </div>
          </div>




        </div>

        <div className='btnAlign'>
          {/* {isVisible && */}
          <button className='clearBtn'>Clear</button>
          {/* } */}
          <button className='btnStyle'>Continue</button>
        </div>

      </div>
      <div className='filterForm filtered'>
        <div className='filterFormHeader'>
          {/* <img src={EligibleCount} alt='countImage' /> */}
          <h2>Eligible Count</h2>
        </div>
        <div className='filteredDataBody'>
          <div className='content'>
            <div className='filteredDataContent'>
              <span>Wanted Completes</span>
              {/* {isVisible ?
                <span>{completes}</span> : <span> -- </span>
              } */}
            </div><hr />
            <div className='filteredDataContent'>
              <span>Eligible Completes</span>
              {/* {isVisible ?
                <span>{filteredData.length}</span> : <span> -- </span>
              } */}
            </div>
          </div>
          <hr />
          {/* {!isVisible ? */}
          <div className='resultsHere'>Results will be displayed here</div>
          {/* : */}
          {/* <div style={{ width: '100%' }}>
              <div className='tableHeader'>
                <span>Results</span>
                <img src={Maximize} alt='countImage' onClick={handleMaximize} style={{ cursor: 'pointer' }} />
              </div>
              <Table columns={columns} pagination={{
                pageSize: 2,
                showSizeChanger: false,
                showLessItems: true,
              }}
                dataSource={data} />
              <button className='sendBtn'>Send Notification</button>
            </div>
          } */}

        </div>
      </div>
    </div>
  )
}

export default Test