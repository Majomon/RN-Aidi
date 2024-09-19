import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParams} from './StackNavigator';

export const navigationRef = createNavigationContainerRef<RootStackParams>();

export function navigate(
  name: keyof RootStackParams,
  params?: RootStackParams[keyof RootStackParams],
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
