import React, { useEffect, useState, useReducer } from 'react'
import "../FilterCount/Filter.css"
import ManLogo from "../../assets/ManStandLogo.svg"
import { Space, Table, Tag, Select, Result, notification } from 'antd';
import EligibleCount from "../../assets/eligibleCount.svg"
import Maximize from "../../assets/MaximizeIcon.svg"
import { useNavigate } from 'react-router-dom'
// import getFilterData, { getFilteredData } from '../../Service/optionsData'
import axios from 'axios'
import { BorderTopOutlined, SearchOutlined } from '@ant-design/icons'
import Minimize from "../../assets/Minimize.svg"
// import { filterJson } from '../../Service/dummyData';
import CustomerData from '../../CustomerInfo.customer.json'
import OptionsData from '../../optionsData.json'

function filterReducer(state, action) { 
    switch (action.type) {
        case 'genderFilter':
            const { result, genderFilter } = action.payload
            const malePercentage = Math.ceil(result.length * (genderFilter.male / 100));
            const femalePercentage = Math.ceil(result.length * (genderFilter.female / 100));
            const male = result.filter((value, index) => value.gender === 'male').map(value => value).slice(0, malePercentage)
            const female = result.filter((value, index) => value.gender === 'female').map(value => value).slice(0, femalePercentage)
            return male + female

        case 'ageFilter':
            //api call
            return action.payload

        case 'noFilter':
            return action.payload

    }
    throw Error('Unknown action: ' + action.type);
}
function filter() {
    const [optionsData, setOptionsData] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedSEC, setSelectedSEC] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [completes, setCompletes] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [ageList, setAgeList] = useState([]);
    const [gender, setGender] = useState([])
    const [dataTable, setDataTable] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [genderFilter, setGenderFilter] = useState(true);
    const [filteredData, filterDataDispatch] = useReducer(filterReducer, []);

    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Fields are missing',
            duration: 3,
        });
    };

    const [searchVal, setSearchVal] = useState();
    const [searchData, setSearchData] = useState([]);
    const dataColumns = [
        {
            title: 'UNIQUE ID',
            dataIndex: 'uniqueID',
            key: 'uniqueID',
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'GENDER',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'AGE',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'SEC',
            dataIndex: 'sec',
            key: 'sec',
        },
        {
            title: 'ZONE',
            dataIndex: 'zone',
            key: 'zone',
        },
        {
            title: 'STATE',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'CITY',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'CATEGORY/PRODUCT USAGE',
            dataIndex: 'categoryProductUsage',
            key: 'categoryProductUsage',
        },
        {
            title: 'ECOM/SHOPPER?',
            dataIndex: 'ecomShopper',
            key: 'ecomShopper',
            render: (ecomShopper) => (
                <span style={{ color: ecomShopper === 'Yes' ? 'rgba(107, 203, 82, 1)' : 'rgba(231, 85, 74, 1)' }} >
                    {ecomShopper.toUpperCase()}
                </span>
            )
        },
    ];

    const handleSubmit = async () => {
        // if (minAge && maxAge && selectedGender && selectedZone && selectedState && selectedCity && selectedSEC && completes) {
        //     setIsVisible(true);
        //     const result = CustomerData.filter(value => value.age >= minAge && value.age <= maxAge && value.zone === selectedZone && value.gender === selectedGender && value.state === selectedState && value.city === selectedCity && value.sec === selectedSEC).map(val => val)
        //     if (!genderFilter) {
        //         filterDataDispatch({ type: 'genderFilter', payload: {data: result, genderFilter: gender} })
        //     }
        //     else if (ageList !== null || ageList !== undefined) {
        //         filterDataDispatch({ type: 'ageFilter', payload: result + ageList })
        //     }
        //     else {
        //         filterDataDispatch({ type: 'noFilter', payload: result })
        //     }
        //     console.log(result)
        //     // const result = await getFilteredData(minAge, maxAge, selectedGender, selectedZone, selectedState, selectedCity, selectedSEC, completes)
        //     // setFilteredData(result);
        //     // setFilteredData(result)

        //     //     // if (ageList[0].minAge > 0) {
        //     //     //     // const finalResult = result.filter((value) => value.age >= ageList.minAge && value.age <= ageList.maxAge).map((values, i) => values);
        //     //     //     // const elementsToFilter = Math.ceil(result.length * (ageList.percentage / 100));
        //     //     //     // const finalFilterData = finalResult.slice(0, elementsToFilter);
        //     //     //     // console.log(finalFilterData)
        //     //     //     setFilteredData(result , ageList)
        //     //     //     console.log(filteredData)
        //     //     // }
        // }
        // else {
        //     openNotificationWithIcon('error')
        // }
        console.log(gender);
    }
    

    const handleClear = () => {
        setSelectedZone(null);
        setSelectedState(null);
        setSelectedCity(null);
        setSelectedSEC(null);
        setMinAge('');
        setMaxAge('');
        setCompletes('');
        setSelectedGender('');
        setIsVisible(false)
    }

    const handleGenderChange = (e) => {
        setSelectedGender(e.target.id);
        if (e.target.id === 'Both') {
            setGenderFilter(false)
        }
        else
            setGenderFilter(true)
    }

    const handleMinAgeChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value) || value === '') {
            setMinAge(value);
        }
    }

    const handleMaxAgeChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value) || value === '') {
            setMaxAge(value);
        }
    };
    const handleCompletes = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value) || value === '') {
            setCompletes(value);
        }
    }


    const handleMaximize = () => {
        setDataTable(true);
    }

    // async function fetchData() {
    //     try {
    //         // const res = await getFilterData();
    //         const res = filterJson;
    //         setOptionsData(res.data)
    //         console.log(res.data.data);
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }
    useEffect(() => {
        // fetchData();
        setOptionsData(OptionsData.data)
        const data = CustomerData.map(value => value)
        console.log("data", data)
    }, [])

    const handleZoneChange = (value) => {
        setSelectedZone(value);
        setSelectedState(null);
        setSelectedCity(null);
    };

    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption);
        setSelectedCity(null);
    };

    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption);
    };

    const handleSECChange = (selectedOption) => {
        setSelectedSEC(selectedOption);
    };
    
    const handleGenderFilter = (e) => {
        setGender({...gender, [e.target.name]:e.target.value})
    }
    const handleAgeList = (e, index) => {
        setAgeList((prevData) => {
            const updatedData = [...prevData];
            updatedData[index] = { ...updatedData[index], [e.target.name]: e.target.value };
            return updatedData;
        });
    }

    if (!optionsData) {
        return null;
    }

    const { Zone, sec } = optionsData;


    const zoneOptions = Object.keys(Zone).map(zone => ({
        value: zone,
        label: zone
    }));

    const stateOptions = selectedZone ? Object.keys(Zone[selectedZone]).map(state => ({
        value: state,
        label: state
    })) : [];

    const cityOptions = selectedZone && selectedState ? Zone[selectedZone][selectedState].map(city => ({
        value: city,
        label: city
    })) : [];

    const secOptions = sec.map(s => ({ value: s, label: s }));

    const columns = [
        {
            title: 'Unique ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },

    ];
    const data = filteredData?.map((value, index) => ({
        key: index + 1,
        id: value.uniqueID,
        name: value.name
    }
    ))

    let dataITems = filteredData?.map((value, index) => ({
        key: index + 1,
        name: value.name,
        uniqueID: value.uniqueID,
        gender: value.gender,
        age: value.age,
        sec: value.sec,
        zone: value.zone,
        state: value.state,
        city: value.city,
        categoryProductUsage: value.categoryProductUsage,
        ecomShopper: value.ecomShopper
    }))

    return (
        <>
            {contextHolder}
            {!dataTable ?
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
                                <div className='filterFormData'>

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
                                                <input name='gender' type='radio' id='Male' checked={selectedGender === 'Male'} onChange={handleGenderChange} />
                                                <label htmlFor='male'>Male</label>
                                            </div>

                                            <div className='genderClass'>
                                                <input name='gender' type='radio' id='Female' checked={selectedGender === 'Female'} onChange={handleGenderChange} />
                                                <label htmlFor='female'>Female</label>
                                            </div>

                                            <div className='genderClass'>
                                                <input name='gender' type='radio' id='Both' checked={selectedGender === 'Both'} onChange={handleGenderChange} />
                                                <label htmlFor='both'>Both</label>
                                            </div>
                                        </div>
                                        <div className='ageForm'>

                                            <input onChange={handleMinAgeChange} value={minAge} className='ageInput' />

                                            <label> Maximum Age </label>
                                            <input value={maxAge} onChange={handleMaxAgeChange} className='ageInput' />

                                        </div>

                                        <Select
                                            placeholder="Select Zone"
                                            value={selectedZone}
                                            onChange={handleZoneChange}
                                            options={zoneOptions}
                                        />

                                        <Select
                                            placeholder="Select State"
                                            value={selectedState}
                                            onChange={handleStateChange}
                                            options={stateOptions}
                                        />

                                        <Select
                                            placeholder="Select City"
                                            value={selectedCity}
                                            onChange={handleCityChange}
                                            options={cityOptions}
                                        />

                                        <Select
                                            placeholder="Select SEC"
                                            value={selectedSEC}
                                            onChange={handleSECChange}
                                            options={secOptions}
                                        />


                                        <input onChange={handleCompletes} value={completes} className='formInput' type='text' />
                                    </div>
                                </div>
                                <div className='filterGenderData filter-bg gray-bg'>
                                    <div className='form'>
                                        <label>Gender(both)</label>
                                        <label>Male</label>
                                        <label>Female</label>
                                        <label style={{ color: 'gray' }}>Total</label>
                                    </div>
                                    <div className='form'>
                                        <Select
                                            placeholder="Custom"
                                            disabled
                                        />
                                        <div><input className='formInput age' type='text' disabled={genderFilter} name='male' onChange={(e) => handleGenderFilter(e)}/>&nbsp;<span style={{ color: 'green' }}>1234</span></div>
                                        <div><input className='formInput age' type='text' disabled={genderFilter} name='female' onChange={(e) => handleGenderFilter(e)}/>&nbsp;<span style={{ color: 'green' }}>4321</span></div>
                                        <label style={{ color: 'gray' }}>100%</label>
                                    </div>
                                </div>
                                <div className='filterGenderData filter-bg gray-bg'>
                                    <div className='form'>
                                        <div><label className='form-label'>Age&#40;{minAge} - {maxAge}&#41;</label></div>
                                        <div>
                                            <input className='formInput' name='minAge' placeholder='Enter age' type='text' style={{ width: "25%" }} onChange={(e) => handleAgeList(e, 0)} />&nbsp; - &nbsp;
                                            <input className='formInput' name='maxAge' placeholder='Enter age' type='text' style={{ width: "25%" }} onChange={(e) => handleAgeList(e, 0)} />&nbsp;
                                        </div>
                                        <div>
                                            <input className='formInput' name='minAge' placeholder='Enter age' type='text' style={{ width: "25%" }} onChange={(e) => handleAgeList(e, 1)} />&nbsp; - &nbsp;
                                            <input className='formInput' name='maxAge' placeholder='Enter age' type='text' style={{ width: "25%" }} onChange={(e) => handleAgeList(e, 1)} />&nbsp;
                                        </div>
                                        <div>
                                            <input className='formInput' name='minAge' placeholder='Enter age' type='text' style={{ width: "25%" }} onChange={(e) => handleAgeList(e, 2)} />&nbsp; - &nbsp;
                                            <input className='formInput' name='maxAge' placeholder='Enter age' type='text' style={{ width: "25%" }} onChange={(e) => handleAgeList(e, 2)} />&nbsp;
                                        </div>
                                        <label>Total</label>
                                    </div>

                                    <div className='form'>
                                        <Select
                                            placeholder="Custom"
                                            disabled
                                        />
                                        <input className='formInput' name='percentage' onChange={(e) => handleAgeList(e, 0)} type='text' />
                                        <input className='formInput' name='percentage' onChange={(e) => handleAgeList(e, 1)} type='text' />
                                        <input className='formInput' name='percentage' onChange={(e) => handleAgeList(e, 2)} type='text' />
                                        <label style={{ color: 'gray' }}>100%</label>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className='btnAlign'>
                            {isVisible &&
                                <button onClick={handleClear} className='clearBtn'>Clear</button>
                            }
                            <button onClick={handleSubmit} className='btnStyle'>Continue</button>
                        </div>

                    </div>
                    <div className='filterForm filtered'>
                        <div className='filterFormHeader'>
                            <img src={EligibleCount} alt='countImage' />
                            <h2>Eligible Count</h2>
                        </div>
                        <div className='filteredDataBody'>
                            <div className='content'>
                                <div className='filteredDataContent'>
                                    <span>Wanted Completes</span>
                                    {isVisible ?
                                        <span>{completes}</span> : <span> -- </span>
                                    }
                                </div><hr />
                                <div className='filteredDataContent'>
                                    <span>Eligible Completes</span>
                                    {isVisible ?
                                        <span>{filteredData.length}</span> : <span> -- </span>
                                    }
                                </div>
                            </div>
                            <hr />
                            {!isVisible ?
                                <div className='resultsHere'>Results will be displayed here</div>
                                :
                                <div style={{ width: '100%' }}>
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
                            }

                        </div>
                    </div>

                </div>
                :
                <div style={{ width: '100%', backgroundColor: 'white' }}>
                    <div className='tableHeader' style={{
                        backgroundColor: 'rgba(252, 244, 237, 1)',
                        margin: '2vh', boxShadow: '1px 1px 5px 0px #ccc'
                    }}>
                        <div className='searchInput'>
                            <SearchOutlined style={{ color: 'black' }} />
                            <input type='text' value={searchVal} placeholder='Search' onChange={e => {
                                const currValue = e.target.value;
                                if (currValue) {
                                    const filterData = filteredData.filter(entry =>
                                        entry.name.toLowerCase().includes(currValue)
                                    );
                                    setSearchData(filterData);
                                    console.log(filterData);
                                } else { setSearchData([]) }
                            }}
                                className='formInput' style={{ margin: '2vh' }} />
                        </div>

                        <img src={Minimize} alt='countImage' onClick={() => setDataTable(false)} style={{ cursor: 'pointer' }} />
                    </div>
                    <div style={{ margin: '35px', marginTop: '10px' }}>
                        <Table columns={dataColumns} pagination={{
                            pageSize: 5,
                            showSizeChanger: false,
                        }} dataSource={searchData.length === 0 ? dataITems : searchData} className='datatable' />
                    </div>
                </div>
            }
        </>

    )
}


export default filter