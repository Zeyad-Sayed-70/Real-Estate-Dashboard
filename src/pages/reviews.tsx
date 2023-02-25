import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Pagination, Tabs, Tab, Avatar, Rating } from '@pankod/refine-mui';
import { motion } from 'framer-motion';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import ApartmentIcon from '@mui/icons-material/Apartment';

import reviewsData from '../data/reviews.json';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { CustomButton } from 'components';

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

const Reviews = () => {
  const [pagination, setPagination] = useState<number>(1);
  const [data, setData] = useState(reviewsData.slice(0, 5));
  const [pagNum, setPagNum] = useState<number>(1);
  const [tabs, setTabs] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const filteredData = reviewsData.filter(rev => {
      if ( rev.type === 'published' && tabs === 'published' )
        return rev

      if ( rev.type === 'deleted' && tabs === 'deleted' )
        return rev
        
      if ( tabs === 'all' )
        return rev
    })

    const pn = Math.ceil(filteredData.length/5);
    setPagNum(pn);
    if ( pn < pagination ) setPagination(1);
    
    const val = pagination - 1;
    const newData = filteredData.filter((e, ind) => {
      if ( ind >= 0+(val*5) && ind < 5+(val*5) ) return e;
    })
    setData(newData);
  }, [pagination, reviewsData, tabs])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagination(value);
  };
  return (
    <Box pt={1}>
      <Stack gap={2}>
        <Typography
          fontSize={'25px'}
          fontWeight={700}
          color='#11142D'
        >
          Review List
        </Typography>

        <Box sx={{ backgroundColor: '#fcfcfc', px: 2, borderRadius: '10px', width: {xs: '100%', sm: 'fit-content'}, display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={tabs}
            onChange={(event, value) => setTabs(value)}
            aria-label="primary tabs example"
            sx={{ '.MuiTab-root': {color: '#475BE8 !important', textTransform: 'capitalize', fontWeight: '600'}, '.MuiTabs-indicator': {backgroundColor: '#475BE8'} }}
            >
            <Tab value="all" label="All Reviews" />
            <Tab value="published" label="Published" />
            <Tab value="deleted" label="Deleted" />
          </Tabs>
        </Box>
      </Stack>
      <Box>
        <motion.div variants={container} initial='hidden' animate='visible' style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
          {data.length === 0 && <Typography textAlign='center' width='100%' fontWeight={700}>Not Found</Typography>}
          {data.map(review => (
            <motion.div className='reviews-container' key={review.id} variants={item}>
              <Stack direction='row' gap={1} sx={{ flex: {xs: 2, lg: 1} }}>
                <Avatar sx={{ width: 70, height: 70, borderRadius: '12px' }} src={`/assests/${review.avatar}`} alt={review.name} />
                <Stack>
                  <Typography fontSize={14} fontWeight={400} color='#475BE8'>{review.code}</Typography>
                  <Typography fontSize={16} fontWeight={500} color='#11142D'>{review.name}</Typography>
                  <Typography fontSize={14} fontWeight={400} color='#808191'>Join On {review.date}</Typography>
                  <Typography fontSize={14} fontWeight={400} color='#808191'>{review.time}</Typography>
                </Stack>
              </Stack>

              <Stack gap={1} flex={3}>
                <Typography fontSize={14} fontWeight={400} color='#808191' maxWidth={600}>{review.review}</Typography>
                <Box display='flex' alignItems='center' gap={1}>
                  {review.tags.map((tag, ind) => ( <Box key={ind} sx={{ border: '1px solid', px: 1, py: .5, borderRadius: '16px', borderColor: review.satisfied ? '#475BE8' : '#EB5757', color: review.satisfied ? '#475BE8' : '#EB5757', width: 'fit-content', fontSize: '12px', fontWeight: '600' }}>{tag}</Box> ))}
                </Box>
              </Stack>

              <Stack gap={2}>
                <Box display='flex' alignItems='center' gap={1}>
                  <Typography fontSize={22} fontWeight={600} color='#11142D'>{review.rate.toFixed(1)}</Typography>
                  <Rating name="read-only" value={review.rate} readOnly />
                </Box>
                <Box display='flex' gap={1}>
                  <CustomButton 
                    type='outlined'
                    title="Reject"
                    color='#EB5757'
                    customeStyle={{ borderColor: '#EB5757', padding: '.5rem .75rem' }}
                  />
                  <CustomButton 
                    type='outlined'
                    title="Approve"
                    color='#FCFCFC'
                    backgroundColor='#2ED480'
                    customeStyle={{ padding: '.5rem .75rem' }}
                  />
                </Box>
              </Stack>
            </motion.div>
          ))}
        </motion.div>
        <Stack direction='row' alignItems='center' flexWrap='wrap' gap={2} sx={{ justifyContent: { xs: 'center', sm: 'space-between' } }}>
          <Typography fontSize={14} fontWeight={400} color='#808191'>Showing {data.length === 0 ? '0' : `1 to ${data.length}`} Reviews</Typography>
          <Pagination onChange={handleChange} count={pagNum} shape="rounded" color='standard' sx={{ '	.MuiPaginationItem-root:hover': { color: 'white', backgroundColor: '#475BE8' }, '.Mui-selected': { color: 'white', backgroundColor: '#475BE8 !important' } }}  />
        </Stack>
      </Box>
    </Box>
  )
}

export default Reviews