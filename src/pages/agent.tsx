import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Pagination } from '@pankod/refine-mui';
import { CustomButton } from 'components';
import { motion } from 'framer-motion';

import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import ApartmentIcon from '@mui/icons-material/Apartment';

import agentData from '../data/agents.json';
import { useNavigate } from '@pankod/refine-react-router-v6';

interface FiltersSelected {
  search: string;
  status: string;
  type: string;
  country: string;
  state: string;
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const icons: any = {
  mail: <EmailIcon />,
  phone: <CallIcon />,
  properties_count: <ApartmentIcon />,
  city: <LocationOnIcon />
};

const Agent = () => {
  const [pagination, setPagination] = useState<number>(1);
  const [data, setData] = useState(agentData.slice(0, 4));
  const [pagNum, setPagNum] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const pn = Math.ceil(agentData.length/4);
    setPagNum(pn);
    if ( pn < pagination ) setPagination(1);
    
    const val = pagination - 1;
    const newData = agentData.filter((e, ind) => {
      if ( ind >= 0+(val*4) && ind < 4+(val*4) ) return e;
    })
    setData(newData);
  }, [pagination, agentData])

  const handlePropertyClick = (ev: React.ChangeEvent<unknown>) => {
    const id = (ev.target as HTMLElement).getAttribute('id');
    navigate(`./show?id=${id}`)
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagination(value);
  };
  return (
    <Box pt={1}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography
          fontSize={'25px'}
          fontWeight={700}
          color='#11142D'
        >
          Agent List
        </Typography>
        <CustomButton 
          type='contained'
          title='Add Agent'
          backgroundColor='#475BE8'
          color='#FCFCFC'
          fullWidth={false}
          icon={<AddIcon />}
          disabled={false}
        />
      </Stack>
      <Box sx={{ backgroundColor: '#fff', p: {xs: 1, md: 3}, mt: 3, borderRadius: '12px' }}>
        <motion.div variants={container} initial='hidden' animate='visible' style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem 0' }}>
          {data.length === 0 && <Typography textAlign='center' width='100%' fontWeight={700}>Not Found</Typography>}
          {data.map(agent => (
            <motion.div style={{ width: '100%' }} key={agent.id} variants={item}>
              <Box display='flex' alignItems="center" sx={{ gap: {xs: 1, sm: 2} }}>
                <Box sx={{ width: { xs: '150px', sm: 300 } }}>
                  <img id={agent.id.toString()} onClick={handlePropertyClick} style={{ width: '100%', borderRadius: '12px' }} src={`assests/${agent.avatar}`} alt={agent.name} />
                </Box>
                <Stack flex={1}>
                  <Typography id={agent.id.toString()} onClick={handlePropertyClick} fontWeight={600} sx={{ fontSize: {xs: 14, sm: 22} }} color='#11142D'>{agent.name}</Typography>
                  <Typography fontWeight={400} sx={{ fontSize: {xs: 12, sm: 14} }} color='#808191'>{agent.type}</Typography>
                  <Stack direction='row' flexWrap='wrap' mt={1}>
                    {Object.keys(agent.info).map((key: string, ind) => (
                      <Box key={ind} display='flex' alignItems='center' gap={1} color='#808191' sx={{ width: {xs: '100%', lg: '50%'}, 'svg': { fontSize: {xs: 14, sm: 18} }, mt: {xs: 0, sm: 2} }}>{icons[key]} <Typography fontWeight={400} color='#808191' sx={{ fontSize: {xs: 12, sm: 14} }}>{agent.info[key]}</Typography></Box>
                    ))}
                  </Stack>
                </Stack>
              </Box>
            </motion.div>
          ))}
        </motion.div>
        <Stack direction='row' alignItems='center' flexWrap='wrap' gap={2} sx={{ justifyContent: { xs: 'center', sm: 'space-between' } }}>
          <Typography fontSize={14} fontWeight={400} color='#808191'>Showing {data.length === 0 ? '0' : `1 to ${data.length}`} Agent</Typography>
          <Pagination onChange={handleChange} count={pagNum} shape="rounded" color='standard' sx={{ '	.MuiPaginationItem-root:hover': { color: 'white', backgroundColor: '#475BE8' }, '.Mui-selected': { color: 'white', backgroundColor: '#475BE8 !important' } }}  />
        </Stack>
      </Box>
    </Box>
  )
}

export default Agent