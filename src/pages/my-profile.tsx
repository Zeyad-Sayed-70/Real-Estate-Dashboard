import { Label } from '@mui/icons-material'
import { Avatar, Box, GridSearchIcon, IconButton, InputBase, Paper, Stack, Typography } from '@pankod/refine-mui'
import React from 'react'

import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import KingBedIcon from '@mui/icons-material/KingBed';

import { useNavigate } from '@pankod/refine-react-router-v6';
import { motion } from 'framer-motion';

import propertiesData from '../data/properties.json';

const MyProfile = () => {
  return (
    <Box>
      <Typography
        fontSize={'25px'}
        fontWeight={700}
        color='#11142D'
      >
        My Profile
      </Typography>
    
      <Box my={2} p={2} gap={3} bgcolor='#FCFCFC' borderRadius={'10px'} display='flex' sx={{ flexDirection: {xs: 'column', md: 'row'} }} >
        <Box flex={1}>
          <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='/assests/nft.webp' alt='img' />
        </Box>

        <Box flex={2} py={3}>
          <Stack direction='row' gap={2} ml={-8}>
            <Avatar style={{ width: 70, height: 70 }} src='/assests/business-man.jpg' />
            <Box>
              <Typography fontSize={22} fontWeight={500} color='#11142D'>Mr. Alvert Flore</Typography>
              <Typography fontSize={16} fontWeight={400} color='#808191'>Admin</Typography>
            </Box>
          </Stack>

          <Stack gap={1} mt={3}>
            <Typography fontSize={14} fontWeight={500} color='#808191'>Address</Typography>
            <Paper
                component="form"
                sx={{ flex: 1, p: '4px 10px', display: 'flex', alignItems: 'center', backgroundColor: '#F7F7F7', height: 45, boxShadow: 'none' }}
              >
                <LocationOnIcon />
                <InputBase
                  readOnly
                  value={'4517 Washington Ave. Manchaster, Kentucky 39495'}
                  onChange={(e) => {}}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Address"
                  inputProps={{ 'aria-label': 'Address' }}
                />
              </Paper>

              <Stack direction='row' gap={2}>
                <Box flex={1}>
                  <Typography mb={1} fontSize={14} fontWeight={500} color='#808191'>Phone Number</Typography>
                  <Paper
                      component="form"
                      sx={{ flex: 1, p: '4px 10px', display: 'flex', alignItems: 'center', backgroundColor: '#F7F7F7', height: 45, boxShadow: 'none' }}
                    >
                      <CallIcon />
                      <InputBase
                        readOnly
                        value={'+0123 456 7890'}
                        onChange={(e) => {}}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Phone Number"
                        inputProps={{ 'aria-label': 'Phone Number' }}
                      />
                    </Paper>
                </Box>
                <Box flex={1}>
                  <Typography mb={1} fontSize={14} fontWeight={500} color='#808191'>Email</Typography>
                  <Paper
                      component="form"
                      sx={{ flex: 1, p: '4px 10px', display: 'flex', alignItems: 'center', backgroundColor: '#F7F7F7', height: 45, boxShadow: 'none' }}
                    >
                      <EmailIcon />
                      <InputBase
                        readOnly
                        value={'albart4578@gmail.com'}
                        onChange={(e) => {}}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Email"
                        inputProps={{ 'aria-label': 'Email' }}
                      />
                    </Paper>
                </Box>
              </Stack>
          </Stack>
        </Box>
      </Box>

      <PropertyList />
    </Box>
  )
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

const PropertyList = () => {
  const data = propertiesData.slice(10, 16);
  const navigate = useNavigate();

  const handlePropertyClick = (ev: React.ChangeEvent<unknown>) => {
    const id = (ev.target as HTMLElement).getAttribute('id');
    navigate(`/property/show?id=${id}`)
  };
 return (
  <Box sx={{ backgroundColor: '#fcfcfc', borderRadius: '8px', p: 2}}>
    <Typography fontSize={18} fontWeight={600} color='#11142D' mt={1}>Property List</Typography>

    <motion.div variants={container} initial='hidden' animate='visible' style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '1rem 0' }}>
      {data.map(e => (
        <motion.div className='property-box' key={e.id} variants={item}>
          <img id={e.id.toString()} src={`/assests/${e.image}`} alt={e.image} onClick={handlePropertyClick} style={{ borderRadius: '12px', maxWidth: '220px', minWidth: '220px', height: '130px', objectFit: 'cover' }} />
          <Stack className='property-info' gap={1}>
            <Box sx={{ p: '.5rem', borderRadius: 1, color: '#475BE8', backgroundColor: '#DADEFA', width: 'fit-content', fontWeight: 600, fontSize: 12 }}>${e.price}</Box>
            <Typography id={e.id.toString()} fontWeight={600} fontSize={16} color='#11142D' sx={{ cursor: 'pointer' }} onClick={handlePropertyClick}>{e.title}</Typography>
            <Stack direction='row' alignItems='center' gap={1} sx={{ 'svg': { color: '#808191', fontSize: '14px' } }}><LocationOnIcon /> <Typography textTransform='capitalize' fontSize={14} fontWeight={400} color='#808191'>{e.location}</Typography></Stack>
            <Stack direction='row' alignItems='center' justifyContent='space-between' maxWidth='140px'>
              {e.facillity.slice(0, 2).map((fac, ind) => (
                <Stack key={ind} flex="flex" direction='row' alignItems='center' gap={.5} sx={{ 'svg': { color: '#808191', fontSize: '16px' } }}><KingBedIcon /> <Typography textTransform='capitalize' fontSize={12} fontWeight={400} color='#808191'>{fac?.count}{fac.count && " "}{fac.title}</Typography></Stack>
              ))}
            </Stack>
          </Stack>
        </motion.div>
      ))}
    </motion.div>
  </Box>
)}

export default MyProfile