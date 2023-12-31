import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert, StatusBar, SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';
import {useRoute} from '@react-navigation/native';
import styled from 'styled-components';
import HeaderDetail from '../../components/Header';
import {CouponButton} from '../../components/Button';
import Gap from '../../components/Gap';
import DepositHistory from '../../deposit/DepositHistory';
import useDepositDetail from '../../deposit/use-depositDetail';
import DepositHistoryHeader from '../../deposit/DepositHistoryHeader';
import {COLORS} from '../../assets/Theme';
import { client } from '../../api/client';
import { useSelector } from 'react-redux';
import { selectAccount, selectJwt } from '../../features/account/accountSlice';

export default function AdminDepositDetail() {
  const route = useRoute();
  const adminInfo = route.params.adminInfo;
  const userInfo = route.params.userInfo;
  
  const adminToken = useSelector(selectJwt);

  const {
    depositHistory,
    couponInfo,
    getDepositHistoryAdmin,
    getCouponInfoAdmin,
  } = useDepositDetail();

  useEffect(() => {
    getDepositHistoryAdmin(adminToken, userInfo);
  }, []);

  useEffect(() => {
    getCouponInfoAdmin(adminToken, userInfo);
  }, []);

  const deleteCoupon = async () => {
    const url = '/deposit/deleteCoupon';

    const body = {
      userToken: adminToken,
      userInfo: userInfo,
    };
    const res = await client.post(url, body);
    console.log(res);
    getCouponInfoAdmin(adminToken, userInfo);
  };

  const onPressDeleteBadge = () => {
    Alert.alert(
      `${userInfo.name}의 보증금 방어권 하나를 삭제하시겠습니까?`,
      '',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteCoupon()},
      ],
    );
  };
  const AddCoupon = async () => {
    const url = '/deposit/addCoupon';
    const body = {
      userToken: adminToken,
      user_id: userInfo.user_id,
    };
    const res = await client.post(url, body);
    getCouponInfoAdmin(adminToken, userInfo);
    console.log(res);
  };
  const onPressAddCoupon = async () => {
    Alert.alert(`${userInfo.name}에게 보증금 방어권을 발급하시겠습니까?`, '', [
      {
        text: '취소',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => AddCoupon()},
    ]);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <Container>
      <SafeAreaView
        style={{
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '100%',
          // backgroundColor: COLORS.gray,
        }}>
        <StatusBar backgroundColor={COLORS.deposit_header_blue} />
        <HeaderDetail
          title={`${userInfo.name}님의 보증금 관리`}
          backgroundColor={COLORS.deposit_header_blue}
          color={'white'}
        />
        <DepositHistoryHeader
          adminInfo={adminInfo}
          userInfo={userInfo}
          couponInfo={couponInfo}
          toggleModal={toggleModal}
          onPressDeleteBadge={onPressDeleteBadge}
        />

        <DepositHistory depositHistory={depositHistory} />
      </SafeAreaView>
      <SafeAreaView
        style={{
          backgroundColor: COLORS.gray,
          position: 'absolute',
          bottom: 0,
        }}
      />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={toggleModal}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View style={styles.modalContainer}>
          <ModalBar />
          <Gap height={20} />
          <View style={styles.couponContainer}>
            <CouponButton
              content="보증금 방어권 발급"
              onPress={() => {
                onPressAddCoupon();
                toggleModal();
              }}
            />
          </View>
          <Gap height={10} />
          <View style={styles.couponContainer}>
            <CouponButton
              content="보증금 방어권 발급 취소"
              onPress={() => {
                onPressDeleteBadge();
                toggleModal();
              }}
            />
          </View>
          <Gap height={20} />
          {/* <MainButton
            height={60}
            content="추가하기"
            onPress={onPressAddCoupon}
          /> */}
        </View>
      </Modal>
    </Container>
  );
}
const Container = styled.View`
  background-color: ${COLORS.deposit_header_blue};
  flex: 1;
`;
const ModalBar = styled.View`
  height: 5px;
  width: 15%;
  border-radius: 10px;
  background-color: ${COLORS.lightTheme_btn};
`;

const styles = StyleSheet.create({
  couponContainer: {
    width: '100%',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
});
