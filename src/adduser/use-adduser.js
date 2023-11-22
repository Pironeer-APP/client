import { useState } from 'react'
import { autoHyphen, fetchPost } from '../utils';
import { Keyboard, Alert } from 'react-native';

export default function useAdduser() {
  const [titleNum, setTitleNum] = useState(0);
  const [level, setLevel] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);

  const onPressNext = () => {
    //level 입력 여부 확인
    if (titleNum === 0 && level !== null) setTitleNum(titleNum + 1);
    //name 입력 여부 확인
    else if (titleNum === 1 && level !== null && name !== null) setTitleNum(titleNum + 1);
    //phone 입력 여부 확인
    else if (titleNum === 2 && level !== null && name !== null && phone !== null) setTitleNum(titleNum + 1);
    //email 입력 여부 확인
    else if (titleNum === 3 && level !== null && name !== null && phone !== null && email !== null) setTitleNum(titleNum + 1);
    else if(titleNum === 4 && level !== null && name !== null && phone !== null && email !== null) {
      setTitleNum(titleNum + 1);
    }
  }

  const onInputLevel = (value) => {
    setLevel(value);
  }
  const onInputName = (value) => {
    setName(value);
  }
  const onInputPhone = (value) => {
    console.log(autoHyphen(value));
    setPhone(autoHyphen(value));
  }
  const onInputEmail = (value) => {
    setEmail(value);
  }

  return {
    titleNum,
    setTitleNum,
    onPressNext,
    level,
    setLevel,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    onInputLevel,
    onInputName,
    onInputPhone,
    onInputEmail,
  }
}