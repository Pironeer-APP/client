import styled from "styled-components/native";
import { COLORS } from "../assets/Theme";

export default StyledContainer = styled.SafeAreaView`
  background-color: ${COLORS.bg_black};
  flex: 1;
  padding: ${Platform.OS === 'android' ? '20px' : 0};
`;