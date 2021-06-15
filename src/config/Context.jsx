import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { database } from '../config/firebase';
import { Storage } from '../config/firebase';
import Swal from 'sweetalert2';

export const cardContext = createContext(null);
export const useCard = () => useContext(cardContext);
export const CardProvider = ({ children }) => {
  const history = useHistory();
  let [post_array, setpost_array] = useState([]);
  const [url, setUrl] = useState('');
  const [edition, setedition] = useState('');
  const [company, setcompany] = useState('');
  const [price, setprice] = useState('');
  let [pics, setpics] = useState('');
  const [gender, setgender] = useState('');
  const [user, setUser] = useState(false);

  const onChangeEdition = (event) => {
    setedition(event.target.value);
  };

  const onChangeCompany = (event) => {
    setcompany(event.target.value);
  };

  const onChangePrice = (event) => {
    setprice(event.target.value);
    console.log(price);
  };

  const onChangePics = (event) => {
    let images = event.target.files[0];
    setpics((pics = images));
    console.log(pics);
    Swal.fire({
      title: 'File Upload',
      type: 'success',
      text: 'Your Image is uploading.',
      timer: 3000,
      showConfirmButton: false,
    });
    Storage.ref('picture/' + images.name)
      .put(pics)
      .then((snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        snapshot.ref.getDownloadURL().then((URL) => {
          setUrl(URL);
        });
      });
  };
  const onChangeGender = (event) => {
    setgender(event.target.value);
  };

  const onSubmit = () => {
    if (!edition || !price || !company || !gender || !url) {
      Swal.fire({
        title: 'Kindly fill all the fields',
        type: 'warn',
        text: '',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      database.ref('/ecommerce').child('posts').push({
        edition: edition,
        company: company,
        price: price,
        picture: url,
        gender: gender,
        hidden: false,
        toggle: 'Hide',
      });
      history.push('/');
    }
  };

  const value = {
    post_array: post_array,
    edition: edition,
    company: company,
    price: price,
    gender: gender,
    user: user,
    setUser,
    setpost_array,
    onChangeCompany,
    onChangeEdition,
    onChangePrice,
    onChangePics,
    onChangeGender,
    onSubmit,
  };

  return <cardContext.Provider value={value}>{children}</cardContext.Provider>;
};
