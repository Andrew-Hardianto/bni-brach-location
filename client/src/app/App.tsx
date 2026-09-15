import '@/App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Header from '@/widgets/Header/Header';
import Footer from '@/shared/ui/Footer';
import Sidebar from '@/widgets/Sidebar/Sidebar';
import Provinsi from '@/pages/ProvinsiPage/Provinsi';
import ProvinsiDetail from '@/pages/ProvinsiPage/ProvinsiDetail';
import ProvinsiTambah from '@/features/Provinsi/ProvinsiTambah';
import ProvinsiEdit from '@/features/Provinsi/ProvinsiEdit';
import Kota from '@/pages/KotaPage/Kota';
import KotaDetail from '@/pages/KotaPage/KotaDetail';
import Kecamatan from '@/pages/KecamatanPage/Kecamatan';
import KecamatanDetail from '@/pages/KecamatanPage/KecamatanDetail';
import Kelurahan from '@/pages/KelurahanPage/Kelurahan';
import KelurahanDetail from '@/pages/KelurahanPage/KelurahanDetail';
import Kodepos from '@/pages/KodeposPage/Kodepos';
import KodeposTambah from '@/features/Kodepos/KodeposTambah';
import KodeposDetail from '@/pages/KodeposPage/KodeposDetail';
import KotaTambah from '@/features/Kota/KotaTambah';
import KecamatanTambah from '@/features/Kecamatan/KecamatanTambah';
import KelurahanTambah from '@/features/Kelurahan/KelurahanTambah';
import KotaEdit from '@/features/Kota/KotaEdit';
import KecamatanEdit from '@/features/Kecamatan/KecamatanEdit';
import KelurahanEdit from '@/features/Kelurahan/KelurahanEdit';
import KodeposEdit from '@/features/Kodepos/KodeposEdit';
import Wilayah from '@/pages/WilayahPage/Wilayah';
import WilayahTambah from '@/features/Wilayah/WilayahTambah';
import WilayahDetail from '@/pages/WilayahPage/WilayahDetail';
import WilayahEdit from '@/features/Wilayah/WilayahEdit';
import Cabang from '@/pages/CabangPage/Cabang';
import CabangTambah from '@/features/Cabang/CabangTambah';
import CabangDetail from '@/pages/CabangPage/CabangDetail';
import CabangEdit from '@/features/Cabang/CabangEdit';
import Outlet from '@/pages/OutletPage/Outlet';
import OutletTambah from '@/features/Outlet/OutletTambah';
import OutletDetail from '@/pages/OutletPage/OutletDetail';
import OutletEdit from '@/features/Outlet/OutletEdit';
import Topbar from '@/shared/ui/Topbar';
import Login from '@/pages/AuthPage/Login';
import User from '@/pages/AuthPage/User';
import UserTambah from '@/features/Auth/UserTambah';
import UserDetail from '@/pages/AuthPage/UserDetail';
import UserUbah from '@/pages/AuthPage/UserUbah';
import UserProfile from '@/pages/AuthPage/UserProfile';

function App() {
  return (
    <div id="wrapper">
      <Router >
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return (
                    <Redirect to="/login" />
                  )
                }}
              />
              <Route path="/login" exact component={Login} />
              <Route path="/user" exact component={User} />
              <Route path="/user/tambah" exact component={UserTambah} />
              <Route path="/user/detail/:id" exact component={UserDetail} />
              <Route path="/user/edit/:id" exact component={UserUbah} />
              <Route path="/user/profile" exact component={UserProfile} />
              <Route path="/location/provinsi" exact component={Provinsi} />
              <Route path="/location/provinsi/tambah" exact component={ProvinsiTambah} />
              <Route path="/location/provinsi/detail/:id" exact component={ProvinsiDetail} />
              <Route path="/location/provinsi/edit/:id" exact component={ProvinsiEdit} />
              <Route path="/location/kota" exact component={Kota} />
              <Route path="/location/kota/tambah" exact component={KotaTambah} />
              <Route path="/location/kota/edit/:id" exact component={KotaEdit} />
              <Route path="/location/kota/detail/:id" exact component={KotaDetail} />
              <Route path="/location/kecamatan" exact component={Kecamatan} />
              <Route path="/location/kecamatan/tambah" exact component={KecamatanTambah} />
              <Route path="/location/kecamatan/edit/:id" exact component={KecamatanEdit} />
              <Route path="/location/kecamatan/detail/:id" exact component={KecamatanDetail} />
              <Route path="/location/kelurahan" exact component={Kelurahan} />
              <Route path="/location/kelurahan/tambah" exact component={KelurahanTambah} />
              <Route path="/location/kelurahan/edit/:id" exact component={KelurahanEdit} />
              <Route path="/location/kelurahan/detail/:id" exact component={KelurahanDetail} />
              <Route path="/location/kodepos" exact component={Kodepos} />
              <Route path="/location/kodepos/tambah" exact component={KodeposTambah} />
              <Route path="/location/kodepos/detail/:id" exact component={KodeposDetail} />
              <Route path="/location/kodepos/edit/:id" exact component={KodeposEdit} />
              <Route path="/location/region" exact component={Wilayah} />
              <Route path="/location/region/tambah" exact component={WilayahTambah} />
              <Route path="/location/region/detail/:id" exact component={WilayahDetail} />
              <Route path="/location/region/edit/:id" exact component={WilayahEdit} />
              <Route path="/location/branch" exact component={Cabang} />
              <Route path="/location/branch/tambah" exact component={CabangTambah} />
              <Route path="/location/branch/detail/:id" exact component={CabangDetail} />
              <Route path="/location/branch/edit/:id" exact component={CabangEdit} />
              <Route path="/location/outlet" exact component={Outlet} />
              <Route path="/location/outlet/tambah" exact component={OutletTambah} />
              <Route path="/location/outlet/detail/:id" exact component={OutletDetail} />
              <Route path="/location/outlet/edit/:id" exact component={OutletEdit} />
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    </div >
  );
}

export default App;
