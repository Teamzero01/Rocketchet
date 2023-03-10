import { Box } from '@rocket.chat/fuselage';
import React, { FC } from 'react';

const CardHeader: FC = ({ children }) => (
	<Box display='flex' flexDirection='row' color='default' justifyContent='space-between'>
		{children}
	</Box>
);

export default CardHeader;
