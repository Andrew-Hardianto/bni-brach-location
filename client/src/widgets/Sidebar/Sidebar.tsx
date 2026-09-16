import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Collapse } from 'react-bootstrap';

const Sidebar = () => {
  const [openLocation, setOpenLocation] = useState(false);
  const [openBranch, setOpenBranch] = useState(false);
  const location = useLocation();
  const { userInfo } = useSelector((state: any) => state.userLogin);



  if (!userInfo) return <></>;

  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
        <div className="sidebar-brand-text mx-3">MASTER LOCATION</div>
      </a>

      <hr className="sidebar-divider my-3" />

      <div className="sidebar-heading">
        Data Lokasi Indonesia
      </div>

      <li className="nav-item">
        <a
          className={`nav-link ${openLocation ? '' : 'collapsed'}`}
          href="#"
          onClick={(e) => { e.preventDefault(); setOpenLocation(!openLocation); }}
          aria-expanded={openLocation}
        >
          <i className="fas fa-fw fa-globe"></i>
          <span>Master Location</span>
        </a>
        <Collapse in={openLocation}>
          <div id="collapseTwo" className="collapse" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Pilih Master:</h6>
              <Link className={`collapse-item ${isActive('/location/provinsi')}`} to="/location/provinsi">Provinsi</Link>
              <Link className={`collapse-item ${isActive('/location/kota')}`} to="/location/kota">Kota/Kabupaten</Link>
              <Link className={`collapse-item ${isActive('/location/kecamatan')}`} to="/location/kecamatan">Kecamatan</Link>
              <Link className={`collapse-item ${isActive('/location/kelurahan')}`} to="/location/kelurahan">Kelurahan</Link>
              <Link className={`collapse-item ${isActive('/location/kodepos')}`} to="/location/kodepos">Kodepos</Link>
            </div>
          </div>
        </Collapse>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">
        Data Cabang
      </div>

      <li className="nav-item">
        <a
          className={`nav-link ${openBranch ? '' : 'collapsed'}`}
          href="#"
          onClick={(e) => { e.preventDefault(); setOpenBranch(!openBranch); }}
          aria-expanded={openBranch}
        >
          <i className="fas fa-fw fa-hotel"></i>
          <span>Master BNI</span>
        </a>
        <Collapse in={openBranch}>
          <div id="collapsePages" className="collapse" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Pilih Cabang:</h6>
              <Link className={`collapse-item ${isActive('/location/region')}`} to="/location/region">Region</Link>
              <Link className={`collapse-item ${isActive('/location/branch')}`} to="/location/branch">Branch</Link>
              <Link className={`collapse-item ${isActive('/location/outlet')}`} to="/location/outlet">Outlet</Link>
            </div>
          </div>
        </Collapse>
      </li>

    </ul>
  );
};

export default Sidebar;
