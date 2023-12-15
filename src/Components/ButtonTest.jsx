import { Button } from 'react-native';
import { nw } from 'nativewind';

export function ButtonTest({title}) {
    return (
        <Button
        title={title}
        accessibilityLabel="Learn more about this purple button"
        />
    )
}