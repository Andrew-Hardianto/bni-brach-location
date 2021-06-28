import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Provinsi from './screens/Provinsi/Provinsi';
import ProvinsiDetail from './screens/Provinsi/ProvinsiDetail';
import ProvinsiTambah from './screens/Provinsi/ProvinsiTambah';
import ProvinsiEdit from './screens/Provinsi/ProvinsiEdit';
import Kota from './screens/Kota/Kota';
import KotaDetail from './screens/Kota/KotaDetail';
import Kecamatan from './screens/Kecamatan/Kecamatan';
import KecamatanDetail from './screens/Kecamatan/KecamatanDetail';
import Kelurahan from './screens/Kelurahan/Kelurahan';
import KelurahanDetail from './screens/Kelurahan/KelurahanDetail';
import Kodepos from './screens/Kodepos/Kodepos';
import KodeposTambah from './screens/Kodepos/KodeposTambah';
import KodeposDetail from './screens/Kodepos/KodeposDetail';
import KotaTambah from './screens/Kota/KotaTambah';
import KecamatanTambah from './screens/Kecamatan/KecamatanTambah';
import KelurahanTambah from './screens/Kelurahan/KelurahanTambah';
import KotaEdit from './screens/Kota/KotaEdit';
import KecamatanEdit from './screens/Kecamatan/KecamatanEdit';
import KelurahanEdit from './screens/Kelurahan/KelurahanEdit';
import KodeposEdit from './screens/Kodepos/KodeposEdit';
import Wilayah from './screens/Wilayah/Wilayah';
import WilayahTambah from './screens/Wilayah/WilayahTambah';
import WilayahDetail from './screens/Wilayah/WilayahDetail';
import WilayahEdit from './screens/Wilayah/WilayahEdit';
import Cabang from './screens/Cabang/Cabang';
import CabangTambah from './screens/Cabang/CabangTambah';
import CabangDetail from './screens/Cabang/CabangDetail';
import CabangEdit from './screens/Cabang/CabangEdit';
import Outlet from './screens/Outlet/Outlet';
import OutletTambah from './screens/Outlet/OutletTambah';
import OutletDetail from './screens/Outlet/OutletDetail';
import OutletEdit from './screens/Outlet/OutletEdit';

function App() {
  return (
    <Router >
      <Sidebar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Redirect to="/location/provinsi" />
            )
          }}
        />
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
    </Router>
  );
}

export default App;
