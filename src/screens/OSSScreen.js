import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback, Linking } from 'react-native'
import React from 'react'

import StyledContainer from '../components/StyledContainer'
import HeaderDetail from '../components/Header'
import { StyledText } from '../components/Text'
import { Image } from 'react-native-svg'
import { RowView } from './HomeScreen'
import { COLORS } from '../assets/Theme'
import { Hr } from '../components/Hr'
import { OSSLIST, apacheLicense, bsdLicense, mitLicense, openfontLicense } from '../oss'

const OSSContainer = (props) => (
  <View style={styles.OSSContainer}>
    <View style={styles.OSSNameContainer}>
      <View style={styles.circle} />
      <View style={styles.OSSName}>
        <StyledText
          content={props.licenseName}
          fontSize={12}
          weight={800}
        />
      </View>
    </View>
    <View style={styles.OSSContent}>
      <TouchableWithoutFeedback
        onPress={() => Linking.openURL(props.github)}
      >
        <Text style={styles.OSSLinkText}>
          {props.github}
        </Text>
      </TouchableWithoutFeedback>
      <StyledText
        content={props.copyright}
        fontSize={12}
      />
      <StyledText
        content={props.license}
        fontSize={12}
      />
    </View>
  </View>
)

const License = (props) => (
  <View>
    <StyledText
      content={props.licenseName}
      fontSize={15}
      weight={800}
    />
    <Text style={styles.LicenseContent}>
      {props.licenseContent}
    </Text>
  </View>
)


export default function OSSScreen() {
  return (
    <StyledContainer>
      <HeaderDetail title='오픈소스 라이선스' />
      <ScrollView>
        <View style={{ paddingHorizontal: 20 }}>
          <StyledText
            content={'OSS Notice'}
            fontSize={20}
            weight={800}
          />
          <StyledText
            content={'Pironeer-RN'}
            fontSize={18}
            weight={600}
          />
          <Hr />
          <StyledText
            content={'This application is Copyright © Pironeer. All rights reserved.'}
            fontSize={12}
          />
          <StyledText
            content={'The following sets forth attribution notices for third party software that may be contained in this application.'}
            fontSize={12}
          />
          <StyledText
            content={'If you have any questions about these notices, please email us at pirogramming.official@gmail.com'}
            fontSize={12}
          />
          <Hr />
          {OSSLIST.map((oss, index) => (
            <OSSContainer
              key={index}
              licenseName={oss.licenseName}
              github={oss.github}
              copyright={oss.copyright}
              license={oss.license}
            />
          ))}
          <Hr />
          <License
            licenseName={'MIT License'}
            licenseContent={mitLicense}
          />
          <Hr />
          <License
            licenseName={'Apache License\nVersion 2.0, January 2004\nhttp://www.apache.org/licenses/'}
            licenseContent={apacheLicense}
          />
          <Hr />
          <License
            licenseName={'BSD 2-Clause "Simplified" License'}
            licenseContent={bsdLicense}
          />
          <Hr />
          <License
            licenseName={'SIL Open Font License 1.1'}
            licenseContent={openfontLicense}
          />
        </View>
      </ScrollView>
    </StyledContainer>
  )
}

const styles = StyleSheet.create({
  OSSContainer: {
    marginBottom: 20
  },
  OSSNameContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    width: 5,
    height: 5,
    backgroundColor: COLORS.green,
    borderRadius: 100,
    marginRight: 10
  },
  OSSContent: {
    paddingLeft: 40,
    paddingTop: 5
  },
  OSSLinkText: {
    fontSize: 12,
    color: '#2980b9',
    textDecorationLine: 'underline'
  },
  LicenseContent: {
    fontSize: 13,
    marginTop: 5,
    color: COLORS.textColor
  }
})