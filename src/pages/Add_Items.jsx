import Cardform from "../components/cards/cards_form";
import Footer from "../components/footer/footer";
import Headertop from '../components/header/headertop'
import AdminNav from '../components/header/adminNav'

const Add_items=()=>{
   return(
   <>
    <Headertop />
    <AdminNav/>
    <Cardform/>
    <Footer />
    </>
   );
}
export default Add_items;