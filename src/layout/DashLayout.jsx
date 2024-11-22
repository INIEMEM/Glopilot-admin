import React, {useState, useContext} from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Layout, Button, theme, Badge } from 'antd'
import MenuList from '../component/MenuList'
import { MainContext } from '../context/context'
import { MailOutlined, PoweroffOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './layout.css';
const {Header, Sider, Content} = Layout
const DashLayout = () => {
  const [toggle, setToggle] = useState(false);
  const { currentUser, isUndreadMessages } = useContext(MainContext);
  const {token: {colorBgContainer}} = theme.useToken()
  const navigate = useNavigate()
  const messageNavigate = () =>
    {
      navigate('../dashboard/messages');
    }
  return (
    <Layout style={{position:'relative'}}>

        <Sider collapsed= {toggle}  className='sideBar' >
          
          <MenuList/>
        </Sider>
        <Layout>
          <Header style={{padding: 0, background: colorBgContainer}} className='flex flex-justify-between flex-align sider-header'>
              <Button type='text' icon ={toggle ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
              onClick={()=> setToggle(!toggle)}
              ></Button>
              <h1>GLOPILOTs</h1>
              <div className='flex flex-align user-profile-icons'>
            <Link to='profile'>
            <div className="user-profile flex flex-center ">
              {currentUser?.name[0]}
            </div>
            </Link>
            <div className='user-icons flex flex-justify-between'>
            <MailOutlined onClick={messageNavigate}/>
             {(isUndreadMessages) && (<Badge status="processing" size='default' className='flex flex-align' style={{marginTop: '-10px', marginLeft:'-10px'}}/>)}
              <PoweroffOutlined />
            </div>
          </div>
          </Header>
          <Content className='gys'>
              <Outlet/>
          </Content>
        </Layout>
        
           
       
    </Layout>
  )
}

export default DashLayout