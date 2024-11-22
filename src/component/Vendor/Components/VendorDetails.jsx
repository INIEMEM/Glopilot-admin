import React, {useContext, } from 'react'
import { MainContext } from '../../../context/context'
import { Image, Form, Input, Table,  } from 'antd';
const VendorDetails = ({ vendor }) => {
  const {imgBaseUrl} = useContext(MainContext)
  const columns = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Opening Time',
      dataIndex: 'fromTime',
      key: 'fromTime',
    },
    {
      title: 'Closing Time',
      dataIndex: 'toTime',
      key: 'toTime',
    },
  ];
  return (
    <div>
        <div>
            <Form layout='inline' className=' driver-details-form-header' >
              <Form.Item label="Name" layout='vertical' >
                <Input value={vendor?.name} disabled className='inp-new' />
              </Form.Item>
              <Form.Item label=" Email" layout='vertical' >
                <Input value={vendor?.emailAddress} disabled className='inp-new' />
              </Form.Item>
              <Form.Item label=" Phone Number" layout='vertical' >
                <Input value={vendor?.phone} disabled className='inp-new' />
              </Form.Item>   
            </Form>
            <Form layout='inline' className=' driver-details-form-header' >
              <Form.Item label=" Address" layout='vertical' >
                <Input value={vendor?.address} disabled className='inp-new' />
              </Form.Item>
              <Form.Item label=" City" layout='vertical' >
                <Input value={vendor?.city} disabled className='inp-new' />
              </Form.Item>
              <Form.Item label=" Country" layout='vertical' >
                <Input value={vendor?.country} disabled className='inp-new' />
              </Form.Item>
            </Form>
            <Form layout='inline' className=' driver-details-form-header' >
              <Form.Item label="State" layout='vertical' >
                <Input value={vendor?.state} disabled className='inp-new' />
                
              </Form.Item>
              
              <Form.Item label=" Admin Consent" layout='vertical' >
                <Input value={vendor?.adminConsent} disabled className='inp-new' />
              </Form.Item>
              <Form.Item label=" Admin Consent Message" layout='vertical' >
                <Input value={vendor?.adminConsentMessage} disabled className='inp-new' />
              </Form.Item>
              
            </Form>
            <Form layout='inline' className='driver-details-form-header' >
              <Form.Item label=" Business logo" layout='vertical' >
              <Image
                width={300}
                src={`${imgBaseUrl}${vendor?.business_logo[0]?.image}
                `}
                className='shopdetails-img'
              />
              </Form.Item>
              <Form.Item label=" Business license" layout='vertical' >
                <Image
                  width={300}
                  src={`${imgBaseUrl}${vendor?.business_license[0]?.image}
                  `}
                  className='shopdetails-img'
                />
              </Form.Item>
              <Form.Item label=" Profile Picture" layout='vertical'>

              <Image
                width={300}
                src={`${imgBaseUrl}${vendor?.profile_image[0]?.image}
                `}
                className='shopdetails-img'
              />
              </Form.Item>
            </Form>
            <Form layout='inline' className=' driver-details-form-header' >

            <Form.Item label=" cnic back image" layout='vertical' >
                <Image
                  width={300}
                  src={`${imgBaseUrl}${vendor?.cnic_back_image[0]?.image}
                  `}
                  className='shopdetails-img'
                /> 
            </Form.Item>
            <Form.Item label=" cnic front image" layout='vertical' >
                <Image
                  width={300}
                  src={`${imgBaseUrl}${vendor?.cnic_front_image[0]?.image}
                  `}
                  className='shopdetails-img'
                /> 
            </Form.Item>
            <Form.Item label=" tax certificate" layout='vertical' >
              <Image
                width={300}
                src={`${imgBaseUrl}${vendor?.tax_certificate[0]?.image}
                `}
                className='shopdetails-img'
              /> 
            </Form.Item>
              
            </Form>

            <h3 style={{marginTop: 10, color: '#333'}}>Opening Hours</h3>
            <Table
            className="admin-table"
            dataSource={vendor?.openHours?.map((hour) => ({ ...hour, key: hour._id }))}
            columns={columns}
            pagination={false}
            />
        </div>
    </div>
  )
}

export default VendorDetails