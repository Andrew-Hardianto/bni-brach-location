import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { useSelector } from 'react-redux'

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 230px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 9000;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const { userInfo } = useSelector((state) => state.userLogin)

  return (
    <>
      {/* <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider> */}
      {userInfo ?

        <>
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
              <div className="sidebar-brand-text mx-3">MASTER LOCATION</div>
            </a>

            <hr className="sidebar-divider my-3" />

            <div className="sidebar-heading">
              Data Lokasi Indonesia
            </div>

            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-fw fa-globe"></i>
                <span>Master Location</span>
              </a>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Data Lokasi Indonesia:</h6>
                  <Link className="collapse-item" to="/location/provinsi">Provinsi</Link>
                  <Link className="collapse-item" to="/location/kota">Kota/Kabupaten</Link>
                  <Link className="collapse-item" to="/location/kecamatan">Kecamatan</Link>
                  <Link className="collapse-item" to="/location/kelurahan">Kelurahan</Link>
                  <Link className="collapse-item" to="/location/kodepos">Kodepos</Link>
                </div>
              </div>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
              Data Cabang
            </div>

            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                aria-expanded="true" aria-controls="collapsePages">
                <i className="fas fa-fw fa-hotel"></i>
                <span>Master BNI</span>
              </a>
              <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Data Cabang:</h6>
                  <Link className="collapse-item" to="/location/region">Region</Link>
                  <Link className="collapse-item" to="/location/branch">Branch</Link>
                  <Link className="collapse-item" to="/location/outlet">Outlet</Link>
                </div>
              </div>
            </li>

            {/* <hr className="sidebar-divider d-none d-md-block" />
        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle"></button>
        </div> */}

          </ul>
        </>
        : <> </>
      }
    </>
  );
};

export default Sidebar;
