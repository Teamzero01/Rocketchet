import { Grid } from '@rocket.chat/fuselage';
import { useBreakpoints } from '@rocket.chat/fuselage-hooks';
import type { ReactNode, ReactElement } from 'react';
import React from 'react';

const HomepageGridItem = ({ children, fullWidth }: { children: ReactNode; fullWidth?: boolean }): ReactElement => {
	const breakpoints = useBreakpoints();

	const isMedium = !breakpoints.includes('lg');

	return (
		<Grid.Item xs={4} sm={4} md={4} lg={6} xl={4} maxWidth={fullWidth || isMedium ? '100%' : '50%'} flexGrow={1}>
			{children}
		</Grid.Item>
	);
};

export default HomepageGridItem;
