import React, { useState } from 'react'
import Section from './Section'
import ToggleItem from '../components/ToggleItem';
import Gap from '../components/Gap';

export default function NotiSection() {
  const [assignAlert, setAssignAlert] = useState(true);
  const [depositAlert, setDepositAlert] = useState(true);
  const assginToggleSwitch = () => setAssignAlert(!assignAlert);
  const depositToggleSwitch = () => setDepositAlert(!depositAlert);
  return (
    <Section title="알림 설정">
      <ToggleItem
        text="과제 마감 알림"
        onValueChange={assginToggleSwitch}
        value={assignAlert}
      />
      <Gap />
      <ToggleItem
        text="보증금 차감 알림"
        onValueChange={depositToggleSwitch}
        value={depositAlert}
      />
    </Section>
  )
}